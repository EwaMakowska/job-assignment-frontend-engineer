import { Link, useHistory, useParams } from "react-router-dom";
import { format, parseISO } from "date-fns";
import { useArticle } from "../hooks/useArticle";
import { useFavorite } from "../hooks/useFavorite";
import { useFollow } from "../hooks/useFollow";
import { useAuthStore } from "../store/auth";
import { AuthorAvatar } from "../components/AuthorAvatar";
import type { Article as ArticleT } from "../types/api";

export default function Article(): JSX.Element {
  const { slug } = useParams<{ slug: string }>();
  const { data: article, isLoading, isError } = useArticle(slug);

  if (isLoading) {
    return (
      <div className="article-page">
        <div className="container page">Loading article...</div>
      </div>
    );
  }
  if (isError || !article) {
    return (
      <div className="article-page">
        <div className="container page">Could not load article.</div>
      </div>
    );
  }

  return (
    <div className="article-page">
      <div className="banner">
        <div className="container">
          <h1>{article.title}</h1>
          <ArticleMeta article={article} />
        </div>
      </div>

      <div className="container page">
        <div className="row article-content">
          <div className="col-md-12">
            {article.body
              .split(/\n\n+/)
              .map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
          </div>
        </div>

        <hr />

        <div className="article-actions">
          <ArticleMeta article={article} />
        </div>

        {/* Comments are decorative scaffolding — README: "ignore implementation of comment section". */}
        <div className="row">
          <div className="col-xs-12 col-md-8 offset-md-2">
            <form className="card comment-form">
              <div className="card-block">
                <textarea className="form-control" placeholder="Write a comment..." rows={3} />
              </div>
              <div className="card-footer">
                <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                <button className="btn btn-sm btn-primary">Post Comment</button>
              </div>
            </form>

            <div className="card">
              <div className="card-block">
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              </div>
              <div className="card-footer">
                <a href="/#/profile/jacobschmidt" className="comment-author">
                  <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                </a>
                &nbsp;
                <a href="/#/profile/jacobschmidt" className="comment-author">
                  Jacob Schmidt
                </a>
                <span className="date-posted">Dec 29th</span>
              </div>
            </div>

            <div className="card">
              <div className="card-block">
                <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
              </div>
              <div className="card-footer">
                <a href="/#/profile/jacobschmidt" className="comment-author">
                  <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                </a>
                &nbsp;
                <a href="/#/profile/jacobschmidt" className="comment-author">
                  Jacob Schmidt
                </a>
                <span className="date-posted">Dec 29th</span>
                <span className="mod-options">
                  <i className="ion-edit" />
                  <i className="ion-trash-a" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ArticleMeta({ article }: { article: ArticleT }): JSX.Element {
  const history = useHistory();
  const user = useAuthStore((s) => s.user);
  const favoriteMutation = useFavorite();
  const followMutation = useFollow();

  const date = format(parseISO(article.createdAt), "MMMM do, yyyy");
  const followClass = article.author.following
    ? "btn-secondary"
    : "btn-outline-secondary";
  const followIcon = article.author.following
    ? "ion-minus-round"
    : "ion-plus-round";
  const followLabel = article.author.following ? "Unfollow" : "Follow";
  const favClass = article.favorited ? "btn-primary" : "btn-outline-primary";

  const onFavorite = (): void => {
    if (!user) {
      history.push("/login");
      return;
    }
    favoriteMutation.mutate(article);
  };

  const onFollow = (): void => {
    if (!user) {
      history.push("/login");
      return;
    }
    followMutation.mutate(article.author);
  };

  return (
    <div className="article-meta">
      <Link to={`/profile/${article.author.username}`}>
        <AuthorAvatar
          src={article.author.image}
          alt={article.author.username}
        />
      </Link>
      <div className="info">
        <Link to={`/profile/${article.author.username}`} className="author">
          {article.author.username}
        </Link>
        <span className="date">{date}</span>
      </div>
      <button
        type="button"
        className={`btn btn-sm ${followClass}`}
        onClick={onFollow}
      >
        <i className={followIcon} />
        &nbsp; {followLabel} {article.author.username}
      </button>
      &nbsp;&nbsp;
      <button
        type="button"
        className={`btn btn-sm ${favClass}`}
        onClick={onFavorite}
      >
        <i className="ion-heart" />
        &nbsp; Favorite Post{" "}
        <span className="counter">({article.favoritesCount})</span>
      </button>
    </div>
  );
}
