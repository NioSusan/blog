<template>
  <div id="signup">
    <div class="signup-form">
      <form @submit.prevent="onSubmit">
        
        <div class="input">
            <label for="name">Name</label>
            <input
                  type="text"
                  id="name"
                  v-model="name" required>
        </div>
        <div class="input">
            <label for="email">Email</label>
            <input
                  type="email"
                  id="email"
                  v-model="email" required>
        </div>
        
        <div class="input">
          <label for="password">Password</label>
          <input
                  type="password"
                  id="password"
                  v-model="password" required>
        </div>
        
        <div>
          <button class="btn btn-primary" type="submit">Submit</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import swal from 'sweetalert';
import axios from 'axios'
export default {
	data() {
		return {
            name: "",
			email: "",
			password: "",
		};
	},
	methods: {
		onSubmit() {
			const formData = {
                name: this.name,
				email: this.email,
				password: this.password,
			};
			console.log(formData);
			axios({
				method:"POST",
				url:"/users/signup",
				data: formData
          		
			})
			.then(data=>{
				swal(`Welcome!!`, data.data.message, "success")
				window.location.href='/signin'
			})
			.catch(err=>{
            	swal("Oopps!", "The email has been used", "error");
        	})
		}
	}
};
</script>

<style scoped>
.signup-form {
	width: 400px;
	margin: 30px auto;
	border: 1px solid #eee;
	padding: 20px;
	box-shadow: 0 2px 3px #ccc;
}

.input {
	margin: 10px auto;
}

.input label {
	display: block;
	color: #4e4e4e;
	margin-bottom: 6px;
}

.input.inline label {
	display: inline;
}

.input input {
	font: inherit;
	width: 100%;
	padding: 6px 12px;
	box-sizing: border-box;
	border: 1px solid #ccc;
}

.input.inline input {
	width: auto;
}

.input input:focus {
	outline: none;
	border: 1px solid #521751;
	background-color: #eee;
}

.input select {
	border: 1px solid #ccc;
	font: inherit;
}

.hobbies button {
	border: 1px solid #521751;
	background: #521751;
	color: white;
	padding: 6px;
	font: inherit;
	cursor: pointer;
}

.hobbies button:hover,
.hobbies button:active {
	background-color: #8d4288;
}

.hobbies input {
	width: 90%;
}

.submit button {
	border: 1px solid #521751;
	color: #521751;
	padding: 10px 20px;
	font: inherit;
	cursor: pointer;
}

.submit button:hover,
.submit button:active {
	background-color: #521751;
	color: white;
}

.submit button[disabled],
.submit button[disabled]:hover,
.submit button[disabled]:active {
	border: 1px solid #ccc;
	background-color: transparent;
	color: #ccc;
	cursor: not-allowed;
}
</style>