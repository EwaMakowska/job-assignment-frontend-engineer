import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ArticlePreview } from "./ArticlePreview";
import { useAuthStore } from "../store/auth";
import type { Article } from "../types/api";

jest.mock("../api/client", () => ({
  apiClient: {
    post: jest.fn().mockResolvedValue({ data: { article: {} } }),
    delete: jest.fn().mockResolvedValue({ data: { article: {} } }),
  },
}));

const sampleArticle: Article = {
  slug: "how-to-train-your-dragon",
  title: "How to train your dragon",
  description: "Ever wondered how?",
  body: "It takes a Jacobian.",
  tagList: ["dragons"],
  createdAt: "2025-01-15T10:00:00.000Z",
  updatedAt: "2025-01-15T10:00:00.000Z",
  favorited: false,
  favoritesCount: 29,
  author: {
    username: "alice",
    bio: "",
    image: "",
    following: false,
  },
};

function renderWithProviders(
  ui: React.ReactElement
): ReturnType<typeof render> {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });
  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </MemoryRouter>
  );
}

beforeEach(() => {
  useAuthStore.setState({ token: null, user: null });
  jest.clearAllMocks();
});

describe("ArticlePreview", () => {
  test("renders title, description, author, and a human-readable date", () => {
    renderWithProviders(<ArticlePreview article={sampleArticle} />);
    expect(screen.getByText("How to train your dragon")).toBeInTheDocument();
    expect(screen.getByText("Ever wondered how?")).toBeInTheDocument();
    expect(screen.getByText("alice")).toBeInTheDocument();
    expect(screen.getByText("January 15th, 2025")).toBeInTheDocument();
  });

  test("favorite button is outlined when the article is not favorited", () => {
    renderWithProviders(<ArticlePreview article={sampleArticle} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("btn-outline-primary");
    expect(button).not.toHaveClass("btn-primary");
    expect(button).toHaveTextContent("29");
  });

  test("favorite button is filled when the article is favorited", () => {
    const article = { ...sampleArticle, favorited: true, favoritesCount: 30 };
    renderWithProviders(<ArticlePreview article={article} />);
    const button = screen.getByRole("button");
    expect(button).toHaveClass("btn-primary");
    expect(button).not.toHaveClass("btn-outline-primary");
  });

  test("clicking favorite while logged out does not call the API", () => {
    const { apiClient } = jest.requireMock("../api/client");
    renderWithProviders(<ArticlePreview article={sampleArticle} />);
    fireEvent.click(screen.getByRole("button"));
    expect(apiClient.post).not.toHaveBeenCalled();
    expect(apiClient.delete).not.toHaveBeenCalled();
  });
});
