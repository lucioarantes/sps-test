import React from "react";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#4ad2fcff",
        color:"#252353",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{fontSize: "2rem"}}>SPS REACT TEST</h1>
      <Link
        to="/signIn"
        style={{
          padding: "15px 30px",
          backgroundColor: "#252353",
          color: "white",
          fontWeight: "600",
          fontSize: "1.5rem",
          borderRadius: "8px",
          textDecoration: "none",
          boxShadow: "0 4px 6px #252353",
          transition: "background-color 0.3s ease",
          marginBottom: "15px",
        }}
        onMouseEnter={e => (e.target.style.backgroundColor = "#25235399")}
        onMouseLeave={e => (e.target.style.backgroundColor = "#252353")}
      > Login
      </Link>
      
      <Link
        to="/users"
        style={{
          padding: "15px 30px",
          backgroundColor: "#252353",
          color: "white",
          fontWeight: "600",
          fontSize: "1.5rem",
          borderRadius: "8px",
          textDecoration: "none",
          boxShadow: "0 4px 6px #252353",
          transition: "background-color 0.3s ease",
        }}
        onMouseEnter={e => (e.target.style.backgroundColor = "#25235399")}
        onMouseLeave={e => (e.target.style.backgroundColor = "#252353")}
      > Ver Usuários </Link>
    </div>
  );
}

export default Home;
