const mongoose = require("mongoose");

async function connectDB() {
  mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected")
  })
  .catch((error) => {
    console.log("MongoDB gave an error", error);
  });
}

module.exports = {
    connectDB,
}