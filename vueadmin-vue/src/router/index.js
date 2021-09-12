import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "../views/Home.vue"
import Index from "../views/Index.vue"
import Login from "../views/Login.vue"

import axios from "../axios.js";
import store from "../store/index.js"

Vue.use(VueRouter)

//消除路由跳转当前的路由路径会报错
//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
	return originalPush.call(this, location).catch(err => err)
}

const routes = [{
		path: '/',
		name: 'Home',
		component: Home,
		children: [{
				path: '/index',
				name: 'Index',
				meta: {
					title: "首页"
				},
				component: Index
			},
			{
				path: '/userCenter',
				name: 'UserCenter',
				meta: {
					title: "个人中心"
				},
				component: () => import('@/views/UserCenter.vue')
			},
		]
	},
	{
		path: '/login',
		name: 'Login',
		component: Login
	}
]

const router = new VueRouter({
	mode: 'history',
	base: process.env.BASE_URL,
	routes
})

//全局前置守卫:初始化时执行、每次路由切换前执行
router.beforeEach((to, from, next) => {
	//hasRoute判断是否已经添加过路由
	let hasRoute = store.state.menus.hasRoutes

	let token = localStorage.getItem("token")

	if (to.path == '/login') { //进入/login直接放行
		next()
	} else if (!token) { //没有佩带token跳转到登录页面
		next({
			path: '/login'
		})
	} else if (token && !hasRoute) {
		axios.get("/sys/menu/nav", { //进入菜单导航栏
			headers: {
				Authorization: localStorage.getItem("token")
			}
		}).then(res => {
			// console.log(res.data.data)
			// 拿到menuList
			store.commit("setMenuList", res.data.data.nav)
			// 拿到用户权限
			store.commit("setPermList", res.data.data.authoritys)

			// console.log(store.state.menus.menuList)
			// 动态绑定路由
			let newRoutes = router.options.routes

			res.data.data.nav.forEach(menu => {
				if (menu.children) {
					menu.children.forEach(e => {
						// 转成路由
						let route = menuToRoute(e)
						// 把路由添加到路由管理中
						if (route) {
							newRoutes[0].children.push(route)
						}
					})
				}
			})

			// console.log("newRoutes")
			// console.log(newRoutes)
			//动态添加路由
			router.addRoutes(newRoutes)

			hasRoute = true
			store.commit("changeRouteStatus", hasRoute)
		})
	}
	next()
})


// 导航转成路由
const menuToRoute = (menu) => {
	// console.log("正在添加menu--》")
	// console.log(menu)
	if (!menu.component) {
		return null
	}
	// 复制属性
	let route = {
		name: menu.name,
		path: menu.path,
		meta: {
			icon: menu.icon,
			title: menu.title
		}
	}
	route.component = () => import('@/views/' + menu.component + '.vue')

	return route
}

export default router
