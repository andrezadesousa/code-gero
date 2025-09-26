import React from "react";
import "./CharacterCard.css";
import { Character } from "../types";

interface Props {
  character: Character;
  onViewMore: (character: Character) => void;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
}

const CharacterCard: React.FC<Props> = ({
  character,
  onViewMore,
  isFavorite,
  onToggleFavorite,
}) => {
  return (
    <div className="card">
      <img
        src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
        alt={character.name}
      />
      <h3>{character.name}</h3>

      <p>
        <strong>Séries:</strong> {character.series.available}
      </p>
      <p>
        <strong>Eventos:</strong> {character.events.available}
      </p>

      <div className="card-buttons">
        <button onClick={() => onViewMore(character)}>Ver mais</button>
        <button
          className={`favorite-btn ${isFavorite ? "favorited" : ""}`}
          onClick={() => onToggleFavorite(character.id)}
        >
          ♥
        </button>
      </div>
    </div>
  );
};

export default CharacterCard;
