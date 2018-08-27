const Article = require("../models/article");
const User = require("../models/user");

module.exports = {
	getAll: (req, res) => {
		Article.find()
			.populate('author')
			.then(data => {
				
				res.status(200).json({
					message: "success to see all articles",
					data
				});
			})
			
			.catch(err => {
				
				res.status(404).json({
					err
				});
			});
	},

	create: (req, res) => {
		const { id } = req.user;
		const { title, content, image } = req.body;
		
		Article.create({
			title,
			content,
			image,
			author: id
		})
			.then(data => {
			
				User.findOneAndUpdate({ _id: id }, { $push: { articles: data._id } })
					.then(success => {
						
						res.status(201).json({
							message: "success to post an article",
							data,
							success
						});
					})
					.catch(err => {
						
						res.status(500).json({
							err
						});
					});
			})
			.catch(err => {
			
				res.status(500).json({
					err
				});
			});
	},

	getOne: (req, res) => {
		
		Article.findById(req.params.id)
			.populate('author')
			.then(data => {
				
				res.status(200).json({
					data
				});
			})
			.catch(err => {
				
				res.status(404).json({
					err
				});
			});
	},

	edit: (req, res) => {
		const { id } = req.user;
		console.log("===1")
		console.log(id)
		Article.findOneAndUpdate({ _id: req.params.id }, {$set: req.body})
			.then(data => {
			
				User.findOneAndUpdate({
					_id: id
				}, req.body)
					.then(success => {
						
						res.status(200).json({
							message: "Article was updated",
							data,
							success
						});
					})
					.catch(err => {
						
						res.status(500).json(err);
					});
			})
			.catch(err => {
			
				res.status(404).json(err);
			});
	},

	remove: (req, res) => {
		const { id } = Article.remove({ _id: req.params.id })
			.then(() => {
				res.status(200).json({ message: "Article was deleted!" });
			})
			.catch(err => {
				res.status(404).json(err);
			});
	}
};
