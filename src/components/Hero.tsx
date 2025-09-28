import { useState, useEffect, useCallback, FormEventHandler } from "react";
import { motion } from "framer-motion";
import styled from "styled-components";
import { useDebounce } from "../hooks/useDebounce";
import { Character } from "../types";
import { getCharacters } from "../services/marvelApi";
import { StepForward, CircleX } from "lucide-react";

interface HeroProps {
  thumbnailUrl: string | null;
  onSearch: (name: string) => void;
  onReset: () => void;
  isSearching?: boolean;
  themeName?: "light" | "dark" | "whiteLabel";
}

export default function Hero({
  thumbnailUrl,
  onSearch,
  onReset,
  isSearching = false,
  themeName = "light",
}: HeroProps) {
  const [searchText, setSearchText] = useState("");
  const debouncedSearchText = useDebounce(searchText, 500);
  const [heroCharacter, setHeroCharacter] = useState<Character | null>(null);
  const [isLoadingHero, setIsLoadingHero] = useState(true);

  // Buscar o personagem de forma aleatória
  useEffect(() => {
    const fetchRandomCharacter = async () => {
      try {
        setIsLoadingHero(true);
        const randomOffset = Math.floor(Math.random() * 1000);
        const response = await getCharacters(20, randomOffset);

        const validCharacters = response.results.filter(
          (character) =>
            character.name &&
            character.description &&
            character.description.trim() !== ""
        );

        if (validCharacters.length > 0) {
          const randomCharacter =
            validCharacters[Math.floor(Math.random() * validCharacters.length)];
          setHeroCharacter(randomCharacter);
        } else {
          setHeroCharacter(null);
        }
      } catch (error) {
        console.error("Error fetching random character:", error);
        setHeroCharacter(null);
      } finally {
        setIsLoadingHero(false);
      }
    };

    fetchRandomCharacter();
  }, []);

  // Disparar pesquisa com debounce
  useEffect(() => {
    if (debouncedSearchText.trim() && debouncedSearchText.length >= 2) {
      onSearch(debouncedSearchText.trim());
    }
  }, [debouncedSearchText, onSearch]);

  const handleSubmit: FormEventHandler = (e) => {
    e.preventDefault();
    if (searchText.trim()) onSearch(searchText.trim());
  };

  const handleReset = useCallback(() => {
    setSearchText("");
    window.location.reload();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchText(value);
    if (!value) onReset();
  };

  // Usar diretamente o tipo do React
  const getHeroImage = () => {
    if (themeName === "whiteLabel") return thumbnailUrl || "/assets/hero.png";
    if (heroCharacter?.thumbnail)
      return `${heroCharacter.thumbnail.path}.${heroCharacter.thumbnail.extension}`;
    return "/assets/me.jpeg";
  };

  const getCharacterInfo = () => {
    if (heroCharacter?.name && heroCharacter.description) {
      return {
        name: heroCharacter.name,
        description: heroCharacter.description,
      };
    }
    return {
      name: "Andreza Sousa",
      description:
        "Olá, time! Sou um desenvolvedora front-end que ama ver o design ganhar vida com código.",
    };
  };

  const characterInfo = getCharacterInfo();

  return (
    <HeroWrapper>
      <HeroContainer>
        <ContentSection
          as={motion.div}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <TitleSection>
            <BrandTitle
              as={motion.div}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              MARVEL STUDIOS - CODE HERO
            </BrandTitle>
            <MainTitle
              as={motion.h1}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              {isLoadingHero ? "Carregando..." : characterInfo.name}
            </MainTitle>
            <Subtitle
              as={motion.h2}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Desenvolvedores front-end, reúnam suas forças artísticas!
            </Subtitle>
          </TitleSection>

          <Description
            as={motion.p}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            {isLoadingHero
              ? "Carregando informações do personagem..."
              : characterInfo.description}
          </Description>

          <SearchSection
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <SearchForm onSubmit={handleSubmit}>
              <SearchInputWrapper>
                <SearchInput
                  type="text"
                  placeholder="Pesquisar nome do personagem..."
                  value={searchText}
                  onChange={handleInputChange}
                  disabled={isSearching}
                />
                {isSearching && <SearchSpinner />}
                {searchText && !isSearching && (
                  <ClearBtn
                    type="button"
                    onClick={handleReset}
                    aria-label="Limpar pesquisa"
                  >
                    <CircleX />
                  </ClearBtn>
                )}
              </SearchInputWrapper>
              <SearchButton
                type="submit"
                disabled={isSearching || !searchText.trim()}
                as={motion.button}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSearching ? "Procurando..." : "Procurar"}
              </SearchButton>
            </SearchForm>
          </SearchSection>
          <ActionSection
            as={motion.div}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <ActionButtons>
              <WatchButton
                as={motion.a}
                href="https://andreza-sousa.web.app/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <StepForward /> Assista agora
              </WatchButton>
              <InfoButton
                as={motion.a}
                href="https://www.linkedin.com/in/sousa-andreza/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Saiba mais
              </InfoButton>
            </ActionButtons>
          </ActionSection>
        </ContentSection>

        <ImageSection
          as={motion.div}
          initial={{ opacity: 0, x: 50, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
        >
          <ImageContainer>
            <HeroImage
              src={getHeroImage()}
              alt={characterInfo.name}
              as={motion.img}
              initial={{ scale: 1.1 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              key={`${themeName}-${heroCharacter?.id ?? "fallback"}`}
            />
            <ImageOverlay />
          </ImageContainer>
        </ImageSection>
      </HeroContainer>
    </HeroWrapper>
  );
}

const HeroWrapper = styled.section`
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: ${({ theme }) => theme.background};
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      ${({ theme }) => theme.background} 0%,
      ${({ theme }) => theme.background}f0 50%,
      transparent 100%
    );
    pointer-events: none;
    z-index: 1;
  }
`;

const HeroContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  min-height: 80vh;
  position: relative;
  z-index: 2;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
    gap: 3rem;
    text-align: center;
    padding: 1.5rem;
  }

  @media (max-width: 768px) {
    padding: 1rem;
    gap: 2rem;
  }
`;

const ContentSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  @media (max-width: 1024px) {
    order: 2;
  }
`;

const TitleSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const BrandTitle = styled.div`
  font-size: 0.9rem;
  font-weight: 700;
  letter-spacing: 0.2em;
  color: ${({ theme }) => theme.primary};
  opacity: 0.9;
  text-transform: uppercase;
`;

const MainTitle = styled.h1`
  font-size: clamp(2.5rem, 6vw, 4rem);
  font-weight: 900;
  margin: 0;
  color: ${({ theme }) => theme.text};
  line-height: 1.1;
  letter-spacing: -0.02em;
  text-transform: uppercase;

  background: linear-gradient(
    135deg,
    ${({ theme }) => theme.text} 0%,
    ${({ theme }) => theme.primary} 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const Subtitle = styled.h2`
  font-size: clamp(1rem, 2.5vw, 1.4rem);
  font-weight: 400;
  margin: 0;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  font-style: italic;
  letter-spacing: 0.05em;
`;

const Description = styled.p`
  margin: 0;
  font-size: 1.1rem;
  line-height: 1.6;
  color: ${({ theme }) => theme.text};
  opacity: 0.8;
  max-width: 500px;

  @media (max-width: 1024px) {
    max-width: none;
  }
`;

const SearchSection = styled.div`
  margin: 1rem 0;
`;

const SearchForm = styled.form`
  display: flex;
  gap: 1rem;
  align-items: stretch;

  @media (max-width: 640px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const SearchInputWrapper = styled.div`
  position: relative;
  flex: 1;
  display: flex;
  align-items: center;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1.25rem 1.5rem;
  padding-right: 3.5rem;
  border-radius: 16px;
  border: 2px solid ${({ theme }) => theme.border};
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  font-size: 1.1rem;
  transition: all 0.3s ease;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 4px ${({ theme }) => theme.primary}20,
      0 8px 30px rgba(0, 0, 0, 0.1);
    transform: translateY(-1px);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &::placeholder {
    color: ${({ theme }) => theme.text};
    opacity: 0.5;
  }
`;

const SearchSpinner = styled.div`
  position: absolute;
  right: 1.5rem;
  width: 24px;
  height: 24px;
  border: 3px solid ${({ theme }) => theme.border};
  border-top: 3px solid ${({ theme }) => theme.primary};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const SearchButton = styled.button`
  padding: 1.25rem 2.5rem;
  border-radius: 16px;
  background: ${({ theme }) => theme.primary};
  color: #ffffff;
  border: none;
  cursor: pointer;
  font-weight: 700;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  white-space: nowrap;
  box-shadow: 0 4px 20px ${({ theme }) => theme.primary}40;

  &:hover:not(:disabled) {
    background: ${({ theme }) => theme.primary}dd;
    transform: translateY(-2px);
    box-shadow: 0 8px 30px ${({ theme }) => theme.primary}50;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const ClearBtn = styled.button`
  position: absolute;
  right: 1.5rem;
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: ${({ theme }) => theme.text};
  opacity: 0.6;
  transition: all 0.2s ease;
  padding: 0.5rem;
  border-radius: 8px;

  &:hover {
    opacity: 1;
    background: ${({ theme }) => theme.muted};
  }
`;

const ActionSection = styled.div`
  margin-top: 1rem;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 640px) {
    flex-direction: column;
    width: 100%;
  }
`;

const WatchButton = styled.a`
  background: ${({ theme }) => theme.primary};
  color: #ffffff;
  border: none;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  text-decoration: none;
  justify-content: center;

  &:hover {
    background: ${({ theme }) => theme.primary}dd;
    transform: translateY(-2px);
    box-shadow: 0 8px 25px ${({ theme }) => theme.primary}40;
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const InfoButton = styled.a`
  background: rgba(255, 255, 255, 0.2);
  color: ${({ theme }) => theme.text};
  border: 2px solid rgba(255, 255, 255, 0.3);
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.5);
    transform: translateY(-2px);
  }

  @media (max-width: 640px) {
    width: 100%;
  }
`;

const ImageSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;

  @media (max-width: 1024px) {
    order: 1;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: 600px;
  aspect-ratio: 3/4;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 25px 80px rgba(0, 0, 0, 0.3),
    0 0 0 1px ${({ theme }) => theme.border};

  @media (max-width: 768px) {
    max-width: 400px;
    border-radius: 15px;
  }
`;

const HeroImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.6s ease;
`;

const ImageOverlay = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 30%;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6) 0%, transparent 100%);
  pointer-events: none;
`;
