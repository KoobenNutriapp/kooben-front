import "./SelectIngredient.scss";
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const SelectIngredient = ({ingredients}) => {
  console.log(ingredients);
  const options = ingredients?.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  const handleSelection = (e) => {
    console.log(e.target.value);
  }

  return (
    <>
      <Autocomplete
        id="grouped-demo"
        options={options?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
        groupBy={(option) => option.firstLetter}
        getOptionLabel={(option) => option.name}
        renderInput={(params) => <TextField {...params} label="Agrega un ingrediente" />}
        className="selectIngredient"
        onSelect={handleSelection}
      />
    </>
  )};


  
export default SelectIngredient;