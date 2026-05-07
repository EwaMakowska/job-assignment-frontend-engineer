/**
 * Hand-written types from `docs/schema/swagger.json`.
 * Only includes the API surface used by this app — see NOTES.md.
 */

export interface Profile {
  username: string;
  bio: string;
  image: string;
  following: boolean;
}

export interface User {
  email: string;
  token: string;
  username: string;
  bio: string;
  image: string;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Profile;
}

// Request bodies

export interface LoginUserRequest {
  user: {
    email: string;
    password: string;
  };
}

// Response wrappers

export interface UserResponse {
  user: User;
}

export interface ProfileResponse {
  profile: Profile;
}

export interface SingleArticleResponse {
  article: Article;
}

export interface MultipleArticlesResponse {
  articles: Article[];
  articlesCount: number;
}

// Error shape returned by the API on validation / auth failures

export interface ApiErrorBody {
  errors: Record<string, string[]>;
}
