import { useEffect, useState, useCallback } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CharacterModal from "./components/CharacterModal";
import CharacterGrid from "./components/CharacterGrid";
import SkeletonGrid from "./components/SkeletonGrid";
import Pagination from "./components/Pagination";
import Footer from "./components/Footer";
import { getCharacters, searchCharacters } from "./services/marvelApi";
import { Character } from "./types";
import { lightTheme, darkTheme, createWhiteLabelTheme } from "./themes";
import styled from "styled-components";

const App = () => {
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(false);
  const [searchLoading, setSearchLoading] = useState(false);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [randomThumb, setRandomThumb] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [view, setView] = useState<"all" | "favorites">("all");
  const [isSearching, setIsSearching] = useState(false);
  const [favorites, setFavorites] = useState<Character[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [theme, setTheme] = useState<"light" | "dark" | "whiteLabel">("light");
  const [customColors, setCustomColors] = useState({
    primary: "#F0141E",
    background: "#FFFFFF",
    text: "#000000",
  });

  const limit = 10;
  const fetchLimit = 30;

  const loadCharacters = async (pageNumber = 1) => {
    try {
      setDataLoading(true);
      const offset = (pageNumber - 1) * limit;

      let allValidCharacters: Character[] = [];
      let currentOffset = offset;

      while (allValidCharacters.length < limit) {
        const { results } = await getCharacters(fetchLimit, currentOffset);

        const validCharacters = results.filter(
          (c) =>
            c &&
            c.thumbnail &&
            c.thumbnail.path &&
            c.thumbnail.extension &&
            !c.thumbnail.path.includes("image_not_available") &&
            c.name &&
            c.name.trim() !== ""
        );

        allValidCharacters = [...allValidCharacters, ...validCharacters];
        currentOffset += fetchLimit;

        if (results.length === 0) break;
      }

      const limitedCharacters = allValidCharacters.slice(0, limit);
      setCharacters(limitedCharacters);
      setTotal(1000);

      if (limitedCharacters.length > 0) {
        const idx = Math.floor(Math.random() * limitedCharacters.length);
        const c = limitedCharacters[idx];
        if (c.thumbnail) {
          setRandomThumb(`${c.thumbnail.path}.${c.thumbnail.extension}`);
        }
      }
    } catch (e) {
      console.error("Error loading characters:", e);
      setCharacters([]);
    } finally {
      setDataLoading(false);
    }
  };

  const handleSearch = useCallback(async (name: string) => {
    try {
      setSearchLoading(true);
      setIsSearching(true);
      const results = await searchCharacters(name);

      const validResults = results.filter(
        (c) =>
          c &&
          c.thumbnail &&
          c.thumbnail.path &&
          c.thumbnail.extension &&
          !c.thumbnail.path.includes("image_not_available") &&
          c.name &&
          c.name.trim() !== ""
      );

      setCharacters(validResults);
      setTotal(validResults.length);
      setPage(1);
    } catch (error) {
      console.error("Search error:", error);
      setCharacters([]);
    } finally {
      setSearchLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    setPage(1);
    setIsSearching(false);
    loadCharacters(1);
  }, []);

  const toggleFavorite = (character: Character) => {
    let updated: Character[];
    const exists = favorites.find((fav) => fav.id === character.id);
    if (exists) {
      updated = favorites.filter((fav) => fav.id !== character.id);
    } else {
      updated = [...favorites, character];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const handleCustomColorsChange = (colors: {
    primary: string;
    background: string;
    text: string;
  }) => {
    setCustomColors(colors);
  };

  const displayedCharacters = view === "all" ? characters : favorites;
  const totalPages = Math.ceil(total / limit);

  const getThemeObject = () => {
    if (theme === "light") return lightTheme;
    if (theme === "dark") return darkTheme;
    return createWhiteLabelTheme(customColors);
  };

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (view === "all" && !isSearching) {
      loadCharacters(page);
    }
  }, [page, view, isSearching]);

  if (loading) return <LoadingGif src="/assets/logo.gif" alt="Loading..." />;

  return (
    <ThemeProvider theme={getThemeObject()}>
      <GlobalStyle />
      <div>
        <Header
          favoriteCount={favorites.length}
          themeName={theme}
          setThemeName={setTheme}
          customColors={customColors}
          onCustomColorsChange={handleCustomColorsChange}
        />
        <main>
          <Hero
            thumbnailUrl={randomThumb}
            onSearch={handleSearch}
            onReset={handleReset}
            isSearching={searchLoading}
          />

          <div className="tabs">
            <button
              className={view === "all" ? "active" : ""}
              onClick={() => setView("all")}
            >
              Todos
            </button>
            <button
              className={view === "favorites" ? "active" : ""}
              onClick={() => setView("favorites")}
            >
              Favoritos ({favorites.length})
            </button>
          </div>

          {dataLoading || searchLoading ? (
            <SkeletonGrid count={10} />
          ) : (
            <section className="container">
              <SectionTitle>
                {view === "favorites"
                  ? `Seus Favoritos (${favorites.length})`
                  : isSearching
                  ? `Resultados da Busca (${characters.length})`
                  : `Total de Personagens (${total.toLocaleString()})`}
              </SectionTitle>

              {displayedCharacters.length === 0 ? (
                <EmptyState>
                  {view === "favorites"
                    ? "Você ainda não tem personagens favoritos. Clique no coração para adicionar!"
                    : "Nenhum personagem encontrado."}
                </EmptyState>
              ) : (
                <>
                  <CharacterGrid
                    characters={displayedCharacters}
                    favorites={favorites}
                    onViewMore={setSelectedCharacter}
                    onToggleFavorite={toggleFavorite}
                  />

                  {view === "all" && !isSearching && totalPages > 1 && (
                    <Pagination
                      currentPage={page}
                      totalPages={totalPages}
                      onPageChange={setPage}
                      disabled={dataLoading || searchLoading}
                    />
                  )}
                </>
              )}
            </section>
          )}
        </main>

        <Footer />

        <CharacterModal
          character={selectedCharacter}
          favorites={favorites}
          onClose={() => setSelectedCharacter(null)}
        />
      </div>
    </ThemeProvider>
  );
};

export default App;

const LoadingGif = styled.img`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1000;
`;

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease;
    line-height: 1.6;
  }
  
  button {
    cursor: pointer;
    font-family: inherit;
  }
  
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 1rem;
  }
  
  .tabs {
    display: flex;
    gap: 0.75rem;
    margin: 2rem 0 1rem 0;
    padding: 0 1rem;
    justify-content: center;
    
    @media (max-width: 768px) {
      margin: 1.5rem 0 0.75rem 0;
      padding: 0 0.75rem;
    }
  }
  
  .tabs button {
    padding: 0.75rem 1.5rem;
    border: 2px solid ${({ theme }) => theme.border};
    border-radius: 12px;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    cursor: pointer;
    font-weight: 600;
    transition: all 0.3s ease;
    
    &:hover {
      border-color: ${({ theme }) => theme.primary};
      transform: translateY(-1px);
      box-shadow: 0 4px 12px ${({ theme }) => theme.primary}20;
    }
    
    &.active {
      background: ${({ theme }) => theme.primary};
      color: #FFFFFF;
      border-color: ${({ theme }) => theme.primary};
      box-shadow: 0 4px 12px ${({ theme }) => theme.primary}30;
    }
    
    @media (max-width: 768px) {
      padding: 0.6rem 1.25rem;
      font-size: 0.9rem;
    }
  }
`;

const SectionTitle = styled.h2`
  color: ${({ theme }) => theme.text};
  margin: 1.5rem 0 2rem 0;
  font-size: 1.75rem;
  font-weight: 700;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin: 1rem 0 1.5rem 0;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${({ theme }) => theme.text};
  opacity: 0.7;
  font-size: 1.1rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    padding: 3rem 1rem;
    font-size: 1rem;
  }
`;
