import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = process.env.MONGODB_URI;

mongoose.set("strictQuery", false);
mongoose
  .connect(url)
  .then(console.log("Connection successful"))
  .catch((error) => console.log("Error connecting to MongoDB: ", error));

const contactSchema = new mongoose.Schema({
  name: String,
  number: String,
});

contactSchema.set("toJson", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject.id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Contact = mongoose.model("Contact", contactSchema);

export default Contact;
