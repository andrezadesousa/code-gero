export interface Thumbnail {
  path: string;
  extension: string;
}

export interface ListItem {
  resourceURI: string;
  name: string;
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
