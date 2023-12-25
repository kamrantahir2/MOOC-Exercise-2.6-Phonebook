import express, { response } from "express";
const app = express();
import morgan from "morgan";
import cors from "cors";
import Contact from "./models/contact.js";
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

const errorHandler = (error, request, response, next) => {
  console.log(error);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

app.use(errorHandler);

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(morgan(":method :url :body"));

let persons = [];
Contact.find({}).then((result) => (persons = result));

app.get("/", (request, response) => {
  response.send("<h1>HELLO WORLD!</h1>");
});

app.get("/api/persons", (request, response) => {
  Contact.find({}).then((contacts) => {
    response.send(contacts);
    persons = contacts;
  });
});

app.get("/api/info", (request, response) => {
  const total = persons.length;
  const date = Date().toLocaleString();
  response.send(`Phonebook has info for ${total} people <br /> ${date}`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  console.log("persons", persons);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).send({ error: "Cannot find by id" });
  }
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;

  const contact = {
    name: body.name,
    number: body.number,
  };

  Contact.findByIdAndUpdate(request.params.id, contact, { new: true })
    .then((updatedContact) => {
      response.json(updatedContact);
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response, next) => {
  // const id = Number(request.params.id);
  // persons = persons.filter((person) => person.id !== id);
  // response.status(204).end();
  Contact.findByIdAndDelete(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

const generateNumber = () => {
  return Math.floor(Math.random() * 100000000000) + 4;
};

app.post("/api/persons", (request, response) => {
  const body = request.body;

  Contact.find({}).then((contacts) => {
    persons = contacts;
  });

  let names = persons.map(({ name }) => name);

  const includes = names.includes(body.name);

  if (includes) {
    return response.status(400).json({
      error: "Contact already exists",
    });
  }

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Content missing",
    });
  }

  const person = new Contact({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
