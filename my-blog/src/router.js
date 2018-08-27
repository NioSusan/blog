import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";


Vue.use(Router);

export default new Router({
	mode: "history",
	base: process.env.BASE_URL,
	routes: [
		{
			path: "/",
			name: "home",
			component: Home
		},
		{
			path: "/posts",
			name: "posts",
			// route level code-splitting
			// this generates a separate chunk (about.[hash].js) for this route
			// which is lazy-loaded when the route is visited.
			component: () =>
				import(/* webpackChunkName: "blog" */ "./views/Blog.vue"),
			children: [
				{
					path: "/posts/:id",
					props: true,
					component: () =>
						import(/* webpackChunkName: "post" */ "./components/PostDetail.vue")
				},
				{
					path: "/posts/:id/edit",
					name: 'postEdit',
					component: () =>
						import(/* webpackChunkName: "post" */ "./components/PostEdit.vue")
				},
				
			]
		},
		{
			path: "/new-post",
			name: "new-post",
			component: () =>
				import(/* webpackChunkName: "post" */ "./views/NewPost.vue")
		},
		{
			path: "*",
			redirect: "/"
		},
		{
			path: "/signin",
			name: "signin",
			component: () =>
				import(/* webpackChunkName: "post" */ "./components/Login.vue")
		},
		{
			path: "/signup",
			name: "signup",
			component: () =>
				import(/* webpackChunkName: "post" */ "./components/Signup.vue")
		},
		{
			path: "/logout",
			name: "logout",
		},

	]
});
