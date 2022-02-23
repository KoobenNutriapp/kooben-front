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
      [title, url, synopsis, tags, procedures, author].includes(null)) {
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
    console.log(ingredient);
  
    // const portion = ingredient.reduce((acc, item) => {
    //   return acc + (item?.equivalence.gram || 0);
    // }, 0);
    // setPortion(portion.toFixed(0));
    // console.log("portion: " + portion.toFixed(2));

    const energy = ingredient.reduce((acc, item) => {
      return acc + (item?.energy * item.equivalence.gram || 0);
    }, 0);
    setTotalEnergy(energy.toFixed(4));
    console.log("energy: " + energy.toFixed(4));

    const total_carbohydrate = ingredient.reduce((acc, item) => {
      return acc + (item?.total_carbohydrate * item.equivalence.gram || 0);
    }, 0);
    setTotalCarbohydrate(total_carbohydrate.toFixed(4));
    console.log("total_carbohydrate: " + total_carbohydrate.toFixed(4));

    const dietary_fiber = ingredient.reduce((acc, item) => {
      return acc + (item?.dietary_fiber * item.equivalence.gram || 0);
    }, 0);
    setTotalFiber(dietary_fiber.toFixed(4));
    console.log("dietary_fiber: " + dietary_fiber.toFixed(4));

    const sugars = ingredient.reduce((acc, item) => {
      return acc + (item?.sugars * item.equivalence.gram || 0);
    }, 0);
    setTotalSugars(sugars.toFixed(4));
    console.log("sugars: " + sugars.toFixed(4));

    // const calcium = ingredient.reduce((acc, item) => {
    //   return acc + (item?.calcium * item.equivalence.gram || 0);
    // }, 0);
    // setCalcium(calcium.toFixed(4));
    // console.log("calcium: " + calcium.toFixed(4));

    // const phosphorus = ingredient.reduce((acc, item) => {
    //   return acc + (item?.phosphorus * item.equivalence.gram || 0);
    // }, 0);
    // setPhosphorus(phosphorus.toFixed(4));
    // console.log("phosphorus: " + phosphorus.toFixed(4));

    // const iron = ingredient.reduce((acc, item) => {
    //   return acc + (item?.iron * item.equivalence.gram || 0);
    // }, 0);
    // setIron(iron.toFixed(4));
    // console.log("iron: " + iron.toFixed(4));

    const sodium = ingredient.reduce((acc, item) => {
      return acc + (item?.sodium * item.equivalence.gram || 0);
    }, 0);
    setTotalSodium(sodium.toFixed(4));
    console.log("sodium: " + sodium.toFixed(4));

    // const potassium = ingredient.reduce((acc, item) => {
    //   return acc + (item?.potassium * item.equivalence.gram || 0);
    // }, 0);
    // setPotassium(potassium.toFixed(4));
    // console.log("potassium: " + potassium.toFixed(4));

    // const magnesium = ingredient.reduce((acc, item) => {
    //   return acc + (item?.magnesium * item.equivalence.gram || 0);
    // }, 0);
    // setMagnesium(magnesium.toFixed(4));
    // console.log("magnesium: " + magnesium.toFixed(4));

    // const copper = ingredient.reduce((acc, item) => {
    //   return acc + (item?.copper * item.equivalence.gram || 0);
    // }, 0);
    // setCopper(copper.toFixed(4));
    // console.log("copper: " + copper.toFixed(4));

    // const zinc = ingredient.reduce((acc, item) => {
    //   return acc + (item?.zinc * item.equivalence.gram || 0);
    // }, 0);
    // setZinc(zinc.toFixed(4));
    // console.log("zinc: " + zinc.toFixed(4));

    // const manganese = ingredient.reduce((acc, item) => {
    //   return acc + (item?.manganese * item.equivalence.gram || 0);
    // }, 0);
    // setManganese(manganese.toFixed(4));
    // console.log("manganese: " + manganese.toFixed(4));

    // const selenium = ingredient.reduce((acc, item) => {
    //   return acc + (item?.selenium * item.equivalence.gram || 0);
    // }, 0);
    // setSelenium(selenium.toFixed(4));
    // console.log("selenium: " + selenium.toFixed(4));

    // const vitA = ingredient.reduce((acc, item) => {
    //   return acc + (item?.vitA * item.equivalence.gram || 0);
    // }, 0);
    // setVitA(vitA.toFixed(4));
    // console.log("vitA: " + vitA.toFixed(4));

    // const vitB1 = ingredient.reduce((acc, item) => {
    //   return acc + (item?.vitB1 * item.equivalence.gram || 0);
    // }, 0);
    // setVitB1(vitB1.toFixed(4));
    // console.log("vitB1: " + vitB1.toFixed(4));

    // const vitB2 = ingredient.reduce((acc, item) => {
    //   return acc + (item?.vitB2 * item.equivalence.gram || 0);
    // }, 0);
    // setVitB2(vitB2.toFixed(4));
    // console.log("vitB2: " + vitB2.toFixed(4));
    // const vitB3 = ingredient.reduce((acc, item) => {
    //   return acc + (item?.vitB3 * item.equivalence.gram || 0);
    // }, 0);
    // setVitB3(vitB3.toFixed(4));
    // console.log("vitB3: " + vitB3.toFixed(4));

    // const vitB6 = ingredient.reduce((acc, item) => {
    //   return acc + (item?.vitB6 * item.equivalence.gram || 0);
    // }, 0);
    // setVitB6(vitB6.toFixed(4));
    // console.log("vitB6: " + vitB6.toFixed(4));

    // const vitB12 = ingredient.reduce((acc, item) => {
    //   return acc + (item?.vitB12 * item.equivalence.gram || 0);
    // }, 0);
    // setVitB12(vitB12.toFixed(4));
    // console.log("vitB12: " + vitB12.toFixed(4));

    // const vitC = ingredient.reduce((acc, item) => {
    //   return acc + (item?.vitC * item.equivalence.gram || 0);
    // }, 0);
    // setVitC(vitC.toFixed(4));
    // console.log("vitC: " + vitC.toFixed(4));

    // const folicAc = ingredient.reduce((acc, item) => {
    //   return acc + (item?.folicAc * item.equivalence.gram || 0);
    // }, 0);
    // setFolicAc(folicAc.toFixed(4));
    // console.log("folicAc: " + folicAc.toFixed(4));

    // const vitD = ingredient.reduce((acc, item) => {
    //   return acc + (item?.vitD * item.equivalence.gram || 0);
    // }, 0);
    // setVitD(vitD.toFixed(4));
    // console.log("vitD: " + vitD.toFixed(4));

    // const vitE = ingredient.reduce((acc, item) => {
    //   return acc + (item?.vitE * item.equivalence.gram || 0);
    // }, 0);
    // setVitE(vitE.toFixed(4));
    // console.log("vitE: " + vitE.toFixed(4));

    // const vitK = ingredient.reduce((acc, item) => {
    //   return acc + (item?.vitK * item.equivalence.gram || 0);
    // }, 0);
    // setVitK(vitK.toFixed(4));
    // console.log("vitK: " + vitK.toFixed(4));

    const protein = ingredient.reduce((acc, item) => {
      return acc + (item?.protein * item.equivalence.gram || 0);
    }, 0);
    setTotalProtein(protein.toFixed(4));
    console.log("protein: " + protein.toFixed(4));

    const total_fat = ingredient.reduce((acc, item) => {
      return acc + (item?.total_fat * item.equivalence.gram || 0);
    }, 0);
    setTotalFat(total_fat.toFixed(4));
    console.log("total_fat: " + total_fat.toFixed(4));

    // const saturated_fatty_acids = ingredient.reduce((acc, item) => {
    //   return acc + (item?.saturated_fatty_acids * item.equivalence.gram || 0);
    // }, 0);
    // setSaturated_fatty_acids(saturated_fatty_acids.toFixed(4));
    // console.log("saturated_fatty_acids: " + saturated_fatty_acids.toFixed(4));

    // const monounsaturated_fatty_acids = ingredient.reduce((acc, item) => {
    //   return acc + (item?.monounsaturated_fatty_acids * item.equivalence.gram || 0);
    // }, 0);
    // setMonounsaturated_fatty_acids(monounsaturated_fatty_acids.toFixed(4));
    // console.log(
    //   "monounsaturated_fatty_acids: " + monounsaturated_fatty_acids.toFixed(4)
    // );

    // const polyunsaturated_fatty_acids = ingredient.reduce((acc, item) => {
    //   return acc + (item?.polyunsaturated_fatty_acids * item.equivalence.gram || 0);
    // }, 0);
    // setPolyunsaturated_fatty_acids(polyunsaturated_fatty_acids.toFixed(4));
    // console.log(
    //   "polyunsaturated_fatty_acids: " + polyunsaturated_fatty_acids.toFixed(4)
    // );

    const cholesterol = ingredient.reduce((acc, item) => {
      return acc + (item?.cholesterol * item.equivalence.gram || 0);
    }, 0);
    setTotalCholesterol(cholesterol.toFixed(4));
    console.log("cholesterol: " + cholesterol.toFixed(4));

    const glycemic_load = ingredient.reduce((acc, item) => {
      return (
        acc + ((item?.total_carbohydrate * item?.glycemic_index * item.equivalence.gram) / 100 || 0)
      );
    }, 0);
    setTotalGlycemicLoad(glycemic_load.toFixed(4));
    console.log("glycemic_load: " + glycemic_load.toFixed(4));

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

              <h2>Sinopsis:</h2>
              <JoditEditor
                ref={editor}
                value={synopsis}
                config={config}
		            tabIndex={1}
		            onBlur={newContent => setSynopsis(newContent)}
              />

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

              <JoditEditor
                ref={editor}
                value={procedures}
                config={config}
		            tabIndex={1}
		            onBlur={newContent => setProcedures(newContent)}
              />

              <FormGroup row>
                <Col sm={8} className="tagsBox">
                  <TagsManager 
                    getTags={getTags} 
                  />
                </Col>
              </FormGroup>

              <h2>Comparte tu receta con el mundo 🌎:</h2>

              <FormGroup row>
                <Col sm={2}>
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
