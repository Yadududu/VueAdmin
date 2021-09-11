介绍
这是一个基于SpringBoot + Vue开发的前后端分离博客项目。

技术栈：  
前端：  
1.vue  
2.route  
3.element-ui  
4.axios  
后端：  
1.Springboot  
2.mybatis plus  
3.shiro  
4.redis  
5.Hibernate validatior  
6.jwt  

前端说明：  
vueblog-vue运行需要安装:  
npm i element-ui  
npm i axios  
npm i mavon-editor (编辑器)  
npm i markdown-it (解释md文档)  
npm i github-markdown-css (md样式)  

后端说明：  
1.jwt用户用户登录时生成token  
2.使用了shiro做认证和授权功能,当跳转/logout,/blog/edit需要登录后才能访问(访问这些页面需要配戴token)  
3.redis做shiro的用户缓存,当用户访问页面需要做认证的时候,可以先从缓存中查找,再到数据库中查找  

部署到服务器使用nginx代理,nginx配置:  
```
server {
	listen      80;
	server_name  testvue.mylmj.top www.testvue.mylmj.top;

	location / {
		root /usr/local/www/springbootvuebefore;
		index index.html index.htm;
		#不写这句,history模式请求路由会变成直接请求后台的路由导致404
		try_files $uri $uri/ /index.html;
	}
	
	#反向代理，解决跨域问题，不配置的话也容易出现405的问题
	location ~/springbootvue/{
		proxy_pass http://localhost:8080;
	}

}
```