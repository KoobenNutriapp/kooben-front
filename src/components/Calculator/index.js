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
    //console.log(deleteIngredient);
    const filteredIngredient = detailTable.filter(item=>{
      return item._id !== deleteIngredient
    })
    setDetailTable(filteredIngredient)
    setOperation(deleteIngredient)
    setTypePortion(null)
    setFirstSelection(false)

  }

  const handleSelection = (selection) => {
   if(selection){
     setDetailTable([...detailTable,selection])
   }else{
    console.log('empty');
   }
  }

  const handleBypassToNutTable = ((ingredient,operation, portion, quantity) => {
    // console.log(ingredient._id);
    // console.log('portion: ' + portion);
    // console.log(quantity);
    const gramFactor = 85

    const newDetailTable = detailTable.map(item=>{
      //console.log(item._id);
      if(item._id === ingredient._id){
        //console.log('ids iguales');
        if(portion==='cup'){
          console.log('entra a cup');
          console.log('cantidad: ' + quantity);
          console.log('gramos: ' + item.equivalence.gram);
          console.log('tazas: ' + item.equivalence.cup);
          item.equivalence.gram = (quantity * gramFactor) / 2
        }else if(portion==='piece'){
          console.log('entra a piece');
          console.log('cantidad: ' + quantity);
          console.log('piezas: ' + item.equivalence.piece);
          console.log('gramos: ' + item.equivalence.gram);
          item.equivalence.gram = quantity * gramFactor
        }else if(portion==='spoon'){
          console.log('entra a spooon');
          console.log('cantidad: ' + quantity);
          console.log('cucharadas: ' + item.equivalence.spoon);
          console.log('gramos: ' + item.equivalence.gram);
          item.equivalence.gram = (quantity * gramFactor) / 20
        }else if(portion==='gram'){
          console.log('entra a gram');
          console.log('cantidad: ' + quantity);
          console.log('gramos: ' + item.equivalence.gram);
          item.equivalence.gram = quantity
        }
      }
      return item
    })

    setDetailTable(newDetailTable)

    //console.log(newDetailTable);
  })
  
  //console.log(detailTable);

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
