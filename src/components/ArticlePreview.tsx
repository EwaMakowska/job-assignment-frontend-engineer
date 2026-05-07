import { Link } from "react-router-dom";
import { format, parseISO } from "date-fns";
import type { Article } from "../types/api";
import { AuthorAvatar } from "./AuthorAvatar";

interface Props {
  article: Article;
}

export function ArticlePreview({ article }: Props): JSX.Element {
  const date = format(parseISO(article.createdAt), "MMMM do, yyyy");
  const favClass = article.favorited ? "btn-primary" : "btn-outline-primary";

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
        <button className={`btn btn-sm pull-xs-right ${favClass}`}>
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
