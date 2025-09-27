import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CharacterModal from "./components/CharacterModal";
import { getCharacters, searchCharacters } from "./services/marvelApi";
import { Character } from "./types";
import "./App.css";
import CharacterCard from "./components/CharacterCard";

const App: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [randomThumb, setRandomThumb] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedCharacter, setSelectedCharacter] = useState<Character | null>(
    null
  );
  const [view, setView] = useState<"all" | "favorites">("all");
  const limit = 10;

  const loadCharacters = async (pageNumber: number = 1) => {
    try {
      const offset = (pageNumber - 1) * limit;
      const { results, total } = await getCharacters(limit, offset);
      setCharacters(results);
      setTotal(total);

      // Seleciona thumbnail aleatória apenas se houver
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

  const [favorites, setFavorites] = useState<Character[]>(() => {
    // Carrega favoritos do localStorage
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

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

  const displayedCharacters = view === "all" ? characters : favorites; // usa todos os favoritos

  const totalPages = Math.ceil(total / limit);

  useEffect(() => {
    loadCharacters(page);
  }, [page]);

  return (
    <div>
      <Header favoriteCount={favorites.length} />
      <main>
        <Hero
          thumbnailUrl={randomThumb}
          onSearch={async (name) => {
            try {
              const results = await searchCharacters(name);
              setCharacters(results);
              setTotal(results.length);
              setPage(1);
            } catch (e) {
              console.error(e);
            }
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
        favorites={favorites} // <-- passar os favoritos
        onClose={() => setSelectedCharacter(null)}
      />
    </div>
  );
};

export default App;
