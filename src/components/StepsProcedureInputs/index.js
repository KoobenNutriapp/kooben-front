// import {useState} from 'react';
import {Form, Label, Input, FormGroup} from 'reactstrap';
import Buttons from '../../components/Buttons'
import './StepsProcedureInputs.scss';

function ProcedureSteps(){


    const testingHandler = (e) => {
        console.log(e.target.value)
    }
    return(
        <div>

            <Input
            className='Input-Style'
            id = 'CreateTitleInput'
            name='CreateTitleInput'
            placeholder='Dale el mejor título a tus creaciones'
            type= 'textarea'
            // onChange={(e)=> {setTitle(e.target.value)}}
            />

            {/* <Buttons
                    color = {$mayan-blue}
                    children={'Agregar Paso'}
                    size={'small'}
                    callback={}/> */}

                    <Buttons 
                    color={$mayan-blue}
                    children={'Añadir Paso'}
                    size={small}
                    callback={testingHandler}
                    />

        </div>
    );
};

export default ProcedureSteps