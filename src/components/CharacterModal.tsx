import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Character } from "../types";

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
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Modal
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
      >
        <CloseBtn onClick={onClose}>✖</CloseBtn>

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
                  {s.name} {s.type ? `(${s.type})` : ""}
                </li>
              ))}
            </ul>
          </div>
        )}

        {character.urls?.length > 0 && (
          <div>
            <strong>Links:</strong>
            <ul>
              {character.urls.map((u, idx) => (
                <li key={idx}>
                  <a href={u.url} target="_blank" rel="noreferrer">
                    {u.type}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Modal>
    </Overlay>
  );
};

export default CharacterModal;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const Modal = styled(motion.div)`
  background: #fff;
  border-radius: 12px;
  max-width: 600px;
  width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
  position: relative;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);

  img {
    width: 100%;
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  h2 {
    margin-top: 0;
  }

  ul {
    padding-left: 1.2rem;
    margin: 0.5rem 0;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  border: none;
  background: transparent;
  font-size: 1.5rem;
  cursor: pointer;
`;
