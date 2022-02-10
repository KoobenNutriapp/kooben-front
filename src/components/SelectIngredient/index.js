import { useState, useEffect } from "react";
import "./SelectIngredient.scss";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const SelectIngredient = ({ingredients, callback}) => {
  //console.log(callback);
  const [ingredientsArray, setIngredientsArray] = useState([]);

  const options = ingredients?.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  useEffect(() => {
    const sendData = () => {
    callback(ingredientsArray)
  };
    sendData();
  }, [ingredientsArray]);
  
  const handleSelection = ({_id}) => {
    const idSelected = _id;
    setIngredientsArray([...ingredientsArray,idSelected])
  }

  return (
    <>
      <Autocomplete
        size='small'
        options={options?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => <TextField {...params} label="Agrega un ingrediente" />}
        className="selectIngredient"
        onChange={(e,selection) => handleSelection(selection)}
      />
    </>
  )};


  
export default SelectIngredient;