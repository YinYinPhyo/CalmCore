import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import Card from '../../../components/Card/MainCard';



const ArticleDetail = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);


  useEffect(() => {
    fetch(`http://127.0.0.1:8000/articles/${id}`)
      .then(response => response.json())
      .then(data => setArticle(data))
      .catch(error => console.error('Error fetching article:', error));
  }, [id]);

  if (!article) {
    return <div>Loading...</div>;
  }
  return (
    <React.Fragment>
      <Row>
        <Col>
          <Card title={article.title} isOption>
            <p><b>Author:</b> {article.author}</p>
            <p><b>Published Date:</b>  &nbsp;
                        {new Date(article.published_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}</p>
            <p>
              <img width={600} height={500} src={article.thumbnail_url} alt="placeholder" />
            </p>
            <div className="row align-items-center justify-content-center">
              <p>
                <h5>&quot;{article.content}&quot;</h5>
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </React.Fragment>
  );


};

export default ArticleDetail;
