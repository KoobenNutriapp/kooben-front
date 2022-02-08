import { useEffect, useState } from "react";
import { getIngredients, getIngredientById } from "../../services/ingredient";
import { Col } from "reactstrap";
import SelectIngredient from "../../components/SelectIngredient";
import IngredientsDynamicTable from "../../components/IngredientsDynamicTable/";
import NutFactTable from "../../components/NutFactTable/";
import "./Calculator.scss";

function Calculator() {
  const [addIngredient, setAddIngredient] = useState(false);
  const [ingredients, setIngredients] = useState([
    { name: "No se encontraron ingredientes 💔" },
  ]);
  const [ingredientTable, setIngredientTable] = useState([]);
  const [detailTable, setDetailTable] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getIngredients();
      const allIngredients = data.data.ingredients;
      setIngredients(allIngredients);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const response = buildArrayOfIngredients
    setDetailTable(response)
    console.log(detailTable);
  }, [ingredientTable]);

  const handleAddIngredient = (e) => {
    e.preventDefault();
    setAddIngredient(true);
    
  };

  const getIdOfIngredients = (allIngredients) => {
      allIngredients?.map(items=>{
      console.log(items);
      requestById(items)
      return 
    })
    return
  };
  
  const requestById = async (id) => {
    const data = await getIngredientById(id)
    console.log(data);
    setIngredientTable([...ingredientTable,data])
    console.log(ingredientTable);
  }

  // const cleanArray = (array) => {
  //   const uniqueKeys = [...new Set(array)]
  //   return uniqueKeys
  // }


  const cleanArray = ingredientTable.reduce((acc,ing)=>{
    if(!acc.includes(ing)){
      acc.push(ing);
    }
    return acc;
  },[])




 console.log(cleanArray);

  console.log(getIdOfIngredients());

  const buildArrayOfIngredients = ingredientTable?.map(ingredient => {
    let ingredients = {
        name:"",
        equivalence:{}
      }
      ingredients.name = ingredient.data.getIngredientById.name
      ingredients.equivalence = ingredient.data.getIngredientById.equivalence
      return ingredients
  })

  return (
    <>
      <Col className="ingredientTable">
        {/* <IngredientsDynamicTable ingredients={ingredientTable} /> */}
        <IngredientsDynamicTable />
        <button className="btnAddIngredient" onClick={handleAddIngredient}>
          Agrega ingrediente
        </button>
        <div className="selectBox">
          {addIngredient ? (
            <SelectIngredient
              ingredients={ingredients}
              callback={getIdOfIngredients}
            />
          ) : (
            ""
          )}
        </div>
      </Col>
      <Col className="nutritionalTable">
        <NutFactTable />
      </Col>
    </>
  );
}

export default Calculator;
