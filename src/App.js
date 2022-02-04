import './App.scss';
import NavBar from './components/NavBar'
import Buttons from "./components/Buttons/";
import NutFactTable from './components/NutFactTable';
import Pills from "./components/Pills/";
import IngredientsDynamicTable from "./components/IngredientsDynamicTable";
// import RecipeCard from './components/RecipeCards';
import FiltersTable from './components/FiltersTable';
import IngredientsStaticTable from './components/IngredientsStaticTable';
import CreateTitleInput from './components/CreateTitleInput';
import SelectIngredient from './components/SelectIngredient';
import UploadImage from './components/UploadImage';
import TagsManager from './components/TagsManager';
import Modals from './components/Modals';
import MainSearchBar from './components/MainSearchBar';
import RecipeCards from './components/RecipeCards'
import ProcedureStep from './components/StepsProcedureInputs';


function App() {

  const ingredients = [
    {
      name:"nopal 🌵",
      equivalence:{
        cup:5,
        spoon:30,
        piece:2,
        gram:110
      }
    },
    {
      name:"jitomate 🍅",
      equivalence:{
        cup:4,
        spoon:20,
        piece:1,
        gram:70
      }
    },
    {
      name:"cebolla 🧅",
      equivalence:{
        cup:3,
        spoon:15,
        piece:1,
        gram:65
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

  const tagsArr=[
    { key: 0, label: '🥦healthy' },
    { key: 1, label: '💀 prehispanic' },
    { key: 2, label: '🍏low-calories' },
    { key: 3, label: '🍆high-fiber' },
    { key: 3, label: '🍕high-calories' },
    { key: 3, label: '🍉low_sodium' },
    { key: 3, label: '🥩high-proteins' },
    { key: 3, label: '🍦low_sugars' },
    { key: 3, label: '🥝low_fat' },
    { key: 3, label: '🍣low_cholesterol' },
    { key: 3, label: '🥒low_glycemic_load' },
    { key: 3, label: '🍟high-sugars' },
    { key: 3, label: '🍔high-cholesterol' },
  ]

  const handleAddIngredient = (e) =>{
    const join = [...ingredients,...newIngredient]
    console.log(join);
    return
  }
  
  const handleModal = (e) => {
    console.log('Ejecutar cuando se acepta');
  }

  //data only for card-recipe testing ====================
  
  const testingData = {
    recipeTitle: "Ensalada de nopales",
    recipeSynopsis: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer. This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    imageURL: 'https://d1uz88p17r663j.cloudfront.net/resized/57a0e0353946ed412490f56d78087f6c_Ensalada_de_nopales_1200_600.png',
    tags: [
      "gluten-free",
      "prehispanic",
      "low_calories",
      "high_fiber"
    ]
  }

  const {recipeTitle, recipeSynopsis, imageURL, tags} = testingData
  const altImage = recipeTitle
  const url = imageURL
  const title = recipeTitle
  const synopsis = recipeSynopsis
  const listOfTags = tags

  const synopsis2 = 'Un manjar de agua dulce que, si todvía no has probado, te estás perdiendo de mucho.'

//=======================================================
  
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
        children="Crear receta"
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

      <IngredientsStaticTable
        ingredients={ingredients} 
      />

<div className="tempDivider"></div>

      <IngredientsDynamicTable 
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

      {/* <RecipeCard
      AltImage={altImage}
      SrcImage={url}
      RecipeTitle={title}
      RecipeDescription={synopsis}
      tagsArray={listOfTags}
      /> */}

<div className="tempDivider"></div>

<CreateTitleInput />

<div className="tempDivider"></div>

      <SelectIngredient
        ingredients={ingredients}  
      />

<div className="tempDivider"></div>

      <TagsManager 
        tags={tagsArr}
      />

<div className="tempDivider"></div>

      <Modals 
        buttonText={'Insert here your button text or variable'}
        header={'Insert here your header or variable'}
        body={'Insert here your body or variable'}
        footerOK={'Aceptar'}
        footerNOK={'No aceptar'}
        callback={handleModal}
      />

<div className="tempDivider"></div>


      <MainSearchBar />


<div className="tempDivider"></div>

      <UploadImage />


<div className="tempDivider"></div>

<RecipeCards

AltImage={altImage}
SrcImage={url}
RecipeTitle={title}
RecipeDescription={synopsis}
tagsArray={listOfTags}

/>

<RecipeCards

AltImage={altImage}
SrcImage={url}
RecipeTitle={title}
RecipeDescription={synopsis2}
tagsArray={listOfTags}

/>
<div className="tempDivider"></div>

<ProcedureStep />

    </div>
  );
}

export default App;
