import * as React from 'react';
import {useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

export default function ProcedureStep() {
  const [value, setValue] = useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

const [steps, setSteps] = useState(["Sample Step"])

const addSteps = () => {
  setSteps([...steps, "Sample Step"])
}
console.log(steps)

function Button(props){
  return(
    <button onClick={props.onClick}>Añadir Paso</button>
  );
};

function StepsList(){
  return(
    <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <TextField
          id="outlined-multiline-flexible"
          label= " "
          multiline
          maxRows={4}
          value={value}
          onChange={handleChange}
        />
      </div>   
    </Box>
  );
};

  return (
    <div>
      <Button onClick={addSteps} />
      {steps.map((item) => (<StepsList />))}
    </div>
  );
}