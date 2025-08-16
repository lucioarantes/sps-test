const jwt = require("jsonwebtoken");

const segredo = "seusegredoaqui";

function authMiddleware(req, res, next) {
  let token = null;
  
  if (req.headers && req.headers.authorization) {
    const partes = req.headers.authorization.split(" ");
    if (partes.length === 2) {
      token = partes[1];
    }
  }

  if (!token) {
    res.status(401).json({ error: "Token não fornecido" });
    return;
  }

  try {
    const dados = jwt.verify(token, segredo);
    req.user = dados;
    next();
  } catch (e) {
    console.log("Erro ao verificar token:", e);
    res.status(401).json({ error: "Token inválido" });
  }
}

module.exports = { authMiddleware, segredo };
