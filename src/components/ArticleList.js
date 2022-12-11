import React, { useState, useRef } from "react";
import parse from "html-react-parser";

import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";
import { Link } from "react-router-dom";

const ArticleList = () => {
  const inputRef = useRef(null);

  const [articles, setArticles] = useState([]);

  function search() {
    console.log("Search Executed");
    const searchStr = inputRef.current.value;
    var url = "https://en.wikipedia.org/w/api.php";

    var params = {
      action: "query",
      list: "search",
      srsearch: searchStr,
      format: "json",
    };

    url = url + "?origin=*";
    Object.keys(params).forEach(function(key) {
      url += "&" + key + "=" + params[key];
    });

    console.log("URL => ", url);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setArticles(data.query.search);
      })
      .catch((err) => {
        console.log(err.message);
      });

    fetch("http://127.0.0.1:5001/tatvic-demo/us-central1/api/add_log", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: searchStr,
        createdAt: new Date().toISOString(),
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  }

  return (
    <Container>
      <Row>
        <Col>
          <Row className="align-items-center">
            <Col xs="auto">
              <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                Search
              </Form.Label>
              <Form.Control
                ref={inputRef}
                className="mb-2"
                id="inlineFormInput"
                placeholder="Search"
              />
            </Col>
            <Col xs="auto">
              <Button type="submit" onClick={search} className="mb-2">
                Search
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Title</th>
                <th>Summary</th>
              </tr>
            </thead>
            <tbody>
              {articles.map((article, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <Link to={`/article/${article.title}`}>
                        {article.title}
                      </Link>
                    </td>
                    <td>{parse(article.snippet)}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default ArticleList;
