export default function ArticleCardBody({ article }) {
  return (
    <div className={`${article.isBook ? 'absolute' : ' '}`}>Card body</div>
  );
}