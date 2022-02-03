import { Container, Row, Col } from 'reactstrap';
import MainSearchBar from "../../components/MainSearchBar";
import FiltersTable from "../../components/FiltersTable";
import RecipeCard from "../../components/RecipeCards";
import "./Home.scss"

function Home(){

//data only for card-recipe testing ====================
  
  const testingData = {
    recipeTitle: "Ensalada de nopales",
    recipeSynopsis: 'This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.',
    imageURL: 'https://d1uz88p17r663j.cloudfront.net/resized/57a0e0353946ed412490f56d78087f6c_Ensalada_de_nopales_1200_600.png',
    tags: [
      "gluten-free",
      "prehispanic",
      "low_calories",
      "high_fiber"
    ]
  }

  const {recipeTitle, recipeSynopsis, imageURL, tags} = testingData
  const altImage = recipeTitle
  const url = imageURL
  const title = recipeTitle
  const synopsis = recipeSynopsis
  const listOfTags = tags

//=======================================================



    return(
        <>
            <Container className="container" fluid>
                <MainSearchBar />
                <Row className="row">
                    <Col md="2"className="col-1 sideLeft">
                        <FiltersTable  />

                    </Col>
                    <Col md="9"className="col-2 sideRight">
                        <RecipeCard
                            AltImage={altImage}
                            SrcImage={url}
                            RecipeTitle={title}
                            RecipeDescription={synopsis}
                            tagsArray={listOfTags}
                        />
                        <RecipeCard
                            AltImage={altImage}
                            SrcImage={url}
                            RecipeTitle={title}
                            RecipeDescription={synopsis}
                            tagsArray={listOfTags}
                        />
                        <RecipeCard
                            AltImage={altImage}
                            SrcImage={url}
                            RecipeTitle={title}
                            RecipeDescription={synopsis}
                            tagsArray={listOfTags}
                        />
                        <RecipeCard
                            AltImage={altImage}
                            SrcImage={url}
                            RecipeTitle={title}
                            RecipeDescription={synopsis}
                            tagsArray={listOfTags}
                        />
                        <RecipeCard
                            AltImage={altImage}
                            SrcImage={url}
                            RecipeTitle={title}
                            RecipeDescription={synopsis}
                            tagsArray={listOfTags}
                        />
                        <RecipeCard
                            AltImage={altImage}
                            SrcImage={url}
                            RecipeTitle={title}
                            RecipeDescription={synopsis}
                            tagsArray={listOfTags}
                        />
                        <RecipeCard
                            AltImage={altImage}
                            SrcImage={url}
                            RecipeTitle={title}
                            RecipeDescription={synopsis}
                            tagsArray={listOfTags}
                        />
                        <RecipeCard
                            AltImage={altImage}
                            SrcImage={url}
                            RecipeTitle={title}
                            RecipeDescription={synopsis}
                            tagsArray={listOfTags}
                        />
                        <RecipeCard
                            AltImage={altImage}
                            SrcImage={url}
                            RecipeTitle={title}
                            RecipeDescription={synopsis}
                            tagsArray={listOfTags}
                        />
                        <RecipeCard
                            AltImage={altImage}
                            SrcImage={url}
                            RecipeTitle={title}
                            RecipeDescription={synopsis}
                            tagsArray={listOfTags}
                        />
                    </Col>
                </Row>                
            </Container>
        </>
    );
};

export default Home