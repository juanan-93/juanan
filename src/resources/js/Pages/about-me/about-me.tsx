// about-me.tsx
import React from "react";
import "@css/pages/about-me.css";

export default function AboutMe() {
  return (
    <>
      {/* Header estilo Wikipedia */}
      <header className="wiki-header">
        <div className="wiki-header-container">
          <a href="/" className="wiki-logo">
            <img src="/img/logoAboutMe.png" alt="Logo" />
          </a>
          <div className="wiki-header-right">
            <nav className="wiki-nav">
              <a href="/">Inicio</a>
              <a href="/search">Buscar</a>
              <a href="/about-me" className="active">Sobre mí</a>
            </nav>
          </div>
        </div>
      </header>

      <div className="wiki-container">
        {/* Título principal */}
        <h1 className="wiki-title">Tu Nombre Completo</h1>

        {/* Infobox (ficha lateral derecha estilo Wikipedia) */}
        <table className="wiki-infobox">
          <tbody>
            <tr>
              <th colSpan={2} className="infobox-title">
                Tu Nombre Completo
              </th>
            </tr>
            <tr>
              <td colSpan={2} className="infobox-image">
                <img src="/img/tu-foto.jpg" alt="Tu foto" />
                <div className="infobox-caption">Fotografía de [año]</div>
              </td>
            </tr>
            <tr>
              <th>Información personal</th>
              <td></td>
            </tr>
            <tr>
              <th>Nacimiento</th>
              <td>
                [Fecha de nacimiento]
                <br />
                <span className="wiki-location">Tu Ciudad, País</span>
              </td>
            </tr>
            <tr>
              <th>Nacionalidad</th>
              <td>Española</td>
            </tr>
            <tr>
              <th>Educación</th>
              <td>Tu universidad/institución</td>
            </tr>
            <tr>
              <th>Información profesional</th>
              <td></td>
            </tr>
            <tr>
              <th>Ocupación</th>
              <td>Desarrollador Full Stack</td>
            </tr>
            <tr>
              <th>Años activo</th>
              <td>2018-presente</td>
            </tr>
            <tr>
              <th>Empleador</th>
              <td>Tu empresa actual</td>
            </tr>
            <tr>
              <th>Sitio web</th>
              <td>
                <a href="https://tu-sitio.com" className="wiki-external">
                  tu-sitio.com
                </a>
              </td>
            </tr>
          </tbody>
        </table>

        {/* Contenido principal */}
        <div className="wiki-content">
          {/* ... resto del contenido igual ... */}
          <p>
            <strong>Tu Nombre Completo</strong> (Tu Ciudad, [fecha de nacimiento])
            es un <a href="#">desarrollador de software</a> español especializado
            en desarrollo web <a href="#">full stack</a>. Es conocido por su
            trabajo en [proyectos destacados] y su experiencia en tecnologías como{" "}
            <a href="#">React</a>, <a href="#">Laravel</a> y{" "}
            <a href="#">TypeScript</a>.
          </p>
          <p>
            A lo largo de su carrera ha trabajado en diversas empresas del sector
            tecnológico, contribuyendo al desarrollo de aplicaciones web y
            soluciones digitales innovadoras.
          </p>

          {/* Tabla de contenidos */}
          <div className="wiki-toc">
            <div className="toc-title">Índice</div>
            <ul>
              <li>
                <a href="#biografia">1 Biografía</a>
              </li>
              <li>
                <a href="#trayectoria">2 Trayectoria profesional</a>
                <ul>
                  <li>
                    <a href="#inicios">2.1 Inicios</a>
                  </li>
                  <li>
                    <a href="#actualidad">2.2 Actualidad</a>
                  </li>
                </ul>
              </li>
              <li>
                <a href="#habilidades">3 Habilidades técnicas</a>
              </li>
              <li>
                <a href="#proyectos">4 Proyectos destacados</a>
              </li>
              <li>
                <a href="#educacion">5 Educación</a>
              </li>
              <li>
                <a href="#enlaces">6 Enlaces externos</a>
              </li>
            </ul>
          </div>

          {/* Secciones */}
          <h2 id="biografia" className="wiki-section-title">
            <span>Biografía</span>
          </h2>
          <p>
            Nacido en [tu ciudad], mostró interés por la tecnología desde temprana
            edad. Durante su juventud comenzó a experimentar con la programación,
            lo que eventualmente lo llevó a dedicarse profesionalmente al
            desarrollo de software.
          </p>

          <h2 id="trayectoria" className="wiki-section-title">
            <span>Trayectoria profesional</span>
          </h2>

          <h3 id="inicios" className="wiki-subsection-title">
            Inicios
          </h3>
          <p>
            Comenzó su carrera profesional en [año] trabajando como [puesto] en
            [empresa]. Durante este período adquirió experiencia en [tecnologías].
          </p>

          <h3 id="actualidad" className="wiki-subsection-title">
            Actualidad
          </h3>
          <p>
            Actualmente trabaja como [puesto actual] en [empresa actual], donde se
            dedica a [descripción de responsabilidades].
          </p>

          <h2 id="habilidades" className="wiki-section-title">
            <span>Habilidades técnicas</span>
          </h2>
          <p>Su stack tecnológico incluye:</p>
          <ul>
            <li>
              <strong>Frontend:</strong> <a href="#">React</a>,{" "}
              <a href="#">TypeScript</a>, <a href="#">HTML5</a>,{" "}
              <a href="#">CSS3</a>, <a href="#">Tailwind CSS</a>
            </li>
            <li>
              <strong>Backend:</strong> <a href="#">Laravel</a>,{" "}
              <a href="#">PHP</a>, <a href="#">Node.js</a>
            </li>
            <li>
              <strong>Bases de datos:</strong> <a href="#">MySQL</a>,{" "}
              <a href="#">PostgreSQL</a>, <a href="#">MongoDB</a>
            </li>
            <li>
              <strong>DevOps:</strong> <a href="#">Docker</a>,{" "}
              <a href="#">Git</a>, <a href="#">CI/CD</a>
            </li>
          </ul>

          <h2 id="proyectos" className="wiki-section-title">
            <span>Proyectos destacados</span>
          </h2>
          <ul>
            <li>
              <strong>Proyecto 1</strong> — Descripción del proyecto y tecnologías
              utilizadas.
            </li>
            <li>
              <strong>Proyecto 2</strong> — Descripción del proyecto y tecnologías
              utilizadas.
            </li>
            <li>
              <strong>Proyecto 3</strong> — Descripción del proyecto y tecnologías
              utilizadas.
            </li>
          </ul>

          <h2 id="educacion" className="wiki-section-title">
            <span>Educación</span>
          </h2>
          <ul>
            <li>
              <strong>Grado en Ingeniería Informática</strong> — Universidad X
              (año-año)
            </li>
            <li>
              <strong>Certificación en AWS</strong> — Amazon Web Services (año)
            </li>
          </ul>

          <h2 id="enlaces" className="wiki-section-title">
            <span>Enlaces externos</span>
          </h2>
          <ul className="wiki-external-links">
            <li>
              <a href="https://github.com/tu-usuario" className="wiki-external">
                Perfil en GitHub
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com/in/tu-usuario"
                className="wiki-external"
              >
                Perfil en LinkedIn
              </a>
            </li>
            <li>
              <a href="https://tu-portfolio.com" className="wiki-external">
                Sitio web personal
              </a>
            </li>
          </ul>
        </div>

        {/* Categorías */}
        <div className="wiki-categories">
          <span>Categorías:</span>
          <a href="#">Desarrolladores de software de España</a>
          <span className="separator">|</span>
          <a href="#">Programadores de España</a>
          <span className="separator">|</span>
          <a href="#">Personas vivas</a>
        </div>
      </div>
    </>
  );
}