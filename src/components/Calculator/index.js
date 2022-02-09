import { useEffect, useState } from "react";
import { getIngredients } from "../../services/ingredient";
import { Col } from "reactstrap";
import IngredientsDynamicTable from "../../components/IngredientsDynamicTable/";
import NutFactTable from "../../components/NutFactTable/";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import "./Calculator.scss";

function Calculator() {
  const [addIngredient, setAddIngredient] = useState(false);
  const [ingredients, setIngredients] = useState([])
  const [detailTable, setDetailTable] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getIngredients();
      const allIngredients = data.ingredients;
      setIngredients(allIngredients);
    };
    fetchData();
  }, []);

  const options = ingredients?.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  const handleAddIngredient = (e) => {
    e.preventDefault();
    setAddIngredient(true);
    
  };

  const filterDeletingItems = (deleteIngredient) =>{
    const test = detailTable.filter(item=>{
      return item._id !== deleteIngredient
    })
    setDetailTable(test)
  }

  const handleSelection = (sel) => {
   sel ? setDetailTable([...detailTable,sel]) : console.log('empty');
  }

  return (
    <>
      <Col className="ingredientTable">
        <IngredientsDynamicTable 
          ingredients={detailTable} 
          callback={filterDeletingItems}
        />
        <button className="btnAddIngredient" onClick={handleAddIngredient}>
          Agrega ingrediente
        </button>
        <div className="selectBox">
          {addIngredient ? (
          <Autocomplete
            size='small'
            options={options?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
            groupBy={(option) => option.firstLetter}
            getOptionLabel={(option) => option.name}
            renderInput={(params) => <TextField {...params} label="Agrega un ingrediente" />}
            className="selectIngredient"
            onChange={(e,selection) => handleSelection(selection)}
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
