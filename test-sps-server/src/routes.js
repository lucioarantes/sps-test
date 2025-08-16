const express = require("express");
const jwt = require("jsonwebtoken");
const { readUsers, writeUsers } = require("./users");
const { authMiddleware, SECRET } = require("./auth");

const routes = express.Router();

routes.use(express.json());

// Login
routes.post("/auth/login", (req, res) => {
  const { email, password } = req.body;
  const users = readUsers();

  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(400).json({ error: "Usuário não encontrado" });
  }

  if (user.password !== password) {
    return res.status(400).json({ error: "Senha incorreta" });
  }

  const token = jwt.sign(
    { id: user.id, email: user.email, type: user.type },
    SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token: token });
});

// Criar usuário
routes.post("/users", authMiddleware, (req, res) => {
  const { email, name, type, password } = req.body;
  const users = readUsers();

  const emailExists = users.some(u => u.email === email);
  if (emailExists) {
    return res.status(400).json({ error: "E-mail já cadastrado" });
  }

  let id = 1;
  if (users.length > 0) {
    id = users[users.length - 1].id + 1;
  }

  users.push({ id, email, name, type, password });
  writeUsers(users);

  res.status(201).json({ message: "Usuário criado" });
});

// Listar usuários
routes.get("/users", authMiddleware, (req, res) => {
  const users = readUsers();
  res.json(users);
});

// Atualizar usuário
routes.put("/users/:id", authMiddleware, (req, res) => {
  const id = parseInt(req.params.id);
  const users = readUsers();

  const user = users.find(u => u.id === id);
  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  if (req.body.email) user.email = req.body.email;
  if (req.body.name) user.name = req.body.name;
  if (req.body.type) user.type = req.body.type;
  if (req.body.password) user.password = req.body.password;

  writeUsers(users);
  res.json({ message: "Usuário atualizado" });
});

// Deletar usuário
routes.delete("/users/:id", authMiddleware, (req, res) => {
  const id = parseInt(req.params.id);
  const users = readUsers();

  const index = users.findIndex(u => u.id === id);
  if (index === -1) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  users.splice(index, 1);
  writeUsers(users);

  res.json({ message: "Usuário excluído" });
});

module.exports = routes;
