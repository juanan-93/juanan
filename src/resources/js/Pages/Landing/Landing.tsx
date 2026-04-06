import React from "react";

export default function Landing() {
  return (
    <div style={{ 
      minHeight: "100vh", 
      display: "flex", 
      alignItems: "center", 
      justifyContent: "center", 
      backgroundColor: "#f3f4f6",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <div style={{ 
        textAlign: "center", 
        padding: "2rem", 
        background: "white", 
        borderRadius: "12px", 
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
      }}>
        <h1 style={{ 
          fontSize: "3rem", 
          fontWeight: "bold", 
          color: "#1f2937",
          marginBottom: "1rem"
        }}>
          ¡Hola Mundo!
        </h1>
        <p style={{ 
          fontSize: "1.2rem", 
          color: "#6b7280",
          margin: 0
        }}>
          Mi primera landing con Laravel 13 + React + Inertia
        </p>
      </div>
    </div>
  );
}