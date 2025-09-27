// App.tsx
import React, { useEffect, useState } from "react";
import { ThemeProvider, createGlobalStyle } from "styled-components";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CharacterModal from "./components/CharacterModal";
import CharacterCard from "./components/CharacterCard";
import Footer from "./components/Footer";
import { getCharacters, searchCharacters } from "./services/marvelApi";
import { Character } from "./types";
import { lightTheme, darkTheme, whiteLabelTheme } from "./themes";

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

const App: React.FC = () => {
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

  const loadCharacters = async (pageNumber: number = 1) => {
    try {
      const offset = (pageNumber - 1) * limit;
      const { results, total } = await getCharacters(limit, offset);
      setCharacters(results);
      setTotal(total);

      const validResults = results.filter((c) => c.thumbnail);
      if (validResults.length > 0) {
        const idx = Math.floor(Math.random() * validResults.length);
        const c = validResults[idx];
        setRandomThumb(`${c.thumbnail.path}.${c.thumbnail.extension}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const toggleFavorite = (character: Character) => {
    const exists = favorites.find((fav) => fav.id === character.id);
    const updated = exists
      ? favorites.filter((fav) => fav.id !== character.id)
      : [...favorites, character];
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  const displayedCharacters = view === "all" ? characters : favorites;
  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    loadCharacters(page);
  }, [page]);

  const themeObject =
    theme === "light"
      ? lightTheme
      : theme === "dark"
      ? darkTheme
      : whiteLabelTheme;

  return (
    <ThemeProvider theme={themeObject}>
      <GlobalStyle />
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
                isFavorite={favorites.some((fav) => fav.id === c.id)}
                onToggleFavorite={() => toggleFavorite(c)}
                onViewMore={setSelectedCharacter}
              />
            ))}
          </div>

          {view === "all" && (
            <div className="pagination">
              <button disabled={page === 1} onClick={() => setPage(page - 1)}>
                Anterior
              </button>
              <span>
                Página {page} de {totalPages}
              </span>
              <button
                disabled={page === totalPages}
                onClick={() => setPage(page + 1)}
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

      <Footer />
    </ThemeProvider>
  );
};

export default App;
