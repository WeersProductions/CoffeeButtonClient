import React from "react";
import ReactDOM from "react-dom";
import FancyTime from "./fancyClock/FancyTime";
import Quote from "./Quote";

import openSocket from "socket.io-client";

import "./styles.css";
import "./text.css";
const socket = openSocket("http://localhost:8000");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hour1: 0, hour2: 0, minute1: 0, minute2: 0 };
  }

  i = 9;
  componentDidMount() {
    setInterval(() => {
      this.IncreaseMinute();
    }, 1000);
    socket.on("refresh", data => {
      console.log("Received refresh");
      this.setState({ hour1: 0, hour2: 0, minute1: 0, minute2: 0 });
    });
  }

  IncreaseMinute() {
    let newMin1 = this.state.minute1 + 1;
    let newMin2 = this.state.minute2;
    let newHour1 = this.state.hour1;
    let newHour2 = this.state.hour2;
    if (newMin1 > 9) {
      newMin1 = 0;
      newMin2 += 1;
      if (newMin2 > 5) {
        newMin2 = 0;
        newHour1 += 1;
        if (newHour1 > 9) {
          newHour1 = 0;
          newHour2 += 1;
          this.setState({ hour2: newHour2 });
        }
        this.setState({ hour1: newHour1 });
      }
      this.setState({ minute2: newMin2 });
    }
    this.setState({ minute1: newMin1 });
  }

  ShowTime = (hours, minutes) => {
    const hours_string = String(hours);
    const minutes_string = String(minutes);
    this.setState({
      hour1: hours_string.charAt(0),
      hour2: hours_string.charAt(1),
      minutes1: minutes_string.charAt(0),
      minute2: minutes_string.charAt(1)
    });
  };

  ShowNumber = number => {
    if (!this.wrap) {
      return;
    }
    this.wrap.removeAttribute("class");
    // this.wrap.classList.remove("wrap-" + number - 1);
    setTimeout(() => {
      this.wrap.classList.add("wrap-" + number);
    });
  };

  render() {
    const { hour1, hour2, minute1, minute2 } = this.state;
    return (
      <div className="App">
        <h1>Huize 5-2 Koffie Knop</h1>
        <h2>[INSERT QUOTE HERE]</h2>
        <div style={{ transform: "scale(0.5)" }}>
          <Quote text="FLofje" />
        </div>

        <div>
          <FancyTime number={hour2} />
          <FancyTime number={hour1} />
          H
          <FancyTime number={minute2} />
          <FancyTime number={minute1} />M
        </div>
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
