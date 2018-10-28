var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var renderer = new marked.Renderer();

marked.setOptions({
  breaks: true,
  renderer: renderer,
  sanitize: true });var



MarkdownEditor = function (_React$Component) {_inherits(MarkdownEditor, _React$Component);
  function MarkdownEditor(props) {_classCallCheck(this, MarkdownEditor);var _this = _possibleConstructorReturn(this, (MarkdownEditor.__proto__ || Object.getPrototypeOf(MarkdownEditor)).call(this,
    props));
    _this.handleChange = _this.handleChange.bind(_this);
    _this.state = { value: "# H1 \n## H2 \n[the real kevin, A link](https://i.pinimg.com/originals/eb/52/04/eb520458224fa5bb49fad7d05c6a12a9.jpg) \nWill the real Kevin **Please stand up!**\n\nHeres some code, `<div></div>`, between 2 backticks.\n\n```\nvar chilli !== true\n```\n\n> I am a god eh\n\n\n![the thing i do best](https://i.pinimg.com/originals/eb/52/04/eb520458224fa5bb49fad7d05c6a12a9.jpg)\n\n- the god of chilli\n- possibly commited fraud\n* other things\n* even more other things\n                  " };return _this;




















  }_createClass(MarkdownEditor, [{ key: "handleChange", value: function handleChange(

    e) {
      this.setState({ value: e.target.value });
    } }, { key: "getRawMarkup", value: function getRawMarkup()

    {
      //const md = new Remarkable();
      return { __html: marked(this.state.value) };
    } }, { key: "render", value: function render()


    {
      return (
        React.createElement("div", { className: "MarkdownEditor" },
          React.createElement("h3", { id: "inputLabel" }, "Input"),
          React.createElement("label", { id: "editor-label", htmlFor: "editor" }, "Enter some markdown"),


          React.createElement("textarea", {
            id: "editor",
            rows: "15",
            cols: "100",
            onChange: this.handleChange,
            defaultValue: this.state.value }),

          React.createElement("h3", { id: "outputLabel" }, "Output"),
          React.createElement("div", { id: "preview",
            className: "content",
            dangerouslySetInnerHTML: this.getRawMarkup() })));



    } }]);return MarkdownEditor;}(React.Component);


var Footer = function Footer() {return (
    React.createElement("footer", null,
      React.createElement("p", null,
        React.createElement("span", null, " ", React.createElement("i", { className: "fab fa-react" }), " React,")),

      React.createElement("p", null, "Coded by Evan Playle")));};



var App = function App() {return (
    React.createElement(React.Fragment, null,
      React.createElement("header", null,
        React.createElement("h1", null, "Markdown Previewer")),

      React.createElement(MarkdownEditor, null),
      React.createElement(Footer, null)));};




ReactDOM.render(React.createElement(App, null), document.getElementById('content'));