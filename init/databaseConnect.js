const mongoose = require("mongoose");

module.exports = async function () {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://Softec_App_Dev:zaid1234@cluster0.wpctj.mongodb.net/softec_app_dev?retryWrites=true&w=majority"
      , {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
      });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};
