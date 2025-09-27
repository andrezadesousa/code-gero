import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

interface HeroProps {
  thumbnailUrl: string | null;
  onSearch: (name: string) => void;
  onReset: () => void;
}
const Hero: React.FC<HeroProps> = ({ thumbnailUrl, onSearch, onReset }) => {
  const [query, setQuery] = useState("");
  const [dateTime, setDateTime] = useState("");

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const formatted = now.toLocaleString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
      setDateTime(formatted);
    };

    updateDateTime();
    const interval = setInterval(updateDateTime, 60 * 1000); // atualiza a cada minuto
    return () => clearInterval(interval);
  }, []);

  return (
    <HeroSection
      as={motion.section}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Left>
        <h1>Olá, pessoa!</h1>
        <p>Esse projeto mostra os personagens da Marvel e suas descrições.</p>

        <h3>Busca de personagens</h3>
        <SearchContainer>
          <input
            type="text"
            placeholder="Digite o nome do personagem..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              onClick={() => {
                setQuery("");
                onReset();
              }}
            >
              ✖
            </button>
          )}
          <button onClick={() => onSearch(query)}>Buscar</button>
        </SearchContainer>

        <DateTime>📅 {dateTime}</DateTime>
      </Left>

      <Right>
        {thumbnailUrl && (
          <img src={thumbnailUrl} alt="Marvel random character" />
        )}
      </Right>
    </HeroSection>
  );
};

export default Hero;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: #f2f0eb;
  text-align: center;

  @media (min-width: 768px) {
    flex-direction: row;
    justify-content: space-between;
    text-align: left;
  }
`;

const Left = styled.div`
  flex: 1;
  margin-bottom: 2rem;

  h1 {
    font-size: 2rem;
    color: #eb8015;
    margin-bottom: 1rem;
  }

  p {
    margin-bottom: 1.5rem;
  }
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;

  img {
    width: 250px;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.3);
  }
`;

const SearchContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input {
    padding: 0.5rem 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    flex: 1;
  }

  button {
    background: #eb8015;
    border: none;
    color: white;
    padding: 0.5rem 0.8rem;
    border-radius: 8px;
    cursor: pointer;
    font-weight: bold;
  }
`;

const DateTime = styled.p`
  font-size: 0.9rem;
  color: #555;
  margin-top: 1rem;
`;
