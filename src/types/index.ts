export interface Thumbnail {
  path: string;
  extension: string;
}

export interface ListItem {
  name: string;
  resourceURI: string;
  type?: string;
}

export interface Related {
  available: number;
  collectionURI: string;
  items: ListItem[];
  returned: number;
}

export interface Character {
  id: number;
  name: string;
  description: string;
  modified: string;
  thumbnail: Thumbnail;
  resourceURI: string;
  comics: Related;
  series: Related;
  stories: Related;
  events: Related;
  urls: { type: string; url: string }[];
}

export const lightTheme = {
  background: "#ffffff",
  text: "#20232a",
  primary: "#eb8015",
  card: "#f5f5f5",
};

export const darkTheme = {
  background: "#20232a",
  text: "#ffffff",
  primary: "#61dafb",
  card: "#2c2f36",
};

export const whiteLabelTheme = {
  background: "#f0f0ff",
  text: "#333333",
  primary: "#8a2be2",
  card: "#e6e6fa",
};
