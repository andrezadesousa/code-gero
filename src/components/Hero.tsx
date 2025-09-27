import React, { useState } from "react";
import styled from "styled-components";

interface HeroProps {
  thumbnailUrl: string | null;
  onSearch: (name: string) => void;
  onReset: () => void;
}

const Hero: React.FC<HeroProps> = ({ thumbnailUrl, onSearch, onReset }) => {
  const [searchText, setSearchText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchText.trim() !== "") {
      onSearch(searchText.trim());
    }
  };

  const handleReset = () => {
    setSearchText("");
    onReset();
  };

  return (
    <HeroWrapper>
      <Left>
        <Title>Hey, time!</Title>
        <Description>Assemble Your Artistic Forces</Description>

        <SearchForm onSubmit={handleSubmit}>
          <SearchInput
            type="text"
            placeholder="Buscar personagem..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          {searchText && (
            <ClearBtn type="button" onClick={handleReset}>
              ✖
            </ClearBtn>
          )}
          <SearchButton type="submit">Buscar</SearchButton>
        </SearchForm>
        <Description>
          Forge friendships, showcase your talents, and propel your artistic
          journey in a supportive universe for Marvel enthusiasts.
        </Description>
        <a>Join Community</a>
      </Left>

      <Right>
        <Thumbnail src="/assets/hero.png" alt="Thumbnail" />
      </Right>
    </HeroWrapper>
  );
};

export default Hero;

const HeroWrapper = styled.section`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 2rem;
  background: ${({ theme }) => theme.card};
`;

const Left = styled.div`
  flex: 1 1 300px;
`;

const Right = styled.div`
  flex: 1 1 300px;
  display: flex;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 2rem;
`;

const Description = styled.p`
  margin: 1rem 0 2rem 0;
`;

const SearchForm = styled.form`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 0.5rem 0.7rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const SearchButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  background: #eb8015;
  color: #fff;
  border: none;
  cursor: pointer;
`;

const ClearBtn = styled.button`
  background: transparent;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
`;

const Thumbnail = styled.img`
  max-width: 250px;
  border-radius: 12px;
`;
