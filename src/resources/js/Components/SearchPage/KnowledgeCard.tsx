import React from "react";
import "@css/components/SearchPage/KnowledgeCard.css";

interface KnowledgeCardProps {
  title: string;
  subtitle: string;
  description: string;
  emoji: string;
  info: Array<{
    label: string;
    value: string;
  }>;
  source: {
    text: string;
    url: string;
  };
}

const KnowledgeCard: React.FC<KnowledgeCardProps> = ({
  title,
  subtitle,
  description,
  emoji,
  info,
  source,
}) => {
  return (
    <div className="knowledge-card">
      {/* Imagen/Emoji */}
      <div className="knowledge-card-img">{emoji}</div>

      {/* Cuerpo principal */}
      <div className="knowledge-card-body">
        <h2 className="knowledge-card-title">{title}</h2>
        <p className="knowledge-card-subtitle">{subtitle}</p>
        <p className="knowledge-card-description">{description}</p>
        <p className="knowledge-card-source">
          <a href={source.url}>{source.text}</a>
        </p>
      </div>

      {/* Información adicional */}
      <div className="knowledge-card-info">
        {info.map((item, index) => (
          <div key={index} className="knowledge-card-row">
            <span className="knowledge-card-label">{item.label}</span>
            <span className="knowledge-card-value">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KnowledgeCard;