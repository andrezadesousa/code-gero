import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const logoUrl =
  "https://www.objective.com.br/wp-content/uploads/2020/11/logo-2.svg";

interface HeaderProps {
  favoriteCount?: number;
  themeName: "light" | "dark" | "whiteLabel";
  setThemeName: React.Dispatch<
    React.SetStateAction<"light" | "dark" | "whiteLabel">
  >;
  customColors?: { primary: string; background: string; text: string };
  onCustomColorsChange?: (colors: {
    primary: string;
    background: string;
    text: string;
  }) => void;
}

const Header = ({
  favoriteCount = 0,
  themeName,
  setThemeName,
  customColors,
  onCustomColorsChange,
}: HeaderProps) => {
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [tempColors, setTempColors] = useState(
    customColors || {
      primary: "#F0141E",
      background: "#FFFFFF",
      text: "#000000",
    }
  );

  const handleThemeSelect = (theme: "light" | "dark" | "whiteLabel") => {
    setThemeName(theme);
    setShowThemeMenu(false);
    if (theme === "whiteLabel") {
      setShowColorPicker(true);
    }
  };

  const handleColorChange = (
    colorType: keyof typeof tempColors,
    value: string
  ) => {
    setTempColors((prev) => ({ ...prev, [colorType]: value }));
  };

  const applyCustomColors = () => {
    onCustomColorsChange?.(tempColors);
    setShowColorPicker(false);
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
          <HeaderText>Andreza Sousa - Teste de Front-end</HeaderText>
          {favoriteCount > 0 && <FavCount>❤️ {favoriteCount}</FavCount>}

          <ThemeContainer>
            <ThemeButton onClick={() => setShowThemeMenu(!showThemeMenu)}>
              {themeName === "light"
                ? "🌞"
                : themeName === "dark"
                ? "🌙"
                : "🎨"}
            </ThemeButton>

            <AnimatePresence>
              {showThemeMenu && (
                <ThemeMenu
                  as={motion.div}
                  initial={{ opacity: 0, y: -10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                >
                  <ThemeOption onClick={() => handleThemeSelect("light")}>
                    🌞 Light Mode
                  </ThemeOption>
                  <ThemeOption onClick={() => handleThemeSelect("dark")}>
                    🌙 Dark Mode
                  </ThemeOption>
                  <ThemeOption onClick={() => handleThemeSelect("whiteLabel")}>
                    🎨 White Label
                  </ThemeOption>
                </ThemeMenu>
              )}
            </AnimatePresence>
          </ThemeContainer>
        </Right>
      </Container>

      <AnimatePresence>
        {showColorPicker && (
          <ColorPickerOverlay
            as={motion.div}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowColorPicker(false)}
          >
            <ColorPickerModal
              as={motion.div}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ColorPickerTitle>Customize Your Colors</ColorPickerTitle>

              <ColorInputGroup>
                <ColorInputLabel>Primary Color</ColorInputLabel>
                <ColorInputWrapper>
                  <ColorInput
                    type="color"
                    value={tempColors.primary}
                    onChange={(e) =>
                      handleColorChange("primary", e.target.value)
                    }
                  />
                  <ColorTextInput
                    type="text"
                    value={tempColors.primary}
                    onChange={(e) =>
                      handleColorChange("primary", e.target.value)
                    }
                  />
                </ColorInputWrapper>
              </ColorInputGroup>

              <ColorInputGroup>
                <ColorInputLabel>Background Color</ColorInputLabel>
                <ColorInputWrapper>
                  <ColorInput
                    type="color"
                    value={tempColors.background}
                    onChange={(e) =>
                      handleColorChange("background", e.target.value)
                    }
                  />
                  <ColorTextInput
                    type="text"
                    value={tempColors.background}
                    onChange={(e) =>
                      handleColorChange("background", e.target.value)
                    }
                  />
                </ColorInputWrapper>
              </ColorInputGroup>

              <ColorInputGroup>
                <ColorInputLabel>Text Color</ColorInputLabel>
                <ColorInputWrapper>
                  <ColorInput
                    type="color"
                    value={tempColors.text}
                    onChange={(e) => handleColorChange("text", e.target.value)}
                  />
                  <ColorTextInput
                    type="text"
                    value={tempColors.text}
                    onChange={(e) => handleColorChange("text", e.target.value)}
                  />
                </ColorInputWrapper>
              </ColorInputGroup>

              <ColorPickerActions>
                <ColorPickerButton onClick={() => setShowColorPicker(false)}>
                  Cancel
                </ColorPickerButton>
                <ColorPickerButton $primary onClick={applyCustomColors}>
                  Apply Colors
                </ColorPickerButton>
              </ColorPickerActions>
            </ColorPickerModal>
          </ColorPickerOverlay>
        )}
      </AnimatePresence>
    </HeaderWrapper>
  );
};

export default Header;

const HeaderWrapper = styled.header`
  background: #131313;
  color: #ffffff;
  padding: 1rem 0;
  transition: all 0.3s ease;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 0 0.75rem;
  }
`;

const Left = styled.div`
  display: flex;
  align-items: center;
`;

const Right = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  @media (max-width: 768px) {
    gap: 0.75rem;
  }
`;

const Logo = styled.img`
  height: 40px;

  @media (max-width: 768px) {
    height: 32px;
  }
`;

const HeaderText = styled.span`
  font-size: 0.9rem;
  font-weight: 500;

  @media (max-width: 768px) {
    display: none;
  }
`;

const FavCount = styled.span`
  background: rgba(240, 20, 30, 0.2);
  color: #f0141e;
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-weight: 700;
  font-size: 0.9rem;
  border: 1px solid rgba(240, 20, 30, 0.3);

  @media (max-width: 768px) {
    padding: 0.3rem 0.6rem;
    font-size: 0.8rem;
  }
`;

const ThemeButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  color: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 0.5rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  font-weight: 600;
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-1px);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 1.1rem;
  }
`;

const ThemeContainer = styled.div`
  position: relative;
`;

const ThemeMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: #ffffff;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  z-index: 1000;
  min-width: 160px;
  margin-top: 8px;
  overflow: hidden;
`;

const ThemeOption = styled.button`
  width: 100%;
  padding: 0.75rem 1rem;
  background: transparent;
  border: none;
  color: #131313;
  text-align: left;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:hover {
    background: rgba(240, 20, 30, 0.1);
    color: #f0141e;
  }
`;

const ColorPickerOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  backdrop-filter: blur(4px);
`;

const ColorPickerModal = styled.div`
  background: #ffffff;
  border-radius: 16px;
  padding: 2rem;
  max-width: 400px;
  width: 90%;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
`;

const ColorPickerTitle = styled.h3`
  margin: 0 0 1.5rem 0;
  color: #131313;
  font-size: 1.25rem;
  font-weight: 700;
  text-align: center;
`;

const ColorInputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const ColorInputLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  color: #131313;
  font-weight: 600;
  font-size: 0.9rem;
`;

const ColorInputWrapper = styled.div`
  display: flex;
  gap: 0.75rem;
  align-items: center;
`;

const ColorInput = styled.input`
  width: 60px;
  height: 40px;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  cursor: pointer;
  background: none;

  &::-webkit-color-swatch-wrapper {
    padding: 0;
  }

  &::-webkit-color-swatch {
    border: none;
    border-radius: 6px;
  }
`;

const ColorTextInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  font-family: monospace;
  font-size: 0.9rem;

  &:focus {
    outline: none;
    border-color: #f0141e;
  }
`;

const ColorPickerActions = styled.div`
  display: flex;
  gap: 0.75rem;
  justify-content: flex-end;
  margin-top: 2rem;
`;

const ColorPickerButton = styled.button<{ $primary?: boolean }>`
  padding: 0.75rem 1.5rem;
  border: 2px solid ${({ $primary }) => ($primary ? "#F0141E" : "#E0E0E0")};
  background: ${({ $primary }) => ($primary ? "#F0141E" : "transparent")};
  color: ${({ $primary }) => ($primary ? "#FFFFFF" : "#131313")};
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px
      ${({ $primary }) =>
        $primary ? "rgba(240, 20, 30, 0.3)" : "rgba(0, 0, 0, 0.1)"};
  }
`;
