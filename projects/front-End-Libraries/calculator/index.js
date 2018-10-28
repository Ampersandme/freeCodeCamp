var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var Calculator = function (_React$Component) {_inherits(Calculator, _React$Component);
  function Calculator(props) {_classCallCheck(this, Calculator);var _this = _possibleConstructorReturn(this, (Calculator.__proto__ || Object.getPrototypeOf(Calculator)).call(this,
    props));
    _this.state = {
      outputBox: 0,
      firstNum: "",
      firstDec: false,
      math: "",
      secNum: "",
      secDec: false };

    _this.add = _this.add.bind(_this);
    _this.finalState = _this.finalState.bind(_this);
    _this.clearState = _this.clearState.bind(_this);return _this;
  }_createClass(Calculator, [{ key: "add", value: function add(

    e) {
      var addedChar = e.target.value;
      if (/[^0-9+/*-]$/.test(this.state.firstNum) && addedChar === '0' || /[^0-9+/*-]$/.test(this.state.secNum) && addedChar === '0') {
        console.log('hello');
        var test = parseFloat(this.state.outputBox).toFixed(1);
        this.setState(state = {
          outputBox: test });

      } else
      if (/[0-9]/.test(addedChar) && this.state.math === "") {
        console.log('1');
        var curChars = this.state.firstNum;
        var together = parseFloat(curChars + addedChar);
        console.log(together);
        this.setState(state = {
          outputBox: together,
          firstNum: together });

      } else
      if (/[.]/.test(addedChar) && !/[.]/.test(this.state.firstNum) && this.state.math === "") {
        console.log('2');
        var _curChars = this.state.firstNum;
        var _together = _curChars + addedChar;
        console.log(parseFloat(_together).toFixed(1));
        if (!this.state.firstDec) {
          this.setState(state = {
            firstDec: true });

          this.setState(state = {
            outputBox: _together + "0",
            firstNum: _together });

        }
      } else
      if (/[.]/.test(addedChar) && !/[.]/.test(this.state.secNum) && this.state.secNum !== "") {
        console.log('3');
        var _curChars2 = this.state.secNum;
        var _together2 = _curChars2 + addedChar;
        if (!this.state.secDec) {
          this.setState(state = {
            secDec: true });

          this.setState(state = {
            outputBox: _together2 + "0",
            secNum: _together2 });

        } else
        {
          this.setState(state = {
            outputBox: _curChars2 + "0",
            secNum: _curChars2 });

        }
      } else
      if (/[0-9]/.test(addedChar)) {
        console.log('4');
        var _curChars3 = this.state.secNum;
        var _together3 = parseFloat(_curChars3 + addedChar);
        this.setState(state = {
          outputBox: this.state.firstNum + this.state.math + _together3,
          secNum: _together3 });

      } else
      if (/[+-/*]/.test(addedChar) && addedChar !== '.' && this.state.secNum === "") {
        console.log('5');
        var sign = addedChar;
        this.setState(state = {
          outputBox: this.state.firstNum + sign,
          math: sign });

      } else
      if (/[+-/*]/.test(addedChar) && addedChar !== '.') {
        console.log('6');
        this.finalState();
        var _sign = addedChar;
        this.setState(state = {
          math: _sign });

      } else
      if (addedChar === '.') {
        console.log('7');
      } else
      {
        console.log('8');
        this.finalState();
      }
      console.log(this.state);
    } }, { key: "finalState", value: function finalState(

    e) {
      var rtn = eval(this.state.firstNum + this.state.math + this.state.secNum);
      this.setState(state = {
        outputBox: rtn,
        firstNum: rtn,
        firstDec: true,
        math: "",
        secNum: "",
        secDec: false });

    } }, { key: "clearState", value: function clearState()

    {
      this.setState(state = {
        outputBox: 0,
        firstNum: "",
        firstDec: false,
        math: "",
        secNum: "",
        secDec: false });

    } }, { key: "render", value: function render()


    {
      return (
        React.createElement("div", { id: "calc" },
          React.createElement("h1", { id: "calcTitle" }, "FxX-hello123"),
          React.createElement("h2", { id: "display" }, this.state.outputBox),
          React.createElement("div", { id: "btnContainer" },
            React.createElement("button", { id: "clear", "class": "calcBtn", onClick: this.clearState }, "A/C"),

            React.createElement("button", { id: "divide", "class": "calcBtn", onClick: this.add, value: "/" }, "/"),
            React.createElement("button", { id: "multiply", "class": "calcBtn", onClick: this.add, value: "*" }, "*"),

            React.createElement("button", { id: "seven", "class": "calcBtn", onClick: this.add, value: "7" }, "7"),
            React.createElement("button", { id: "eight", "class": "calcBtn", onClick: this.add, value: "8" }, "8"),
            React.createElement("button", { id: "nine", "class": "calcBtn", onClick: this.add, value: "9" }, "9"),

            React.createElement("button", { id: "subtract", "class": "calcBtn", onClick: this.add, value: "-" }, "-"),


            React.createElement("button", { id: "four", "class": "calcBtn", onClick: this.add, value: "4" }, "4"),
            React.createElement("button", { id: "five", "class": "calcBtn", onClick: this.add, value: "5" }, "5"),
            React.createElement("button", { id: "six", "class": "calcBtn", onClick: this.add, value: "6" }, "6"),

            React.createElement("button", { id: "add", "class": "calcBtn", onClick: this.add, value: "+" }, "+"),



            React.createElement("button", { id: "one", "class": "calcBtn", onClick: this.add, value: "1" }, "1"),
            React.createElement("button", { id: "two", "class": "calcBtn", onClick: this.add, value: "2" }, "2"),
            React.createElement("button", { id: "three", "class": "calcBtn", onClick: this.add, value: "3" }, "3"),

            React.createElement("button", { id: "equals", "class": "calcBtn", onClick: this.finalState }, "="),
            React.createElement("button", { id: "zero", "class": "calcBtn", onClick: this.add, value: "0" }, "0"),
            React.createElement("button", { id: "decimal", "class": "calcBtn", onClick: this.add, value: "." }, "."))));




    } }]);return Calculator;}(React.Component);


ReactDOM.render(
React.createElement(Calculator, null),
document.getElementById('calculator-div'));