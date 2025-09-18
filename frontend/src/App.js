import React from "react";
import GFG_scraper from "./GFG_scraper";
import Footer from "./Footer";

function App() {
  return (
    <div className="app-root">
      <main className="app-content">
        <h1 style={{marginLeft:540}}>GFG Leaderboard Scraper</h1>
        <GFG_scraper />
      </main>
      <Footer />
    </div>
  );
}

export default App;
