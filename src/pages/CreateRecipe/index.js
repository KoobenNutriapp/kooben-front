import {Form,FormGroup,Label,Input,FormText,FormFeedback} from "reactstrap";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { Container, Row, Col } from "reactstrap";
import Switch from "@mui/material/Switch";
import NavBar from "../../components/NavBar";
import Calculator from "../../components/Calculator";
import Modals from "../../components/Modals";
import TagsManager from "../../components/TagsManager";
import { createRecipe } from "../../services/recipes";
import { Link } from "react-router-dom";
import "./CreateRecipe.scss";
import React, { useState, useRef } from "react";
import AWS from "aws-sdk";
import Compressor from "compressorjs";
import JoditEditor from "jodit-react";

const CreateRecipe = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [tags, setTags] = useState([]);
  const [steps, setSteps] = useState([]);
  //const [procedures, setProcedures] = useState([]);
  const [counter, setCounter] = useState(1);
  //const [textValidator, setTextValidator] = useState(true)
  const [checked, setChecked] = useState(false);
  const [type, setType] = useState("");
  const [url, setUrl] = useState(null);
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
  const [validateTitle, setValidateTitle] = useState(null);
  const [validateAuthor, setValidateAuthor] = useState(null);
  const [validateSynopsis, setValidateSynopsis] = useState(null);
  const [thumbnail, setThumbnail] = useState(false);
  const [modal, setModal] = useState(false);
  const [procedures, setProcedures] = useState('')

  const editor = useRef(null)
  
	const config = {
    toolbarAdaptive: false,
    placeholder:'escribe el detalle de tu receta aquí...',
		readonly: false,
    buttons:[
    'bold',
		'italic',
    '|',
		'ol',
    '|',
    'undo',
		'redo',    
    ]
	}

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
    compressImage(imageFile);
    setImage(imageUrl);
    const name = `k-${Date.now()}`;
    setFileName(name);
    const type = imageFile.type;
    setFileType(type);
    const url = `${process.env.REACT_APP_BUCKET_URL}${name}`;
    console.log(url);
    setUrl(url);
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
        formData.append("file", result, result.name);
        setFile(result);
        setValidateMainImage("has-success");
        setThumbnail(true);
      },
      error(err) {
        console.log("error: " + err.message);
        setValidateMainImage("has-danger");
        setThumbnail(false);
      },
    });
  };

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
    const stepSelected = e.currentTarget.id;
    const filteredSteps = steps.filter((item) => {
      return item !== stepSelected;
    });
    setSteps(filteredSteps);
  };

  const handleAddStep = (e) => {
    e.preventDefault();
    setCounter(counter + 1);
    const tempStep = `step ${counter}`;
    console.log(tempStep);
    setSteps([...steps, tempStep]);
  };

  const handleStepsBlur = (e) => {
    console.log(e.target.value);
    const addProcedure = e.target.value;
    if(addProcedure!==""){
      setProcedures([...procedures, addProcedure]);
    }    
  };

  const getTags = (arrayOfTags) => {
    setTags(arrayOfTags);
  };

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
    synopsis?.length < 12 ? setValidateSynopsis('has-danger') : setValidateSynopsis('has-success')
    setSynopsis(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("submitting...");

    const date = new Date();
    const formatDate =
      ("00" + date.getDate()).slice(-2) +
      "/" +
      ("00" + (date.getMonth() + 1)).slice(-2) +
      "/" +
      date.getFullYear() +
      " " +
      ("00" + date.getHours()).slice(-2) +
      ":" +
      ("00" + date.getMinutes()).slice(-2) +
      ":" +
      ("00" + date.getSeconds()).slice(-2);
    const created = formatDate;
    const edited = formatDate;

    validateText()

    //Falta una mejor UX en validación de formularios
    if (
      [title, url, synopsis, tags, procedures, author].includes(null) ||
      total_energy < 0.5
    ) {
      alert("Todos los campos son obligatorios");
    } else {
      console.log("todos los campos llenos");
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
        };
        console.log(data);
        await createRecipe(data);
        handleSend();
        //alert('¡ La receta fue creada exitosamente !')
        //cleanForm() hay que implementar correctamente
      } catch (error) {
        console.error(error.message);
      }
    }
  };

  const handleType = (e) => {
    setChecked(e.target.checked);
    console.log(checked);
    checked ? setType("") : setType("prehispanic");
  };

  const handleNutDetailTable = (ingredient) => {
    const portion = ingredient.reduce((acc, item) => {
      return acc + (item?.equivalence.gram || 0);
    }, 0);
    //setPortion(portion.toFixed(0));
    //console.log("portion: " + portion.toFixed(2));

    const energy = ingredient.reduce((acc, item) => {
      return acc + (item?.energy || 0);
    }, 0);
    setTotalEnergy((energy * portion).toFixed(2));
    //console.log("energy: " + energy.toFixed(2));

    const total_carbohydrate = ingredient.reduce((acc, item) => {
      return acc + (item?.total_carbohydrate || 0);
    }, 0);
    setTotalCarbohydrate((total_carbohydrate * portion).toFixed(2));
    //console.log("total_carbohydrate: " + total_carbohydrate.toFixed(2));

    const dietary_fiber = ingredient.reduce((acc, item) => {
      return acc + (item?.dietary_fiber || 0);
    }, 0);
    setTotalFiber((dietary_fiber * portion).toFixed(2));
    //console.log("dietary_fiber: " + dietary_fiber.toFixed(2));

    const sugars = ingredient.reduce((acc, item) => {
      return acc + (item?.sugars || 0);
    }, 0);
    setTotalSugars((sugars * portion).toFixed(2));
    //console.log("sugars: " + sugars.toFixed(2));

    const sodium = ingredient.reduce((acc, item) => {
      return acc + (item?.sodium || 0);
    }, 0);
    setTotalSodium((sodium * portion).toFixed(2));
    //console.log("sodium: " + sodium.toFixed(2));

    const protein = ingredient.reduce((acc, item) => {
      return acc + (item?.protein || 0);
    }, 0);
    setTotalProtein((protein * portion).toFixed(2));
    //console.log("protein: " + protein.toFixed(2));

    const total_fat = ingredient.reduce((acc, item) => {
      return acc + (item?.total_fat || 0);
    }, 0);
    setTotalFat((total_fat * portion).toFixed(2));
    //console.log("total_fat: " + total_fat.toFixed(2));

    const cholesterol = ingredient.reduce((acc, item) => {
      return acc + (item?.cholesterol || 0);
    }, 0);
    setTotalCholesterol((cholesterol * portion).toFixed(2));
    //console.log("cholesterol: " + cholesterol.toFixed(2));

    const glycemic_load = ingredient.reduce((acc, item) => {
      return (
        acc + ((item?.total_carbohydrate * item?.glycemic_index) / 100 || 0)
      );
    }, 0);
    setTotalGlycemicLoad((glycemic_load * portion).toFixed(4));
    //console.log("glycemic_load: " + glycemic_load.toFixed(4));

    setIngredients(ingredient);
  };

  const toggle = () => setModal(!modal);

  return (
    <>
      <Container className="containerCreate" fluid>
        {/* <NavBar /> */}
        <Row className="rowCreate">
          <Col className="mainCreate">
            <h1 className="newRecipeTitle">Crea una nueva receta</h1>
            {/* <Form onSubmit={handleSubmit}> */}
            <Form onSubmit={handleSubmit}>
              <FormGroup row>
                <Label for="title" sm={2}>
                  Título: *
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
                  Autor: *
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

              <FormGroup row>
                <Label for="textbox" sm={2}>
                  Sinopsis: *
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
                    ¡La sinopsis debe ser mayor a 11 caracteres!
                  </FormFeedback>
                </Col>
              </FormGroup>
              <FormGroup className="imgContainer">
                {thumbnail ? (
                  <img className="thumbnail" alt="tu receta" src={image} />
                ) : (
                  ""
                )}
              </FormGroup>

              <FormGroup row>
                <Label for="mainPhoto" sm={2}>
                  Fotografía: *
                </Label>
                <Col sm={10}>
                  <Input
                    valid={validateMainImage === "has-success"}
                    invalid={validateMainImage === "has-danger"}
                    id="mainPhoto"
                    accept="image/png,image/jpeg"
                    name="file"
                    type="file"
                    onChange={handleLoad}
                  />
                  <FormFeedback valid className="center">
                    ¡La imagen se cargó correctamente!
                  </FormFeedback>
                  <FormFeedback invalid className="center">
                    Parece que el archivo que seleccionaste no es válido.
                    Intenta con una imagen :)
                  </FormFeedback>
                  <FormText className="center">
                    {
                      "Agrega la fotografía principal de tu receta. Las imágenes serán optimizadas para web."
                    }
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
                  inputProps={{ "aria-label": "controlled" }}
                  color="success"
                />
              </FormGroup>
              <h2>Ingredientes:</h2>

              <Row className="ingredients boxCalculator">
                <Calculator getIngredientsToPost={handleNutDetailTable} />
              </Row>

              <h2>Procedimiento:</h2>

              {/* {steps.map((item, index) => {
                return (
                  <React.Fragment key={item}>
                    <div className="lineSteps"></div>
                    <h3>{`paso ${index + 1}`}</h3>
                    <td
                      className="deleteButton"
                      id={item}
                      onClick={handleDeleteStep}
                    >
                      {
                        <Tooltip title="Elimina paso" placement="right-start">
                          <IconButton>
                            <DeleteIcon className="binStep" />
                          </IconButton>
                        </Tooltip>
                      }
                    </td> */}
                    {/* <UploadPhoto
                      infMessage={
                        "Agrega una fotografía para este paso. Las imágenes serán optimizadas para web."
                      }
                    /> */}
                    {/* <Input
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
              </FormGroup> */}

              <JoditEditor
                ref={editor}
                value={procedures}
                config={config}
		            tabIndex={1} // tabIndex of textarea
		            onBlur={newContent => setProcedures(newContent)} // preferred to use only this option to update the content for performance reasons
                // onChange={newContent => {}}
              />

              <FormGroup row>
                <Col sm={8}>
                  <TagsManager getTags={getTags} />
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
                    {/* <button className="publish" type="submit" value="submit">
                      Publicar
                    </button> */}

                    <Button className="publish" type="submit" onClick={toggle}>
                      Publicar
                    </Button>
                    <Modal isOpen={modal} toggle={toggle}>
                      <ModalBody >
                        ¡ Gracias por crear con K'óoben !
                      </ModalBody>
                      <ModalFooter>
                        {/* aqui meter el llink a detail */}
                        <Link className="linkNavbar btnCreateRecipe" to={'/'}>
                          <Button className="modal-button">
                            Finalizar creación
                          </Button>
                        </Link>
                      </ModalFooter>
                    </Modal>
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
