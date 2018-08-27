<template>
    <div>
        <div v-if="!details">
             <h1 >Oopss...NOT FOUND!</h1>
             <img  src="https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ab871c0ab223c15ee08a73f81d2d2770&auto=format&fit=crop&w=700&q=60">
        </div>
    
       <div v-else>
        <h1>Title : {{details.title}} </h1>
        <p>Post ID : {{$route.params.id }} </p>
        <p>Author : {{details.author.name }} </p>
        <p>Created at : {{details.createdAt }} </p>
        <img class='imgBlog' :src="details.image">
        <br> <br>
        <p>{{details.content}} </p>
       
       
        <!-- <router-link class="btn btn-primary" tag="button" :to="'/post/' + $route.params.id + '/edit'">Edit Post</router-link> -->
        <router-link v-if="details.author._id === userId" class="btn btn-primary" tag="button" :to="{name : 'postEdit'}">Edit Post</router-link>
        
			
        </div>
    </div>
</template>

<script>

export default {
    props:['details', 'userId', 'id'],
    data(){
        return{
            
        }
    }
    
   
}
</script>

<style scoped>
 .imgBlog{
  background-size: contain;
  background-position: center;
  max-height: 50%;
  max-width: 50%;
  }
</style>
