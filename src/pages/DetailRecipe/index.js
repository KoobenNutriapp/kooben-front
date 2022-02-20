import { Container, Row, Col } from "reactstrap";
import { useLocation, useNavigate } from 'react-router-dom';
import { FormGroup } from "reactstrap";
import "./DetailRecipe.scss";
import { useState, useEffect } from "react";
import IngredientsDynamicTable from "../../components/IngredientsDynamicTable/";
import NutFactTable from "../../components/NutFactTable/";
import { BASE_URL } from "../../utils/constants";

function DetailRecipe(){
    const navigate = useNavigate();
    const location = useLocation();
    const ingredientes = location.state.recipe.metaData.ingredients
    
    const [detailTable, setDetailTable] = useState([]);


    const metaData = location.state.recipe.metaData;
    const Recipekey = location.state.recipe.Recipekey;

    const recipeId = `${BASE_URL}:3000/DetailRecipe/${Recipekey}`
    console.log(recipeId);

    
useEffect(() => {
    const loadData = async () => {
        setDetailTable(location.state.recipe.metaData.ingredients)
    };
    loadData();
  }, []);
    

  const toUpdateRecipe = (recipe) =>{
    navigate(`/UpdateRecipe/${recipe.Recipekey}`,{state:{recipe}});
  }

  const toDonationPage=(recipe)=>{
    console.log('Navega donation page con info para exportar ')
    console.log(recipe)
    navigate(`/Donation`,{state:{recipe}});
    }

  const handleBypassToNutTable = ((ingredient, operation, portion, quantity) => {
    console.log(ingredient);
    console.log(operation);
    console.log(portion);
    console.log(quantity);

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
  })

  console.log('original');
  console.log(detailTable);

    return(
        <Container className="containerDetail" fluid>
     
            <Row className="rowDetail">
                <Col className="mainDetail">
                    <h1 className="detailRecipeTitle">{location.state.recipe.metaData.title}</h1>                
                    <div class="d-flex flex-row justify-content-center">
                        { location.state.recipe.metaData.tags[0] ? (<span className="badge rounded-pill bg-primary">{location.state.recipe.metaData.tags[0]}</span>):('')}
                        { location.state.recipe.metaData.tags[1] ? (<span className="badge rounded-pill bg-secondary">{location.state.recipe.metaData.tags[1]}</span>):('')}
                        { location.state.recipe.metaData.tags[2] ? (<span className="badge rounded-pill bg-success">{location.state.recipe.metaData.tags[2]}</span>):('')}
                        { location.state.recipe.metaData.tags[3] ? (<span className="badge rounded-pill bg-danger">{location.state.recipe.metaData.tags[3]}</span>):('')}
                        { location.state.recipe.metaData.tags[4] ? (<span className="badge rounded-pill  bg-info text-dark">{location.state.recipe.metaData.tags[4]}</span>):('')}
                    </div>

                    <div className="detailGeneralBox">
                        <div className="detailSynopsis">
                            {location.state.recipe.metaData.synopsis}
                        </div>    
                    </div>
   
                    <div>
                      <div className="detailGeneralBox">
                        <img className="detailUrlImage" src={location.state.recipe.metaData.url}></img>
                      </div>
                    </div>

                    <h2>Ingredientes:</h2>

                    <Row className="detailFrameTables">
                        <Col className="detailIngredientsTable">
                            <IngredientsDynamicTable 
                                ingredients={detailTable} 
                                nutData={handleBypassToNutTable}
                                showBin={'no bin'}
                            />
                        </Col>
                        <Col className="detailNutritionalTable">
                          <NutFactTable 
                            ingredient={detailTable}
                          />
                        </Col>
                    </Row>
                    <Row> 
                        <h2 className="detailTitle">Procedimiento: </h2>
                            {location.state.recipe.metaData.procedures.map((item,index)=>(
                            <div className="steps-text"> <span class="step">{index+1}</span> :{item} </div>
                            ))}
                    <h2 className="detailTitle">Imprime o guarda tu receta 🖨💾:</h2>

                    <Col sm={9}>
                      <div className="detailButtons" >
                        <button
                          className="detailExportBtn"
                          onClick={() => window.print()}
                        >
                          Exportar
                        </button>
                        <button 
                          className='detailExportBtn' 
                          onClick={()=>toDonationPage({Recipekey,metaData,detailTable})}>
                            ExportarPDF
                        </button>
                        <button 
                          className="detailPublishBtn" 
                          onClick={()=>{toUpdateRecipe({Recipekey,metaData})}}

                          >
                          Editar
                        </button>
                        <button className="detailDeleteBtn" type="submit" value="submit">
                          Eliminar
                        </button>
                      </div>
                    </Col>
             
                    </Row>
                </Col> 
            </Row>
        </Container>       
    );
}

export default DetailRecipe