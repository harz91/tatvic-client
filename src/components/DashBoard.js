import React, { useEffect, useRef, useState } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import { Chart } from "react-google-charts";

export const options = {
  title: "Search by Hour",
  curveType: "function",
  legend: { position: "bottom" },
};

function DashBoard() {
  const graphData = [];

  const inputRef = useRef([]);

  const [dayCount, setDayCount] = new useState(0);
  const [hourCount, sethourCount] = new useState(0);
  const [graph, setGraph] = new useState([]);

  useEffect(() => {
    // var url = "https://us-central1-tatvic-demo.cloudfunctions.net/api/count";
    // var url = "http://127.0.0.1:5001/tatvic-demo/us-central1/api/count";
    var url = "http://127.0.0.1:4000/count";

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setDayCount(data.day);
        sethourCount(data.hour);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  function search() {
    function convertDate(dateString, hour) {
      var dateParts = dateString.split("-");

      // month is 0-based, that's why we need dataParts[1] - 1
      if (hour === "to")
        return new Date(
          +dateParts[2],
          dateParts[1] - 1,
          +dateParts[0],
          0,
          0,
          0
        );
      else if (hour === "from") {
        return new Date(
          +dateParts[2],
          dateParts[1] - 1,
          +dateParts[0],
          23,
          59,
          0
        );
      }
    }

    var toDate = convertDate(inputRef.current["to"].value, "to");
    var fromDate = convertDate(inputRef.current["from"].value, "from");

    console.log("toDate => " + fromDate + " => fromDate " + toDate);

    // var url = "https://us-central1-tatvic-demo.cloudfunctions.net/api/search";
    // var url = "http://127.0.0.1:5001/tatvic-demo/us-central1/api/search";
    var url = "http://127.0.0.1:4000/search";

    var params = {
      from: fromDate.toISOString(),
      to: toDate.toISOString(),
    };

    url = url + `?from=${params["from"]}&to=${params["to"]}`;
    // Object.keys(params).forEach(function(key) {
    //   url +=  key + "=" + params[key];
    // });

    console.log("URL => ", url);

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        graphData.push(["Time", "Searches"]);
        for (let index = 0; index < data.length; index++) {
          const element = data[index];
          graphData.push([
            `${element._id.day}-${element._id.month}-${element._id.year} ${element._id.hour}:00`,
            element.count,
          ]);
        }

        setGraph(graphData);

        console.log(graphData);
        console.log(graph);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  return (
    <Container>
      <Row style={{ top: "20%" }}>
        <Col className="justify-content-center">
          <Card>
            <Card.Body className="justify-content-center">
              <Card.Title className="text-center">
                Searches - Last 1 Day
              </Card.Title>
              <Card.Text>
                <h1 className="text-center">{dayCount}</h1>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col className="justify-content-center">
          <Card>
            <Card.Body className="justify-content-center">
              <Card.Title className="text-center">
                Searches - Last 1 Hour
              </Card.Title>
              <Card.Text>
                <h1 className="text-center">{hourCount}</h1>
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col>
          <Row className="align-items-center justify-content-center">
            <Col xs="auto">
              <Form.Label htmlFor="inlineFormInputGroup1" visuallyHidden>
                From
              </Form.Label>
              <InputGroup className="mb-2">
                <InputGroup.Text>From</InputGroup.Text>
                <Form.Control
                  ref={(el) => (inputRef.current["from"] = el)}
                  id="inlineFormInputGroup1"
                  placeholder="DD-MM-YYYY"
                />
              </InputGroup>
            </Col>
            <Col xs="auto">
              <Form.Label htmlFor="inlineFormInputGroup2" visuallyHidden>
                To
              </Form.Label>
              <InputGroup className="mb-2">
                <InputGroup.Text>To</InputGroup.Text>
                <Form.Control
                  ref={(el) => (inputRef.current["to"] = el)}
                  id="inlineFormInputGroup2"
                  placeholder="DD-MM-YYYY"
                />
              </InputGroup>
            </Col>
            <Col xs="auto">
              <Button type="submit" onClick={search} className="mb-2">
                Apply
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Col>
          <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={graph}
            options={options}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default DashBoard;
