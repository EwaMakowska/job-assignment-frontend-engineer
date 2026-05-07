import { Link, useHistory } from "react-router-dom";
import { format, parseISO } from "date-fns";
import type { Article } from "../types/api";
import { AuthorAvatar } from "./AuthorAvatar";
import { useFavorite } from "../hooks/useFavorite";
import { useAuthStore } from "../store/auth";

interface Props {
  article: Article;
}

export function ArticlePreview({ article }: Props): JSX.Element {
  const history = useHistory();
  const user = useAuthStore((s) => s.user);
  const favoriteMutation = useFavorite();

  const date = format(parseISO(article.createdAt), "MMMM do, yyyy");
  const favClass = article.favorited ? "btn-primary" : "btn-outline-primary";

  const onFavorite = (): void => {
    if (!user) {
      history.push("/login");
      return;
    }
    favoriteMutation.mutate(article);
  };

  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/profile/${article.author.username}`}>
          <AuthorAvatar
            src={article.author.image}
            alt={article.author.username}
          />
        </Link>
        <div className="info">
          <Link
            to={`/profile/${article.author.username}`}
            className="author"
          >
            {article.author.username}
          </Link>
          <span className="date">{date}</span>
        </div>
        <button
          type="button"
          className={`btn btn-sm pull-xs-right ${favClass}`}
          onClick={onFavorite}
        >
          <i className="ion-heart" /> {article.favoritesCount}
        </button>
      </div>
      <Link to={`/${article.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
      </Link>
    </div>
  );
}
