import {Form,FormGroup,Label,Input,FormText, FormFeedback} from "reactstrap";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Container, Row, Col } from "reactstrap";
import Switch from '@mui/material/Switch';
import NavBar from "../../components/NavBar";
import Calculator from "../../components/Calculator";
import TagsManager from "../../components/TagsManager";
import "./CreateRecipe.scss";
import React, { useState } from "react";
import AWS from "aws-sdk";
import Compressor from 'compressorjs';

const CreateRecipe = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [tags, setTags] = useState("");
  const [steps, setSteps] = useState([]);
  const [procedures, setProcedures] = useState([]);
  const [counter, setCounter] = useState(1);
  const [textValidator, setTextValidator] = useState(true)
  const [checked, setChecked] = useState(false);
  const [type, setType] = useState(null)
  const [url, setUrl] = useState(null) 
  const [portion, setPortion] = useState(0);
  const [total_energy, setTotalEnergy] = useState(0);
  const [total_carbohydrate, setTotalCarbohydrate] = useState(0);
  const [total_fiber, setTotalFiber] = useState(0);
  const [total_sugars, setTotalSugars] = useState(0);
  const [total_sodium, setTotalSodium] = useState(0);
  const [total_protein, setTotalProtein] = useState(0);
  const [total_fat, setTotalFat] = useState(0);
  const [total_cholesterol, setTotalCholesterol] = useState(0);
  const [total_glycemic_load, setTotalGlycemicLoad] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const [image, setImage] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileType, setFileType] = useState("");
  const [validateMainImage, setValidateMainImage] = useState(null);
  const [thumbnail, setThumbnail] = useState(false);
  const [backend, setBackend] = useState({
    title:"",
    author:"", 
    synopsis:"",
    tags:[],
    procedures:[],
    type:"",
    url:"",
    total_energy: 0,
    total_carbohydrate: 0,
    total_sugars: 0,
    total_fiber: 0,
    total_sodium: 0,
    total_protein: 0, 
    total_fat: 0, 
    total_cholesterol: 0,
    total_glycemic_load: 0,
    ingredients:[],
    created:"",
    edited:""
  });

  //AWS
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
  
    console.log(fileName);
    
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
  
    const handleDelete = async () => {
      console.log("Deleting photo from AWS...");
  
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
  
    const handleSend = async () => {
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
  //AWS


  const handleExport = (e) => {
    e.preventDefault();
    console.log("exporting...");
  };

  const handlePublish = (e) => {
    e.preventDefault();
    console.log("publishing...");
  };

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
    const tempStep = `step ${counter}`;
    console.log(tempStep);
    setSteps([...steps, tempStep]);
  };

  const handleStepsBlur = (e) =>{
    //console.log('Se activó algo');
    console.log(e.target.value);
    const addProcedure = e.target.value
    setProcedures([...procedures, addProcedure])
    addProcedure ? setTextValidator('has-success') : setTextValidator('has-danger')
  }

  const getUrl = () =>{
    const url = `${process.env.REACT_APP_BUCKET_URL}${fileName}`
    console.log(url);
    setUrl(url)
    setBackend(prevState => ({...prevState,url}))
  }

  // const getStatus = () =>{
  //   setBackend({[Rstatus]:true})
  // }

  const getTitle = () =>{
    console.log(title);
    setBackend(prevState => ({...prevState,title}))
  }
  const getAuthor = () =>{
    console.log(author);
    setBackend(prevState => ({...prevState,author}))
  }

  const getSynopsis = () =>{
    console.log(synopsis);
    setBackend(prevState => ({...prevState,synopsis}))
  }

  const getTags = (arrayOfTags) => {
    setTags(arrayOfTags)
    setBackend(prevState => ({...prevState,tags}))
  }

  const getMainProperties = () => {
    setBackend(prevState => ({...prevState,total_energy}))
    setBackend(prevState => ({...prevState,total_carbohydrate}))
    setBackend(prevState => ({...prevState,total_sugars}))
    setBackend(prevState => ({...prevState,total_fiber}))
    setBackend(prevState => ({...prevState,total_sodium}))
    setBackend(prevState => ({...prevState,total_protein}))
    setBackend(prevState => ({...prevState,total_fat}))
    setBackend(prevState => ({...prevState,total_cholesterol}))
    setBackend(prevState => ({...prevState,total_glycemic_load}))
    setBackend(prevState => ({...prevState,total_glycemic_load}))
    setBackend(prevState => ({...prevState,ingredients}))
  }


  const getSteps = () =>{
    // procedures.map(i => {
    //   console.log(i);
    // })
    setBackend(prevState => ({...prevState,procedures}))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitting...');
    getTitle()
    getAuthor()
    getSynopsis()
    getTags()
    getSteps()
    setBackend(prevState => ({...prevState,type}))
    getUrl()
    getMainProperties()
    //implementar formateo aqui

  }

 const handleType = (e) => {
  setChecked(e.target.checked)
  console.log(checked);
  checked ? setType("") : setType('prehispanic')

 }

  const handleNutDetailTable = (ingredient) =>{
    console.log(ingredient);
    const portion = ingredient.reduce((acc, item) => {
      return acc + (item?.equivalence.gram || 0);
    }, 0);
    setPortion(portion.toFixed(0));
    console.log("portion: " + portion.toFixed(2));

    const energy = ingredient.reduce((acc, item) => {
      return acc + (item?.energy || 0);
    }, 0);
    setTotalEnergy((energy*portion).toFixed(2));
    //console.log("energy: " + energy.toFixed(2));

    const total_carbohydrate = ingredient.reduce((acc, item) => {
      return acc + (item?.total_carbohydrate || 0);
    }, 0);
    setTotalCarbohydrate((total_carbohydrate*portion).toFixed(2));
    //console.log("total_carbohydrate: " + total_carbohydrate.toFixed(2));

    const dietary_fiber = ingredient.reduce((acc, item) => {
      return acc + (item?.dietary_fiber || 0);
    }, 0);
    setTotalFiber((dietary_fiber*portion).toFixed(2));
    //console.log("dietary_fiber: " + dietary_fiber.toFixed(2));

    const sugars = ingredient.reduce((acc, item) => {
      return acc + (item?.sugars || 0);
    }, 0);
    setTotalSugars((sugars*portion).toFixed(2));
    //console.log("sugars: " + sugars.toFixed(2));

    const sodium = ingredient.reduce((acc, item) => {
      return acc + (item?.sodium || 0);
    }, 0);
    setTotalSodium((sodium*portion).toFixed(2));
    //console.log("sodium: " + sodium.toFixed(2));

    const protein = ingredient.reduce((acc, item) => {
      return acc + (item?.protein || 0);
    }, 0);
    setTotalProtein((protein*portion).toFixed(2));
    //console.log("protein: " + protein.toFixed(2));

    const total_fat = ingredient.reduce((acc, item) => {
      return acc + (item?.total_fat || 0);
    }, 0);
    setTotalFat((total_fat*portion).toFixed(2));
    //console.log("total_fat: " + total_fat.toFixed(2));

    const cholesterol = ingredient.reduce((acc, item) => {
      return acc + (item?.cholesterol || 0);
    }, 0);
    setTotalCholesterol((cholesterol*portion).toFixed(2));
    //console.log("cholesterol: " + cholesterol.toFixed(2));

    const glycemic_load = ingredient.reduce((acc, item) => {
      return (
        acc + ((item?.total_carbohydrate * item?.glycemic_index) / 100 || 0)
      );
    }, 0);
    setTotalGlycemicLoad((glycemic_load*portion).toFixed(4));
    //console.log("glycemic_load: " + glycemic_load.toFixed(4));
    
    setIngredients(ingredient)
  }
  console.log(ingredients);

  return (
    <>
      <Container className="containerCreate" fluid>
        <NavBar />
        <Row className="rowCreate">
          <Col className="mainCreate">
            <h1 className="newRecipeTitle">Crea una nueva receta</h1>
            {/* <Form onSubmit={handleSubmit}> */}
            <Form onSubmit={handleSubmit}>
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
                    onChange={e => setTitle(e.target.value)}
                  />
                </Col>
              </FormGroup>

              <FormGroup row>
                <Label for="author" sm={2}>
                  Autor:
                </Label>
                <Col sm={10}>
                  <Input
                    id="author"
                    name="author"
                    placeholder="escribe tu nombre o la fuente de tu receta..."
                    type="text"
                    onChange={e => setAuthor(e.target.value)}
                  />
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
                    onChange={e => setSynopsis(e.target.value)}
                  />
                </Col>
              </FormGroup>
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
                    {'Agrega la fotografía principal de tu receta. Las imágenes serán optimizadas para web.'}
                  </FormText>
                </Col>
              </FormGroup>

              <FormGroup>
                <Label for="prehispanic" sm={2}>
                  Prehispánica:
                </Label>
                <Switch
                  id="prehispanic"
                  name="prehispanic"
                  checked={checked}
                  onChange={handleType}
                  inputProps={{ 'aria-label': 'controlled' }}
                  />
                </FormGroup>
              <h2>Ingredientes:</h2>

              <Row className="ingredients boxCalculator">
                <Calculator 
                getIngredientsToPost={handleNutDetailTable}
                />
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
                    {/* <UploadPhoto
                      infMessage={
                        "Agrega una fotografía para este paso. Las imágenes serán optimizadas para web."
                      }
                    /> */}
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
                  <TagsManager 
                    getTags={getTags}
                  />
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
