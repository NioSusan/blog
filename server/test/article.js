const chai = require("chai");
const chaiHttp = require("chai-http");
const expect = chai.expect;
chai.use(chaiHttp);

const base_url = "http://localhost:3000";
const db_url = "mongodb://localhost/blog_test";
const mongoose = require("mongoose");
const Article = require("../models/article");
const User = require("../models/user");

describe("Blog", () => {
	beforeEach(function(done) {
		var token = ''
		mongoose.connect(
			db_url,
			function() {
				Article.create(
					{
						title: "testing",
						content: "test",
						author: "5b7c1862fae43f103f966b89",
						image:
							"https://images.unsplash.com/photo-1534759846116-5799c33ce22a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=19c8355cd5aff72debf2f4720f4c7e09&auto=format&fit=crop&w=700&q=60"
					},
					(err, article) => {
						done();
						token = 'asdasd'
					}
				);
			}
		);
	});

	afterEach(function(done) {
		mongoose.connect(
			db_url,
			function() {
				Article.collection.drop();
				mongoose.disconnect();
				done();
			}
		);
	});

	it("GET /articles should return status 200 and list of articles when user is authenticated", done => {
		Article.insertMany([
			{
				title: "testing1",
				content: "test1",
				author: "5b7bf8e7a3a9cd6371d627a7",
				image:
					"https://images.unsplash.com/photo-1534759846116-5799c33ce22a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=19c8355cd5aff72debf2f4720f4c7e09&auto=format&fit=crop&w=700&q=60"
			},
			{
				title: "testing2",
				content: "test2",
				author: "5b7be5a19226f9530d441829",
				image:
					"https://images.unsplash.com/photo-1534759846116-5799c33ce22a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=19c8355cd5aff72debf2f4720f4c7e09&auto=format&fit=crop&w=700&q=60"
			},
			{
				title: "testing3",
				content: "test4",
				author: "5b7be5cff9444b5351cc2648",
				image:
					"https://images.unsplash.com/photo-1534759846116-5799c33ce22a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=19c8355cd5aff72debf2f4720f4c7e09&auto=format&fit=crop&w=700&q=60"
			}
		])
			.then(datas => {
				chai
					.request(base_url)
					.get("/articles")
					.end((err, res) => {
						expect(err).to.be.null;
						expect(res).to.have.status(200);
						expect(res.body).to.be.an("object"); //
						expect(res.body.data).to.be.an("Array");
						expect(res.body.data[0]).to.have.property("title");
						expect(res.body.data[0].title).to.equal("testing");
						expect(res.body).to.ownProperty("message");
						expect(res.body).to.ownProperty("data");
						expect(res.body.message).to.be.a("String");
						expect(res.body.message).to.eql("success to see all articles");

						done();
					});
			})
			.catch(err => {
				console.log(err);
			});
	});

	it("POST /articles should return status 201, success is true and the newly created article object when user is authenticated", function(done) {
		chai
			.request(base_url)
			.post("/articles")
			.type("form")
			.send({
				title: "testing1",
				content: "test",
				author: "5b7c1862fae43f103f966b89",
				image:
					"https://images.unsplash.com/photo-1534759846116-5799c33ce22a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=19c8355cd5aff72debf2f4720f4c7e09&auto=format&fit=crop&w=700&q=60"
			})
			.end((err, res) => {
				expect(err).to.be.null;

				expect(res).to.have.status(201);

				expect(res.body).to.be.an("Object");
				expect(res.body).to.have.property("title");
				expect(res.body.title).to.equal("testing");

				expect(res.body).to.ownProperty("message");
				expect(res.body).to.ownProperty("data");
				expect(res.body.message).to.be.an("String");
				expect(res.body.message).to.eql("success to post an article");
				expect(res.body.data).to.be.an("Object");

				done();
			});
	});

	// it("GET /articles/:id should return a single article by the given id", function(done) {
	// 	Article.findOne().then(article => {
	// 		let id = article._id;
	// 		chai
	// 			.request(base_url)
	// 			.get(`/articles/${id}`)
	// 			.end((err, res) => {
	// 				expect(res).to.have.status(200);
	// 				expect(res.body).to.be.an("Object");
	// 				expect(res.body).to.have.property("_id");
	// 				expect(res.body).to.have.property("title");
	// 				expect(res.body).to.have.property("content");
	// 				expect(res.body).to.have.property("author");
	// 				expect(res.body).to.have.property("image");
	// 				expect(res.body._id).to.equal("article._id");
	// 				expect(res.body.title).to.equal("Super");
	// 				expect(res.body.content).to.equal("man");
	// 				expect(res.body.author).to.equal("nio");
	// 				expect(res.body.image).to.equal(
	// 					"https://images.unsplash.com/photo-1534759846116-5799c33ce22a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=19c8355cd5aff72debf2f4720f4c7e09&auto=format&fit=crop&w=700&q=60"
	// 				);
	// 				done();
	// 			});
	// 	});
	// });

	// it("PUT /articles/:id should return status 200 the updated article object given the id", done => {
	// 	Article.findOne().then(article => {
	// 		let id = article._id;
	// 		chai
	// 			.request(base_url)
	// 			.put(`/articles/${id}`)
	// 			.send({
	// 				title: "Super",
	// 				content: "woman",
	// 				image:
	// 					"https://images.unsplash.com/photo-1534786342592-c739db9ba9b1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=49e85bd0ad4b6714d037cf2bfb0ced5d&auto=format&fit=crop&w=700&q=60"
	// 			})
	// 			.end((err, res) => {
	// 				expect(res).to.have.status(200);
	// 				expect(res.body).to.be.an("Object");
	// 				expect(res.body)
	// 					.to.have.property("message")
	// 					.to.eql("Article was updated!");
	// 				expect(res.body)
	// 					.to.have.property("content")
	// 					.to.eql("woman");

	// 				done();
	// 			});
	// 	});
	// });

	// it("DELETE /articles/:id should delete an article given the id", done => {
	// 	Article.findOne().then(article => {
	// 		let id = article._id;
	// 		chai
	// 			.request(base_url)
	// 			.delete(`/articles/${id}`)
	// 			.end((err, res) => {
	// 				expect(res).to.have.status(200);
	// 				expect(res.body).to.be.an("Object");
	// 				expect(res.body)
	// 					.to.have.property("message")
	// 					.to.eql("Article was deleted!");

	// 				done();
	// 			});
	// 	});
	// });
});
