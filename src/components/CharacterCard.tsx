import { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Character } from "../types";

interface CharacterCardProps {
  character: Character;
  onViewMore: (c: Character) => void;
  isFavorite: boolean;
  onToggleFavorite: () => void;
  isHovered?: boolean;
  onHover?: (id: number | null) => void;
}

const CharacterCard = ({
  character,
  onViewMore,
  isFavorite,
  onToggleFavorite,
  isHovered = false,
  onHover,
}: CharacterCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  const thumbnailUrl = character.thumbnail
    ? `${character.thumbnail.path}.${character.thumbnail.extension}`
    : "/assets/footer.png";

  const handleMouseEnter = () => {
    onHover?.(character.id);
  };

  const handleMouseLeave = () => {
    onHover?.(null);
  };

  return (
    <Card
      as={motion.div}
      whileHover={{ y: -8 }}
      whileTap={{ scale: 0.98 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      $isHovered={isHovered}
      layout
    >
      <FavButton
        $active={isFavorite}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite();
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {isFavorite ? "❤️" : "🤍"}
      </FavButton>

      <ImageContainer>
        {!imageLoaded && <ImageSkeleton />}
        <Thumbnail
          src={thumbnailUrl}
          alt={character.name}
          onLoad={() => setImageLoaded(true)}
          $loaded={imageLoaded}
        />
        <ImageOverlay $isHovered={isHovered}>
          <QuickViewButton
            onClick={(e) => {
              e.stopPropagation();
              onViewMore(character);
            }}
          >
            Ver Detalhes
          </QuickViewButton>
        </ImageOverlay>
      </ImageContainer>

      <Content>
        <CharacterName>{character.name}</CharacterName>

        <MobileOnlyContent>
          <Button
            onClick={() => onViewMore(character)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Ver mais
          </Button>
        </MobileOnlyContent>

        <DesktopOnlyContent>
          {character.description && (
            <Description>
              {character.description.length > 100
                ? `${character.description.substring(0, 100)}...`
                : character.description}
            </Description>
          )}

          <InfoGrid>
            {character.comics?.available > 0 && (
              <InfoItem>
                <InfoLabel>Quadrinhos</InfoLabel>
                <InfoValue>{character.comics.available}</InfoValue>
              </InfoItem>
            )}

            {character.series?.available > 0 && (
              <InfoItem>
                <InfoLabel>Séries</InfoLabel>
                <InfoValue>{character.series.available}</InfoValue>
              </InfoItem>
            )}

            {character.stories?.available > 0 && (
              <InfoItem>
                <InfoLabel>Histórias</InfoLabel>
                <InfoValue>{character.stories.available}</InfoValue>
              </InfoItem>
            )}

            {character.events?.available > 0 && (
              <InfoItem>
                <InfoLabel>Eventos</InfoLabel>
                <InfoValue>{character.events.available}</InfoValue>
              </InfoItem>
            )}
          </InfoGrid>

          <Button
            onClick={() => onViewMore(character)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Ver mais
          </Button>
        </DesktopOnlyContent>
      </Content>
    </Card>
  );
};

export default CharacterCard;

const Card = styled.div<{ $isHovered: boolean }>`
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  overflow: hidden;
  box-shadow: ${({ $isHovered, theme }) =>
    $isHovered
      ? `0 20px 40px rgba(0, 0, 0, 0.25), 0 0 0 2px ${theme.primary}`
      : "0 4px 12px rgba(0, 0, 0, 0.1)"};
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  position: relative;
  border: 1px solid ${({ theme }) => theme.border};
  opacity: ${({ $isHovered }) => ($isHovered ? 1 : 0.85)};
  transform: ${({ $isHovered }) => ($isHovered ? "scale(1.02)" : "scale(1)")};
  z-index: ${({ $isHovered }) => ($isHovered ? 10 : 1)};

  &:hover {
    opacity: 1;
  }

  @media (hover: none) and (pointer: coarse) {
    opacity: 1;
    transform: scale(1);

    &:hover {
      transform: scale(1);
    }
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 240px;
  overflow: hidden;

  @media (max-width: 768px) {
    height: 200px;
  }
`;

const ImageSkeleton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: shimmer 1.5s infinite;

  @keyframes shimmer {
    0% {
      background-position: -200px 0;
    }
    100% {
      background-position: calc(200px + 100%) 0;
    }
  }
`;

const Thumbnail = styled.img<{ $loaded: boolean }>`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.4s ease;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
`;

const ImageOverlay = styled.div<{ $isHovered: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    to bottom,
    rgba(0, 0, 0, 0) 0%,
    rgba(0, 0, 0, 0.1) 50%,
    rgba(0, 0, 0, 0.8) 100%
  );
  display: flex;
  align-items: flex-end;
  justify-content: center;
  padding: 1rem;
  opacity: ${({ $isHovered }) => ($isHovered ? 1 : 0)};
  transition: opacity 0.3s ease;

  /* Hide overlay on mobile devices */
  @media (max-width: 768px) {
    display: none;
  }
`;

const QuickViewButton = styled.button`
  background: rgba(255, 255, 255, 0.95);
  color: #000;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.2s ease;
  backdrop-filter: blur(10px);

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-1px);
  }
`;

const Content = styled.div`
  padding: 1.25rem;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 0.5rem;
  }
`;

const CharacterName = styled.h3`
  margin: 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.text};
  line-height: 1.3;

  @media (max-width: 768px) {
    font-size: 1.1rem;
    text-align: center;
  }
`;

const MobileOnlyContent = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
`;

const DesktopOnlyContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;

  @media (max-width: 768px) {
    display: none;
  }
`;

const Description = styled.p`
  margin: 0;
  font-size: 0.9rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  line-height: 1.4;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  margin: 0.5rem 0;
`;

const InfoItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.5rem;
  background: ${({ theme }) => theme.muted};
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.border};
`;

const InfoLabel = styled.span`
  font-size: 0.75rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.6;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const InfoValue = styled.span`
  font-size: 1rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};
  margin-top: 0.25rem;
`;

const Button = styled(motion.button)`
  background: ${({ theme }) => theme.primary};
  color: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 0.75rem 1rem;
  margin-top: auto;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  font-size: 0.95rem;

  &:hover {
    background: ${({ theme }) => theme.primary}dd;
    box-shadow: 0 4px 12px ${({ theme }) => theme.primary}40;
  }

  @media (max-width: 768px) {
    padding: 0.875rem 1.25rem;
    font-size: 1rem;
    border-radius: 8px;
  }
`;

const FavButton = styled(motion.button)<{ $active: boolean }>`
  position: absolute;
  top: 0.75rem;
  right: 0.75rem;
  background: rgba(255, 255, 255, 0.95);
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  color: ${({ $active }) => ($active ? "#F0141E" : "#666")};
  padding: 0.5rem;
  border-radius: 50%;
  z-index: 2;
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(255, 255, 255, 1);
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    top: 0.5rem;
    right: 0.5rem;
    padding: 0.4rem;
    font-size: 1.1rem;
  }
`;
