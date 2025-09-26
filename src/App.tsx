import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import CharacterCard from "./components/CharacterCard";
import { getCharacters } from "./services/marvelApi";
import { Character } from "./types";
import "./App.css";

const App: React.FC = () => {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [randomThumb, setRandomThumb] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const results = await getCharacters(12, 0); // retorna Character[]
        setCharacters(results);

        if (results.length > 0) {
          const idx = Math.floor(Math.random() * results.length);
          const c = results[idx];
          setRandomThumb(`${c.thumbnail.path}.${c.thumbnail.extension}`);
        }
      } catch (e) {
        console.error(e);
      }
    };

    load();
  }, []);

  return (
    <div>
      <Header />
      <main>
        <Hero thumbnailUrl={randomThumb} />
        <section className="container">
          <h2>Personagens</h2>
          <div className="grid">
            {characters.map((c) => (
              <CharacterCard key={c.id} character={c} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;
