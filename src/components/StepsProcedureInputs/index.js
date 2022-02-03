// // import {useState} from 'react';
// import {Form, Label, Input, FormGroup} from 'reactstrap';
// import Buttons from '../../components/Buttons'
// import './StepsProcedureInputs.scss';

import * as React from 'react';
import {useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
// import PhotoCamera from '@mui/material/PhotoCamera'


export default function MultilineTextFields() {
  const [value, setValue] = useState('Controlled');

  const handleChange = (event) => {
    setValue(event.target.value);
  };


  const step = {
    sequence: 1,
    text: " ",
    url: " ",
    _id: " " 
  }


  let testArray = [1, 2, 3, 4, 5];
  let procedureArray = []

  const [steps, setSteps] = useState([step]);
  console.log(steps)

  const addStep = () => {
    setSteps(steps +1)
    step.sequence = steps
    procedureArray.push(step)
    };

    console.log(procedureArray)

  //   React.useEffect(() => {
  //     testArray.push(steps)
  //     console.log(testArray)

  //   }, [steps])

  // console.log(steps);
  // console.log(testArray);

  return (
    <div>

    <button onClick={addStep}>Añadir Paso</button>

  {    testArray.map(item => (

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