var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}function minSecs(t) {
  if (Math.floor(t / 60) < 10) {
    var integerPart = "0" + Math.floor(t / 60);
  } else {
    var integerPart = Math.floor(t / 60);
  }
  if (t - integerPart * 60 < 10) {
    var inter = "0" + String(t - integerPart * 60);
  } else {
    var inter = t - integerPart * 60;
  }

  return integerPart + ":" + inter;
}var

Clock = function (_React$Component) {_inherits(Clock, _React$Component);
  function Clock(props) {_classCallCheck(this, Clock);var _this = _possibleConstructorReturn(this, (Clock.__proto__ || Object.getPrototypeOf(Clock)).call(this,
    props));
    _this.state = {
      session: 1,
      breakLength: 300,
      sessionLength: 1500,
      timeLeft: 1500,
      timeParsed: "25:00",
      running: "NO",
      sessionOrBreak: "SESSION" };

    _this.breakChange = _this.breakChange.bind(_this);
    _this.sessionChange = _this.sessionChange.bind(_this);
    _this.reset = _this.reset.bind(_this);
    _this.startStopfnc = _this.startStopfnc.bind(_this);
    _this.sessionCount = _this.sessionCount.bind(_this);
    console.log(_this.state);return _this;
  }_createClass(Clock, [{ key: "breakChange", value: function breakChange(

    e) {
      var changeBreak;
      if (e.target.value === "Inc") {
        changeBreak = this.state.breakLength + 60 > 3600 ? 3600 : this.state.breakLength + 60;
      } else if (e.target.value === "Dec") {
        changeBreak = this.state.breakLength - 60 < 60 ? 60 : this.state.breakLength - 60;
      }
      this.setState(
      state = {
        breakLength: changeBreak });


      console.log(this.state);
    } }, { key: "sessionChange", value: function sessionChange(

    e) {
      var changeSession;
      if (e.target.value === "Inc") {
        changeSession = this.state.sessionLength + 60 > 3600 ? 3600 : this.state.sessionLength + 60;
      } else if (e.target.value === "Dec") {
        changeSession = this.state.sessionLength + 60 < 60 ? 60 : this.state.sessionLength - 60;
      }
      var totalTime = changeSession;
      var parsedTimeShown = minSecs(changeSession);
      this.setState(
      state = {
        sessionLength: changeSession,
        timeLeft: totalTime,
        timeParsed: parsedTimeShown });


      console.log(this.state);
    } }, { key: "sessionCount", value: function sessionCount()

    {
      console.log(this.state);
      if (this.state.timeLeft === 0) {
        if (this.state.sessionOrBreak === "SESSION") {
          var newTime = this.state.breakLength;
          var tempTime = minSecs(newTime);
          this.setState(
          state = {
            timeLeft: newTime,
            timeParsed: tempTime,
            sessionOrBreak: "BREAK" });


          this.audioOnZero.play();
        } else if (this.state.sessionOrBreak === "BREAK") {
          var newTime = this.state.sessionLength;
          var tempTime = minSecs(newTime);
          var tempSession = this.state.session + 1;
          this.setState(
          state = {
            timeLeft: newTime,
            timeParsed: tempTime,
            sessionOrBreak: "SESSION",
            session: tempSession });


          this.audioOnZero.play();
        }
        console.log("Session/Break change");
      } else {
        var newTime = this.state.timeLeft - 1;
        var tempTime = minSecs(newTime);
        this.setState(
        state = {
          timeLeft: newTime,
          timeParsed: tempTime });


      }
    } }, { key: "startStopfnc", value: function startStopfnc()

    {
      if (this.realTime && this.state.running === "YES") {
        this.realTime.stop();
        this.setState(
        state = {
          running: "NO" });


      } else if (this.state.timeParsed !== "00:00") {
        this.setState(
        state = {
          running: "YES" });


        this.realTime = moment.
        duration(1000).
        timer({ loop: true }, this.sessionCount);
      } else {
        var totalTime = this.state.sessionLength;
        this.setState(
        state = {
          timeLeft: totalTime,
          running: "YES" });


        this.realTime = moment.
        duration(1000).
        timer({ loop: true }, this.sessionCount);
      }
    } }, { key: "reset", value: function reset()

    {
      this.setState(
      state = {
        session: 1,
        breakLength: 300,
        sessionLength: 1500,
        timeLeft: 1500,
        timeParsed: "25:00",
        running: "NO",
        sessionOrBreak: "SESSION" });


      if (this.realTime) {
        this.realTime.stop();
      }
      this.audioOnZero.pause();
      this.audioOnZero.currentTime = 0;
      console.log(this.state);
    } }, { key: "render", value: function render()

    {var _this2 = this;
      return (
        React.createElement("div", { id: "containerMain" },
          React.createElement("div", { id: "gridBox" },
            React.createElement("div", { id: "break-label", "class": "clockTitles" },
              React.createElement("h2", null, "Break Length")),


            React.createElement("button", {
                id: "break-increment",
                "class": "clockBtns",
                onClick: this.breakChange,
                value: "Inc" }, "Break Increment"),



            React.createElement("h3", { id: "break-length", "class": "clockTitles" },
              this.state.breakLength / 60),

            React.createElement("button", {
                id: "break-decrement",
                "class": "clockBtns",
                onClick: this.breakChange,
                value: "Dec" }, "Break Decrement"),




            React.createElement("div", { id: "session-label", "class": "clockTitles" },
              React.createElement("h2", null, "Session Length")),


            React.createElement("button", {
                id: "session-increment",
                "class": "clockBtns",
                onClick: this.sessionChange,
                value: "Inc" }, "Session Increment"),



            React.createElement("h3", { id: "session-length", "class": "clockTitles" },
              this.state.sessionLength / 60),

            React.createElement("button", {
                id: "session-decrement",
                "class": "clockBtns",
                onClick: this.sessionChange,
                value: "Dec" }, "Session Decrement")),





          React.createElement("div", { id: "lowerGridBox" },
            React.createElement("h2", { id: "timer-label", "class": "clockTitles" },
              this.state.sessionOrBreak, " ", this.state.session),

            React.createElement("p", { id: "time-left", "class": "clockTitles" },
              this.state.timeParsed),

            React.createElement("button", { id: "start_stop", "class": "clockBtns", onClick: this.startStopfnc }, "start stop"),


            React.createElement("button", { id: "reset", "class": "clockBtns", onClick: this.reset }, "Reset")),



          React.createElement("audio", { id: "beep", preload: "auto", src: "https://static.sfdict.com/audio/lunawav/C07/C0704700.ogg", type: "audio/ogg", ref: function ref(audio) {_this2.audioOnZero = audio;} })));


    } }]);return Clock;}(React.Component);


var Footer = function Footer() {return (
    React.createElement("footer", null,
      React.createElement("p", null,
        React.createElement("span", null,
          " ",
          React.createElement("i", { className: "fab fa-react" }), " React,"),

        React.createElement("span", null, " Momentjs")),

      React.createElement("p", null, "Sounds under",

        React.createElement("a", { href: "https://creativecommons.org/licenses/by/3.0/us/", target: "_blank" },
          " ", "Attribution 3.0 Licence"),


        React.createElement("span", null, " from "),
        React.createElement("a", { href: "https://www.soundbible.com", target: "_blank" }, "soundbible.com")),



      React.createElement("p", null, "Coded by Evan Playle")));};



var App = function App() {return (
    React.createElement(React.Fragment, null,
      React.createElement("header", null,
        React.createElement("h1", null, "Pomodoro Clock")),

      React.createElement(Clock, null),
      React.createElement(Footer, null)));};



ReactDOM.render(React.createElement(App, null), document.getElementById("clock-div"));