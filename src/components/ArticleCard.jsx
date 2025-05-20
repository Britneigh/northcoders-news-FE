

const ArticleCard = ({articles, onClick}) => {

  return (
    <div>
        {articles.map((article) => (
        <div onClick={() => onClick(article.article_id)} key={article.article_id} className="article-card">
        <h3>{article.topic}</h3>
        <p>Date posted: {new Date(article.created_at).toLocaleDateString('en-GB', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        })}</p>
        <p>{article.author}</p>
        <h2>{article.title}</h2>
        <p>{article.votes}</p>
        <button>Votes icon</button>
        <p>{article.comment_count}</p>
        <button>Comment count icon</button>
        </div>
        ))}
    </div>
  )
}

export default ArticleCard;