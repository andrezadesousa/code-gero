import React from "react";
import { Character } from "../types";
import "./CharacterCard.css";

interface Props {
  character: Character;
  onViewMore: (character: Character) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const CharacterCard: React.FC<Props> = ({
  character,
  onViewMore,
  isFavorite,
  onToggleFavorite,
}) => {
  const thumbnailUrl = character.thumbnail
    ? `${character.thumbnail.path}.${character.thumbnail.extension}`
    : "https://via.placeholder.com/150";

  return (
    <div className="card">
      <img src={thumbnailUrl} alt={character.name} />
      <h3>{character.name}</h3>

      {character.series?.items?.length > 0 && (
        <div>
          <strong>Séries:</strong>
          <ul>
            {character.series.items.slice(0, 3).map((s, idx) => (
              <li key={idx}>{s.name}</li>
            ))}
            {character.series.items.length > 3 && (
              <li>+{character.series.items.length - 3} mais...</li>
            )}
          </ul>
        </div>
      )}

      {character.events?.items?.length > 0 && (
        <div>
          <strong>Eventos:</strong>
          <ul>
            {character.events.items.slice(0, 3).map((e, idx) => (
              <li key={idx}>{e.name}</li>
            ))}
            {character.events.items.length > 3 && (
              <li>+{character.events.items.length - 3} mais...</li>
            )}
          </ul>
        </div>
      )}

      <div className="card-buttons">
        <button onClick={() => onViewMore(character)}>Ver mais</button>
        <button
          className={`favorite-btn ${isFavorite ? "favorited" : ""}`}
          onClick={onToggleFavorite}
        >
          ♥
        </button>
      </div>
    </div>
  );
};

export default CharacterCard;
