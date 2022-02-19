import MainSearchBar from "../../components/MainSearchBar"
import IngredientsDynamicTable from "../../components/IngredientsDynamicTable"
import NutFactTable from "../../components/NutFactTable";
import { Container, Row, Col } from "reactstrap";
import {useLocation} from 'react-router-dom';
import {useNavigate} from 'react-router-dom';
import "./DetailRecipe.scss";

function DetailRecipe(){
    const navigate = useNavigate();
    const location = useLocation();
    const ingredientes = location.state.recipe.metaData.ingredients
    

    const detailTable = location.state.recipe.metaData.ingredients
    
    
    const toDonationPage=(recipe)=>{
        console.log('Navega donation page con info para exportar ')
        console.log(recipe)
        navigate(`/Donation`,{state:{recipe}});
        }

    
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
                            ingredients={ingredientes} 
                            ></IngredientsDynamicTable>
                        </div>
                        <div class="col-6 scroll">
                            <NutFactTable
                                ingredient={detailTable} 
                            />
                        </div>
                    </div>

                    {/* Nutrients Table End */}
                    <hr/>
                    {/* Steps and instructions */}

                    <div class="p-2"> 
                        <h2 className="title">Preparacion</h2>
                        <h3>Paso</h3>
                        {location.state.recipe.metaData.procedures.map((item,index)=>(
                            <p> <span class="step">{index}</span> :{item} </p>
                        ))}
                    </div>

                    {/* Button to print and Edit for admin only */}
                    <div class="d-flex flex-row-reverse">
                        <button type="button" class="btn btn-primary">Guardar</button>
                        <button type="button" class="btn btn-secondary">Editar</button>
                        <button className='pink-button' onClick={toDonationPage}>Exportar</button>
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