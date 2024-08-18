import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Table, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const BootstrapTableArticle = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {

    fetch("http://127.0.0.1:8000/articles/")
      .then(response => response.json())
      .then(data => setArticles(data))
      .catch(error => console.error('Error fetching articles:', error));
  }, []);

  const handleDelete = (articleId) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this article?");
    if (confirmDelete) {
      fetch(`http://127.0.0.1:8000/articles/${articleId}`, {
        method: 'DELETE',
      })
        .then(response => {
          if (response.ok) {
            setArticles(articles.filter(article => article.id !== articleId));
          } else {
            console.error('Failed to delete article:', response.statusText);
          }
        })
        .catch(error => console.error('Error deleting article:', error));
    }
  };

  return (
    <React.Fragment>
      <div>

        <Link to={`/add-articles`} >
          <Button
            variant="primary"
          >
            Add New Article
          </Button>
        </Link>

      </div>

      <Row>
        <Col>

          <Card>
            <Card.Header>
              <Card.Title as="h5">Article List</Card.Title>
              <span className="d-block m-t-5">
                Mindfulness articles about stress relief tips, benefits of mindfulness practices and morning, evening routines, etc.
              </span>
            </Card.Header>

            <Card.Body>
              <Table responsive hover>
                <thead>
                  <tr>
                    <th>No.</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Published Date</th>
                    <th>Operations</th>
                  </tr>
                </thead>
                <tbody>
                  {articles.map((article, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{article.title}</td>
                      <td>{article.author}</td>
                      <td>
                        <i className="fa fa-circle text-c-green f-10 m-r-15" />
                        {new Date(article.published_date).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                        </td>
                        
                      <td>
                        <Link to={`/articles/${article.id}`} >
                          <Button
                            variant="info"
                            size="sm"
                          >VIEW</Button>
                        </Link>
                        <Link to={`/edit-article/${article.id}`} >
                          <Button
                            variant="primary"
                            size="sm">
                            EDIT
                          </Button>
                        </Link>

                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(article.id)}>
                          DELETE
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

        </Col>
      </Row>
    </React.Fragment>
  );
}

export default BootstrapTableArticle;
