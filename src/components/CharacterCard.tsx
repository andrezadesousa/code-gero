import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Character } from "../types";

interface Props {
  character: Character;
  onViewMore: (c: Character) => void;
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
    : "https://via.placeholder.com/300x220";

  return (
    <Card whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <FavButton active={isFavorite} onClick={onToggleFavorite}>
        {isFavorite ? "❤️" : "🤍"}
      </FavButton>

      <Thumbnail src={thumbnailUrl} alt={character.name} />

      <Content>
        <h3>{character.name}</h3>

        {character.series?.items?.length > 0 && (
          <div>
            <strong>Séries:</strong>
            <ul>
              {character.series.items.slice(0, 3).map((s, idx) => (
                <li key={idx}>{s.name}</li>
              ))}
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
            </ul>
          </div>
        )}

        <Button onClick={() => onViewMore(character)}>Ver mais</Button>
      </Content>
    </Card>
  );
};

export default CharacterCard;

const Card = styled(motion.div)`
  background: #fff;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.2s ease;
  cursor: pointer;
  display: flex;
  flex-direction: column;

  &:hover {
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 220px;
  object-fit: cover;
`;

const Content = styled.div`
  padding: 1rem;
  flex: 1;

  h3 {
    margin: 0 0 0.5rem;
    font-size: 1.2rem;
  }

  ul {
    margin: 0.5rem 0;
    padding-left: 1.2rem;
    font-size: 0.9rem;
  }
`;

const Button = styled.button`
  background: #e62429;
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 0.6rem 1rem;
  margin-top: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.2s ease;

  &:hover {
    background: #c91d22;
  }
`;

const FavButton = styled.button<{ active: boolean }>`
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.4rem;
  color: ${({ active }) => (active ? "red" : "#888")};
  margin-bottom: 0.5rem;
  align-self: flex-end;

  &:hover {
    transform: scale(1.1);
  }
`;
