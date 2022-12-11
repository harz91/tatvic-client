import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

function Article(props) {
  let { title } = useParams();
  const [content, setContent] = useState("");

  useEffect(() => {
    const url =
      "https://en.wikipedia.org/w/api.php?" +
      new URLSearchParams({
        origin: "*",
        action: "parse",
        page: title,
        format: "json",
      });

    console.log("URL => ", url);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setContent(data.parse.text["*"]);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      <h1>{title}</h1>
      <div>{parse(content)}</div>
    </>
  );
}

export default Article;
