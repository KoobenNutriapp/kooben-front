import { useEffect, useState } from "react";
import { getIngredients, getIngredientById } from "../../services/ingredient";
import { Col } from "reactstrap";
import SelectIngredient from "../../components/SelectIngredient";
import IngredientsDynamicTable from "../../components/IngredientsDynamicTable/";
import NutFactTable from "../../components/NutFactTable/";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import "./Calculator.scss";

function Calculator() {
  const [caca, setCaca] = useState([]);
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
      console.log(allIngredients);
      setIngredients(allIngredients);
    };
    fetchData();
  }, []);

  // useEffect(() => {
  //   const response = buildArrayOfIngredients
  //   setDetailTable(response)
  //   console.log(detailTable);
  // }, [ingredientTable]);

  const handleAddIngredient = (e) => {
    e.preventDefault();
    setAddIngredient(true);
    
  };

  // const getIdOfIngredients = (allIngredients) => {

  //     allIngredients?.map(items=>{
  //     console.log(items._id);
  //     requestById(items._id)
  //     return 
  //   })
  //   return
  // };
  
  // const requestById = async (id) => {
  //   const data = await getIngredientById(id)
  //   console.log(data);
  //   setIngredientTable([...ingredientTable,data])
  //   console.log(ingredientTable);
  // }

  // const buildArrayOfIngredients = ingredientTable?.map(ingredient => {
  //   let ingredients = {
  //       name:"",
  //       equivalence:{}
  //     }
  //     ingredients.name = ingredient.data.getIngredientById.name
  //     ingredients.equivalence = ingredient.data.getIngredientById.equivalence
  //     return ingredients
  // })

  useEffect(() => {
    setDetailTable(caca)
    console.log(detailTable.length);
  }, [caca]);

  const handleChange = (algo) =>{
    console.log(algo);
    setCaca([...caca,algo])
  }

  return (
    <>
      <Col className="ingredientTable">
        {/* <IngredientsDynamicTable ingredients={ingredientTable} /> */}
        <IngredientsDynamicTable ingredients={detailTable}/>
        <button className="btnAddIngredient" onClick={handleAddIngredient}>
          Agrega ingrediente
        </button>
        <div className="selectBox">
          {addIngredient ? (
            <Autocomplete
              className="tagsBox"
              multiple
              onChange={(e,selection) => handleChange(selection)}
              limitTags={4}
              id="multiple-limit-tags"
              options={ingredients}
              getOptionLabel={(option) => option.name}
              
              renderInput={(params) => (
              <TextField {...params} label="Tus ingredientes:" placeholder="Selecciona ingredientes"  />
            )}
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
