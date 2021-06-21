// import PropTypes from 'prop-types';
import React, { createContext, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
// import PropTypes from 'prop-types';
// import './App.css';

const useMyHook = (cb, delay = 1000) => {
  const savedCb = useRef();

  useEffect(() => {
    savedCb.current = cb;
  }, [cb]);

  useEffect(() => {
    const interval = setInterval(() => {
      savedCb.current();
    }, delay);
    return () => clearInterval(interval);
  }, [delay]);
};

function App() {
  const [counter, setCounter] = useState(0);
  const [delay, setDelay] = useState(1000);
  const [incrementor, setIncrementor] = useState(100);

  useMyHook(() => setCounter((c) => c + 1), delay);

  return (
    <div>
      <h1>Contador: {counter}</h1>
      <h1>Delay: {delay}</h1>
      <button
        onClick={() => {
          setDelay((d) => d + incrementor);
        }}
      >
        +{incrementor}
      </button>
      <button
        onClick={() => {
          setDelay((d) => d - incrementor);
        }}
      >
        -{incrementor}
      </button>
      <input type="number" value={incrementor} onChange={(e) => setIncrementor(Number(e.target.value))} />
    </div>
  );
}

// **************************************************************************
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

// **************************************************************************
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

// ***********************************************************************
// aula sobre useEffect()
/* const eventFn = () => {
  console.log('Primeiro h1 clicado');
};

function App() {
  const [counter, setCounter] = useState(0);
  const [counter2, setCounter2] = useState(0);

  // componentDidUpdate - executa toda vez que o component atualiza
  useEffect(() => {
    console.log('componentDidUpdate');
  }); // o primeiro parâmetro é uma callback que será executada toda vez que o componente for atualizado

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
} */

//************************************************************************
// aula sobre useCallback()
/* const Button = React.memo(function Button({ incrementButton }) {
  console.log('Filho renderizou');
  return <button onClick={() => incrementButton(10)}>+</button>;
}); // React.memo salva a estrutura do componente e caso ele não mude, o componente não será re-renderizado.

function App() {
  const [counter, setCounter] = useState(0);

  const incrementCounter = useCallback((num) => {
    setCounter((counter) => counter + 1);
  }, []);
  //useCallback salva o estado da função e só re-renderiza a mesma caso esta tenha sofrido algum alteração, sendo assim, o uso de depedências é altamente desaconselhável

  console.log('Pai renderizou');

  return (
    <div className="App">
      <p>Teste</p>
      <h1>Contador: {counter}</h1>
      <Button incrementButton={incrementCounter} />
    </div>
  );
}

Button.propTypes = {
  incrementButton: PropTypes.func,
}; */

// *************************************************************************
// aula sobre useMemo()
/* const Post = ({ post }) => {
  console.log('Filho renderizou');
  return (
    <div key={post.id} className="post">
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

function App() {
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState('');
  console.log('Pai renderizou');

  //componentDidMount
  useEffect(() => {
    setTimeout(() => {
      fetch('https://jsonplaceholder.typicode.com/posts')
        .then((r) => r.json())
        .then((r) => setPosts(r));
    }, 5000);
  }, []);

  return (
    <div className="App">
      <p>
        <input type="search" value={value} onChange={(e) => setValue(e.target.value)} />
      </p>
      {useMemo(() => {
        return posts.length > 0 && posts.map((post) => <Post key={post.id} post={post} />);
      }, [posts])}
      {posts.length <= 0 && <p>Ainda não existem posts.</p>}
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
}; */

// ************************************************************************
// aula sobre useRef()
/* const Post = ({ post, handleClick }) => {
  console.log('Filho renderizou');
  return (
    <div key={post.id} className="post">
      <h1 style={{ fontSize: '14px' }} onClick={() => handleClick(post.title)}>
        {post.title}
      </h1>
      <p>{post.body}</p>
    </div>
  );
};

function App() {
  const [posts, setPosts] = useState([]);
  const [value, setValue] = useState('');
  const input = useRef(null);
  const contador = useRef(0);

  console.log('Pai renderizou');

  //componentDidMount
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((r) => r.json())
      .then((r) => setPosts(r));
  }, []);

  useEffect(() => {
    input.current.focus();
    console.log(input.current);
  }, [value]);

  useEffect(() => {
    contador.current++;
  });

  const handleClick = (value) => {
    setValue(value);
  };

  return (
    <div className="App">
      <h6>Renderizou: {contador.current}x</h6>
      <p>
        <input ref={input} type="search" value={value} onChange={(e) => setValue(e.target.value)} />
      </p>
      {useMemo(() => {
        return posts.length > 0 && posts.map((post) => <Post key={post.id} post={post} handleClick={handleClick} />);
      }, [posts])}
      {posts.length <= 0 && <p>Ainda não existem posts.</p>}
    </div>
  );
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
  handleClick: PropTypes.func,
}; */

// *************************************************************************
// aula sobre useContext() - parte 1
/* const globalState = {
  title: 'O título do contexto',
  body: 'O body do contexto',
  counter: 0,
};

const GlobalContext = React.createContext();

// desabilitar eslint em uma linha específica
// eslint-disable-next-line
const Div = ({ children }) => {
  return (
    <>
      <H1 />
      <P />
    </>
  );
};

// desabilitar eslint em uma linha específica
// eslint-disable-next-line
const H1 = ({ children }) => {
  const theContext = useContext(GlobalContext);
  const {
    contextState: { title, counter },
  } = theContext;
  return (
    <h1>
      {title} {counter}
    </h1>
  );
};

// desabilitar eslint em uma linha específica
// eslint-disable-next-line
const P = ({ children }) => {
  const theContext = useContext(GlobalContext);
  const {
    contextState: { body, counter },
    contextState,
    setContextState,
  } = theContext;
  // return <p onClick={() => setContextState({ ...contextState, counter: counter + 1 })}>{body}</p>;
  return <p onClick={() => setContextState((s) => ({ ...s, counter: s.counter + 1 }))}>{body}</p>;
};

function App() {
  const [contextState, setContextState] = useState(globalState);

  return (
    <GlobalContext.Provider value={{ contextState, setContextState }}>
      <Div />
    </GlobalContext.Provider>
  );
} */

// **********************************************************************
// aula sobre useContext() - parte 2
/* import { AppContext } from './contexts/AppContext';
import { Div } from './components/Div';

function App() {
  return (
    <AppContext>
      <Div />
    </AppContext>
  );
} */

// **********************************************************************
// aula sobre useReducer()
/* const globalState = {
  title: 'O título do contexto',
  body: 'O body do contexto',
  counter: 0,
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'COUNTER':
      return { ...state, title: 'Mudou' };
    case 'INVERT': {
      const { title } = state;
      return {
        ...state,
        title: title.split('').reverse().join(''),
      };
    }
    case 'GET_DATE':
      return {
        ...state,
        title: action.payload,
      };
  }
  return { ...state };
};

function App() {
  //primeiro parâmetro: função de reducer, segundo parâmetro: estado inicial
  // retorna o estado que foi passado com estado inicial, e uma função de dispatch que será usada quando uma ação for realizada
  const [state, dispatch] = useReducer(reducer, globalState);
  const { counter, title, body } = state;

  return (
    <div>
      <h1>
        {title} {counter}
      </h1>
      <button onClick={() => dispatch({ type: 'COUNTER' })}>Click</button>
      <button onClick={() => dispatch({ type: 'INVERT' })}>Invert</button>
      <button
        onClick={() =>
          dispatch({
            type: 'GET_DATE',
            payload: new Date().toLocaleString('pt-BR'),
          })
        }
      >
        Get Date
      </button>
    </div>
  );
} */

// **************************************************************************
// aula sobre useContext() + useReducer()
// actions.js
/* export const actions = {
  CHANGE_TITLE: 'CHANGE_TITLE',
};

// data.js
export const globalState = {
  title: 'O título do contexto',
  body: 'O body do contexto',
  counter: 0,
};

// reducer.js
export const reducer = (state, action) => {
  switch (action.type) {
    case actions.CHANGE_TITLE: {
      console.log('Muda título');
      return { ...state, title: action.payload };
    }
  }
  return { ...state };
};

// AppContext.jsx
export const Context = createContext();
export const AppContext = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, globalState);

  const changeTitle = (payload) => {
    dispatch({ type: actions.CHANGE_TITLE, payload });
  };

  return <Context.Provider value={{ state, changeTitle }}>{children}</Context.Provider>;
};

AppContext.propTypes = {
  children: PropTypes.node,
};

// H1/index.jsx
export const H1 = () => {
  const context = useContext(Context);
  const inputRef = useRef();

  return (
    <>
      <h1 onClick={() => context.changeTitle(inputRef.current.value)}>{context.state.title}</h1>
      <input type="text" ref={inputRef} />
    </>
  );
};

// App.jsx
function App() {
  return (
    <AppContext>
      <div>
        <H1 />
      </div>
    </AppContext>
  );
} */

export default App;
