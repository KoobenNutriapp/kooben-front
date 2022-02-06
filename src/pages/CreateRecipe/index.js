import {
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  FormFeedback,
} from "reactstrap";
import { Container, Row, Col } from "reactstrap";
import NavBar from "../../components/NavBar";
import { useState } from "react";
import AWS from "aws-sdk";
import "./CreateRecipe.scss";

const CreateRecipe = () => {
  // const handleSubmit = (e) =>{
  //   e.preventDefault()
  //   console.log('Enviando...');
  // }

  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");

  //aws

  AWS.config.update({
    accessKeyId: process.env.REACT_APP_KEY_ID,
    secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
  });

  const S3Client = new AWS.S3({
    params: { Bucket: "kooben" },
    region: "us-east-1",
  });

  //aws

  const handleLoad = (e) => {
    e.preventDefault();
    const imageFile = e.target.files[0];
    const imageUrl = URL.createObjectURL(imageFile);
    setImage(imageUrl)
    setFile(imageFile);
    const name = imageFile.name;
    setFileName(name);
    const type = imageFile.type;
    setFileType(type);
  };

  const handleDelete = async (e) => {
    e.preventDefault();

    const params = {
      Key: `images/FB_IMG_1639875646621.jpg`,
    };

    try {
      const response = await S3Client.deleteObject(params).promise();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    console.log("Sending to AWS...");

    const params = {
      ACL: "public-read",
      Key: `images/${fileName}`,
      ContentType: `${fileType}`,
      Body: file,
    };

    try {
      const response = await S3Client.putObject(params).promise();
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };

  console.log(file);
  console.log(fileName);
  console.log(fileType);

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
                    invalid
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
                    id="synopsis"
                    name="synopsis"
                    type="textarea"
                    placeholder="¡cuéntale al mundo porqué ésta receta es genial!"
                  />
                </Col>
              </FormGroup>

              <FormGroup className="imgContainer">
                <img className="thumbnail" alt="image" src={image} />
              </FormGroup>

              <FormGroup row>
                <Label for="mainPhoto" sm={2}>
                  Fotografía:
                </Label>
                <Col sm={10}>
                  <Input
                    id="mainPhoto"
                    accept="image/png,image/jpeg"
                    name="file"
                    type="file"
                    onChange={handleLoad}
                  />
                  <FormText>
                    Agrega la fotografía principal de tu receta. Ten en cuenta
                    que no debe ser mayor a XX tamaño. Los formatos permitidos
                    son: .jpg, .jpeg, .png
                  </FormText>
                </Col>
              </FormGroup>

              <FormGroup>
                <Button onClick={handleSend}>agrega foto</Button>

                <Button onClick={handleDelete}>Borra foto</Button>
              </FormGroup>

              <FormGroup row>
                <Label for="exampleEmail" sm={2}>
                  Email
                </Label>
                <Col sm={10}>
                  <Input
                    id="exampleEmail"
                    name="email"
                    placeholder="with a placeholder"
                    type="email"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="examplePassword" sm={2}>
                  Password
                </Label>
                <Col sm={10}>
                  <Input
                    id="examplePassword"
                    name="password"
                    placeholder="password placeholder"
                    type="password"
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleSelect" sm={2}>
                  Select
                </Label>
                <Col sm={10}>
                  <Input id="exampleSelect" name="select" type="select">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="exampleSelectMulti" sm={2}>
                  Select Multiple
                </Label>
                <Col sm={10}>
                  <Input
                    id="exampleSelectMulti"
                    multiple
                    name="selectMulti"
                    type="select"
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row tag="fieldset">
                <legend className="col-form-label col-sm-2">
                  Radio Buttons
                </legend>
                <Col sm={10}>
                  <FormGroup check>
                    <Input name="radio2" type="radio" />{" "}
                    <Label check>
                      Option one is this and that—be sure to include why it's
                      great
                    </Label>
                  </FormGroup>
                  <FormGroup check>
                    <Input name="radio2" type="radio" />{" "}
                    <Label check>
                      Option two can be something else and selecting it will
                      deselect option one
                    </Label>
                  </FormGroup>
                  <FormGroup check disabled>
                    <Input disabled name="radio2" type="radio" />{" "}
                    <Label check>Option three is disabled</Label>
                  </FormGroup>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for="checkbox2" sm={2}>
                  Checkbox
                </Label>
                <Col
                  sm={{
                    size: 10,
                  }}
                >
                  <FormGroup check>
                    <Input id="checkbox2" type="checkbox" />{" "}
                    <Label check>Check me out</Label>
                  </FormGroup>
                </Col>
              </FormGroup>
              <FormGroup check row>
                <Col
                  sm={{
                    offset: 2,
                    size: 10,
                  }}
                >
                  <Button>Submit</Button>
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
