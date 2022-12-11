import React, { useEffect, useContext, useState } from "react";
import { signInWithGoogle } from "../services/firebase";
import { UserContext } from "../providers/UserProvider";
import { Navigate } from "react-router-dom";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function Login() {
  const user = useContext(UserContext);
  const [redirect, setredirect] = useState(null);

  useEffect(() => {
    if (user) {
      setredirect("/search");
    }
  }, [user]);
  if (redirect) {
    return <Navigate to={redirect} />;
  }
  return (
    <Container>
      <Row>
        <Col>
          <div className="login-center">
            <h1>Sign In</h1>
            <Button className="mt-4" onClick={signInWithGoogle}>
              Sign in with Google
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
