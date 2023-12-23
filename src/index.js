import express from "express";
const app = express();
import morgan from "morgan";
import cors from "cors";
import Contact from "./models/contact.js";
app.use(express.json());
app.use(cors());
app.use(express.static("dist"));

morgan.token("body", (req) => {
  return JSON.stringify(req.body);
});

app.use(morgan(":method :url :body"));

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>HELLO WORLD!</h1>");
});

app.get("/api/persons", (request, response) => {
  Contact.find({}).then((contacts) => {
    response.send(contacts);
  });
});

app.get("/api/info", (request, response) => {
  const total = persons.length;
  const date = Date().toLocaleString();
  response.send(`Phonebook has info for ${total} people <br /> ${date}`);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);
  response.status(204).end();
});

const generateNumber = () => {
  return Math.floor(Math.random() * 100000000000) + 4;
};

app.post("/api/persons", (request, response) => {
  const id = generateNumber();

  const body = request.body;

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

  const person = {
    id: id,
    name: body.name,
    number: body.number,
  };

  persons = persons.concat(person);

  response.json(person);
  console.log(persons);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
