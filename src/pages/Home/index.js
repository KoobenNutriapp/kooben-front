import { useEffect, useState, } from "react";
import { getRecipes } from "../../services/recipes";
import {
  Container,
  Row,
  Col,
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
} from "reactstrap";
import MainSearchBar from "../../components/MainSearchBar";
import FiltersTable from "../../components/FiltersTable";
import RecipeCard from "../../components/RecipeCards";
import Carousel from "../../components/Carousel";
import FinalNavBar from "../../components/FinalNavBar";
import Buttons from "../../components/Buttons/";
import { useDispatch } from 'react-redux';
import { firebase } from '../../Firebase/firebase-config';
import { login  } from '../../actions/auth';
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import "./Home.scss";
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState([]);
  const [msg, setMsg] = useState("");
  const [counter, setCounter] = useState(0);
  const [ isLoggedIn, setIsLoggedIn ] = useState(false);

  const notify = () => {
      toast.info('Para acceder a esta sección haz log in con Facebook!', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user)=>{
      if(user?.uid){
        dispatch( login ( user.uid, user.displayName ) )
        setIsLoggedIn( true );
      }else{
        setIsLoggedIn( false );
      }
    })
  }, [ dispatch,isLoggedIn ])



  useEffect(() => {
    const fetchData = async () => {
      const data = await getRecipes(search);
      const allRecipes = data.data.recipes;
      console.log(allRecipes);
      setRecipes(allRecipes);
      setCounter(allRecipes.length);
    };
    fetchData();
  }, [search]);

  const formatText = (message) => {
    const removeType = message.toString().replace("type=", "");
    const regExp = /=true/gi;
    const removeTrue = removeType.replace(regExp, "");
    const transPrehispanic = removeTrue.replace("prehispanic", "prehispánico");
    const transCalories = transPrehispanic.replace(
      "low_calories",
      " bajo en calorías"
    );
    const transCarbohydrates = transCalories.replace(
      "low_carbohydrates",
      " bajo en carbohidratos"
    );
    const transSodium = transCarbohydrates.replace(
      "low_sodium",
      " bajo en sodio"
    );
    const transProteins = transSodium.replace(
      "high_protein",
      " alto en proteínas"
    );
    const transFat = transProteins.replace("low_fat", " bajo en grasas");
    const transCholesterol = transFat.replace(
      "low_cholesterol",
      " bajo en colesterol"
    );
    const removeSearch = transCholesterol.replace("search=", "");
    const finalMsg = removeSearch.replace(
      "low_glycemic_load",
      " bajo en carga glucémica"
    );
    setMsg(finalMsg);
  };

  const handleSearch = (datosSearch) => {
    setSearch(datosSearch);
    formatText(datosSearch);
  };

  const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const onClickUrl = (url) => {
    return () => openInNewTab(url)
  }

  return (
    <>
      <Container className="container" fluid>
        <FinalNavBar 
          handleSearchBar={handleSearch}
        />
        <Row className="row">
          <Col md="2" className=" sideLeft">
            <FiltersTable callback={handleSearch} />
              {
                isLoggedIn ? 
              <Link className="linkNavbar btnCreateRecipe" to="/my_recipe">
                <button className="btnMyRecipe">Mi receta</button>
              </Link>
              :
              <div className="btnCreateRecipe">
                <button className="btnMyRecipe"onClick={notify}>Mi receta</button>
                <ToastContainer 
                  position="top-center"
                  autoClose={3000}
                  hideProgressBar={false}
                  newestOnTop={false}
                  closeOnClick
                  rtl={false}
                  pauseOnFocusLoss
                  draggable
                  pauseOnHover
                />
              </div>
              }
            <Card className="cardBox">
              <CardTitle tag="h5">K'óoben tips</CardTitle>
              <CardImg
                className="cardImg"
                alt="K'óoben tips"
                src="https://kooben.s3.amazonaws.com/docs/Iindice-glucemico-y-carga-glucemica-redes.jpg"
                onClick={onClickUrl('https://kooben.s3.amazonaws.com/docs/Iindice-glucemico-y-carga-glucemica-redes.jpg')}
              />
              <CardBody>
                <CardText
                  className="cardText"
                  onClick={onClickUrl('https://kooben.s3.amazonaws.com/docs/Iindice-glucemico-y-carga-glucemica-redes.jpg')}
                >
                  ¿Qué es el índice glucémico y la carga glucémica?. Aprende más
                  sobre diabetes mellitus...
                </CardText>
              </CardBody>
            </Card>

            <Card className="cardBox">
              <CardTitle tag="h5">K'óoben y Alexa</CardTitle>
              <CardImg
                className="cardImg"
                alt="AWS Alexa"
                src="https://kooben.s3.amazonaws.com/images/home-images/Alexa-Logo-History.jpg"
                onClick={onClickUrl('https://kooben.s3.amazonaws.com/docs/Cocina+Azul.pdf')}
              />
              <CardBody>
                <CardText
                  className="cardText"
                  onClick={onClickUrl('https://kooben.s3.amazonaws.com/docs/Cocina+Azul.pdf')}
                >
                ¡Entérate cómo acceder a las recetas de K'óoben con Amazon Alexa!
                </CardText>
              </CardBody>
            </Card>
          </Col>

          <Col md="10" className=" sideRight">
            <Carousel className="carousel"></Carousel>

            {msg ? (
              <Alert
                className="alert msgBox"
                variant="outlined"
                severity="info"
              >
                {`Su búsqueda de: ${msg} tiene: ${counter} resultado(s)`}
              </Alert>
            ) : (
              ""
            )}
            
            {recipes.map((recipe) => {
              return (
                <RecipeCard
                  Recipekey={recipe._id}
                  AltImage={recipe.title}
                  SrcImage={recipe.url}
                  RecipeTitle={recipe.title}
                  RecipeDescription={recipe.synopsis}
                  tagsArray={recipe.tags}
                  metaData={recipe}
                />
              );
            })}
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default Home;
