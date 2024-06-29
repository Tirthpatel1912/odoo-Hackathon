const express = require('express');
const app = express();
const userRoutes = require('./routes/users');

const cookieParser = require("cookie-parser");

require('dotenv').config();
const PORT = process.env.PORT || 4000;

app.use(express.json());
app.use(cookieParser());

app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})

//connect to the database
require('./config/database').connect();

//routes
app.use("/api/v1/auth", userRoutes);

//def route
app.get("/", (req, res) => {
	return res.json({
		success:true,
		message:'Your server is up and running....'
	});
});


