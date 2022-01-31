import './App.scss';
import Buttons from "./components/Buttons/";
import Pills from "./components/Pills/";

function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <div className='title-container'>
      <h1 className='kooben-title'>K'óoben</h1>
      <Buttons  
        children="Exportar"
        size="sm"
        color="mexican-pink"
      />

      <Buttons
        children="Editar"
        size="lg"
        color="mayan-blue"
      />

      <Pills  
        children="high-fiber"
        color="success"
        pill="true"
      />

      <Pills  
        children="high-calories"
        color="warning"
        pill="true"
      />

      <Pills  
        children="high-cholesterol"
        color="danger"
      />
    </div>
  );
}

export default App;
