import {Form,FormGroup,Label,Input,FormText,FormFeedback} from "reactstrap";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useLocation } from 'react-router-dom';
import { Container, Row, Col } from "reactstrap";
import Switch from "@mui/material/Switch";
import TagsManager from "../../components/TagsManager";
import IngredientsDynamicTable from "../../components/IngredientsDynamicTable/";
import NutFactTable from "../../components/NutFactTable/";
import { updateRecipe } from "../../services/recipes";
import "./UpdateRecipe.scss";
import React, { useState, useEffect, useRef } from "react";
import AWS from "aws-sdk";
import Compressor from "compressorjs";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { getIngredients } from "../../services/ingredient";
import JoditEditor from "jodit-react";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { firebase } from '../../Firebase/firebase-config'
import { login, userApp, newUserApp  } from '../../actions/auth';
import { getUsers } from "../../services/user";

const UpdateRecipe = () => {
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [synopsis, setSynopsis] = useState("");
  const [tags, setTags] = useState([]);
  const [checked, setChecked] = useState(false);
  const [type, setType] = useState("");
  const [url, setUrl] = useState("");
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
  const [addIngredient, setAddIngredient] = useState(false);
  const [detailTable, setDetailTable] = useState([]);
  const [procedures, setProcedures] = useState('')
    // ******Checking admin
    const [ checking, setChecking ] = useState(true);
    const [ isLoggedIn, setIsLoggedIn ] = useState(false);
    const [ admin, setAdmin ] = useState(true);
  
    const dispatch = useDispatch();
  
    useEffect(() => {
      firebase.auth().onAuthStateChanged((user)=>{
        if(user?.uid){
          dispatch( login ( user.uid, user.displayName ) )
          validateRol(user.email)
          dispatch( newUserApp)
          setIsLoggedIn( true );
        }else{
          setIsLoggedIn( false );
          setAdmin(false)
        }
        setChecking(false);
      })
    }, [ dispatch, checking, isLoggedIn, admin ])
    
    const validateRol = async (emailToValidate) =>{
      const data = await getUsers();
      const userList = data.data.users
      const UserExist = userList.filter(user=>{
          return user.mail===emailToValidate
        })
        console.log(UserExist);
      if(UserExist.length === 1){
        dispatch(userApp('admin'))
        setAdmin(true)
      }
    }

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

  useEffect(() => {
    const setData = () => {
        setTitle(location.state.recipe.metaData.title)
        setAuthor(location.state.recipe.metaData.author)
        setSynopsis(location.state.recipe.metaData.synopsis)
        setUrl(location.state.recipe.metaData.url)
        location.state.recipe.metaData.url === 'prehispanic' ?
        setChecked(false):setChecked(true)
        //setIngredients(location.state.recipe.metaData.ingredients)
        setDetailTable(location.state.recipe.metaData.ingredients)
        setProcedures(location.state.recipe.metaData.procedures)
        setTags(location.state.recipe.metaData.tags)
    
    };
    setData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getIngredients();
      const allIngredients = data.ingredients;
      setIngredients(allIngredients);
      console.log(allIngredients);
    };
    fetchData();
  }, []);

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

  const deleteImgFromBucket = async () => {
    console.log("Deleting photo from AWS...");
    const tempUrl = (location.state.recipe.metaData.url).split('k-')
    const imageToDelete = tempUrl[1]  

    const params = {
      Key: `images/k-${imageToDelete}`,
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
    let imageIndicator = false
    const id = location.state.recipe.metaData._id
    const ingredients = detailTable
    
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
      //const created = formatDate;
      const edited = formatDate;
      
      validateText()

      const oldIgame = location.state.recipe.metaData.url
      if(oldIgame !== url){
        console.log('son diferentes');
        imageIndicator = true
      }
      
    if (
      // [title, url, synopsis, tags, procedures, author].includes(null) ||
      // total_energy < 0.5
      [title].includes(null)
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
        await updateRecipe(id,data);
        if (imageIndicator){
          deleteImgFromBucket() 
          imageIndicator = false
        }
        handleSend();
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

  const handleNutDetailTable = () => {
    //console.log(ingredient);
  
    // const portion = ingredient.reduce((acc, item) => {
    //   return acc + (item?.equivalence.gram || 0);
    // }, 0);
    // setPortion(portion.toFixed(0));
    // console.log("portion: " + portion.toFixed(2));

    const energy = detailTable.reduce((acc, item) => {
      return acc + (item?.energy * item.equivalence.gram || 0);
    }, 0);
    setTotalEnergy(energy.toFixed(4));
    console.log("energy: " + energy.toFixed(4));

    const total_carbohydrate = detailTable.reduce((acc, item) => {
      return acc + (item?.total_carbohydrate * item.equivalence.gram || 0);
    }, 0);
    setTotalCarbohydrate(total_carbohydrate.toFixed(4));
    console.log("total_carbohydrate: " + total_carbohydrate.toFixed(4));

    const dietary_fiber = detailTable.reduce((acc, item) => {
      return acc + (item?.dietary_fiber * item.equivalence.gram || 0);
    }, 0);
    setTotalFiber(dietary_fiber.toFixed(4));
    console.log("dietary_fiber: " + dietary_fiber.toFixed(4));

    const sugars = detailTable.reduce((acc, item) => {
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

    const sodium = detailTable.reduce((acc, item) => {
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

    const protein = detailTable.reduce((acc, item) => {
      return acc + (item?.protein * item.equivalence.gram || 0);
    }, 0);
    setTotalProtein(protein.toFixed(4));
    console.log("protein: " + protein.toFixed(4));

    const total_fat = detailTable.reduce((acc, item) => {
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

    const cholesterol = detailTable.reduce((acc, item) => {
      return acc + (item?.cholesterol * item.equivalence.gram || 0);
    }, 0);
    setTotalCholesterol(cholesterol.toFixed(4));
    console.log("cholesterol: " + cholesterol.toFixed(4));

    const glycemic_load = detailTable.reduce((acc, item) => {
      return (
        acc + ((item?.total_carbohydrate * item?.glycemic_index * item.equivalence.gram) / 100 || 0)
      );
    }, 0);
    setTotalGlycemicLoad(glycemic_load.toFixed(4));
    console.log("glycemic_load: " + glycemic_load.toFixed(4));


    //setIngredients(detailTable);
  };

  const toggle = () => setModal(!modal);

  const filterDeletingItems = (deleteIngredient) =>{

    const filteredIngredient = detailTable.filter(item=>{
      return item._id !== deleteIngredient
    })
    setDetailTable(filteredIngredient)
    //setIngredients(filteredIngredient)
  }

   const handleSelection = (selection) => {
    if(selection){
      const tempTable = [...detailTable,selection]
      let set = new Set( tempTable.map( JSON.stringify ) )
      let result = Array.from( set ).map( JSON.parse );
      setDetailTable(result)
      //setIngredients(result)
    }else{
     console.log('empty');
    }
   }
 
   const handleBypassToNutTable = ((ingredient,operation, portion, quantity) => {
     const gramFactor = 85
     const cupFactor = 2
     const spoonFactor = 20
     const pieceFactor = 1
 
     const newDetailTable = detailTable.map(item=>{
       if(item._id === ingredient._id){
         if(portion==='cup'){
           console.log('entra a cup');
           console.log('cantidad: ' + quantity);
           console.log('gramos: ' + item.equivalence.gram);
           console.log('tazas: ' + item.equivalence.cup);
           item.equivalence.gram = (quantity * gramFactor) / cupFactor
           item.equivalence.cup = quantity
           item.equivalence.spoon = (quantity * spoonFactor) / cupFactor
           item.equivalence.piece = (quantity * pieceFactor) / cupFactor
         }else if(portion==='piece'){
           console.log('entra a piece');
           console.log('cantidad: ' + quantity);
           console.log('piezas: ' + item.equivalence.piece);
           console.log('gramos: ' + item.equivalence.gram);
           item.equivalence.gram = quantity * gramFactor
           item.equivalence.piece = quantity
           item.equivalence.cup = (quantity * pieceFactor) * cupFactor
           item.equivalence.spoon = quantity * spoonFactor
         }else if(portion==='spoon'){
           console.log('entra a spooon');
           console.log('cantidad: ' + quantity);
           console.log('cucharadas: ' + item.equivalence.spoon);
           console.log('gramos: ' + item.equivalence.gram);
           item.equivalence.gram = (quantity * gramFactor) / spoonFactor
           item.equivalence.spoon = quantity
           item.equivalence.cup = (quantity * cupFactor) / spoonFactor
           item.equivalence.piece = quantity / spoonFactor
         }else if(portion==='gram'){
           console.log('entra a gram');
           console.log('cantidad: ' + quantity);
           console.log('gramos: ' + item.equivalence.gram);
           item.equivalence.gram = quantity
           item.equivalence.cup = (quantity * cupFactor) / gramFactor
           item.equivalence.piece = quantity / gramFactor
           item.equivalence.spoon = (quantity * spoonFactor) / gramFactor
         }
       }
       return item
     })
 
     setDetailTable(newDetailTable)
     //setIngredients(newDetailTable)
     handleNutDetailTable()
   })

   const handleAddIngredient = (e) => {
    e.preventDefault();
    setAddIngredient(true);
    
  };  

  const options = ingredients?.map((option) => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });
 
   console.log('original');
   console.log(detailTable);
 
  return (
    <>
      <Container className="containerUpdate" fluid>
        {/* <NavBar /> */}
        <Row className="rowUpdate">
          <Col className="mainUpdate">
            <h1 className="newRecipeTitle">Edita esta receta...</h1>
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
                    value={title}
                  />
                  <FormFeedback valid className="centerUpdate">
                    ¡Correcto!. ¡Gracias!
                  </FormFeedback>
                  <FormFeedback invalid className="centerUpdate">
                    ¡El título debe ser mayor a 5 caracteres!
                  </FormFeedback>
                    </Col>
                  </FormGroup>

              <FormGroup row>
                <Label for="authorUpdate" sm={2}>
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
                    value={author}
                  />
                  <FormFeedback valid className="centerUpdate">
                    ¡Correcto!. ¡Gracias!
                  </FormFeedback>
                  <FormFeedback invalid className="centerUpdate">
                    ¡El autor debe ser mayor a 5 caracteres!
                  </FormFeedback>
                </Col>
              </FormGroup>

              {/* <FormGroup row>
                <Label for="textboxUpdate" sm={2}>
                  Sinopsis: *
                </Label>
                <Col sm={10}>
                  <Input
                    valid={validateSynopsis === "has-success"}
                    invalid={validateSynopsis === "has-danger"}
                    className="textboxUpdate"
                    id="synopsisUpdate"
                    name="synopsisUpdate"
                    type="textareaUpdate"
                    placeholder="¡cuéntale al mundo porqué tu receta es genial!"
                    onChange={handleSynopsis}
                    onBlur={handleSynopsis}
                    value={synopsis}
                  />
                  <FormFeedback valid className="centerUpdate">
                    ¡Correcto!. ¡Gracias!
                  </FormFeedback>
                  <FormFeedback invalid className="centerUpdate">
                    ¡La sinopsis debe ser mayor a 11 caracteres!
                  </FormFeedback>
                </Col>
              </FormGroup> */}
              <h2>Sinopsis:</h2>
              <JoditEditor
                ref={editor}
                value={synopsis}
                config={config}
		            tabIndex={1} 
		            onBlur={newContent => setSynopsis(newContent)}
              />

              {
                !thumbnail ? 
                <>
                  <h6>Fotografía original</h6>
                    <img className="thumbnailUpdate" alt="tu receta" src={url} /> 
                </>
                : null
              }

              <FormGroup className="imgContainerUpdate">
                {thumbnail ? (
                  <img className="thumbnailUpdate" alt="tu receta" src={image} />
                ) : (
                  ""
                )}
              </FormGroup>

              <h6>Selecciona la nueva fotografía</h6>

              <FormGroup row>
                <Label for="mainPhotoUpdate" sm={2}>
                  Fotografía: *
                </Label>
                <Col sm={10}>
                  <Input
                    valid={validateMainImage === "has-success"}
                    invalid={validateMainImage === "has-danger"}
                    id="mainPhotoUpdate"
                    accept="image/png,image/jpeg"
                    name="file"
                    type="file"
                    onChange={handleLoad}
                  />
                  <FormFeedback valid className="centerUpdate">
                    ¡La imagen se cargó correctamente!
                  </FormFeedback>
                  <FormFeedback invalid className="centerUpdate">
                    Parece que el archivo que seleccionaste no es válido.
                    Intenta con una imagen :)
                  </FormFeedback>
                  <FormText className="centerUpdate">
                    {
                      "Agrega la fotografía principal de tu receta. Las imágenes serán optimizadas para web."
                    }
                  </FormText>
                </Col>
              </FormGroup>

              <FormGroup>
                <Label for="prehispanicUpdate" sm={2}>
                  Prehispánica:
                </Label>
                <Switch
                  id="prehispanicUpdate"
                  name="prehispanicUpdate"
                  checked={checked}
                  onChange={handleType}
                  inputProps={{ "aria-label": "controlled" }}
                  color="success"
                />
              </FormGroup>
              <h2>Ingredientes:</h2>

              <Row className="updateFrameTables">
                <Col className="updateIngredientsTable">
                  <div className="updateIngredientsContainer">
                    <IngredientsDynamicTable 
                      ingredients={detailTable} 
                      callback={filterDeletingItems}
                      nutData={handleBypassToNutTable}
                    />
                    <button className="btnAddIngredient" onClick={handleAddIngredient}>
                      Agrega ingrediente
                    </button>
                    <div className="selectBox">
                      {addIngredient ? (
                      <Autocomplete
                        size='small'
                        options={options?.sort((a, b) => -b.firstLetter.localeCompare(a.firstLetter))}
                        groupBy={(option) => option.firstLetter}
                        getOptionLabel={(option) => option.name}
                        renderInput={(params) => <TextField {...params} label="Agrega un ingrediente" />}
                        className="selectIngredient"
                        onChange={(e,selection) => handleSelection(selection)}
                      />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </Col>
             
                <Col className="updatelNutritionalTable">
                  <NutFactTable 
                    ingredient={detailTable}
                  />
                </Col>
              </Row>

              <h2>Procedimiento:</h2>

              <JoditEditor
                ref={editor}
                value={procedures}
                config={config}
		            tabIndex={1} // tabIndex of textarea
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

                    {
                      admin ?
                      <>
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
                            Finalizar edición
                          </Button>
                          </Link>
                          </ModalFooter>
                      </Modal>
                    </>:
                    null
                    }
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

export default UpdateRecipe;
