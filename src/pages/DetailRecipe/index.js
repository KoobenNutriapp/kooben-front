import MainSearchBar from "../../components/MainSearchBar"
import IngredientsDynamicTable from "../../components/IngredientsDynamicTable"
import NutFactTable from "../../components/NutFactTable";
import { Container, Row, Col } from "reactstrap";
import {useLocation} from 'react-router-dom';
import "./DetailRecipe.scss";

function DetailRecipe(){

    const location = useLocation();
    const ingredientes = location.state.recipe.metaData.ingredients
    let TotalPortion = 0

    const nutTable ={
        portion : 200,
        energy : 200 ,
        carbohydrate: location.state.recipe.metaData.total_carbohydrate?.quantity,
        dvCarbohydrate: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        sugars: location.state.recipe.metaData.total_sugars?.quantity, 
        fiber: location.state.recipe.metaData.total_fiber?.quantity, 
        dvFiber: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        glycemic_load: location.state.recipe.metaData.total_glycemic_load?.quantity, 
        protein: location.state.recipe.metaData.total_protein?.quantity, 
        fat: location.state.recipe.metaData.total_fat?.quantity, 
        dvFat: location.state.recipe.metaData.total_fat?.quantity,  // Esta es la que se muestra
        saturated_fatty_acids: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        dvSaturated_fatty_acids: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        monounsaturated_fatty_acids: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        dvMonounsaturated_fatty_acids: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        polyunsaturated_fatty_acids: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        dvPolyunsaturated_fatty_acids: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        cholesterol: location.state.recipe.metaData.total_cholesterol?.quantity, 
        dvCholesterol: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        sodium: location.state.recipe.metaData.total_sodium?.quantity, 
        dvSodium: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        calcium: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        dvCalcium: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        phosphorus: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        dvPhosphorus : location.state.recipe.metaData.CHANGE_ME?.quantity, 
        iron: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        dvIron: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        potassium: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        dvPotassium: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        magnesium: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        dvMagnesium: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        copper: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        dvCopper: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        zinc: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        dvZinc: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        manganese: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        dvManganese: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        selenium: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        dvSelenium: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        lithium: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        dvLithium: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        vitA: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        dvVitA: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        carotene: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        dvCarotene: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        bcarotene: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        dvBcarotene: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        vitB1: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        dvVitB1: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        vitB2: 200, 
        dvVitB2: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        vitB3: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        dvVitB3: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        vitB6: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        dvVitB6: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        vitB12: 300, 
        dvVitB12: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        vitC: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        dvVitC: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        folicAc: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        dvFolicAc: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        vitD: 0, 
        dvVitD: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        vitE: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        dvVitE: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        vitK: location.state.recipe.metaData.CHANGE_ME?.quantity, 
        dvVitK: location.state.recipe.metaData.CHANGE_ME?.quantity, 
    }
    const ingredientsTable = ingredientes.map((ingredient)=>{
      const obj = {
        name:`${ingredient.ingredient_id}`,
        equivalence: ingredient.ingredient_equivalence
      }
      TotalPortion+= ingredient.ingredient_equivalence.gram
      return obj
    })

    
      console.log('******');
      console.log(location)
    return(
        // <Container className="container" fluid>
        <div className=".container-fluid general position-relative">
            <MainSearchBar></MainSearchBar>
            <div class="row mt-nav"> 
                <div class="col">
                1 0f 1
                </div>
                <div class="col-9">
                    <div class="p-2 mt-5">
                        <h1 className="title">{location.state.recipe.metaData.title}</h1>
                        <div class="d-flex flex-row justify-content-center">
                            { location.state.recipe.metaData.tags[0] ? (<span class="badge rounded-pill bg-primary">{location.state.recipe.metaData.tags[0]}</span>):('')}
                            { location.state.recipe.metaData.tags[1] ? (<span class="badge rounded-pill bg-secondary">{location.state.recipe.metaData.tags[1]}</span>):('')}
                            { location.state.recipe.metaData.tags[2] ? (<span class="badge rounded-pill bg-success">{location.state.recipe.metaData.tags[2]}</span>):('')}
                            { location.state.recipe.metaData.tags[3] ? (<span class="badge rounded-pill bg-danger">{location.state.recipe.metaData.tags[3]}</span>):('')}
                            { location.state.recipe.metaData.tags[4] ? (<span class="badge rounded-pill  bg-info text-dark">{location.state.recipe.metaData.tags[4]}</span>):('')}
                        </div>
                    </div>
                    <hr/>
                    <div class="p-2">
                        <img src={location.state.recipe.metaData.url} width="400px"></img>
                    </div>
                    <hr/>

                    {/* Nutrients tables start */}

                    <div class="row"> 
                        <div class="col-6">
                            <IngredientsDynamicTable
                            ingredients={ingredientsTable} 
                            ></IngredientsDynamicTable>
                        </div>
                        <div class="col-6 scroll">
                            <NutFactTable
                                ingredient={nutTable} 
                            />
                        </div>
                    </div>

                    {/* Nutrients Table End */}
                    <hr/>
                    {/* Steps and instructions */}

                    <div class="p-2"> 
                        <h2 className="title">Preparacion</h2>
                        <h3>Paso</h3>
                        {location.state.recipe.metaData.steps.map((item)=>(
                            <p> <span class="step">{item.sequence}</span> :{item.text} </p>
                        ))}
                    </div>

                    {/* Button to print and Edit for admin only */}
                    <div class="d-flex flex-row-reverse">
                        <button type="button" class="btn btn-primary">Guardar</button>
                        <button type="button" class="btn btn-secondary">Editar</button>
                    </div>
                    
                </div>
                <div class="col">
                3 of 3
                </div>
            </div>
                
        </div>
        
       
    );
}

export default DetailRecipe