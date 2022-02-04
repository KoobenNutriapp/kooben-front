import { useEffect,useState } from 'react';
import { getRecipes } from "../../services/recipes";
import { Container, Row, Col } from 'reactstrap';
import MainSearchBar from "../../components/MainSearchBar";
import FiltersTable from "../../components/FiltersTable";
import RecipeCard from "../../components/RecipeCards";
import "./Home.scss"

function Home(){

const [recipes, setRecipes] = useState([])
const [search, setSearch] = useState([]);

useEffect(() => {  
    const fetchData = async () => {    
      const data = await getRecipes(search)
      const allRecipes = data.data.recipes
      setRecipes(allRecipes)
    }  
    fetchData();
  },[search]);

  const handleSearch = (datosSearch) => {
    console.log('data: ' + datosSearch);
    setSearch(datosSearch)
  }

  

    return(
        <>
            <Container className="container" fluid>
                <MainSearchBar 
                    callback={handleSearch}
                />
                <Row className="row">
                    <Col md="2"className="col-1 sideLeft">
                        <FiltersTable  
                          callback={handleSearch} 
                        />
                    </Col>
                    <Col md="9"className="col-2 sideRight">
                        {
                            recipes.map((recipe) => {
                                return <RecipeCard 
                                    key={recipe._id}
                                    AltImage={recipe.title}
                                    SrcImage={recipe.url}
                                    RecipeTitle={recipe.title}
                                    RecipeDescription={recipe.synopsis}
                                    tagsArray={recipe.tags}
                                />
                            })
                        }
                    </Col>
                </Row>                
            </Container>
        </>
    );
};

export default Home;