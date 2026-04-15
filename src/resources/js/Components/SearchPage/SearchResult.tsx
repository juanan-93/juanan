import React from "react";
import { router } from "@inertiajs/react";
import "@css/components/SearchPage/SearchResult.css";

interface SearchResultProps {
  favicon: string;
  siteName: string;
  url: string;
  title: string;
  snippet: string;
  titleLink: string;
  date?: string;
}

const SearchResult: React.FC<SearchResultProps> = ({
  favicon,
  siteName,
  url,
  title,
  snippet,
  titleLink,
  date,
}) => {
  // Maneja el clic en el título para navegar sin recargar la página
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    router.get(titleLink);
  };

  return (
    <article className="search-result">
      {/* URL Row - Favicon, site name, URL */}
      <div className="search-result-url-row">
        <div className="search-result-favicon">{favicon}</div>
        <div className="search-result-site-info">
          <span className="search-result-site-name">{siteName}</span>
          <span className="search-result-url">{url}</span>
        </div>
      </div>

      {/* Title */}
      <h3 className="search-result-title">
        <a href={titleLink} onClick={handleClick}>
          {title}
        </a>
      </h3>

      {/* Snippet/Description */}
      <p className="search-result-snippet">
        {date && <span className="search-result-date">{date} — </span>}
        {snippet}
      </p>
    </article>
  );
};

export default SearchResult;