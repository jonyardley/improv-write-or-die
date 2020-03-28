import React from "react";
import "./App.css";
import Writer from "./components/Writer";

const App: React.FC = () => {
  return (
    <div className="app">
      <header className="app-body">
        <h1>Write or Die!</h1>
        <p>
          Write a story and don't stop. After two seconds you die. Deleting
          stuff doesn't count as writing so keep those ideas flowing.
        </p>
      </header>
      <section>
        <Writer />
      </section>
    </div>
  );
};

export default App;
