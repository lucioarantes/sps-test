import React, { useState, useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError(null);

    try {
      const res = await axios.post(`${process.env.REACT_APP_SERVER_URL}/auth/login`, {
        email,
        password,
      });
      login(res.data.token);
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.error || "Erro ao fazer login");
    }
  }

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#4ad2fcff",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        padding: "20px",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "white",
          padding: "40px 30px",
          borderRadius: 8,
          boxShadow: "5px 5px 10px #252353",
          width: "320px",

        }}
      >
        <h2 style={{ marginBottom: 20, textAlign: "center", color: "#252353" }}>
          Login
        </h2>

        {error && (
          <p
            style={{
              color: "white",
              backgroundColor: "#e74c3c",
              padding: "10px",
              borderRadius: 4,
              marginBottom: 20,
              textAlign: "center",
              fontWeight: "600",
            }}
          >
            {error}
          </p>
        )}

        <label style={{ display: "block", marginBottom: 6, fontWeight: "600", color: "#252353" }}>
          Email:
        </label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: 20,
            borderRadius: 4,
            border: "2px solid #252353",
            fontSize: "1rem",
            boxSizing: "border-box",
          }}
          placeholder="Digite seu email"
        />

        <label style={{ display: "block", marginBottom: 6, fontWeight: "600", color: "#252353" }}>
          Senha:
        </label>
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          required
          style={{
            width: "100%",
            padding: "10px",
            marginBottom: 30,
            borderRadius: 4,
            border: "2px solid #252353",
            fontSize: "1rem",
            boxSizing: "border-box",
          }}
          placeholder="Digite sua senha"
        />

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: "#252353",
            border: "none",
            borderRadius: 6,
            color: "white",
            fontWeight: "700",
            fontSize: "1.1rem",
            cursor: "pointer",
            transition: "background-color 0.3s ease",
          }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = "#25235399")}
          onMouseLeave={(e) => (e.target.style.backgroundColor = "#252353")}
        >
          Entrar
        </button>
      </form>
    </div>
  );
}

export default SignIn;
