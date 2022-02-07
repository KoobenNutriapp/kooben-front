import { Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from "reactstrap";
import { Container, Row, Col } from "reactstrap";
import NavBar from "../../components/NavBar";
import Calculator from "../../components/Calculator";
import UploadPhoto from "../../components/UploadPhoto";
import { useState } from "react";
import "./CreateRecipe.scss";

const CreateRecipe = () => {
  return (
    <>
      <Container className="containerCreate" fluid>
        <NavBar />
        <Row className="rowCreate">
          <Col md="12" className="mainCreate">
            <h1 className="newRecipeTitle">Crea una nueva receta</h1>
            {/* <Form onSubmit={handleSubmit}> */}
            <Form>
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
                  />
                  <FormFeedback></FormFeedback>
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="synopsis" sm={2}>
                  Sinopsis:
                </Label>
                <Col sm={10}>
                  <Input
                    className="synopsis"
                    id="synopsis"
                    name="synopsis"
                    type="textarea"
                    placeholder="¡cuéntale al mundo porqué tu receta es genial!"
                  />
                </Col>
              </FormGroup>

              <UploadPhoto />
              
              <Row className="ingredients boxCalculator">
                <Calculator />
              </Row>

            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateRecipe;
