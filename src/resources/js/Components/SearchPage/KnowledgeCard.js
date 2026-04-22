import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "@css/components/SearchPage/KnowledgeCard.css";
const KnowledgeCard = ({ title, subtitle, description, emoji, info, source, }) => {
    return (_jsxs("div", { className: "knowledge-card", children: [_jsx("div", { className: "knowledge-card-img", children: emoji }), _jsxs("div", { className: "knowledge-card-body", children: [_jsx("h2", { className: "knowledge-card-title", children: title }), _jsx("p", { className: "knowledge-card-subtitle", children: subtitle }), _jsx("p", { className: "knowledge-card-description", children: description }), _jsx("p", { className: "knowledge-card-source", children: _jsx("a", { href: source.url, children: source.text }) })] }), _jsx("div", { className: "knowledge-card-info", children: info.map((item, index) => (_jsxs("div", { className: "knowledge-card-row", children: [_jsx("span", { className: "knowledge-card-label", children: item.label }), _jsx("span", { className: "knowledge-card-value", children: item.value })] }, index))) })] }));
};
export default KnowledgeCard;
