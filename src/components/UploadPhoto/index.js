import { Button, Form, FormGroup, Label, Input, FormText, FormFeedback } from "reactstrap";
import { Col } from "reactstrap";
import { useState } from "react";
import AWS from "aws-sdk";
import Compressor from 'compressorjs';
import "./UploadPhoto.scss";

const UploadPhoto = ({infMessage}) => {

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
    console.log("Deleting photo from AWS...");
    e.preventDefault();

    const params = {
      Key: `images/k-1644252135506`,
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
    console.log("Sending photo to AWS...");

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
      <Form>
        <FormGroup className="imgContainer">
          {thumbnail ? <img className="thumbnail" alt="tu receta" src={image} /> : ''}
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
            <FormFeedback invalid className="center">
              Parece que el archivo que seleccionaste no es válido. Intenta con una imagen :)
            </FormFeedback>
            <FormText className="center">
              {infMessage}
            </FormText>
          </Col>
        </FormGroup>
        
        <FormGroup>
          <Button onClick={handleSend}>agrega foto</Button>
          <Button onClick={handleDelete}>Borra foto</Button>
        </FormGroup>
      </Form>
            
    </>
  );
};

export default UploadPhoto;
