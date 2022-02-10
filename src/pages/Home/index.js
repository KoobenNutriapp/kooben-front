import { useEffect, useState } from "react";
import { getRecipes } from "../../services/recipes";
import { Container, Row, Col } from "reactstrap";
import MainSearchBar from "../../components/MainSearchBar";
import FiltersTable from "../../components/FiltersTable";
import RecipeCard from "../../components/RecipeCards";
import Carousel from "../../components/Carousel";
import Buttons from "../../components/Buttons/";
import Alert from "@mui/material/Alert";
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
    //console.log("data: " + datosSearch);
    setSearch(datosSearch);
    formatText(datosSearch);
  };
  return (
    <>
      <Container className="container" fluid>
        <MainSearchBar callback={handleSearch} />
        <Row className="row">
          <Col md="2" className="col-1 sideLeft">
            <FiltersTable callback={handleSearch} />
            <div className="btnCreateRecipe">
              <Buttons
                children="Crea tu receta"
                size="lg"
                color="mexican-pink"
                // callback={callbackName}
              />
            </div>
            <RecipeCard
              key={"a102012"}
              AltImage={"Card image cap"}
              SrcImage={
                "http://fmdiabetes.org/wp-content/uploads/2018/01/Iindice-glucemico-y-carga-glucemica-redes.jpg"
              }
              RecipeTitle={"Kóoben tips"}
              RecipeDescription={
                "¿Qué es el índice glucémico y la carga glucémica?. Aprende más sobre diabetes mellitus y nutrición."
              }
              tagsArray={[""]}
            />
          </Col>
          <Col md="9" className="col-2 sideRight">
            <Carousel className='carousel'></Carousel>

            {msg ? (
              <Alert className="alert" variant="outlined" severity="success">
                {`Su búsqueda de: ${msg} tiene: ${counter} resultado(s)`}
              </Alert>
            ) : (
              ""
            )}

            {recipes.map((recipe) => {
              return (
                <RecipeCard
                  key={recipe._id}
                  AltImage={recipe.title}
                  SrcImage={recipe.url}
                  RecipeTitle={recipe.title}
                  RecipeDescription={recipe.synopsis}
                  tagsArray={recipe.tags}
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
