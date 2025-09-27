import React from "react";
import styled from "styled-components";

const Footer: React.FC = () => {
  return (
    <FooterWrapper>
      <Content>
        <p>© 2025 Andreza Sousa - Projeto Marvel</p>
        <p>Todos os direitos reservados.</p>
      </Content>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  background-image: url("/assets/footer.png");
  background-size: cover;
  background-position: center;
  padding: 2rem 0;
  color: #fff;
  text-align: center;
`;

const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;
