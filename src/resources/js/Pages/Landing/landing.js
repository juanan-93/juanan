import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { router } from "@inertiajs/react";
import "@css/pages/landing.css";
export default function Landing() {
    const [query, setQuery] = useState("Quien es Juanan ?¿");
    const handleSearch = () => {
        router.get("/search", { q: query });
    };
    return (_jsxs("div", { className: "google-container", children: [_jsx("header", { className: "google-header", children: _jsxs("nav", { className: "google-nav", children: [_jsx("a", { href: "#", className: "nav-link", children: "Gmail" }), _jsx("a", { href: "#", className: "nav-link", children: "Im\u00E1genes" }), _jsx("button", { className: "nav-profile", children: "\u22EE" })] }) }), _jsxs("div", { className: "google-search-form", children: [_jsx("div", { className: "google-logo-container", children: _jsx("img", { src: "/img/logo.png", alt: "Logo", className: "google-logo" }) }), _jsxs("div", { className: "search-box", children: [_jsx("span", { className: "search-icon", children: "\uD83D\uDD0D" }), _jsx("input", { type: "text", value: query, onChange: (e) => setQuery(e.target.value), className: "search-input" }), _jsx("span", { className: "close-icon", onClick: () => setQuery(""), children: "\u2715" })] }), _jsxs("div", { className: "search-buttons", children: [_jsx("button", { className: "btn btn-search", onClick: handleSearch, children: "Buscar con Juanan" }), _jsx("button", { className: "btn btn-lucky", children: "Me siento afortunado" })] })] })] }));
}
