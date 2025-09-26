import React from "react";
import { Character } from "../types";
import "./CharacterModal.css";

interface Props {
  character: Character | null;
  favorites: Character[]; // <-- adicionar aqui
  onClose: () => void;
}

const CharacterModal: React.FC<Props> = ({ character, favorites, onClose }) => {
  if (!character) return null;

  const isFavorite = favorites.some((fav) => fav.id === character.id);

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          X
        </button>

        <p>
          <strong>Status:</strong> {isFavorite ? "❤️ Favorito" : "—"}
        </p>

        <img
          src={`${character.thumbnail.path}.${character.thumbnail.extension}`}
          alt={character.name}
        />
        <h2>{character.name}</h2>

        <p>
          <strong>Descrição:</strong> {character.description || "Sem descrição"}
        </p>
        <p>
          <strong>Séries:</strong> {character.series.available}
        </p>
        <p>
          <strong>Eventos:</strong> {character.events.available}
        </p>
        <p>
          <strong>Quadrinhos:</strong> {character.comics.available}
        </p>
        <p>
          <strong>Histórias:</strong> {character.stories.available}
        </p>
      </div>
    </div>
  );
};

export default CharacterModal;
