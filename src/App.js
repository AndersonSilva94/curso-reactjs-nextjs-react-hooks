import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';

const eventFn = () => {
  console.log('Primeiro h1 clicado');
};

function App() {
  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(0);

  // componentDidUpdate - executa toda vez que o component atualiza
  /* useEffect(() => {
    console.log('componentDidUpdate');
  }); */ // o primeiro parâmetro é uma callback que será executada toda vez que o componente for atualizado

  // componentDidMount - executa uma vez
  useEffect(() => {
    document.querySelectorAll('h1')[0]?.addEventListener('click', eventFn);
    // console.log('componentDidMount');

    // componentWillAmount - limpeza
    return () => {
      document.querySelectorAll('h1')[0]?.removeEventListener('click', eventFn);
    };
  }, []); // não pode ter dependência, pois será executado apenas uma vez

  // com dependência - executa toda vez que a dependência mudar
  useEffect(() => {
    console.log('contador mudou para', counter);
  }, [counter]); // é preciso passar um segundo parâmetro que são as dependências

  return (
    <div className="App">
      <h1>Contador 1: {counter}</h1>
      <button onClick={() => setCounter(counter + 1)}>+</button>
      <h1>Contador 2: {counter2}</h1>
      <button onClick={() => setCounter2(counter2 + 1)}>+ (2)</button>
    </div>
  );
}

// como o componente é montado através de classes
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

// aula sobre criação de useState()
/* function App() {
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
} */

export default App;
