import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const logoUrl =
  "https://www.objective.com.br/wp-content/uploads/2020/11/logo-2.svg";

interface HeaderProps {
  favoriteCount?: number;
  themeName: "light" | "dark" | "whiteLabel";
  setThemeName: React.Dispatch<
    React.SetStateAction<"light" | "dark" | "whiteLabel">
  >;
}

const Header: React.FC<HeaderProps> = ({
  favoriteCount = 0,
  themeName,
  setThemeName,
}) => {
  const cycleTheme = () => {
    if (themeName === "light") setThemeName("dark");
    else if (themeName === "dark") setThemeName("whiteLabel");
    else setThemeName("light");
  };

  return (
    <HeaderWrapper
      as={motion.header}
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
    >
      <Container>
        <Left>
          <Logo src={logoUrl} alt="logo" />
        </Left>
        <Right>
          <span>Andreza Sousa - Teste de Front-end</span>
          {favoriteCount > 0 && (
            <FavCount>❤️ Favoritos: {favoriteCount}</FavCount>
          )}
          <ThemeButton onClick={cycleTheme}>
            {themeName === "light" ? "🌞" : themeName === "dark" ? "🌙" : "🎨"}
          </ThemeButton>
        </Right>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;

// ---------------- styled-components ----------------
const HeaderWrapper = styled.header`
  background: ${({ theme }) => theme.primary};
  color: #fff;
  padding: 1rem 0;
  transition: background 0.3s ease;
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const Logo = styled.img`
  height: 40px;
`;

const FavCount = styled.span`
  background: rgba(0, 0, 0, 0.2);
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  font-weight: bold;
  font-size: 0.9rem;
`;

const ThemeButton = styled.button`
  background: ${({ theme }) => theme.card};
  color: ${({ theme }) => theme.text};
  border: none;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s ease;

  &:hover {
    opacity: 0.8;
  }
`;
