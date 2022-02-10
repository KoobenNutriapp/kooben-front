import { useState } from "react";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import "./SelectPortion.scss";

const SelectPortion = ({equivalence}) => {

  console.log(equivalence);

  const [portion, setPortion] = useState(equivalence.cup)

  const handleSelection = (e) => {
    
    switch (e.target.value) {
      case 'cup':
        setPortion(equivalence.cup)
        break;
      case 'gram':
        setPortion(equivalence.gram)
        break;
      case 'piece':
        setPortion(equivalence.piece)
        break;
      case 'spoon':
        setPortion(equivalence.spoon)
        break;
      default:
        break;
    }
  };

  const handleRemove = (e) => {
    console.log(e.currentTarget.id);
    setPortion(portion - 1)
  }

  const handleAdd = (e) => {
    console.log(e.currentTarget.id);
    setPortion(portion + 1)
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
      <td className="text">{portion}</td>
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