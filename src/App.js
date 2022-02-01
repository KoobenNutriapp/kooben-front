import './App.scss';
import NavBar from './components/NavBar'
import Buttons from "./components/Buttons/";
import NutFactTable from './components/NutFactTable';
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

      <NavBar />

      <h1 className='kooben-title'>K'óoben</h1>
      <Buttons  
        children="Haz favor de exportar"
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
        pill={true}
      />

      <Pills  
        children="high-calories"
        color="warning"
        pill={true}
      />

      <Pills  
        children="high-cholesterol"
        color="danger"
      />

      <NutFactTable
        portion={300} 
        energy={100}
        carbohydrate={100}
        sugars={100}
        fiber={100}
        protein={100}
        fat={100}
        saturated_fatty_acids={100}
        monounsaturated_fatty_acids={100}
        polyunsaturated_fatty_acids={100}
        cholesterol={100}
        glycemic_load={100}
        sodium={100}
        calcium={100}
        phosphorus={100}
        iron={100}
        potassium={100}
        magnesium={100}
        copper={100}
        zinc={100}
        manganese={100}
        selenium={100}
        lithium={100}
        vitA={100}
        carotene={100}
        bcarotene={100}
        vitB1={100}
        vitB2={100}
        vitB3={100}
        vitB6={100}
        vitB12={100}
        vitC={100}
        folicAc={100}
        vitD={100}
        vitE={100}
        vitK={100}
      />
    </div>
  );
}

export default App;
