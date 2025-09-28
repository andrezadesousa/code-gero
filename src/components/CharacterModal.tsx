import styled from "styled-components";
import { motion } from "framer-motion";
import { Character } from "../types";

interface CharacterModalProps {
  character: Character | null;
  favorites: Character[];
  onClose: () => void;
}

const CharacterModal = ({
  character,
  favorites,
  onClose,
}: CharacterModalProps) => {
  if (!character) return null;

  const isFavorite = favorites.some((fav) => fav.id === character.id);
  const thumbnailUrl = character.thumbnail
    ? `${character.thumbnail.path}.${character.thumbnail.extension}`
    : "/assets/footer.png";

  return (
    <Overlay
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <Modal
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <CloseBtn onClick={onClose}>✖</CloseBtn>

        <ModalContent>
          <ImageSection>
            <CharacterImage
              src={thumbnailUrl || "/placeholder.svg"}
              alt={character.name}
            />
            <StatusBadge $isFavorite={isFavorite}>
              {isFavorite ? "❤️ Favorito" : "—"}
            </StatusBadge>
          </ImageSection>

          <InfoSection>
            <CharacterTitle>{character.name}</CharacterTitle>

            {character.description && character.description.trim() && (
              <Description>{character.description}</Description>
            )}

            {character.modified && (
              <InfoItem>
                <InfoLabel>Última modificação:</InfoLabel>
                <InfoValue>
                  {new Date(character.modified).toLocaleDateString("pt-BR")}
                </InfoValue>
              </InfoItem>
            )}

            {character.comics?.available > 0 &&
              character.comics.items?.length > 0 && (
                <Section>
                  <SectionTitle>
                    Quadrinhos ({character.comics.available})
                  </SectionTitle>
                  <ItemList>
                    {character.comics.items.slice(0, 5).map((comic, idx) => (
                      <ListItem key={idx}>{comic.name}</ListItem>
                    ))}
                    {character.comics.items.length > 5 && (
                      <MoreItems>
                        +{character.comics.items.length - 5} mais
                      </MoreItems>
                    )}
                  </ItemList>
                </Section>
              )}

            {character.series?.available > 0 &&
              character.series.items?.length > 0 && (
                <Section>
                  <SectionTitle>
                    Séries ({character.series.available})
                  </SectionTitle>
                  <ItemList>
                    {character.series.items.slice(0, 5).map((serie, idx) => (
                      <ListItem key={idx}>{serie.name}</ListItem>
                    ))}
                    {character.series.items.length > 5 && (
                      <MoreItems>
                        +{character.series.items.length - 5} mais
                      </MoreItems>
                    )}
                  </ItemList>
                </Section>
              )}

            {character.stories?.available > 0 &&
              character.stories.items?.length > 0 && (
                <Section>
                  <SectionTitle>
                    Histórias ({character.stories.available})
                  </SectionTitle>
                  <ItemList>
                    {character.stories.items.slice(0, 5).map((story, idx) => (
                      <ListItem key={idx}>
                        {story.name} {story.type ? `(${story.type})` : ""}
                      </ListItem>
                    ))}
                    {character.stories.items.length > 5 && (
                      <MoreItems>
                        +{character.stories.items.length - 5} mais
                      </MoreItems>
                    )}
                  </ItemList>
                </Section>
              )}

            {character.events?.available > 0 &&
              character.events.items?.length > 0 && (
                <Section>
                  <SectionTitle>
                    Eventos ({character.events.available})
                  </SectionTitle>
                  <ItemList>
                    {character.events.items.slice(0, 5).map((event, idx) => (
                      <ListItem key={idx}>{event.name}</ListItem>
                    ))}
                    {character.events.items.length > 5 && (
                      <MoreItems>
                        +{character.events.items.length - 5} mais
                      </MoreItems>
                    )}
                  </ItemList>
                </Section>
              )}

            {character.urls?.length > 0 && (
              <Section>
                <SectionTitle>Links</SectionTitle>
                <LinkList>
                  {character.urls.map((url, idx) => (
                    <LinkItem key={idx}>
                      <ExternalLink
                        href={url.url}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {url.type}
                      </ExternalLink>
                    </LinkItem>
                  ))}
                </LinkList>
              </Section>
            )}
          </InfoSection>
        </ModalContent>
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
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  backdrop-filter: blur(4px);
`;

const Modal = styled(motion.div)`
  background: ${({ theme }) => theme.card};
  border-radius: 16px;
  max-width: 800px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border: 1px solid ${({ theme }) => theme.border};

  @media (max-width: 768px) {
    max-width: 95vw;
    max-height: 95vh;
    border-radius: 12px;
    margin: 0.5rem;
  }
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  border: none;
  background: ${({ theme }) => theme.muted};
  color: ${({ theme }) => theme.text};
  font-size: 1.5rem;
  cursor: pointer;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.border};
    transform: scale(1.1);
  }

  @media (max-width: 768px) {
    top: 0.75rem;
    right: 0.75rem;
    width: 36px;
    height: 36px;
    font-size: 1.25rem;
  }
`;

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: 769px) {
    flex-direction: row;
  }
`;

const ImageSection = styled.div`
  position: relative;
  flex: 0 0 300px;

  @media (max-width: 768px) {
    flex: none;
  }
`;

const CharacterImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 16px 16px 0 0;

  @media (min-width: 769px) {
    height: 100%;
    border-radius: 16px 0 0 16px;
  }

  @media (max-width: 768px) {
    height: 250px;
    border-radius: 12px 12px 0 0;
  }
`;

const StatusBadge = styled.div<{ $isFavorite: boolean }>`
  position: absolute;
  top: 1rem;
  left: 1rem;
  background: ${({ $isFavorite, theme }) =>
    $isFavorite ? theme.primary : "rgba(0, 0, 0, 0.7)"};
  color: #ffffff;
  padding: 0.5rem 1rem;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.9rem;
  backdrop-filter: blur(10px);

  @media (max-width: 768px) {
    top: 0.75rem;
    left: 0.75rem;
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;

const InfoSection = styled.div`
  flex: 1;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1.5rem;
  }
`;

const CharacterTitle = styled.h2`
  margin: 0 0 1rem 0;
  font-size: 2rem;
  font-weight: 800;
  color: ${({ theme }) => theme.text};
  line-height: 1.2;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    text-align: center;
  }
`;

const Description = styled.p`
  margin: 0 0 1.5rem 0;
  font-size: 1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const InfoItem = styled.div`
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    text-align: center;
  }
`;

const InfoLabel = styled.span`
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin-right: 0.5rem;
`;

const InfoValue = styled.span`
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
`;

const Section = styled.div`
  margin-bottom: 1.5rem;
`;

const SectionTitle = styled.h3`
  margin: 0 0 0.75rem 0;
  font-size: 1.25rem;
  font-weight: 700;
  color: ${({ theme }) => theme.primary};

  @media (max-width: 768px) {
    font-size: 1.1rem;
    text-align: center;
  }
`;

const ItemList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ListItem = styled.li`
  padding: 0.5rem 0;
  border-bottom: 1px solid ${({ theme }) => theme.border};
  color: ${({ theme }) => theme.text};
  font-size: 0.95rem;

  &:last-child {
    border-bottom: none;
  }

  @media (max-width: 768px) {
    font-size: 0.9rem;
    padding: 0.4rem 0;
  }
`;

const MoreItems = styled.div`
  padding: 0.5rem 0;
  color: ${({ theme }) => theme.primary};
  font-weight: 600;
  font-size: 0.9rem;
  text-align: center;
`;

const LinkList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

const LinkItem = styled.div``;

const ExternalLink = styled.a`
  display: inline-block;
  padding: 0.5rem 1rem;
  background: ${({ theme }) => theme.primary};
  color: #ffffff;
  text-decoration: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
  transition: all 0.2s ease;
  text-transform: capitalize;

  &:hover {
    background: ${({ theme }) => theme.primary}dd;
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.8rem;
  }
`;
