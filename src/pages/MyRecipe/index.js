import {Form,FormGroup,Label,Input,FormFeedback} from "reactstrap";
import TagsManager from "../../components/TagsManager";
import Calculator from "../../components/Calculator";
import { Container, Row, Col } from "reactstrap";
import React, { useState, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import JoditEditor from "jodit-react";
import "./MyRecipe.scss";

const MyRecipe = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [synopsis, setSynopsis] = useState("")
  const [tags, setTags] = useState([]);
  const [validateTitle, setValidateTitle] = useState("");
  const [validateAuthor, setValidateAuthor] = useState("");
  const [validateSynopsis, setValidateSynopsis] = useState("");
  const [procedures, setProcedures] = useState('');
  const [detailTable, setDetailTable] = useState([]);

  const editor = useRef(null)
	const config = {
    toolbarAdaptive: false,
    placeholder:'¡Cuéntale al mundo porqué tu receta es genial...!',
		readonly: false,
    buttons:[
      'bold',
      'italic',
      'underline',
      'strikethrough',
      '|',
      'font',
      'fontsize',
      '|',
      'ol',
      '|',
      'align',
      'undo',
      'redo',    
      ]
	}

  const getTags = (arrayOfTags) => {
    setTags(arrayOfTags)
  }

  const validateText = () =>{
    title?.length < 1 ? setValidateTitle('has-danger') : setValidateTitle('has-success')
    author?.length < 5 ? setValidateAuthor('has-danger') : setValidateAuthor('has-success')
    synopsis?.length < 11 ? setValidateSynopsis('has-danger') : setValidateSynopsis('has-success')
  }

  const handleTitle = (e) =>{
    console.log( title?.length);
    title?.length < 5 ? setValidateTitle('has-danger') : setValidateTitle('has-success')
    setTitle(e.target.value)
  }

  const handleAuthor = (e) =>{
    console.log( author?.length);
    author?.length < 5 ? setValidateAuthor('has-danger') : setValidateAuthor('has-success')
    setAuthor(e.target.value)
  }

  const handleSynopsis = (e) =>{
    console.log(synopsis?.length);
    synopsis?.length < 11 ? setValidateSynopsis('has-danger') : setValidateSynopsis('has-success')
    setSynopsis(e.target.value)
  }

  const handleNutDetailTable = (ingredient) =>{   
    setDetailTable(ingredient)
  }

  const toPrintView = (e) =>{
    e.preventDefault()
    console.log('Exportando...');
    const id = `r-${Date.now()}`
        if(title === ''){
          alert('Todos los campos son obligatorios')
        }else{
          console.log('todos los campos llenos')
          try {
            const data = {
              title,
              tags,
              synopsis,
              procedures,
              detailTable,
            }
            console.log(data);
            navigate(`/print_view/my-recipe-${id}`, { state: { data } });
          } catch (error) {
            console.error(error.message);
          }
        }
  }

  return (
    <>
      <Container className="containerCreate" fluid>
        <Row className="rowCreate">
          <Col className="mainCreate">
            <h1 className="MyRecipeTitle">Mi receta</h1>
            <Form onSubmit={toPrintView}>
              <FormGroup row>
                <Label for="title" sm={2}>
                  Título:
                </Label>
                <Col sm={10}>
                  <Input
                    valid={validateTitle === "has-success"}
                    invalid={validateTitle === "has-danger"}
                    id="title"
                    name="title"
                    placeholder="escribe el título de tu receta..."
                    type="text"
                    onChange={handleTitle}
                    onBlur={handleTitle}
                  />
                  <FormFeedback valid className="center">
                    ¡Correcto!. ¡Gracias!
                  </FormFeedback>
                  <FormFeedback invalid className="center">
                    ¡El título debe ser mayor a 5 caracteres!
                  </FormFeedback>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="author" sm={2}>
                  Autor:
                </Label>
                <Col sm={10}>
                  <Input
                    valid={validateAuthor === "has-success"}
                    invalid={validateAuthor === "has-danger"}
                    id="author"
                    name="author"
                    placeholder="escribe tu nombre o la fuente de tu receta..."
                    type="text"
                    onChange={handleAuthor}
                    onBlur={handleAuthor}
                  />
                  <FormFeedback valid className="center">
                    ¡Correcto!. ¡Gracias!
                  </FormFeedback>
                  <FormFeedback invalid className="center">
                    ¡El autor debe ser mayor a 5 caracteres!
                  </FormFeedback>
                </Col>
              </FormGroup>

              {/* <FormGroup row>
                <Label for="textbox" sm={2}>
                  Sinopsis:
                </Label>
                <Col sm={10}>
                  <Input
                    valid={validateSynopsis === "has-success"}
                    invalid={validateSynopsis === "has-danger"}
                    className="textbox"
                    id="synopsis"
                    name="synopsis"
                    type="textarea"
                    placeholder="¡cuéntale al mundo porqué tu receta es genial!"
                    onChange={handleSynopsis}
                    onBlur={handleSynopsis}
                  />
                  <FormFeedback valid className="center">
                    ¡Correcto!. ¡Gracias!
                  </FormFeedback>
                  <FormFeedback invalid className="center">
                    ¡La sinopsis debe ser mayor a 10 caracteres!
                  </FormFeedback>
                </Col>
              </FormGroup> */}

              <JoditEditor
                ref={editor}
                value={synopsis}
                config={config}
		            tabIndex={1}
		            onBlur={newContent => setSynopsis(newContent)}
              />
        
              <h2>Ingredientes:</h2>

              <Row className="ingredients boxCalculator">
                <Calculator 
                  getIngredientsToPost={handleNutDetailTable}
                />
              </Row>

              <h2>Procedimiento:</h2>

              <JoditEditor
                ref={editor}
                value={procedures}
                config={config}
		            tabIndex={1}
		            onBlur={newContent => setProcedures(newContent)}
              />

              <FormGroup row>
                <Col sm={9} className="tagsBox">
                  <TagsManager 
                    getTags={getTags}
                  />
                </Col>
              </FormGroup>

              <h2>Comparte tu receta con el mundo 🌎:</h2>

              <FormGroup row>
                <Col>
                  <div className="exportBtn">
                    <button
                      className="myRecipeExportBtn"
                      type="submit"
                    >
                      Exportar
                    </button>
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

export default MyRecipe;