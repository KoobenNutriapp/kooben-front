import {Form,FormGroup,Label,Input,FormText, FormFeedback} from "reactstrap";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Container, Row, Col } from "reactstrap";
import Switch from '@mui/material/Switch';
import NavBar from "../../components/NavBar";
import Calculator from "../../components/Calculator";
import TagsManager from "../../components/TagsManager";
import { createRecipe } from "../../services/recipes";
import "./MyRecipe.scss";
import React, { useState } from "react";
import AWS from "aws-sdk";
import Compressor from 'compressorjs';

const MyRecipe = () => {
  const [title, setTitle] = useState(null)
  const [author, setAuthor] = useState(null)
  const [synopsis, setSynopsis] = useState(null)
  const [tags, setTags] = useState([]);
  const [steps, setSteps] = useState([]);
  const [procedures, setProcedures] = useState([]);
  const [counter, setCounter] = useState(1);
  //const [textValidator, setTextValidator] = useState(true)
  const [checked, setChecked] = useState(false);
  const [type, setType] = useState("")
  const [url, setUrl] = useState(null)
  //const [portion, setPortion] = useState(0);
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

  const cleanForm = () => {
		setTitle("");
		setUrl("");
		setType("");
		setSynopsis("");
		setTags("");
		setProcedures("")
    setAuthor("")
    setImage("")
    setFile("")
    setFileName("")
    setFileType("")
    setThumbnail("")
	};
  
  //AWS
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_KEY_ID,
      secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    });

    const S3Client = new AWS.S3({
      params: { Bucket: "kooben" },
      region: "us-east-1",
    });

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
      const url = `${process.env.REACT_APP_BUCKET_URL}${name}`
      console.log(url);
      setUrl(url)
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
    console.log(e.target.value);
    const addProcedure = e.target.value
    setProcedures([...procedures, addProcedure])
  }

  const getTags = (arrayOfTags) => {
    setTags(arrayOfTags)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('submitting...');

    const date = new Date();
    const formatDate =
      ("00" + date.getDate()).slice(-2) + "/" +
      ("00" + (date.getMonth() + 1)).slice(-2) + "/" +
      date.getFullYear() + " " +
      ("00" + date.getHours()).slice(-2) + ":" +
      ("00" + date.getMinutes()).slice(-2) + ":" +
      ("00" + date.getSeconds()).slice(-2);
    const created = formatDate
    const edited = formatDate

    //Falta una mejor UX en validación de formularios
    if([title,url,synopsis,tags,procedures,author].includes(null) || total_energy < 0.5){
			alert('Todos los campos son obligatorios')
		}else{
			console.log('todos los campos llenos')
			try {
        const data = {
          title,
          url,
          type,
          synopsis,
          tags,
          procedures,
          author,
          created,
          edited,
          total_energy,
          total_carbohydrate,
          total_sugars,
          total_fiber,
          total_sodium,
          total_protein,
          total_fat,
          total_cholesterol,
          total_glycemic_load,
          ingredients,
        }
        console.log(data);
				await createRecipe(data);
        handleSend()
				alert('¡ La receta fue creada exitosamente !')
        //cleanForm() hay que implementar correctamente
			} catch (error) {
				console.error(error.message);
			}
		}
  }

 const handleType = (e) => {
  setChecked(e.target.checked)
  console.log(checked);
  checked ? setType("") : setType('prehispanic')
 }

  const handleNutDetailTable = (ingredient) =>{
    const portion = ingredient.reduce((acc, item) => {
      return acc + (item?.equivalence.gram || 0);
    }, 0);
    //setPortion(portion.toFixed(0));
    //console.log("portion: " + portion.toFixed(2));

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

  return (
    <>
      <Container className="containerCreate" fluid>
        <NavBar />
        <Row className="rowCreate">
          <Col className="mainCreate">
            <h1 className="MyRecipeTitle">❤ Mi receta ❤</h1>
            <Form >
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
              <FormGroup className="imgContainerMyRecipe">
              
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
                  <FormFeedback invalid className="center">
                    Parece que el archivo que seleccionaste no es válido. Intenta con una imagen :)
                  </FormFeedback>
                  <FormText className="center">
                    {'Agrega la fotografía principal de tu receta'}
                  </FormText>
                </Col>
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
                      // valid={textValidator === 'has-success'}
                      // invalid={textValidator === 'has-danger'}
                      className="step"
                      id="step"
                      name="step"
                      type="textarea"
                      placeholder="¡describe con detalle el paso aquí!"
                      // onBlur={handleStepsBlur}
                      onBlur={handleStepsBlur}
                    />
                  </React.Fragment>
                );
              })}

              <FormGroup row>
                <Col sm={7}>
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
                <Col sm={8}>
                  <TagsManager 
                    getTags={getTags}
                  />
                </Col>
              </FormGroup>

              <h2>Comparte tu receta con el mundo 🌎:</h2>

              <FormGroup row>
                <Col sm={7}>
                  <div className="add-step-box">
                    <button
                      className="pink-button"
                      onClick={() => window.print()}
                    >
                      Exportar
                    </button>
                    {/* <button className='pink-button' onClick={handlePublish}>Exportar</button> */}
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
