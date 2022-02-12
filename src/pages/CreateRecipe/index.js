import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback,
} from "reactstrap";
import { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import NavBar from "../../components/NavBar";
import Calculator from "../../components/Calculator";
import UploadPhoto from "../../components/UploadPhoto";
import TagsManager from "../../components/TagsManager";
import "./CreateRecipe.scss";

const CreateRecipe = () => {
  const [title, setTitle] = useState(false)
  const [validateTitle, setValidateTitle] = useState(null);

  const handleStep = (e) =>{
    e.preventDefault()
    console.log('add-step');
  }

  const handleExport = (e) =>{
    e.preventDefault()
    console.log('exporting...');
  }

  const validators = () =>{
    if(title){
      setTitle(true)
      setValidateTitle('has-success')
    }else{
      setTitle(false)
      setValidateTitle('has-danger')
    }
  }
  
  const handlePublish = (e) =>{
    e.preventDefault()
    console.log('publishing...');
    validators()
  }



  return (
    <>
      <Container className="containerCreate" fluid>
        <NavBar />
        <Row className="rowCreate">
          <Col md="12" className="mainCreate">
            <h1 className="newRecipeTitle">Crea una nueva receta</h1>
            {/* <Form onSubmit={handleSubmit}> */}
            <Form onSubmit={handlePublish}>
              <FormGroup row>
                <Label for="title" sm={2}>
                  Título:
                </Label>
                <Col sm={10}>
                  <Input
                    valid={validateTitle === 'has-success'}
                    invalid={validateTitle === 'has-danger'}
                    id="title"
                    name="title"
                    placeholder="escribe el título de tu receta..."
                    type="text"
                  />
                  <FormFeedback valid className="center">
                    ¡El título es válido 😃!
                  </FormFeedback>
                  <FormFeedback invalid className="center">
                    ¡El título es requerido!
                  </FormFeedback>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="textbox" sm={2}>
                  Sinopsis:
                </Label>
                <Col sm={10}>
                  <Input
                    className="textbox"
                    id="textbox"
                    name="textbox"
                    type="textarea"
                    placeholder="¡cuéntale al mundo porqué tu receta es genial!"
                  />
                </Col>
              </FormGroup>

              <UploadPhoto
                infMessage={
                  "Agrega la fotografía principal de tu receta. Las imágenes serán optimizadas para web."
                }
              />

              <h2>Ingredientes:</h2>

              <Row className="ingredients boxCalculator">
                <Calculator />
              </Row>

              <h2>Procedimiento:</h2>



              <UploadPhoto
                infMessage={
                  "Agrega una fotografía para este paso. Las imágenes serán optimizadas para web."
                }
              />
              <Input
                  className="textbox"
                  id="textbox"
                  name="textbox"
                  type="textarea"
                  placeholder="¡describe con detalle el paso aquí!"
              />

              <FormGroup row>
                <Col sm={8}>
                  <div className='add-step-box'>
                    <button className='pink-button' onClick={handleStep}>agrega paso</button>
                  </div>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col sm={9}>
                  <TagsManager />
                  <FormFeedback></FormFeedback>
                </Col>
              </FormGroup>

              <h2>Comparte tu receta con el mundo:</h2>

              <FormGroup row>
                <Col sm={8}>
                  <div className='add-step-box'>
                    <button className='pink-button' onClick={handleExport}>Exportar</button>
                    <button className='publish' type="submit" value='submit'>Publicar</button>
                  </div>
                </Col>
              </FormGroup>

            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateRecipe;
