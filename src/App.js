import React, { useRef, useState } from "react";
import CodeMirror from "react-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import "./App.css";
import domtoimage from "dom-to-image";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, Button, Row, Col } from "react-bootstrap";

const initialCode = `// Enter code here...

`;

function App() {
  const [screenshot, setScreenshot] = useState(null);
  const codeRef = useRef(null);

  const takePic = () => {
    domtoimage
      .toPng(codeRef.current)
      .then(dataUrl => setScreenshot(dataUrl))
      .catch(error => {
        console.error("oops, something went wrong!", error);
      });
  };

  return (
    <React.Fragment>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Navbar.Brand>Code Screenshots</Navbar.Brand>
      </Navbar>
      <div class="container-fluid">
        <Row>
          <Col className="column">
            <div ref={codeRef}>
              <CodeMirror
                value={initialCode}
                options={{
                  mode: "javascript",
                  lineNumbers: true,
                  theme: "material",
                  viewportMargin: Infinity
                }}
                onChange={() => {
                  setScreenshot(null);
                }}
              />
            </div>
          </Col>
          <Col className="column">
            {screenshot ? (
              <img src={screenshot} alt="Code screenshot" />
            ) : (
              <div className="preview-area">
                Your screenshot will appear here...
              </div>
            )}
          </Col>
        </Row>
        <Row>
          <Col className="text-center column">
            <Button onClick={() => takePic()}>Generate Screenshot</Button>
          </Col>
        </Row>
        <Row>
          <Col className="text-center column">
            Created by <a href="https://www.twitter.com/nas5w">Nick Scialli</a>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}
export default App;
