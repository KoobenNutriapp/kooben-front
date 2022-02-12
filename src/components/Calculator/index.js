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
  const [nutFacTable, setNutFactTable] = useState([]);
  const [operation, setOperation] = useState(null);
  const [typePortion, setTypePortion] = useState(null);
  const [firstSelection, setFirstSelection] = useState(false);
  const [quantity, setQuantity] = useState(0);

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
    const filteredIngredient = detailTable.filter(item=>{
      return item._id !== deleteIngredient
    })
    setDetailTable(filteredIngredient)
    setOperation('itemDeleted')
    setTypePortion(null)
    setFirstSelection(false)

  }

  const handleSelection = (selection) => {
   //selection ? setDetailTable([...detailTable,selection]) : console.log('empty');
   if(selection){
    setDetailTable([...detailTable,selection])
    setNutFactTable(selection)
    setOperation('add')
    setTypePortion('cup')
    setFirstSelection(true)
   }else{
    console.log('empty');
   }
  }

  const handleBypassToNutTable = ((ingredient,operation, portion, quantity) => {
    setNutFactTable(ingredient)
    setOperation(operation)
    setTypePortion(portion)
    setFirstSelection(false)
    setQuantity(quantity)
  })

  return (
    <>
      <Col className="ingredientTable">
        <IngredientsDynamicTable 
          ingredients={detailTable} 
          callback={filterDeletingItems}
          nutData={handleBypassToNutTable}
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
        <NutFactTable 
          ingredient={nutFacTable}
          operation={operation}
          typePortion={typePortion}
          firstSelection={firstSelection}  
          quantity={quantity}
        />
      </Col>
    </>
  );
}

export default Calculator;
