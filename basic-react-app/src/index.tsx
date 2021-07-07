import React from "react";
import ReactDOM from "react-dom";
import * as ABB from "@abb/abb-common-ux-react";

import "@abb/abb-common-ux-react/styles.css";

ReactDOM.render(
  <React.StrictMode>
    <ABB.AppContainer theme={"light"} style={{ width: "100%", height: "98vh" }}>
      <ABB.AbbBar productName="Basic React App" />
      <ABB.AppContent style={{ width: "100%" }}>
        <ABB.AppMainContent>
          <p>Hello World</p>
        </ABB.AppMainContent>
      </ABB.AppContent>
      <ABB.AppFooter showCopyright={true} showLogo={false} />
    </ABB.AppContainer>
  </React.StrictMode>,
  document.getElementById("root")
);
