<template>
  <div class="new-post">
    <div class="container">
      <form class="form-group">
        <label>Title : </label>
        <input type="text" v-model="title">
     </form>
      <new-content @newContent="getNewContent($event)"></new-content>
    
      <hr>
      <a-post>
        <h1 slot="title">{{ title }} </h1>
        <div slot="content">
          {{ content }}
        </div>
      </a-post>
    </div>
  </div>
</template>

<script>
import Content from "@/components/Content.vue";
import Post from "../views/Post.vue";
export default {
	name: "new-post",
	components: {
    "new-content": Content,
    "a-post" : Post,
	},
	data() {
		return {
      title: "",
      content: ""
		};
  },
  methods:{
    getNewContent(content){
      this.content = content;
      console.log('title from NewPost.vue:',this.title)
      console.log('content from NewPost.vue:',this.content)
    }
  }
};
</script>

