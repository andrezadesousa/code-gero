import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const logoUrl =
  "https://www.objective.com.br/wp-content/uploads/2020/11/logo-2.svg";

interface HeaderProps {
  favoriteCount: number;
}

const Header: React.FC<HeaderProps> = ({ favoriteCount }) => {
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
        </Right>
      </Container>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  background: #20232a;
  color: #fff;
  padding: 1rem 0;
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
  background: #eb8015;
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  font-weight: bold;
  font-size: 0.9rem;
`;
