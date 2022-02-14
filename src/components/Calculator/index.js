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
    console.log(deleteIngredient);
    const filteredIngredient = detailTable.filter(item=>{
      return item._id !== deleteIngredient
    })
    setDetailTable(filteredIngredient)
    setOperation(deleteIngredient)
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
    //¿porque no puedo leer el ingredient._id la primera vez????
    console.log(ingredient);
    //console.log('operation' + operation);
    console.log('portion: ' + portion);
    console.log(quantity);



    detailTable.map(item=>{
      //console.log(item._id);
      if(item._id === ingredient._id){
        console.log('ids iguales');
        if(portion==='cup'){
          console.log('entra a cup');
          console.log(item.equivalence.gram);
          console.log(item.equivalence.cup);
          item.equivalence.gram = (quantity * item.equivalence.gram) / 2
        }else if(portion==='piece'){
          console.log('entra a piece');
          item.equivalence.gram = quantity * item.equivalence.gram
        }else if(portion==='spoon'){
          console.log('entra a spooon');
          item.equivalence.gram = (quantity * item.equivalence.gram) / 20
        }else if(portion==='gram'){
        console.log('entra a gram');
        item.equivalence.gram = (item.equivalence.gram + quantity)
        }
      }
    })
  })
  
  console.log(detailTable);
  
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
          ingredient={detailTable}
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
