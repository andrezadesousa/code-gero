import React from "react";
import "./Header.css";

const logoUrl =
  "https://www.objective.com.br/wp-content/uploads/2020/11/logo-2.svg";

interface HeaderProps {
  favoriteCount: number;
}

const Header: React.FC<HeaderProps> = ({ favoriteCount }) => {
  return (
    <header className="header">
      <div className="header__container container">
        <div className="header__left">
          <img src={logoUrl} alt="logo" className="header__logo" />
        </div>
        <div className="header-right">
          Andreza Sousa - Teste de Front-end
          {favoriteCount > 0 && (
            <span className="fav-count">Favoritos: {favoriteCount}</span>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
