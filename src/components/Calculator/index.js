import { useEffect, useState } from "react";
import { getRecipes } from "../../services/recipes";
import Alert from "@mui/material/Alert";
import { Container, Row, Col } from "reactstrap";
import SelectIngredient from "../../components/SelectIngredient";
import IngredientsDynamicTable from '../../components/IngredientsDynamicTable/'
import NutFactTable from '../../components/NutFactTable/'
import "./Calculator.scss";

function Calculator() {
  const [addIngredient, setAddIngredient] = useState(false);
  const [testIngredient, setTestIngredient] = useState([{name:"nopal 🌵",
      equivalence:{
        cup:5,
        spoon:30,
        piece:2,
        gram:110}}]);


  // useEffect(() => {
  //   const fetchData = async () => {
  //     const data = await getRecipes(search);
  //     const allRecipes = data.data.recipes;
  //     setRecipes(allRecipes);
  //     setCounter(allRecipes.length);
  //   };
  //   fetchData();
  // }, [search]);

  const handleAddIngredient = (e) => {
    e.preventDefault()
    setAddIngredient(true)
    console.log('Agregando ingrediente...');
  }
  
  return (
    <>
      <Col className="ingredientTable">
        <IngredientsDynamicTable 
        />
        <button
          className="btnAddIngredient" 
          onClick={handleAddIngredient}>Agrega ingrediente
        </button>
        <div className="selectBox">
          {addIngredient ? <SelectIngredient ingredients={testIngredient}/> : ''}
        </div>
      </Col>
      <Col className="nutritionalTable">
          <NutFactTable
          />
      </Col> 
    </>
  );
}

export default Calculator;
