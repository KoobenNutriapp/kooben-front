import {
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Container, Row, Col } from "reactstrap";
import { useForm, useFormik } from "formik";
import * as Yup from "yup";
import NavBar from "../../components/NavBar";
import Calculator from "../../components/Calculator";
import UploadPhoto from "../../components/UploadPhoto";
import TagsManager from "../../components/TagsManager";
import "./CreateRecipe.scss";
import React, { useState } from "react";

const CreateRecipe = () => {
  const [steps, setSteps] = useState([]);
  const [counter, setCounter] = useState(1);
  const [textValidator, setTextValidator] = useState(true)

  const handleExport = (e) => {
    e.preventDefault();
    console.log("exporting...");
  };

  const handlePublish = (e) => {
    e.preventDefault();
    console.log("publishing...");
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      synopsis: "",
      step:"",
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(50, "¡50 caracteres como máximo!🤔")
        .required("¡el título es requerido! 😁"),
      synopsis: Yup.string()
        .max(500, "¡500 caracteres como máximo!🤔")
        .required("¡la sinopsis es requerida! 😁"),
      step: Yup.string()
        .max(500, "¡500 caracteres como máximo!🤔")
        .required("¡tu descripción es requerida! 😁"),
    }),
    onSubmit: (values) => {
      console.log("Publishing...");
    },
  });

  const handleDeleteStep = (e) => {
    console.log(e.currentTarget.id);
    const stepSelected = e.currentTarget.id
    const filteredSteps = steps.filter(item=>{
      return item !== stepSelected
    })
    setSteps(filteredSteps)
  }

  const handleAddStep = (e) => {
    e.preventDefault();
    setCounter(counter + 1);
    const paso = `paso ${counter}`;
    console.log(paso);
    setSteps([...steps, paso]);
  };
  //console.log(steps);

  const handleStepsBlur = (e) =>{
    console.log('Se activó algo');
    console.log(e.target.value);
    const someText = e.target.value
    someText ? setTextValidator('has-success') : setTextValidator('has-danger')

  }

  return (
    <>
      <Container className="containerCreate" fluid>
        <NavBar />
        <Row className="rowCreate">
          <Col className="mainCreate">
            <h1 className="newRecipeTitle">Crea una nueva receta</h1>
            {/* <Form onSubmit={handleSubmit}> */}
            <Form onSubmit={formik.handleSubmit}>
              <FormGroup row>
                <Label for="title" sm={2}>
                  Título:
                </Label>
                <Col sm={10}>
                  <Input
                    id="title"
                    name="title"
                    placeholder="escribe el título de tu receta..."
                    type="text"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.title}
                  />
                  {formik.touched.title && formik.errors.title ? (
                    <p className="errors">{formik.errors.title}</p>
                  ) : null}
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="textbox" sm={2}>
                  Sinopsis:
                </Label>
                <Col sm={10}>
                  <Input
                    className="textbox"
                    id="synopsis"
                    name="synopsis"
                    type="textarea"
                    placeholder="¡cuéntale al mundo porqué tu receta es genial!"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.synopsis}
                  />
                  {formik.touched.synopsis && formik.errors.synopsis ? (
                    <p className="errors">{formik.errors.synopsis}</p>
                  ) : null}
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

              {steps.map((item, index) => {
                return (
                  <React.Fragment key={item}>
                    <div className="lineSteps"></div>
                    <h3>{`paso ${index+1}`}</h3>
                    <td className="deleteButton" id={item} onClick={handleDeleteStep}>
                    {
                      <Tooltip title="Elimina paso" placement="right-start">
                        <IconButton>
                          <DeleteIcon className="binStep"/>
                        </IconButton>
                      </Tooltip>
                    }
                  </td>
                    <UploadPhoto
                      infMessage={
                        "Agrega una fotografía para este paso. Las imágenes serán optimizadas para web."
                      }
                    />
                    <Input 
                      valid={textValidator === 'has-success'}
                      invalid={textValidator === 'has-danger'}
                      className="step"
                      id="step"
                      name="step"
                      type="textarea"
                      placeholder="¡describe con detalle el paso aquí!"
                      onBlur={handleStepsBlur}
                    />
                  </React.Fragment>
                );
              })}

              <FormGroup row>
                <Col sm={8}>
                  <div className="add-step-box">
                    <button
                      value="step"
                      className="pink-button"
                      onClick={handleAddStep}
                    >
                      agrega paso
                    </button>
                  </div>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Col sm={9}>
                  <TagsManager />
                </Col>
              </FormGroup>

              <h2>Comparte tu receta con el mundo 🌎:</h2>

              <FormGroup row>
                <Col sm={8}>
                  <div className="add-step-box">
                    <button
                      className="pink-button"
                      onClick={() => window.print()}
                    >
                      Exportar
                    </button>
                    {/* <button className='pink-button' onClick={handlePublish}>Exportar</button> */}
                    <button className="publish" type="submit" value="submit">
                      Publicar
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

export default CreateRecipe;
