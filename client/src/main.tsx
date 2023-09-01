import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { StateContextProvider } from "./context/index.tsx";
// import { ThirdwebProvider } from "@thirdweb-dev/react";
// import { Sepolia } from "@thirdweb-dev/chains";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* <ThirdwebProvider activeChain={Sepolia} clientId={import.meta.env.VITE_CLIENT_ID}> */}
    <Router>
      {/* <StateContextProvider> */}
      <App />
      {/* </StateContextProvider> */}
    </Router>
    {/* </ThirdwebProvider> */}
  </React.StrictMode>
);
