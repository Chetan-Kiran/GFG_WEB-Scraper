import React from "react";
import GFG_scraper from "./GFG_scraper";
import "./GFG_scraper.css";
import Footer from "./Footer";

function App() {
  return (
    <div className="app-root">
      <main className="app-content">
        <h1 className="heading" style={{ color: "white" }}>
          GFG Leaderboard Scraper
        </h1>
        <GFG_scraper />
      </main>
      <Footer />
    </div>
  );
}

export default App;
