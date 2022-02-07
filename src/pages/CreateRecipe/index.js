import { Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from "reactstrap";
import { Container, Row, Col } from "reactstrap";
import NavBar from "../../components/NavBar";
import { useState } from "react";
import AWS from "aws-sdk";
import Compressor from 'compressorjs';
import "./CreateRecipe.scss";

const CreateRecipe = () => {

  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log('Enviando...');
  }

  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [validateMainImage, setValidateMainImage] = useState(null);
  const [thumbnail, setThumbnail] = useState(false);


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
    compressImage(imageFile)
    setImage(imageUrl)
    const name = `k-${Date.now()}`
    setFileName(name);
    const type = imageFile.type;
    setFileType(type);
  };

  const compressImage = (baseImage) => {
    if (!baseImage) {
      return;
    }
    new Compressor(baseImage, {
      quality: 0.2,
  
      success(result) {
        const formData = new FormData();
        formData.append('file', result, result.name);
        setFile(result)
        setValidateMainImage('has-success')
        setThumbnail(true)
      },
      error(err) {
        console.log('error: ' + err.message);
        setValidateMainImage('has-danger')
        setThumbnail(false)
      },
    });
  }

  const handleDelete = async (e) => {
    e.preventDefault();

    const params = {
      Key: `images/FB_IMG_1639091006023.jpg`,
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
                    placeholder="¡cuéntale al mundo porqué tu receta es genial!"
                  />
                </Col>
              </FormGroup>

              <FormGroup className="imgContainer">
                {thumbnail ? <img className="thumbnail" alt="image" src={image} /> : ''}
              </FormGroup>

              <FormGroup row>
                <Label for="mainPhoto" sm={2}>
                  Fotografía:
                </Label>
                <Col sm={10}>
                  <Input 
                    valid={validateMainImage === 'has-success'}
                    invalid={validateMainImage === 'has-danger'}
                    id="mainPhoto"
                    accept="image/png,image/jpeg"
                    name="file"
                    type="file"
                    onChange={handleLoad}
                  />
                  <FormFeedback valid className="center">
                    La imagen se cargó correctamente!
                  </FormFeedback>
                  <FormFeedback invalid>
                    Parece que el archivo que seleccionaste no es válido. Intenta con una imagen :)
                  </FormFeedback>
                  <FormText>
                    Agrega la fotografía principal de tu receta. Las imágenes serán
                    optimizadas para web.
                  </FormText>
                </Col>
              </FormGroup>

              <FormGroup>
                <Button onClick={handleSend}>agrega foto</Button>

                <Button onClick={handleDelete}>Borra foto</Button>
              </FormGroup>

            </Form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateRecipe;
