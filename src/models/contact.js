import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then(console.log("Connection successful"))
  .catch((error) => console.log("Error connecting to MongoDB: ", error));

const contactSchema = {
  name: String,
  number: String,
};

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
