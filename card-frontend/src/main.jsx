import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

const cards = [
  {
    id: 1,
    company: "Topps",
    description: "Curry rookie Card",
    notes: "Autographed",
    submissionType: "Super Express",
    status: "Pending",
  },
  {
    id: 2,
    company: "Fleer",
    description: "Durant rookie Card",
    notes: null,
    submissionType: "Express",
    status: "Pending",
  },
  {
    id: 3,
    company: "Panini",
    description: "Doncic rookie Card",
    notes: "Autographed",
    submissionType: "Walk Through",
    status: "Pending",
  },
];

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App cards={cards} />
  </React.StrictMode>
);
