import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { router } from "@inertiajs/react";
import "@css/components/SearchPage/SearchResult.css";
const SearchResult = ({ favicon, siteName, url, title, snippet, titleLink, date, }) => {
    // Maneja el clic en el título para navegar sin recargar la página
    const handleClick = (e) => {
        e.preventDefault();
        router.get(titleLink);
    };
    return (_jsxs("article", { className: "search-result", children: [_jsxs("div", { className: "search-result-url-row", children: [_jsx("div", { className: "search-result-favicon", children: favicon }), _jsxs("div", { className: "search-result-site-info", children: [_jsx("span", { className: "search-result-site-name", children: siteName }), _jsx("span", { className: "search-result-url", children: url })] })] }), _jsx("h3", { className: "search-result-title", children: _jsx("a", { href: titleLink, onClick: handleClick, children: title }) }), _jsxs("p", { className: "search-result-snippet", children: [date && _jsxs("span", { className: "search-result-date", children: [date, " \u2014 "] }), snippet] })] }));
};
export default SearchResult;
