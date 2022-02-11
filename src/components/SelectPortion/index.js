import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import "./SelectPortion.scss";

const SelectPortion = ({ingredient, nutData, people}) => {

  //console.log(ingredient);
  //console.log(nutData);

  const [portion, setPortion] = useState(ingredient.equivalence.cup)
  const [ingredientSelected, setIngredientSelected] = useState({ingredient})
  const [operation, setOperation] = useState('add')
  const [typePortion, setTypePortion] = useState('cup')
  const [diner, setDiner] = useState(1)
  
  //setDiner(people)

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
    //console.log(e.currentTarget.id);
    setPortion(portion - 1)
    setIngredientSelected(ingredient)
    setOperation('remove')
    nutData(ingredientSelected,operation,typePortion)
  }

  const handleAdd = (e) => {
    //console.log(e.currentTarget.id);
    setPortion(portion + 1)
    setIngredientSelected(ingredient)
    setOperation('add')
    nutData(ingredientSelected,operation,typePortion)
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
      <td className="text">{ portion * diner }</td>
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