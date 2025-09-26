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
  const limit = 10;

  const loadCharacters = async (pageNumber: number = 1) => {
    try {
      const offset = (pageNumber - 1) * limit;
      const { results, total } = await getCharacters(limit, offset);
      setCharacters(results);
      setTotal(total);

      if (results.length > 0) {
        const idx = Math.floor(Math.random() * results.length);
        const c = results[idx];
        setRandomThumb(`${c.thumbnail.path}.${c.thumbnail.extension}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const [favorites, setFavorites] = useState<number[]>(() => {
    // Carrega favoritos do localStorage
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });

  const toggleFavorite = (id: number) => {
    let updated: number[];
    if (favorites.includes(id)) {
      updated = favorites.filter((favId) => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    setFavorites(updated);
    localStorage.setItem("favorites", JSON.stringify(updated));
  };

  useEffect(() => {
    loadCharacters(page);
  }, [page]);

  const totalPages = Math.ceil(total / limit);

  return (
    <div>
      <Header />
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

        <section className="container">
          <h2>Personagens</h2>
          <div className="grid">
            {characters.map((c) => (
              <CharacterCard
                key={c.id}
                character={c}
                onViewMore={setSelectedCharacter}
                isFavorite={favorites.includes(c.id)}
                onToggleFavorite={toggleFavorite}
              />
            ))}
          </div>

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
        </section>
      </main>

      <CharacterModal
        character={selectedCharacter}
        onClose={() => setSelectedCharacter(null)}
      />
    </div>
  );
};

export default App;
