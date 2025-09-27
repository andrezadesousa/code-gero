import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    background: string;
    text: string;
    primary: string;
    card: string;
  }
}

declare module "*.png" {
  const value: string;
  export default value;
}
