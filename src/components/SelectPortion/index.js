import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import "./SelectPortion.scss";


const SelectPortion = ({ingredient, nutData, people}) => {

  const [portion, setPortion] = useState(ingredient.equivalence.cup)
  const [ingredientSelected, setIngredientSelected] = useState({ingredient})
  const [operation, setOperation] = useState('add')
  const [typePortion, setTypePortion] = useState('cup')


  const handleSelection = (e) => {
    switch (e.target.value) {
      case 'cup':
        setPortion(ingredient.equivalence.cup)
        setTypePortion(e.target.value)
        break;
      case 'gram':
        setPortion(ingredient.equivalence.gram)
        setTypePortion(e.target.value)
        break;
      case 'piece':
        setPortion(ingredient.equivalence.piece)
        setTypePortion(e.target.value)
        break;
      case 'spoon':
        setPortion(ingredient.equivalence.spoon)
        setTypePortion(e.target.value)
        break;
      default:
        break;
    }
  };

  const handleRemove = (e) => {
    const newPortion = portion > 1 ? portion - 1 : 1
    setPortion(newPortion)
    setIngredientSelected(ingredient)
    setOperation('remove')
    nutData(ingredient,operation,typePortion,newPortion)
    console.log(newPortion);
  }

  const handleAdd = (e) => {
    const newPortion = portion + 1 
    setPortion(newPortion)
    setIngredientSelected(ingredient)
    setOperation('add')
    nutData(ingredient,operation,typePortion,newPortion)
    console.log(newPortion);
  }

  return (
    <>
      <td>
        {
          <IconButton>
            <RemoveCircleIcon id="remove" className="remove" onClick={handleRemove} />
          </IconButton>
        }  
      </td>
      <td className="text">{ (portion * people).toFixed(0) }</td>
      <td>
        {
          <IconButton>
            <AddCircleIcon id="add" className="add" onClick={handleAdd} />
          </IconButton>
        }  
      </td>
      <td className='area'>
        <select
          onChange={handleSelection}
          className="selectPortion"
        >
          <option value='cup'>taza(s)</option>
          <option value='gram'>gramo(s)</option>
          <option value='piece'>pieza(s)</option>
          <option value='spoon'>cucharada(s)</option>
        </select>
      </td>
    </>
  )
}

export default SelectPortion