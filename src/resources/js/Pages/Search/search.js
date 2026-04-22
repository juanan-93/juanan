import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { router } from "@inertiajs/react";
import "@css/pages/search.css";
import SearchResult from "@js/Components/SearchPage/SearchResult";
import KnowledgeCard from "@js/Components/SearchPage/KnowledgeCard";
const Search = () => {
    const handleSearch = (searchInput) => {
        const queryValue = searchInput.value;
        if (queryValue) {
            router.get("/search", { q: queryValue });
        }
    };
    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSearch(e.currentTarget);
        }
    };
    return (_jsxs("div", { className: "search-results-page", children: [_jsxs("header", { className: "search-header", children: [_jsx("img", { src: "/img/logo.png", alt: "Logo", className: "search-header-logo", onClick: () => router.get("/") }), _jsxs("div", { className: "search-header-bar", children: [_jsx("input", { type: "text", className: "search-header-input", placeholder: "Buscar...", onKeyDown: handleKeyDown }), _jsx("span", { className: "search-header-divider" }), _jsx("span", { className: "search-header-icon", onClick: (e) => {
                                    const input = e.currentTarget.parentElement?.querySelector('input');
                                    if (input)
                                        handleSearch(input);
                                }, children: "\uD83D\uDD0D" })] }), _jsxs("div", { className: "search-header-actions", children: [_jsx("button", { className: "search-header-settings", children: "\u22EE" }), _jsx("div", { className: "search-header-avatar", children: "J" })] })] }), _jsxs("nav", { className: "search-tabs", children: [_jsxs("button", { className: "search-tab active", children: [_jsx("span", { className: "search-tab-icon", children: "\uD83D\uDD0D" }), " Todos"] }), _jsxs("button", { className: "search-tab", children: [_jsx("span", { className: "search-tab-icon", children: "\uD83D\uDDBC\uFE0F" }), " Im\u00E1genes"] }), _jsxs("button", { className: "search-tab", children: [_jsx("span", { className: "search-tab-icon", children: "\u25B6\uFE0F" }), " V\u00EDdeos"] }), _jsxs("button", { className: "search-tab", children: [_jsx("span", { className: "search-tab-icon", children: "\uD83D\uDCF0" }), " Noticias"] }), _jsxs("button", { className: "search-tab", children: [_jsx("span", { className: "search-tab-icon", children: "\uD83D\uDCCD" }), " Maps"] }), _jsxs("button", { className: "search-tab", children: [_jsx("span", { className: "search-tab-icon", children: "\u22EF" }), " M\u00E1s"] })] }), _jsxs("div", { className: "search-body", children: [_jsxs("main", { className: "search-results-col", children: [_jsx("p", { className: "search-results-stats", children: "Aproximadamente 1.250.000 resultados (0,42 segundos)" }), _jsx(SearchResult, { favicon: "J", siteName: "Juanan Dev", url: "https://juanan.dev \u203A sobre-mi", title: "Juanan \u2013 Desarrollador Full Stack", snippet: "Juanan es un desarrollador full stack especializado en Laravel, React y TypeScript. Con experiencia en proyectos web modernos y arquitecturas escalables...", titleLink: "/about-me" }), _jsx(SearchResult, { favicon: "MP", siteName: "My Projects", url: "https://juanan.dev \u203A my-projects", title: "Mis Proyectos \u2013 Juanan Dev", snippet: "Explora los proyectos desarrollados por Juanan, incluyendo aplicaciones web, herramientas open source y contribuciones a la comunidad de desarrollo.", titleLink: "/my-projects" }), _jsx(SearchResult, { favicon: "In", siteName: "LinkedIn", url: "https://linkedin.com \u203A in \u203A juanan", title: "Juanan \u2013 Full Stack Developer | LinkedIn", snippet: "Repositorios p\u00FAblicos de Juanan. Proyectos open source, contribuciones y colaboraciones en el ecosistema de desarrollo web...", titleLink: "#" }), _jsx(SearchResult, { favicon: "In", siteName: "LinkedIn", url: "https://linkedin.com \u203A in \u203A juanan", title: "Juanan \u2013 Full Stack Developer | LinkedIn", snippet: "Perfil profesional de Juanan. Experiencia en desarrollo web, tecnolog\u00EDas cloud y metodolog\u00EDas \u00E1giles. Conecta conmigo para saber m\u00E1s...", titleLink: "#", date: "15 mar 2026" }), _jsx(SearchResult, { favicon: "G", siteName: "GAME", url: "https://juanan.dev \u203A Game", title: "\u00BFTe aburre mi perfil? \u2013 Si te aburre mi perfil puedes echar una partida", snippet: "Entra y entretente echando unas parttas a este juego, el juego te sonara de algo solo tienes que hacer click en el enlace y disfrutar de la experiencia.", titleLink: "/game" })] }), _jsx("aside", { className: "search-knowledge-panel", children: _jsx(KnowledgeCard, { title: "Juanan", subtitle: "Desarrollador Full Stack", description: "Desarrollador web especializado en crear experiencias digitales modernas con Laravel, React, TypeScript y tecnolog\u00EDas cloud. Apasionado por el c\u00F3digo limpio y la arquitectura de software.", emoji: "\uD83D\uDC68\u200D\uD83D\uDCBB", source: {
                                text: "juanan.dev",
                                url: "#",
                            }, info: [
                                { label: "Stack", value: "Laravel, React, TypeScript" },
                                { label: "Ubicación", value: "España" },
                                { label: "GitHub", value: "github.com/juanan" },
                            ] }) })] }), _jsxs("footer", { className: "search-footer", children: [_jsx("div", { className: "search-footer-location", children: "Espa\u00F1a" }), _jsxs("div", { className: "search-footer-links", children: [_jsx("a", { href: "#", className: "search-footer-link", children: "Ayuda" }), _jsx("a", { href: "#", className: "search-footer-link", children: "Privacidad" }), _jsx("a", { href: "#", className: "search-footer-link", children: "Condiciones" })] })] })] }));
};
export default Search;
