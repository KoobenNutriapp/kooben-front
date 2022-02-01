import './App.scss';
import NavBar from './components/NavBar'
import Buttons from "./components/Buttons/";
import NutFactTable from './components/NutFactTable';
import Pills from "./components/Pills/";
import IngredientsTable from "./components/IngredientsTable";
import FiltersTable from './components/FiltersTable';

function App() {

  const ingredients = [
    {
      name:"nopal",
      equivalence:{
        cup:60,
        spoon:5,
        piece:110,
        gram:1
      }
    },
    {
      name:"jitomate",
      equivalence:{
        cup:40,
        spoon:7,
        piece:80,
        gram:1
      }
    },
    {
      name:"cebolla",
      equivalence:{
        cup:50,
        spoon:8,
        piece:70,
        gram:1
      }
    }
  ]

  const newIngredient=[
    {
      name:"perejil",
      equivalence:{
        cup:50,
        spoon:8,
        piece:70,
        gram:1
      }
    }
  ]

  const handleAddIngredient = (e) =>{
    const join = [...ingredients,...newIngredient]
    console.log(join);
    return
  }


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

<div className="tempDivider"></div>


      <Buttons  
        children="Haz favor de exportar"
        size="sm"
        color="mexican-pink"
      />

<div className="tempDivider"></div>

      <Buttons
        children="Editar"
        size="lg"
        color="mayan-blue"
      />

<div className="tempDivider"></div>

      <Pills  
        children="high-fiber"
        color="success"
        pill={true}
      />

<div className="tempDivider"></div>

      <Pills  
        children="high-calories"
        color="warning"
        pill={true}
      />

<div className="tempDivider"></div>

      <Pills  
        children="high-cholesterol"
        color="danger"
      />

<div className="tempDivider"></div>

      <NutFactTable
        portion={300} 
        energy={100}
        carbohydrate={100}
        dvCarbohydrate={2}
        sugars={100}
        fiber={100}
        dvFiber={2}
        glycemic_load={10}
        protein={100}
        fat={100}
        dvFat={2}
        saturated_fatty_acids={100}
        dvSaturated_fatty_acids={2}
        monounsaturated_fatty_acids={100}
        dvMonounsaturated_fatty_acids={2}
        polyunsaturated_fatty_acids={100}
        dvPolyunsaturated_fatty_acids={2}
        cholesterol={100}
        dvCholesterol={2}
        sodium={100}
        dvSodium={2}
        calcium={100}
        dvCalcium={2}
        phosphorus={100}
        dvPhosphorus
        iron={100}
        dvIron={2}
        potassium={100}
        dvPotassium={2}
        magnesium={100}
        dvMagnesium={2}
        copper={100}
        dvCopper={2}
        zinc={100}
        dvZinc={2}
        manganese={100}
        dvManganese={2}
        selenium={100}
        dvSelenium={2}
        lithium={100}
        dvLithium={2}
        vitA={100}
        dvVitA={2}
        carotene={100}
        dvCarotene={2}
        bcarotene={100}
        dvBcarotene={2}
        vitB1={100}
        dvVitB1={2}
        vitB2={100}
        dvVitB2={2}
        vitB3={100}
        dvVitB3={2}
        vitB6={100}
        dvVitB6={2}
        vitB12={100}
        dvVitB12={2}
        vitC={100}
        dvVitC={2}
        folicAc={100}
        dvFolicAc={2}
        vitD={100}
        dvVitD={2}
        vitE={100}
        dvVitE={2}
        vitK={100}
        dvVitK={2}
      />

<div className="tempDivider"></div>

      <IngredientsTable 
        ingredients={ingredients} 
      />

      <Buttons  
        children="Agrega ingrediente"
        size="sm"
        color="mexican-pink"
        callback={handleAddIngredient}
      />

<div className="tempDivider"></div>

      <FiltersTable />

<div className="tempDivider"></div>

    </div>
  );
}

export default App;
