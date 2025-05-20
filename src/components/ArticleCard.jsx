

const ArticleCard = ({articles}) => {

  return (
    <div>
        {articles.map((article) => (
        <div key={article.article_id}  className="article-card">
        <h3>{article.topic}</h3>
        <p>Date posted: {article.created_at}</p>
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