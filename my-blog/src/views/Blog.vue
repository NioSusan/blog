<template>
  <div class="posts">
    <div class="container">
      <div class="col-xs-12">
       <h2><heading header="A wonderful blog!"></heading></h2>
        <div class="container">
          <div class="col-sm-4 post" style="margin-top: 25px">
			<button v-show="token" @click="add" class="btn btn-primary" type="submit">Add / Edit Post</button>
			<br>  <br>
            <ul class="list-group">
              <li @click="getDetails(post)" class="list-group-item" v-for="(post, index) in posts" :key="index">
              <router-link :to="'/posts/' + post._id">{{post.title}}</router-link>  - {{ new Date(post.createdAt) }}
              </li>
            </ul>  
          </div>
          <div class="col-sm-8">
             <router-view v-if="this.$route.params.id" :details='post' :userId="userId" :param="id"></router-view>
            <div v-else>
              <h1> YUHUUUUUU ... </h1>
              <img  id="welcomeImg" src="https://images.unsplash.com/photo-1471400974796-1c823d00a96f?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=e30d771431a85bb496c5bb82aa3a791c&auto=format&fit=crop&w=700&q=60">
            </div>
          </div>
        </div>
      </div>
    </div>

    

  </div>
</template>

<script>
import axios from "axios";
import Header from "@/components/Header.vue";
export default {
	name: "posts",
	components: {
		heading: Header
	},
	data() {
		return {
			id: this.$route.params.id,
			userId: localStorage.getItem('userId'),
			token: localStorage.getItem("token"),
			title: "",
			post: {},
			posts: []
		};
	},
	methods: {
		getDetails(post) {
			this.post = post;
		},
		add() {
			if(this.$route.params.id !== undefined){
				this.$router.push({ name: "postEdit", params: { id: this.id } });
				console.log("add() from Blog.vue shows that this.$route.params.id is defined", this.$route.params.id )
			}else{
				this.$router.push({ name: "postEdit", params: { id: 1 }});
				console.log("add() from Blog.vue shows that this.$route.params.id undefined", this.$route.params.id )
			}
			
		}
	},
	beforeCreate() {
		let self = this;
		if (localStorage.getItem("token")) {
			axios({
				method: "GET",
				url: "/articles",
				headers: {
					token: localStorage.getItem("token")
				}
			})
				.then(data => {
					let result = data.data.data;
					if (result.length > 0) {
						self.posts = result;
					}
					console.log("1. beforeCreate() posts", self.posts)
					console.log("2. beforeCreate() this.$route.params.id",this.$route.params.id)
				})
				.catch(err => {
					console.log(err);
				});
		}
	},
	watch: {
		$route(to) {
			this.id = to.params.id;
			console.log("watch()",this.id)
		}
	},

	created() {
		let self = this;
		let isFound = false;
		if (localStorage.getItem("token")) {
			axios({
				method: "GET",
				url: "/articles",
				headers: {
					token: localStorage.getItem("token")
				}
			})
				.then(data => {
					let result = data.data.data;
					if (result.length > 0) {
						self.posts = result;
						for (let post of this.posts) {
							if (post._id === this.$route.params.id) {
								console.log(`3. created() post._id ${post._id} ===  params.id ${this.$route.params.id}`, post._id === this.$route.params.id)
								this.post = post;
								isFound = true;
								break;
							}
						}
						if (!isFound) {
							console.log("3. created() this.posts", this.posts);
							console.log("3. created() this.post is [] so", Object.keys(this.post).length>0);
							console.log("3. created() this.$route.params.id", this.$route.params.id);
							
						}
					}
				})
				.catch(err => {
					console.log(err);
				});
		}


	}
};
</script>

<style scoped>
#welcomeImg {
	background-size: contain;
	background-position: center;
	height: 40%;
	width: 50%;
}

li {
	list-style-type: none;
	cursor: pointer;
}

.post {
	font-size: 20px;
	text-align: left;
}
</style>


