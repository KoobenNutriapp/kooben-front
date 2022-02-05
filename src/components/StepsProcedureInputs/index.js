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

// const deleteStep = ({arg}) => {
//   setSteps(steps.splice(arg))
// }

const deleteStep = (e) => {
  // console.log(e.currentTarget.id)
  console.log(e)
}

function Button(props){
  return(
    <button onClick={props.onClick}>{props.text}</button>
  );
};

function AddButton(props){
  return(
    <button onSubmit={props.onClick}>{props.text}</button>
  );
};

function StepsList(){
  return(
    <div>
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
    <Button text={'Eliminar Paso'} onClick={deleteStep} />
    </div>

  );
};

  return (
    <div>
      <AddButton onSubmit={addSteps} text={'Añadir Paso'} />
      {steps.map((item, index) => {
        return(
          <StepsList id={index} />
        )
      })}
    </div>
  );
}