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
import Alert from "@mui/material/Alert";
import { Link } from "react-router-dom";
import "./Home.scss";

function Home() {
  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState([]);
  const [msg, setMsg] = useState("");
  const [counter, setCounter] = useState(0);

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
              <Link className="linkNavbar btnCreateRecipe" to="/my_recipe">
                <Buttons
                  children="Crea tu receta"
                  size="lg"
                  color="mexican-pink"
                />
              </Link>
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
