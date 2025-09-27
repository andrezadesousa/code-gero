import React from "react";
import { Character } from "../types";
import "./CharacterModal.css";

interface Props {
  character: Character | null;
  favorites: Character[];
  onClose: () => void;
}

const CharacterModal: React.FC<Props> = ({ character, favorites, onClose }) => {
  if (!character) return null;

  const isFavorite = favorites.some((fav) => fav.id === character.id);
  const thumbnailUrl = character.thumbnail
    ? `${character.thumbnail.path}.${character.thumbnail.extension}`
    : "https://via.placeholder.com/150";

  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          X
        </button>

        <p>
          <strong>Status:</strong> {isFavorite ? "❤️ Favorito" : "—"}
        </p>

        <img src={thumbnailUrl} alt={character.name} />
        <h2>{character.name}</h2>

        {character.modified && (
          <p>
            <strong>Última modificação:</strong>{" "}
            {new Date(character.modified).toLocaleDateString()}
          </p>
        )}

        {character.comics?.available > 0 && (
          <div>
            <strong>Quadrinhos ({character.comics.available}):</strong>
            <ul>
              {character.comics.items.map((c, idx) => (
                <li key={idx}>{c.name}</li>
              ))}
            </ul>
          </div>
        )}

        {character.stories?.items?.length > 0 && (
          <div>
            <strong>Histórias:</strong>
            <ul>
              {character.stories.items.map((s, idx) => (
                <li key={idx}>
                  {s.name} {s.type && `(${s.type})`}
                </li>
              ))}
            </ul>
          </div>
        )}

        {character.urls?.length > 0 && (
          <div>
            {character.urls.map((u, idx) => (
              <p key={idx}>
                <strong>{u.type}:</strong>{" "}
                <a href={u.url} target="_blank" rel="noreferrer">
                  {u.url}
                </a>
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CharacterModal;
