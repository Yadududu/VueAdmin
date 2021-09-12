import axios from "axios";
import router from "./router";
import Element from "element-ui"

// axios.defaults.baseURL = "http://localhost:8081"

const request = axios.create({
	timeout: 5000,
	headers: {
		'Content-Type': "application/json; charset=utf-8"
	}
})

request.interceptors.request.use(config => {
	config.headers['Authorization'] = localStorage.getItem("token")	// 请求头带上token
	return config
})

request.interceptors.response.use(response => {
		// console.log("response ->" + response)

		let res = response.data
		console.log(res)

		if (res.code === 200) {
			return response
		} else {
			Element.Message.error(!res.msg ? '系统异常' : res.msg)
			return Promise.reject(response.data.msg)
		}
	},
	error => {

		console.log(error)

		if (error.response.data) {
			error.massage = error.response.data.msg
		}
		//如果是401未登录没权限的就调到登录页面，其他的就直接弹窗显示错误。 
		if (error.response.status === 401) {
			router.push("/login")
		}

		Element.Message.error(error.massage, {duration: 3000})
		return Promise.reject(error)
	}
)

export default request