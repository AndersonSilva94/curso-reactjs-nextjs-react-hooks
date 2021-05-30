import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [reverse, setReverse] = useState(false); //fala de apenas uma coisa de dentro do estado, apenas uma chave e seu valor. Ex: reverse(key): false(value)
  const [counter, setCounter] = useState(0);
  const reverseClass = reverse ? 'reverse' : '';

  const handleClick = () => {
    setReverse((prevState) => !prevState);
  };

  const handleIncrement = () => {
    setCounter((prevState) => prevState + 1);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className={`App-logo ${reverseClass}`} alt="logo" />

        <h1>Contador: {counter}</h1>
        <p>
          <button type="button" onClick={handleClick}>
            Reverse {reverseClass}
          </button>
        </p>
        <p>
          <button type="button" onClick={handleIncrement}>
            Increment
          </button>
        </p>
      </header>
    </div>
  );
}

/* class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);

    this.state = {
      reverse: false,
    };
  }

  handleClick = () => {
    const { reverse } = this.state;
    this.setState({ reverse: !reverse });
  };

  render() {
    const { reverse } = this.state;
    const reverseClass = reverse ? 'reverse' : '';

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className={`App-logo ${reverseClass}`} alt="logo" />
          <button type="button" onClick={this.handleClick}>
            Reverse {reverseClass}
          </button>
        </header>
      </div>
    );
  }
} */

export default App;
