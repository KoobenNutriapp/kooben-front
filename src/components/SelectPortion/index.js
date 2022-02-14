import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import "./SelectPortion.scss";
import { createIngredient } from "../../actions/auth";
import { useDispatch, useSelector } from 'react-redux';

const SelectPortion = ({ingredient, nutData, people}) => {

  const dispatch = useDispatch();
  //console.log(ingredient);
  //console.log(nutData);

  const [portion, setPortion] = useState(ingredient.equivalence.cup)
  const [ingredientSelected, setIngredientSelected] = useState({ingredient})
  const [operation, setOperation] = useState('add')
  const [typePortion, setTypePortion] = useState('cup')
  //const [diner, setDiner] = useState(1)
  
  //setDiner(people)

  const sendStore = (ingredient) =>{
    dispatch(createIngredient(ingredient, portion, typePortion))
  }

  //console.log(portion);

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
    // console.log(e.currentTarget.id);
    //console.log(portion);
    portion > 1 ? setPortion(portion - 1) : setPortion(1)
    setIngredientSelected(ingredient)
    setOperation('remove')
    nutData(ingredientSelected,operation,typePortion,portion-1)
    sendStore(ingredientSelected)
  }

  const handleAdd = (e) => {
    //console.log(e.currentTarget.id);
    setPortion(portion + 1)
    setIngredientSelected(ingredient)
    setOperation('add')
    nutData(ingredientSelected,operation,typePortion,portion+1)
    sendStore(ingredientSelected)
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
      <td className="text">{ portion * people }</td>
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