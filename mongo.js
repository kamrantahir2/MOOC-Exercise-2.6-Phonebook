import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const url = `mongodb+srv://kamrantahir117:${process.env.PASSWORD}@cluster0.qkxhsol.mongodb.net/PhonebookApp?retryWrites=true&w=majority`;

console.log("Connection started");

mongoose.set("strictQuery", false);
mongoose.connect(url);

const contactSchema = {
  name: String,
  number: String,
};

const Contact = mongoose.model("Contact", contactSchema);

// const contact = new Contact({
//   name: "Arto Hellas",
//   number: "040-123456",
// });

// contact.save().then((result) => {
//   console.log("Contact saved");
//   mongoose.connection.close();
// });

if (process.argv.length === 2) {
  Contact.find({}).then((result) => {
    console.log(result);
    mongoose.connection.close();
  });
} else if (process.argv.length === 4) {
  const contact = new Contact({
    name: process.argv[2],
    number: process.argv[3],
  });
  contact.save().then((result) => {
    console.log(result);
    mongoose.connection.close();
  });
}
