import React from "react";
import { router } from "@inertiajs/react";
import "@css/pages/search.css";
import SearchResult from "@js/Components/SearchPage/SearchResult";  
import KnowledgeCard from "@js/Components/SearchPage/KnowledgeCard"; 

const Search = () => {

  const handleSearch = (searchInput: HTMLInputElement) => {
    const queryValue = searchInput.value;
    if (queryValue) {
      router.get("/search", { q: queryValue });
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(e.currentTarget);
    }
  };

  return (
    <div className="search-results-page">
      {/* ── Header ── */}
        <header className="search-header">
            <img
            src="/img/logo.png"
            alt="Logo"
            className="search-header-logo"
            onClick={() => router.get("/")}
            />

            <div className="search-header-bar">
            <input
                type="text"
                className="search-header-input"
                placeholder="Buscar..."
                onKeyDown={handleKeyDown}
            />
            <span className="search-header-divider" />
            <span className="search-header-icon" onClick={(e) => {
              const input = (e.currentTarget.parentElement?.querySelector('input') as HTMLInputElement);
              if (input) handleSearch(input);
            }}>
                🔍
            </span>
            </div>

            <div className="search-header-actions">
            <button className="search-header-settings">⋮</button>
            <div className="search-header-avatar">J</div>
            </div>
        </header>

      {/* ── Tabs ── */}
        <nav className="search-tabs">
            <button className="search-tab active">
            <span className="search-tab-icon">🔍</span> Todos
            </button>
            <button className="search-tab">
            <span className="search-tab-icon">🖼️</span> Imágenes
            </button>
            <button className="search-tab">
            <span className="search-tab-icon">▶️</span> Vídeos
            </button>
            <button className="search-tab">
            <span className="search-tab-icon">📰</span> Noticias
            </button>
            <button className="search-tab">
            <span className="search-tab-icon">📍</span> Maps
            </button>
            <button className="search-tab">
            <span className="search-tab-icon">⋯</span> Más
            </button>
        </nav>

      {/* ── Body ── */}
      <div className="search-body">
        {/* Columna de resultados */}
      <main className="search-results-col">
        <p className="search-results-stats">
          Aproximadamente 1.250.000 resultados (0,42 segundos)
        </p>

        {/* Resultado 1 */}
        <SearchResult
          favicon="J"
          siteName="Juanan Dev"
          url="https://juanan.dev › sobre-mi"
          title="Juanan – Desarrollador Full Stack"
          snippet="Juanan es un desarrollador full stack especializado en Laravel, React y TypeScript. Con experiencia en proyectos web modernos y arquitecturas escalables..."
          titleLink="#"
        />

        {/* Resultado 2 */}
        <SearchResult
          favicon="GH"
          siteName="GitHub"
          url="https://github.com › juanan"
          title="juanan (Juanan) · GitHub"
          snippet="Repositorios públicos de Juanan. Proyectos open source, contribuciones y colaboraciones en el ecosistema de desarrollo web..."
          titleLink="#"
        />

        {/* Resultado 3 */}
        <SearchResult
          favicon="In"
          siteName="LinkedIn"
          url="https://linkedin.com › in › juanan"
          title="Juanan – Full Stack Developer | LinkedIn"
          snippet="Perfil profesional de Juanan. Experiencia en desarrollo web, tecnologías cloud y metodologías ágiles. Conecta conmigo para saber más..."
          titleLink="#"
          date="15 mar 2026"
        />

        {/* People Also Ask */}
        <div className="people-also-ask">
          {/* ... código igual que antes ... */}
        </div>

        {/* Resultado 4 */}
        <SearchResult
          favicon="📝"
          siteName="Blog de Juanan"
          url="https://juanan.dev › blog"
          title="Blog – Artículos sobre desarrollo web"
          snippet="Artículos y tutoriales sobre Laravel, React, DevOps y buenas prácticas de desarrollo. Publicaciones recientes sobre arquitectura de software..."
          titleLink="#"
        />

        {/* Resultado 5 */}
        <SearchResult
          favicon="🐦"
          siteName="X (Twitter)"
          url="https://x.com › juanan_dev"
          title="Juanan (@juanan_dev) / X"
          snippet="Compartiendo conocimiento sobre desarrollo web, tips de productividad y novedades del mundo tech. Sígueme para estar al día..."
          titleLink="#"
        />
      </main>

        {/* ── Knowledge Panel ── */}
        <aside className="search-knowledge-panel">
          <KnowledgeCard
            title="Juanan"
            subtitle="Desarrollador Full Stack"
            description="Desarrollador web especializado en crear experiencias digitales modernas con Laravel, React, TypeScript y tecnologías cloud. Apasionado por el código limpio y la arquitectura de software."
            emoji="👨‍💻"
            source={{
              text: "juanan.dev",
              url: "#",
            }}
            info={[
              { label: "Stack", value: "Laravel, React, TypeScript" },
              { label: "Ubicación", value: "España" },
              { label: "GitHub", value: "github.com/juanan" },
            ]}
          />
        </aside>
      </div>

      {/* ── Footer ── */}
      <footer className="search-footer">
        <div className="search-footer-location">España</div>
        <div className="search-footer-links">
          <a href="#" className="search-footer-link">Ayuda</a>
          <a href="#" className="search-footer-link">Privacidad</a>
          <a href="#" className="search-footer-link">Condiciones</a>
        </div>
      </footer>
    </div>
  );
};

export default Search;