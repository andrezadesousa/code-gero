import { useState } from "react";
import styled from "styled-components";
import CharacterCard from "./CharacterCard";
import { Character } from "../types";

interface CharacterGridProps {
  characters: Character[];
  favorites: Character[];
  onViewMore: (character: Character) => void;
  onToggleFavorite: (character: Character) => void;
}

const CharacterGrid = ({
  characters,
  favorites,
  onViewMore,
  onToggleFavorite,
}: CharacterGridProps) => {
  const [hoveredCardId, setHoveredCardId] = useState<number | null>(null);

  return (
    <GridContainer $hasHoveredCard={hoveredCardId !== null}>
      <Grid>
        {characters.map((character) => (
          <CharacterCard
            key={character.id}
            character={character}
            onViewMore={onViewMore}
            isFavorite={favorites.some((fav) => fav.id === character.id)}
            onToggleFavorite={() => onToggleFavorite(character)}
            isHovered={hoveredCardId === character.id}
            onHover={setHoveredCardId}
          />
        ))}
      </Grid>
    </GridContainer>
  );
};

export default CharacterGrid;

const GridContainer = styled.div<{ $hasHoveredCard: boolean }>`
  transition: all 0.3s ease;

  //Leve sombreado no card em destaque
  ${({ $hasHoveredCard }) =>
    $hasHoveredCard &&
    `
    &::before {
      content: '';
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.1);
      z-index: 1;
      pointer-events: none;
      transition: all 0.3s ease;
    }
  `}
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 1rem 0;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;
