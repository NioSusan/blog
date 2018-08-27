// const chai = require("chai");
// const chaiHttp = require("chai-http");
// const expect = chai.expect;
// chai.use(chaiHttp);

// const base_url = "http://localhost:3000";
// const db_url = "mongodb://localhost/blog_test";
// const mongoose = require("mongoose");

// const User = require("../models/user");

// const bcrypt = require("bcryptjs");

// describe("User", () => {
// 	beforeEach(function(done) {
// 		mongoose.connect(
// 			db_url,
// 			function() {
//                 const name = "susan";
//                 const email = "susan.wen88@gmail.com";
//                 const password = "susan";
//                 const salt = bcrypt.genSaltSync(10);
//                 const hash = bcrypt.hashSync(password, salt);
// 				User.create(
// 					{
// 						name,
// 						email,
// 						password: hash,
// 					},
// 					(err, user) => {
// 						done();
// 					}
// 				);
// 			}
// 		);
// 	});

// 	afterEach(function(done) {
// 		mongoose.connect(
// 			db_url,
// 			function() {
// 				User.collection.drop();
// 				mongoose.disconnect();
// 				done();
// 			}
// 		);
// 	});

// 	it("POST /users (register) should return http status 201, a success message and the newly created user object when user is successfully registered", function(done) {
// 		this.timeout(10000);
// 		setTimeout(done, 5000);
// 		chai
// 			.request(base_url)
// 			.post("/users/signup")
// 			.type("form")
// 			.send({
// 				name: "susan",
// 				email: "susan.wen88@gmail.com",
// 				password: "susan"
// 			})
// 			.end((err, res) => {
// 				expect(err).to.be.null;
//                 expect(res).to.have.status(201);
// 				expect(res.body).to.ownProperty("message");
// 				expect(res.body.message)
// 					.to.equal("successfully registered")
// 					.to.be.a("string");
// 				expect(res.body).to.ownProperty("data");
// 				expect(res.body.data).to.be.a("object");
// 				expect(res.body.data).to.ownProperty("name");
// 				expect(res.body.data).to.ownProperty("name");
// 				expect(res.body.data).to.ownProperty("email");
// 				expect(res.body.data).to.ownProperty("password");
// 				expect(res.body.data).to.ownProperty("role");
// 				expect(res.body.data.name).to.be.a("string");
// 				expect(res.body.data.email).to.be.a("string");
// 				expect(res.body.data.role).to.be.a("string");
// 				expect(res.body.data.password).to.be.a("string");
// 				done();
// 			});
// 	});

// 	it("POST /users (login) should return http status 200, success is true and and auth token when user login successfully", done => {
		
// 		chai
// 			.request(base_url)
// 			.post("/users/signin")
// 			.type("form")
// 			.send({
// 				email: "susan.wen88@gmail.com",
// 				password: "susan"
// 			})
// 			.end((err, res) => {
// 				expect(err).to.be.null;
// 				expect(res).to.have.status(200);
// 				expect(res.body).to.ownProperty("message");
// 				expect(res.body.message).to.equal("successfully logged in");
//                 expect(res.body).to.ownProperty("token");
// 				expect(res.body.token).to.be.a("string");
// 				done();
// 			});
// 	});
// });
