// // import {useState} from 'react';
// import {Form, Label, Input, FormGroup} from 'reactstrap';
// import Buttons from '../../components/Buttons'
// import './StepsProcedureInputs.scss';

import * as React from 'react';
import {useState, useEffect} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
// import PhotoCamera from '@mui/material/PhotoCamera'


export default function ProcedureStep() {
  const [value, setValue] = useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  // const step = {
  //   sequence: 1,
  //   text: " ",
  //   url: " ",
  //   _id: " " 
  // }

const [steps, setSteps] = useState([1])
  // const [steps, setSteps] = useState(1);

  
  console.log(steps)
  
  // let numberOfSteps = [];

  const addStep = () => {
    setSteps([1, ...steps])
    let paso = steps
    numberOfSteps.push(paso)
    };
    
    console.log(numberOfSteps)

  return (
    <div>

    <button onClick={addStep}>Añadir Paso</button>

  {    numberOfSteps.map(item => (

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
          label=" "
          multiline
          maxRows={4}
          value={value}
          onChange={handleChange}
        />

      </div>   
    </Box>
    ))}

    </div>
 



  );
}







// function ProcedureSteps(){


//     const testingHandler = (e) => {
//         console.log(e.target.value)
//     }
//     return(
//         <div>

//             <Input
//             className='Input-Style'
//             id = 'CreateTitleInput'
//             name='CreateTitleInput'
//             placeholder='Dale el mejor título a tus creaciones'
//             type= 'textarea'
//             // onChange={(e)=> {setTitle(e.target.value)}}
//             />

//             {/* <Buttons
//                     color = {$mayan-blue}
//                     children={'Agregar Paso'}
//                     size={'small'}
//                     callback={}/> */}

//                     <Buttons 
//                     color={$mayan-blue}
//                     children={'Añadir Paso'}
//                     size={small}
//                     callback={testingHandler}
//                     />

//         </div>
//     );
// };

// export default MultilineTextFields