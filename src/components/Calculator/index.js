import { useEffect, useState } from "react";
import { getIngredients } from "../../services/ingredient";
import { Col } from "reactstrap";
import IngredientsDynamicTable from "../../components/IngredientsDynamicTable/";
import NutFactTable from "../../components/NutFactTable/";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import "./Calculator.scss";

function Calculator({getIngredientsToPost}) {
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
      console.log(allIngredients);
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
     const tempTable = [...detailTable,selection]
     let set = new Set( tempTable.map( JSON.stringify ) )
     let result = Array.from( set ).map( JSON.parse );
     setDetailTable(result)
   }else{
    console.log('empty');
   }
  }

  const handleBypassToNutTable = ((ingredient,operation, portion, quantity) => {
    const gramFactor = 85
    const cupFactor = 2
    const spoonFactor = 20
    const pieceFactor = 1

    const newDetailTable = detailTable.map(item=>{
      if(item._id === ingredient._id){
        if(portion==='cup'){
          console.log('entra a cup');
          console.log('cantidad: ' + quantity);
          console.log('gramos: ' + item.equivalence.gram);
          console.log('tazas: ' + item.equivalence.cup);
          item.equivalence.gram = (quantity * gramFactor) / cupFactor
          item.equivalence.cup = quantity
          item.equivalence.spoon = (quantity * spoonFactor) / cupFactor
          item.equivalence.piece = (quantity * pieceFactor) / cupFactor
        }else if(portion==='piece'){
          console.log('entra a piece');
          console.log('cantidad: ' + quantity);
          console.log('piezas: ' + item.equivalence.piece);
          console.log('gramos: ' + item.equivalence.gram);
          item.equivalence.gram = quantity * gramFactor
          item.equivalence.piece = quantity
          item.equivalence.cup = (quantity * pieceFactor) * cupFactor
          item.equivalence.spoon = quantity * spoonFactor
        }else if(portion==='spoon'){
          console.log('entra a spooon');
          console.log('cantidad: ' + quantity);
          console.log('cucharadas: ' + item.equivalence.spoon);
          console.log('gramos: ' + item.equivalence.gram);
          item.equivalence.gram = (quantity * gramFactor) / spoonFactor
          item.equivalence.spoon = quantity
          item.equivalence.cup = (quantity * cupFactor) / spoonFactor
          item.equivalence.piece = quantity / spoonFactor
        }else if(portion==='gram'){
          console.log('entra a gram');
          console.log('cantidad: ' + quantity);
          console.log('gramos: ' + item.equivalence.gram);
          item.equivalence.gram = quantity
          item.equivalence.cup = (quantity * cupFactor) / gramFactor
          item.equivalence.piece = quantity / gramFactor
          item.equivalence.spoon = (quantity * spoonFactor) / gramFactor
        }
      }
      return item
    })

    setDetailTable(newDetailTable)
  })

  console.log('original');
  console.log(detailTable);

  getIngredientsToPost(detailTable)

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
