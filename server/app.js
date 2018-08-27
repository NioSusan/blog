const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const createError = require("http-errors");
require("dotenv").config();

const indexRouter = require("./routes/index.js");
const usersRouter = require("./routes/users.js");
const articlesRouter = require("./routes/article");

if(!process.env.NODE_ENV){
    process.env.NODE_ENV = 'development'
}

const DB_URL = {
	development: process.env.DEV_DB,
	test: process.env.TEST_DB
};

mongoose.connect(DB_URL[process.env.NODE_ENV], { useNewUrlParser: true })

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function() {
	console.log("connection to mongoose success");
});

app.use(cors());
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));

app.use("/", indexRouter);
app.use("/", usersRouter);
app.use("/", articlesRouter);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get("env") === "development" ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.send("error");
});

module.exports = app;
