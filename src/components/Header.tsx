import React from "react";
import "./Header.css";

const logoUrl =
  "https://www.objective.com.br/wp-content/uploads/2020/11/logo-2.svg";

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="header__container container">
        <div className="header__left">
          <img src={logoUrl} alt="logo" className="header__logo" />
        </div>
        <div className="header__right">
          <div className="header__name">Andreza Sousa</div>
          <div className="header__role">Teste de Front-end</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
