<template>
  <div class="editpost">
    <h2>{{ heading }}</h2>
    <div class="container col-sm-24">
        <form v-if="this.$route.params.id === 1">
            <div class="form-group col-sm-8"> 
				<label>Title</label>
                <input class="form-control" placeholder="title" v-model="title" type="text">
            </div> 
            <div class="form-group  col-sm-8"> 
				<label>Content</label>
                <textarea class="form-control" v-model="content" placeholder="content" rows="8" cols="50"></textarea>
            </div>
            <div class="form-group  col-sm-8"> 
				<label>Image Url</label>
                <input class="form-control" placeholder="image" v-model="image" type="text">
            </div> 
			<div class="form-group col-sm-8"> 
                <input v-on:click="addPost" class="form-control btn btn-info" type="button" value="Add Post">
            </div>
			   
    	</form>

		<form v-else>
            <div class="form-group col-sm-8"> 
				<label>Title</label>
                <input class="form-control" :placeholder="details.title" v-model="title" type="text">
            </div> 
            <div class="form-group  col-sm-8"> 
				<label>Content</label>
                <textarea class="form-control" v-model="content" :placeholder="details.content" rows="8" cols="50"></textarea>
            </div>
            <div class="form-group  col-sm-8"> 
				<label>Image Url</label>
                <input class="form-control" :placeholder="details.image" v-model="image" type="text">
            </div> 
			<div class="form-group col-sm-8"> 
                <input v-on:click="addPost" class="form-control btn btn-warning" type="button" value="Add Post">
            </div>
			<div class="form-group col-sm-8"> 
                <input v-on:click="editPost" class="form-control btn btn-info" type="button" value="Edit Post">
            </div>
			<div class="form-group col-sm-8"> 
                <input v-on:click="removePost" class="form-control btn btn-danger" type="button" value="Remove Post">
            </div>     
    	</form>
    </div> 
  </div>
    
</template>

<script>
import swal from "sweetalert";
import axios from "axios";
export default {
	props: ["details", "userId"],
	data() {
		return {
			title: "",
			content: "",
			image: "",
			id: "",
			heading: "Add Post"
		};
	},

	created() {
		if (this.details._id !== undefined) {
			this.getPost();
		}
	},

	methods: {
		editPost() {
			if (this.details._id !== undefined) {
				axios({
					method: "PUT",
					url: `/articles/${this.details._id}`,
					headers: {
						token: localStorage.getItem("token")
					}
				})
					.then(data => {
						this.title = data.data.data.title;
						this.image = data.data.data.image;
						this.content = data.data.data.content;
						window.location.href = "/posts";
					})
					.catch(err => {
						console.log(err);
					});
			}
		},
		addPost() {
			let token = localStorage.getItem("token");

			axios({
				method: "POST",
				url: "/articles",
				data: {
					title: this.title,
					content: this.content,
					image: this.image
				},
				headers: {
					token: token
				}
			})
				.then(data => {
					let message = data.data.message;
					swal("Yihaaa!!", message, "success");
					window.location.href = "/posts/";
				})
				.catch(err => {
					swal("Oooppss!!", "something is wrong", "error");
				});
		},
		removePost() {
			if (this.details._id !== undefined) {
				axios({
					method: "DELETE",
					url: `/articles/${this.details._id}`,
					headers: {
						token: localStorage.getItem("token")
					}
				})
					.then(data => {
						console.log("removePost", data);
						let message = data.data.message;
						swal("Yihaaa!!", message, "success");
						window.location.href = "/posts/";
					})
					.catch(err => {
						console.log(err);
					});
			}
		},
		getPost() {
			if (this.details._id !== undefined) {
				this.heading = "Edit Post";
			}
		}
	}
};
</script>

<style scoped>

</style>
