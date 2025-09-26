import React, { useState } from "react";
import "./Hero.css";

interface HeroProps {
  thumbnailUrl: string | null;
  onSearch: (name: string) => void;
  onReset: () => void; // novo
}

const Hero: React.FC<HeroProps> = ({ thumbnailUrl, onSearch, onReset }) => {
  const [search, setSearch] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      onSearch(search.trim());
    }
  };

  const handleClear = () => {
    setSearch("");
    onReset();
  };

  return (
    <section className="hero">
      <div className="hero__left">
        <h1 className="hero__title">Olá, pessoa!</h1>
        <p className="hero__desc">
          Esse projeto mostra os personagens da Marvel e suas descrições
        </p>

        <div className="hero__search">
          <h3>Busca de personagens</h3>
          <form onSubmit={handleSearch} className="search-form">
            <input
              type="text"
              placeholder="Digite o nome do personagem"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button type="button" className="clear-btn" onClick={handleClear}>
                ×
              </button>
            )}
          </form>
        </div>
      </div>

      <div className="hero__right">
        {thumbnailUrl && (
          <img
            src={thumbnailUrl}
            alt="Marvel Character"
            className="hero__thumb"
          />
        )}
      </div>
    </section>
  );
};

export default Hero;
