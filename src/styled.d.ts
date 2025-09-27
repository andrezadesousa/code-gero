import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    background: string;
    text: string;
    primary: string;
    card: string;
    accent: string;
    muted: string;
    border: string;
  }
}

declare module "*.png" {
  const value: string;
  export default value;
}
