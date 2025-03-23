import { UnsplashPhoto } from "./UnspashPhoto";

export interface Collection {
  id: string;
  name: string;
  description: string;
  type: "private" | "public";
  images: UnsplashPhoto[];
}

export interface CollectionState {
  collections: Collection[];
}