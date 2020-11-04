import React, { Component } from "react";
import Letter from "./Letter";

function shuffleWord(word) {
  const arra1 = word.split("");
  let ctr = arra1.length,
    temp,
    index;
  while (ctr > 0) {
    index = Math.floor(Math.random() * ctr);
    ctr--;
    temp = arra1[ctr];
    arra1[ctr] = arra1[index];
    arra1[index] = temp;
  }
  return arra1.join("");
}

class Words extends Component {
  state = {
    shuffled: "",
    clicked: [],
    wordFormed: "",
    indexClicked: [],
    hint: false,
    word: ""
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.word !== nextProps.word) {
      let shuff = shuffleWord(nextProps.word);
      while (shuff === nextProps.word) {
        shuff = shuffleWord(nextProps.word);
      }
      const clickedArr = [];
      nextProps.word.split("").map(() => {
        clickedArr.push(false);
      });

      return {
        word: nextProps.word,
        shuffled: shuff,
        clicked: clickedArr,
        wordFormed: "",
        hint: false
      };
    }
    return null;
  }

  letterClicked = index => {
    const newWord = this.state.wordFormed + this.state.shuffled.charAt(index);
    const clickedArr = this.state.clicked;
    clickedArr[index] = true;
    const clickedIndex = this.state.indexClicked;
    clickedIndex.push(index);
    this.setState({
      clicked: clickedArr,
      wordFormed: newWord,
      indexClicked: clickedIndex
    });
    if (this.state.word.length === newWord.length) {
      if (this.state.word === newWord) {
        this.props.next();
      } else {
        this.check(newWord);
      }
    }
  };

  check = word => {
    fetch(
      `https://od-api.oxforddictionaries.com/api/v1/entries/en/${word.toLowerCase()}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          app_id: "",
          app_key: ""
        }
      }
    )
      .then(response => {
        if (response && response.status === 200) {
          this.props.next();
        } else {
          const clickedArr = [];
          this.state.word.split("").map(() => {
            clickedArr.push(false);
          });
          this.setState({
            clicked: clickedArr,
            wordFormed: "",
            indexClicked: [],
            hint: false
          });
        }
      })
      .catch(() => {
        const clickedArr = [];
        this.state.word.split("").map(() => {
          clickedArr.push(false);
        });
        this.setState({
          clicked: clickedArr,
          wordFormed: "",
          indexClicked: [],
          hint: false
        });
      });
  };

  clearLast = () => {
    const lastIndex = this.state.indexClicked[
      this.state.indexClicked.length - 1
    ];
    const lastLetter = this.state.wordFormed.charAt(
      this.state.wordFormed.length - 1
    );
    const newWord = this.state.wordFormed.slice(
      0,
      this.state.wordFormed.length - 1
    );
    const clickedArr = this.state.clicked;
    clickedArr[lastIndex] = false;
    const newIndexArr = this.state.indexClicked.slice(
      0,
      this.state.indexClicked.length - 1
    );
    this.setState({
      clicked: clickedArr,
      wordFormed: newWord,
      indexClicked: newIndexArr
    });
  };

  render() {
    return (
      <div className="tc">
        <p>
          {this.state.shuffled.split("").map((character, index) => (
            <span>
              <Letter
                key={index}
                index={index}
                letter={character}
                clicked={this.state.clicked[index]}
                clickHandler={this.letterClicked}
              />
              <span className=""></span>
            </span>
          ))}
        </p>
        <p className="f3"> {this.state.wordFormed} </p>
        <div
          className={`ma3 pa2 br2 w-10-l w-20 ml-auto mr-auto bg-red ${
            this.state.wordFormed === "" ? "gray" : "white"
          }`}
          onClick={() => this.clearLast()}
          disabled={this.state.wordFormed === ""}
        >
          {" "}
          Clear{" "}
        </div>
      </div>
    );
  }
}

export default Words;
