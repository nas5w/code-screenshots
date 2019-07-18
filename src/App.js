import React, { useRef, useState } from "react";
import CodeMirror from "react-codemirror";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/material.css";
import "codemirror/mode/javascript/javascript";
import "./App.css";
import domtoimage from "dom-to-image";

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
    <div className="row">
      <div className="column">
        <div ref={codeRef}>
          <CodeMirror
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
      </div>
      <div className="column">
        {screenshot ? (
          <img src={screenshot} alt="Code screenshot" />
        ) : (
          <button onClick={() => takePic()}>Generate Screenshot</button>
        )}
      </div>
    </div>
  );
}
export default App;
