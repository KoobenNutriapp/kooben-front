import { useState } from 'react'
import {Form, Label, Input, FormGroup} from 'reactstrap'
import './CreateTitleInput.scss'

function CreateTitleInput(){

    const [title, setTitle] = useState('')


    return(
        <div className="Input-Title-Container fluid">
            <Form>
            <FormGroup className='FormGroup'>
            <Label for = "CreateTitleInput" >
                Nombre: {title}
            </Label>
            <Input
            className='Input-Style'
            id = 'CreateTitleInput'
            name='CreateTitleInput'
            placeholder='Dale el mejor título a tus creaciones'
            type= 'text'
            onChange={(e)=> {setTitle(e.target.value)}}
            />

            </FormGroup>
            </Form>
        </div>


    )

}

export default CreateTitleInput;