import MainSearchBar from "../../components/MainSearchBar"
import IngredientsDynamicTable from "../../components/IngredientsDynamicTable"
import NutFactTable from "../../components/NutFactTable"
import { Container, Row, Col } from "reactstrap";
import "./DetailRecipe.scss";

function DetailRecipe(){
    const ingredients = [
        {
          name:"nopal 🌵",
          equivalence:{
            cup:5,
            spoon:30,
            piece:2,
            gram:110
          }
        },
        {
          name:"jitomate 🍅",
          equivalence:{
            cup:4,
            spoon:20,
            piece:1,
            gram:70
          }
        },
        {
          name:"cebolla 🧅",
          equivalence:{
            cup:3,
            spoon:15,
            piece:1,
            gram:65
          }
        }
      ]

    return(
        // <Container className="container" fluid>
        <div>
            
            
            <div className="d-flex flex-column">
            <MainSearchBar></MainSearchBar>
                <div class="p-2 mt-5">
                    <h1 className="title">Nombre del Platillo</h1>
                </div>
                <div class="p-2">
                    <img src="https://recetinas.com/wp-content/uploads/2019/10/ensalada-de-nopales.jpg" width="400px"></img>
                </div>
                <div class="p-2"> Line Break</div>
                <div class="d-flex flex-row">
                    <div class="p-2">
                        <IngredientsDynamicTable
                        ingredients={ingredients} 
                        ></IngredientsDynamicTable>
                    </div>
                    <div class="p-2">
                        <NutFactTable
                            portion={300} 
                            energy={100}
                            carbohydrate={100}
                            dvCarbohydrate={2}
                            sugars={100}
                            fiber={100}
                            dvFiber={2}
                            glycemic_load={10}
                            protein={100}
                            fat={100}
                            dvFat={2}
                            saturated_fatty_acids={100}
                            dvSaturated_fatty_acids={2}
                            monounsaturated_fatty_acids={100}
                            dvMonounsaturated_fatty_acids={2}
                            polyunsaturated_fatty_acids={100}
                            dvPolyunsaturated_fatty_acids={2}
                            cholesterol={100}
                            dvCholesterol={2}
                            sodium={100}
                            dvSodium={2}
                            calcium={100}
                            dvCalcium={2}
                            phosphorus={100}
                            dvPhosphorus
                            iron={100}
                            dvIron={2}
                            potassium={100}
                            dvPotassium={2}
                            magnesium={100}
                            dvMagnesium={2}
                            copper={100}
                            dvCopper={2}
                            zinc={100}
                            dvZinc={2}
                            manganese={100}
                            dvManganese={2}
                            selenium={100}
                            dvSelenium={2}
                            lithium={100}
                            dvLithium={2}
                            vitA={100}
                            dvVitA={2}
                            carotene={100}
                            dvCarotene={2}
                            bcarotene={100}
                            dvBcarotene={2}
                            vitB1={100}
                            dvVitB1={2}
                            vitB2={100}
                            dvVitB2={2}
                            vitB3={100}
                            dvVitB3={2}
                            vitB6={100}
                            dvVitB6={2}
                            vitB12={100}
                            dvVitB12={2}
                            vitC={100}
                            dvVitC={2}
                            folicAc={100}
                            dvFolicAc={2}
                            vitD={100}
                            dvVitD={2}
                            vitE={100}
                            dvVitE={2}
                            vitK={100}
                            dvVitK={2}
                        />
                    </div>
                </div>
                <div class="p-2"> Line Break</div>
                <div class="p-2"> 
                    <h2 className="title">Preparacion</h2>
                </div>
            </div>
        
        </div>
    );
}

export default DetailRecipe