// User type
type User = {
  name: string;
  username: string;
  profile_image: { small: string };
  bio?: string;
  for_hire?: boolean;
};

// Unsplash photo interface
export interface UnsplashPhoto {
  id: string;
  urls: { regular: string };
  alt_description: string;
  user: User;
  created_at?: string;
  promoted_at?: string;
  updated_at?: string;
  links: { download: string };
  likes?: number;
  description?: string;
  width?: number;

  [Symbol.iterator](): Iterator<string>;
}
