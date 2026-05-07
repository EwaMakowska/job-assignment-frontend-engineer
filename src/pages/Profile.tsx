import { useParams } from "react-router-dom";
import { useProfile } from "../hooks/useProfile";
import { useArticles } from "../hooks/useArticles";
import { AuthorAvatar } from "../components/AuthorAvatar";
import { ArticlePreview } from "../components/ArticlePreview";

export default function Profile(): JSX.Element {
  const { username } = useParams<{ username: string }>();
  const profileQuery = useProfile(username);
  const articlesQuery = useArticles({ author: username });

  if (profileQuery.isLoading) {
    return (
      <div className="profile-page">
        <div className="container">Loading profile...</div>
      </div>
    );
  }
  if (profileQuery.isError || !profileQuery.data) {
    return (
      <div className="profile-page">
        <div className="container">Could not load profile.</div>
      </div>
    );
  }

  const profile = profileQuery.data;
  const followClass = profile.following
    ? "btn-secondary"
    : "btn-outline-secondary";
  const followIcon = profile.following ? "ion-minus-round" : "ion-plus-round";
  const followLabel = profile.following ? "Unfollow" : "Follow";

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <AuthorAvatar
                src={profile.image}
                alt={profile.username}
                className="user-img"
              />
              <h4>{profile.username}</h4>
              <p>{profile.bio}</p>
              <button className={`btn btn-sm action-btn ${followClass}`}>
                <i className={followIcon} />
                &nbsp; {followLabel} {profile.username}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">
            <div className="articles-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <a className="nav-link active" href="">
                    My Articles
                  </a>
                </li>
                <li className="nav-item">
                  {/* Disabled: README scopes the profile page to "list of articles
                      written by that author" — favorited-by tab is out of scope. */}
                  <a className="nav-link disabled" href="">
                    Favorited Articles
                  </a>
                </li>
              </ul>
            </div>

            {articlesQuery.isLoading && (
              <div className="article-preview">Loading articles...</div>
            )}
            {articlesQuery.isError && (
              <div className="article-preview">Could not load articles.</div>
            )}
            {articlesQuery.data &&
              articlesQuery.data.articles.length === 0 && (
                <div className="article-preview">
                  This user hasn&apos;t written any articles yet.
                </div>
              )}
            {articlesQuery.data &&
              articlesQuery.data.articles.map((article) => (
                <ArticlePreview key={article.slug} article={article} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
