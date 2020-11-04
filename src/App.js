import React, { Component } from "react";
import Game from "./components/Game";
import wordRush from "./new.jpg";

class App extends Component {
  render() {
    return (
      <div
        className="App vw-100 vh-100 pa1"
        style={{
          backgroundImage: `url(${wordRush})`,
          backgroundPosition: "center"
        }}
      >
        <header className="tc pv4 pv5-ns fw7 f2 navy"> WORD RUSH </header>
        <Game className="bg-white" />
      </div>
    );
  }
}

export default App;
