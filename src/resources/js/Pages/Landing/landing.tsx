import React, { useState } from "react";
import { router } from "@inertiajs/react";
import "@css/pages/landing.css";

export default function Landing() {
  const [query, setQuery] = useState("Quien es Juanan ?¿");

  const handleSearch = () => {
    router.get("/search", { q: query });
  };

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
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="search-input"
          />
          <span className="close-icon" onClick={() => setQuery("")}>✕</span>
        </div>

        <div className="search-buttons">
          <button className="btn btn-search" onClick={handleSearch}>Buscar con Juanan</button>
          <button className="btn btn-lucky">Me siento afortunado</button>
        </div>
      </div>
    </div>
  );
}