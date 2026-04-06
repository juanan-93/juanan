import React from "react";
import "@css/pages/landing.css";

export default function Landing() {
  return (
    <div className="google-container">
      <header className="google-header">
        <nav className="google-nav">
          <a href="#" className="nav-link">Gmail</a>
          <a href="#" className="nav-link">Imágenes</a>
          <button className="nav-profile">⋮</button>
        </nav>
      </header>
      <div className="google-search-form">
        <div className="google-logo-container">
          <img src="/img/logo.png" alt="Logo" className="google-logo" />
        </div>
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Quien es Juanan?"
            className="search-input"
          />
          <span className="close-icon">✕</span>
        </div>

        <div className="search-buttons">
          <button className="btn btn-search">Buscar con Juanan</button>
          <button className="btn btn-lucky">Me siento afortunado</button>
        </div>
      </div>
    </div>
  );
}