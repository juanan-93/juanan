import { jsxs as _jsxs, jsx as _jsx, Fragment as _Fragment } from "react/jsx-runtime";
import { useMemo, useState, useEffect } from "react";
import { Head } from "@inertiajs/react";
import "@css/pages/my-projects.css";
const PROJECTS = [
    {
        id: 1,
        title: "Plataforma de Reservas",
        client: "Cliente: cadena hotelera nacional",
        description: "Sistema de reservas multi-sede con panel de administracion, calendario en tiempo real y pagos integrados.",
        achievements: [
            "Reduccion del 38% en llamadas manuales de reservas",
            "Panel interno para recepcion y finanzas",
            "Automatizacion de confirmaciones por email",
        ],
        tech: ["Laravel", "React", "TypeScript", "MySQL"],
        status: "ONLINE",
        year: "2024",
        emoji: "🏨",
        color: "#00ffff",
        link: "#",
    },
    {
        id: 2,
        title: "Portal de RRHH",
        client: "Cliente: empresa industrial",
        description: "Portal para gestionar vacaciones, documentos y flujos de aprobacion con perfiles por rol.",
        achievements: [
            "Digitalizacion de 12 procesos internos",
            "Firma y trazabilidad de documentos",
            "Control de permisos por departamento",
        ],
        tech: ["PHP", "Laravel", "PostgreSQL", "Docker"],
        status: "MANTENIMIENTO",
        year: "2023",
        emoji: "🗂",
        color: "#ff00ff",
        link: "#",
    },
    {
        id: 3,
        title: "Dashboard de Analitica Comercial",
        client: "Cliente: ecommerce B2B",
        description: "Cuadros de mando para ventas, conversion y rendimiento de catalogo con exportacion de reportes.",
        achievements: [
            "Visibilidad diaria de KPIs para direccion",
            "Alertas automaticas de caidas de conversion",
            "Reportes PDF para reuniones semanales",
        ],
        tech: ["React", "Node.js", "Charts", "CI/CD"],
        status: "ONLINE",
        year: "2022",
        emoji: "📈",
        color: "#ffff00",
        link: "#",
    },
    {
        id: 4,
        title: "Migracion de Monolito a Servicios",
        client: "Cliente: startup SaaS",
        description: "Refactor de arquitectura para mejorar despliegues, observabilidad y tiempos de respuesta.",
        achievements: [
            "Bajada de latencia media en un 27%",
            "Despliegues mas seguros con pipelines",
            "Documentacion tecnica para onboarding",
        ],
        tech: ["Laravel", "Redis", "Queues", "AWS"],
        status: "ACTUALIZACION",
        year: "2021",
        emoji: "⚙️",
        color: "#00ff00",
        link: "#",
    },
];
const BADGES = [
    "FULLSTACK\nDEV",
    "LARAVEL\nPOWER",
    "REACT\nACTIVE",
    "DEPLOY\nREADY",
];
const NAV_ITEMS = [
    ["🏠", "INICIO", "/"],
    ["💼", "PROYECTOS", "/my-projects"],
    ["👤", "SOBRE MI", "/about-me"],
    ["🔎", "BUSCADOR", "/search"],
];
function Marquee({ children, speed = 20 }) {
    return (_jsx("div", { className: "retro-marquee-wrap", children: _jsxs("span", { className: "retro-marquee", style: { "--marquee-duration": `${speed}s` }, children: [children, " \u00A0|\u00A0 ", children] }) }));
}
function VisitCounter({ count }) {
    return (_jsx("div", { className: "retro-counter", "aria-label": `Contador de visitas ${count}`, children: String(count)
            .padStart(6, "0")
            .split("")
            .map((digit, i) => (_jsx("span", { className: "retro-counter-digit", children: digit }, `${digit}-${i}`))) }));
}
function Stars() {
    const stars = useMemo(() => Array.from({ length: 60 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 3,
    })), []);
    return (_jsx("div", { className: "retro-stars", "aria-hidden": "true", children: stars.map((star) => (_jsx("span", { className: "retro-star", style: {
                "--star-x": `${star.x}%`,
                "--star-y": `${star.y}%`,
                "--star-size": `${star.size}px`,
                "--star-delay": `${star.delay}s`,
            } }, star.id))) }));
}
function ProjectCard({ project }) {
    const statusClass = {
        ONLINE: "is-online",
        MANTENIMIENTO: "is-maintenance",
        ACTUALIZACION: "is-update",
    }[project.status];
    return (_jsxs("article", { className: "retro-project-card", style: { "--project-color": project.color }, children: [_jsxs("div", { className: "retro-project-titlebar", children: [_jsxs("span", { className: "retro-project-titlebar-text", children: [project.emoji, " ", project.title] }), _jsxs("div", { className: "retro-project-controls", "aria-hidden": "true", children: [_jsx("span", { children: "_" }), _jsx("span", { children: "\u25A1" }), _jsx("span", { children: "\u2715" })] })] }), _jsxs("div", { className: "retro-project-content", children: [_jsxs("div", { className: "retro-project-meta", children: [_jsx("span", { className: `retro-project-status-dot ${statusClass}` }), _jsxs("span", { className: `retro-project-status ${statusClass}`, children: ["[", project.status, "]"] }), _jsxs("span", { className: "retro-project-year", children: ["A\u00F1o: ", project.year] })] }), _jsx("p", { className: "retro-project-client", children: project.client }), _jsx("p", { className: "retro-project-description", children: project.description }), _jsx("ul", { className: "retro-project-achievements", children: project.achievements.map((achievement) => (_jsx("li", { children: achievement }, achievement))) }), _jsx("div", { className: "retro-project-tech", children: project.tech.map((tech) => (_jsx("span", { className: "retro-tech-pill", children: tech }, tech))) }), _jsxs("div", { className: "retro-project-footer", children: [_jsx("span", { className: "retro-project-label", children: "Case study tecnico" }), _jsx("a", { href: project.link, className: "retro-project-link", children: "[[ VER PROYECTO ]]" })] })] })] }));
}
export default function MyProjects() {
    const [visits, setVisits] = useState(42069);
    const [time, setTime] = useState(new Date());
    const [showAlert, setShowAlert] = useState(true);
    useEffect(() => {
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);
    useEffect(() => {
        setVisits((value) => value + Math.floor(Math.random() * 3));
    }, []);
    return (_jsxs(_Fragment, { children: [_jsx(Head, { title: "~*~ Mis Trabajos de Programacion ~*~" }), _jsxs("div", { className: "retro-page", children: [_jsx(Stars, {}), showAlert && (_jsx("div", { className: "retro-modal-overlay", children: _jsxs("div", { className: "retro-modal", children: [_jsx("div", { className: "retro-modal-titlebar", children: _jsx("span", { children: "\u26A0 Mensaje del Sistema" }) }), _jsxs("div", { className: "retro-modal-body", children: [_jsx("div", { className: "retro-modal-emoji", children: "\uD83D\uDCBE" }), _jsx("p", { className: "retro-modal-title", children: "Portfolio de trabajos reales" }), _jsxs("p", { className: "retro-modal-text", children: ["Aqui puedes ver proyectos desarrollados en mi trayectoria como programador.", _jsx("br", {}), "Formato noventero, experiencia profesional real."] }), _jsx("button", { className: "retro-btn", type: "button", onClick: () => setShowAlert(false), children: "ENTRAR" })] })] }) })), _jsx("div", { className: "retro-marquee-bar", children: _jsxs(Marquee, { speed: 20, children: ["PORTFOLIO PROFESIONAL | PROYECTOS ENTREGADOS | LARAVEL + REACT + TYPESCRIPT | VISITANTE #", visits.toLocaleString()] }) }), _jsxs("header", { className: "retro-header", children: [_jsxs("div", { className: "retro-header-icons", "aria-hidden": "true", children: [_jsx("span", { children: "\u2728" }), _jsx("span", { children: "\uD83C\uDF10" }), _jsx("span", { children: "\u2728" })] }), _jsx("h1", { className: "retro-main-title", children: "Mis Trabajos Como Programador" }), _jsx("p", { className: "retro-subtitle", children: "Implementaciones reales para negocio, producto y operaciones" }), _jsx("div", { className: "retro-header-divider" }), _jsxs("p", { className: "retro-webmaster-line", children: ["Webmaster: TU_NOMBRE_AQUI | Email: dev@portfolio.com | Hora local: ", time.toLocaleTimeString("es-ES")] })] }), _jsxs("div", { className: "retro-layout", children: [_jsxs("aside", { className: "retro-sidebar", children: [_jsxs("section", { className: "retro-sidebar-box retro-visit-box", children: [_jsx("p", { className: "retro-sidebar-title", children: "Visitas Totales" }), _jsx(VisitCounter, { count: visits })] }), _jsxs("section", { className: "retro-sidebar-box retro-nav-box", children: [_jsx("div", { className: "retro-box-titlebar", children: "\uD83D\uDCC1 NAVEGACION" }), NAV_ITEMS.map(([icon, label, href]) => (_jsxs("a", { href: href, className: "retro-nav-link", children: [icon, " ", label] }, label)))] }), _jsxs("section", { className: "retro-sidebar-box retro-badges-box", children: [_jsx("p", { className: "retro-badges-title", children: "mis badges" }), _jsx("div", { className: "retro-badges-grid", children: BADGES.map((badge) => (_jsx("span", { className: "retro-badge", children: badge }, badge))) })] }), _jsxs("section", { className: "retro-sidebar-box retro-construction-box", children: [_jsx("div", { className: "retro-construction-icon", "aria-hidden": "true", children: "\uD83D\uDEA7" }), _jsxs("p", { children: ["Seccion en mejora continua", _jsx("br", {}), "Nuevos trabajos pronto"] })] })] }), _jsxs("main", { className: "retro-content", children: [_jsxs("div", { className: "retro-content-head", children: [_jsx("h2", { children: "PROYECTOS ENTREGADOS" }), _jsx("p", { children: "Historico de soluciones construidas para clientes y equipos" })] }), _jsxs("p", { className: "retro-intro-copy", children: ["Esta seccion resume proyectos en los que he participado durante mi trayectoria. Incluye contexto de negocio, aportaciones tecnicas y resultados obtenidos.", _jsx("br", {}), _jsx("span", { children: "Todo con estilo old school, pero con impacto real." })] }), _jsx("div", { className: "retro-project-list", children: PROJECTS.map((project) => (_jsx(ProjectCard, { project: project }, project.id))) }), _jsx("div", { className: "retro-rainbow-separator" }), _jsxs("section", { className: "retro-cta-box", children: [_jsx("p", { className: "retro-cta-title", children: "\u00BFQuieres ver mas detalles tecnicos?" }), _jsx("p", { className: "retro-cta-copy", children: "Puedo compartir arquitectura, retos y decisiones de cada trabajo." }), _jsx("button", { className: "retro-btn", type: "button", children: "SOLICITAR INFO" })] })] })] }), _jsxs("footer", { className: "retro-footer", children: [_jsx("div", { className: "retro-footer-divider" }), _jsx("p", { children: "\u00A9 2026 TU_NOMBRE_AQUI - Portafolio de Proyectos" }), _jsx("p", { children: "Construido con Laravel + Inertia + React + TypeScript" }), _jsx("p", { className: "retro-footer-highlight", children: "Gracias por visitar este archivo historico de trabajos" })] })] })] }));
}
