import React, { useEffect, useState } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CharacterModal from "./components/CharacterModal";
import CharacterCard from "./components/CharacterCard";
import { getCharacters, searchCharacters } from "./services/marvelApi";
import { Character } from "./types";
import { lightTheme, darkTheme, whiteLabelTheme } from "./themes";
import styled from "styled-components";

// Global Styles
const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    font-family: 'Arial', sans-serif;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    transition: all 0.3s ease;
  }
  button {
    cursor: pointer;
  }
`;

// Loading GIF
const LoadingGif = styled.img`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1000;
`;

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [characters, setCharacters] = useState<Character[]>([]);
  const [randomThumb, setRandomThumb] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [view, setView] = useState<"all" | "favorites">("all");
  const [favorites, setFavorites] = useState<Character[]>(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [theme, setTheme] = useState<"light" | "dark" | "whiteLabel">("light");
  const limit = 10;

  // Carregar personagens
  const loadCharacters = async (pageNumber = 1) => {
    try {
      const offset = (pageNumber - 1) * limit;
      const { results, total } = await getCharacters(limit, offset);
      setCharacters(results);
      setTotal(total);

      if (results.length > 0) {
        const validResults = results.filter((c) => c.thumbnail);
        if (validResults.length > 0) {
          const idx = Math.floor(Math.random() * validResults.length);
          const c = validResults[idx];
          setRandomThumb(`${c.thumbnail.path}.${c.thumbnail.extension}`);
        }
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Favoritos
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

  const displayedCharacters = view === "all" ? characters : favorites;
  const totalPages = Math.ceil(total / limit);

  // Loading inicial
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  // Carregar personagens ao mudar página
  useEffect(() => {
    loadCharacters(page);
  }, [page]);

  const themeObject =
    theme === "light"
      ? lightTheme
      : theme === "dark"
      ? darkTheme
      : whiteLabelTheme;

  if (loading) return <LoadingGif src="/assets/logo.gif" alt="Loading..." />;

  return (
    <ThemeProvider theme={themeObject}>
      <GlobalStyle />
      <div>
        <Header
          favoriteCount={favorites.length}
          themeName={theme}
          setThemeName={setTheme}
        />
        <main>
          <Hero
            thumbnailUrl={randomThumb}
            onSearch={async (name) => {
              const results = await searchCharacters(name);
              setCharacters(results);
              setTotal(results.length);
              setPage(1);
            }}
            onReset={() => loadCharacters(1)}
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

          <section className="container">
            <h2>Personagens</h2>
            <div className="grid">
              {displayedCharacters.map((c) => (
                <CharacterCard
                  key={c.id}
                  character={c}
                  onViewMore={setSelectedCharacter}
                  isFavorite={favorites.some((fav) => fav.id === c.id)}
                  onToggleFavorite={() => toggleFavorite(c)}
                />
              ))}
            </div>

            {view === "all" && (
              <div className="pagination">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((prev) => prev - 1)}
                >
                  Anterior
                </button>
                <span>
                  Página {page} de {totalPages}
                </span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage((prev) => prev + 1)}
                >
                  Próxima
                </button>
              </div>
            )}
          </section>
        </main>

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
