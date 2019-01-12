var _createClass = function () {function defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}return function (Constructor, protoProps, staticProps) {if (protoProps) defineProperties(Constructor.prototype, protoProps);if (staticProps) defineProperties(Constructor, staticProps);return Constructor;};}();function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self, call) {if (!self) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call && (typeof call === "object" || typeof call === "function") ? call : self;}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } });if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;}var DrumApp = function (_React$Component) {_inherits(DrumApp, _React$Component);
  function DrumApp(props) {_classCallCheck(this, DrumApp);var _this = _possibleConstructorReturn(this, (DrumApp.__proto__ || Object.getPrototypeOf(DrumApp)).call(this,
    props));
    _this.state = {
      descriptiveText: "This is going to change into the output" };

    _this.playAudio = _this.playAudio.bind(_this);
    _this.handleKeyBtn = _this.handleKeyBtn.bind(_this);return _this;
  }_createClass(DrumApp, [{ key: 'componentDidMount', value: function componentDidMount()

    {
      document.addEventListener('keydown', this.handleKeyBtn);
    } }, { key: 'componentWillUnmount', value: function componentWillUnmount()

    {
      document.removeEventListener('keydown', this.handleKeyBtn);
    } }, { key: 'playAudio', value: function playAudio(

    e) {
      var findAudioBtn = e.target.querySelector('audio').id;
      document.getElementById(findAudioBtn).play();
      var findText = e.target.value;
      console.log(findText);
      this.setState(state = {
        descriptiveText: findText });

    } }, { key: 'handleKeyBtn', value: function handleKeyBtn(

    e) {
      var findAudioClick = e.key.toUpperCase();
      document.getElementById(findAudioClick).play();
      this.setState(state = {
        descriptiveText: findAudioClick });

    } }, { key: 'render', value: function render()

    {
      return (

        React.createElement('div', { id: 'display' },
          React.createElement('h1', null, 'Pick a greeting Mixer'),
          React.createElement('h2', null, this.state.descriptiveText),

          React.createElement('div', { id: 'buttonBox' },
            React.createElement('button', { id: 'soundHello', value: 'Hello', 'class': 'drum-pad', onClick: this.playAudio }, 'Q',
              React.createElement('audio', { id: 'Q', value: 'Hello', 'class': 'clip', src: 'https://static.sfdict.com/audio/lunawav/H01/H0178500.ogg', type: 'audio/ogg' })),
            React.createElement('button', { id: 'soundHowdy', value: 'Howdy', 'class': 'drum-pad', onClick: this.playAudio }, 'W',
              React.createElement('audio', { id: 'W', 'class': 'clip', src: 'https://static.sfdict.com/audio/lunawav/H04/H0411800.ogg', type: 'audio/ogg' })),
            React.createElement('button', { id: 'soundAcknowledgment', value: 'Acknowledgement', 'class': 'drum-pad', onClick: this.playAudio }, 'E',
              React.createElement('audio', { id: 'E', 'class': 'clip', src: 'https://static.sfdict.com/audio/lunawav/A00/A0089600.ogg', type: 'audio/ogg' })),
            React.createElement('button', { id: 'soundSalutation', value: 'Salutation', 'class': 'drum-pad', onClick: this.playAudio }, 'A',
              React.createElement('audio', { id: 'A', 'class': 'clip', src: 'https://static.sfdict.com/audio/lunawav/S00/S0053100.ogg', type: 'audio/ogg' })),
            React.createElement('button', { id: 'soundCompliments', value: 'Compliments', 'class': 'drum-pad', onClick: this.playAudio }, 'S',
              React.createElement('audio', { id: 'S', 'class': 'clip', src: 'https://static.sfdict.com/audio/lunawav/C07/C0704700.ogg', type: 'audio/ogg' })),
            React.createElement('button', { id: 'soundHowDoYouDo', value: 'How Do You Do?', 'class': 'drum-pad', onClick: this.playAudio }, 'D',
              React.createElement('audio', { id: 'D', 'class': 'clip', src: 'https://static.sfdict.com/audio/lunawav/H04/H0411600.ogg', type: 'audio/ogg' })),
            React.createElement('button', { id: 'soundAttention', value: 'Attention', 'class': 'drum-pad', onClick: this.playAudio }, 'Z',
              React.createElement('audio', { id: 'Z', 'class': 'clip', src: 'https://static.sfdict.com/audio/lunawav/A07/A0793700.ogg', type: 'audio/ogg' })),
            React.createElement('button', { id: 'soundShalom', value: 'Shalom (Hebrew)', 'class': 'drum-pad', onClick: this.playAudio }, 'X',
              React.createElement('audio', { id: 'X', 'class': 'clip', src: 'https://static.sfdict.com/audio/lunawav/S04/S0404800.ogg', type: 'audio/ogg' })),
            React.createElement('button', { id: 'soundBonjour', value: 'Bonjour (French)', 'class': 'drum-pad', onClick: this.playAudio }, 'C',
              React.createElement('audio', { id: 'C', 'class': 'clip', src: 'https://static.sfdict.com/audio/lunawav/B04/B0487800.ogg', type: 'audio/ogg' })))));




    } }]);return DrumApp;}(React.Component);


var Footer = function Footer() {return (
    React.createElement('footer', null,
      React.createElement('p', null,
        React.createElement('span', null, ' ', React.createElement('i', { className: 'fab fa-react' }), ' React,')),

      React.createElement('p', null, 'Coded by Evan Playle')));};




var App = function App() {return (
    React.createElement(React.Fragment, null,
      React.createElement('header', null,
        React.createElement('h1', null, 'Drum Machine')),

      React.createElement(DrumApp, null),
      React.createElement(Footer, null)));};





ReactDOM.render(
React.createElement(App, null),
document.getElementById("drum-machine"));