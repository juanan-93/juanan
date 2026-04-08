import React, { useState } from "react";
import { router, usePage } from "@inertiajs/react";
import "@css/pages/search.css";

const Search: React.FC = () => {
  const { q } = (usePage().props as { q?: string });
  const [query, setQuery] = useState(q || "");

  const handleSearch = () => {
    router.get("/search", { q: query });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
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
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            {query && (
                <span
                className="search-header-clear"
                onClick={() => setQuery("")}
                >
                ✕
                </span>
            )}
            <span className="search-header-divider" />
            <span className="search-header-icon" onClick={handleSearch}>
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
          <article className="search-result">
            <div className="search-result-url-row">
              <div className="search-result-favicon">J</div>
              <div className="search-result-site-info">
                <span className="search-result-site-name">Juanan Dev</span>
                <span className="search-result-url">
                  https://juanan.dev › sobre-mi
                </span>
              </div>
            </div>
            <h3 className="search-result-title">
              <a href="#">Juanan – Desarrollador Full Stack</a>
            </h3>
            <p className="search-result-snippet">
              <b>Juanan</b> es un desarrollador full stack especializado en
              Laravel, React y TypeScript. Con experiencia en proyectos web
              modernos y arquitecturas escalables...
            </p>
          </article>

          {/* Resultado 2 */}
          <article className="search-result">
            <div className="search-result-url-row">
              <div className="search-result-favicon">GH</div>
              <div className="search-result-site-info">
                <span className="search-result-site-name">GitHub</span>
                <span className="search-result-url">
                  https://github.com › juanan
                </span>
              </div>
            </div>
            <h3 className="search-result-title">
              <a href="#">juanan (Juanan) · GitHub</a>
            </h3>
            <p className="search-result-snippet">
              Repositorios públicos de <b>Juanan</b>. Proyectos open source,
              contribuciones y colaboraciones en el ecosistema de desarrollo
              web...
            </p>
          </article>

          {/* Resultado 3 */}
          <article className="search-result">
            <div className="search-result-url-row">
              <div className="search-result-favicon">In</div>
              <div className="search-result-site-info">
                <span className="search-result-site-name">LinkedIn</span>
                <span className="search-result-url">
                  https://linkedin.com › in › juanan
                </span>
              </div>
            </div>
            <h3 className="search-result-title">
              <a href="#">Juanan – Full Stack Developer | LinkedIn</a>
            </h3>
            <p className="search-result-snippet">
              <span className="search-result-date">15 mar 2026 — </span>
              Perfil profesional de <b>Juanan</b>. Experiencia en desarrollo
              web, tecnologías cloud y metodologías ágiles. Conecta conmigo
              para saber más...
            </p>
          </article>

          {/* People Also Ask */}
          <div className="people-also-ask">
            <h3 className="people-also-ask-title">
              Otras preguntas de los usuarios
            </h3>
            <div className="paa-item">
              <span>¿Quién es Juanan desarrollador?</span>
              <span className="paa-arrow">▼</span>
            </div>
            <div className="paa-item">
              <span>¿Qué tecnologías usa Juanan?</span>
              <span className="paa-arrow">▼</span>
            </div>
            <div className="paa-item">
              <span>¿Dónde puedo ver los proyectos de Juanan?</span>
              <span className="paa-arrow">▼</span>
            </div>
            <div className="paa-item">
              <span>¿Cómo contactar con Juanan?</span>
              <span className="paa-arrow">▼</span>
            </div>
          </div>

          {/* Resultado 4 */}
          <article className="search-result">
            <div className="search-result-url-row">
              <div className="search-result-favicon">📝</div>
              <div className="search-result-site-info">
                <span className="search-result-site-name">Blog de Juanan</span>
                <span className="search-result-url">
                  https://juanan.dev › blog
                </span>
              </div>
            </div>
            <h3 className="search-result-title">
              <a href="#">Blog – Artículos sobre desarrollo web</a>
            </h3>
            <p className="search-result-snippet">
              Artículos y tutoriales sobre <b>Laravel</b>, <b>React</b>,
              DevOps y buenas prácticas de desarrollo. Publicaciones recientes
              sobre arquitectura de software...
            </p>
          </article>

          {/* Resultado 5 */}
          <article className="search-result">
            <div className="search-result-url-row">
              <div className="search-result-favicon">🐦</div>
              <div className="search-result-site-info">
                <span className="search-result-site-name">X (Twitter)</span>
                <span className="search-result-url">
                  https://x.com › juanan_dev
                </span>
              </div>
            </div>
            <h3 className="search-result-title">
              <a href="#">Juanan (@juanan_dev) / X</a>
            </h3>
            <p className="search-result-snippet">
              Compartiendo conocimiento sobre desarrollo web, tips de
              productividad y novedades del mundo tech. Sígueme para estar al
              día...
            </p>
          </article>
        </main>

        {/* ── Knowledge Panel ── */}
        <aside className="search-knowledge-panel">
          <div className="knowledge-card">
            <div className="knowledge-card-img">👨‍💻</div>
            <div className="knowledge-card-body">
              <h2 className="knowledge-card-title">Juanan</h2>
              <p className="knowledge-card-subtitle">
                Desarrollador Full Stack
              </p>
              <p className="knowledge-card-description">
                Desarrollador web especializado en crear experiencias digitales
                modernas con Laravel, React, TypeScript y tecnologías cloud.
                Apasionado por el código limpio y la arquitectura de software.
              </p>
              <p className="knowledge-card-source">
                <a href="#">juanan.dev</a>
              </p>
            </div>
            <div className="knowledge-card-info">
              <div className="knowledge-card-row">
                <span className="knowledge-card-label">Stack</span>
                <span className="knowledge-card-value">
                  Laravel, React, TypeScript
                </span>
              </div>
              <div className="knowledge-card-row">
                <span className="knowledge-card-label">Ubicación</span>
                <span className="knowledge-card-value">España</span>
              </div>
              <div className="knowledge-card-row">
                <span className="knowledge-card-label">GitHub</span>
                <span className="knowledge-card-value">github.com/juanan</span>
              </div>
            </div>
          </div>
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