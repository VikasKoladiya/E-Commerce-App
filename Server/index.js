require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const cros = require("cors");
const { connectDB } = require("./config/db");

const router = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();

app.use(cros({
    origin : process.env.FRONTEND_URL,
    credentials : true
}));
app.use(express.json());
app.use(cookieParser());

app.use("/api",router);

app.listen(PORT, () => {
  console.log(`Serve Run at port ${PORT}`);
});
