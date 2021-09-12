import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default {
	state: {

		menuList: [],
		permList: [],

		hasRoutes: false,

		editableTabsValue: 'Index',
		editableTabs: [{
			title: '首页',
			name: 'Index',
		}]
	},
	mutations: {
		setMenuList(state, menus) {
			state.menuList = menus
		},
		setPermList(state, perms) {
			state.permList = perms
		},
		changeRouteStatus(state, hasRoutes) {
			state.hasRoutes = hasRoutes
		},

		addTab(state, tab) {
			// console.log("addTab:editableTabs");
			// console.log(state.editableTabs);
			// 判断是否在栈内
			let index = state.editableTabs.findIndex(e => e.name === tab.name)
			if (index === -1) {
				// 添加到editableTabs中
				state.editableTabs.push({
					title: tab.title,
					name: tab.name,
				});
			}
			// 当前激活的tab
			state.editableTabsValue = tab.name;
			localStorage.setItem("editableTabs", JSON.stringify(state.editableTabs))
		},
		removeTab(state,targetName){
			// 首页不能删除
			if (targetName === 'Index') {
				return
			}
			// 如果当前页是删除页,那么前移一页
			if (state.editableTabsValue === targetName) {
				state.editableTabs.forEach((tab, index) => {
					if (tab.name === targetName) {
						let nextTab = state.editableTabs[index + 1] || state.editableTabs[index - 1];
						if (nextTab) {
							state.editableTabsValue = nextTab.name;
						}
					}
				});
			}
			
			state.editableTabs = state.editableTabs.filter(tab => tab.name !== targetName);
			
			localStorage.setItem("editableTabs", JSON.stringify(state.editableTabs))
		},

		resetState: (state) => {
			state.menuList = []
			state.permList = []

			state.hasRoutes = false
			state.editableTabsValue = 'Index'
			state.editableTabs = [{
				title: '首页',
				name: 'Index',
			}]
			localStorage.removeItem("editableTabs")
		}

	},
	actions: {
	},

}