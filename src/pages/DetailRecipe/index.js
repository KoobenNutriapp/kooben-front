import { Container, Row, Col } from "reactstrap";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { FormGroup } from "reactstrap";
import "./DetailRecipe.scss";
import { useState, useEffect, useRef } from "react";
import IngredientsDynamicTable from "../../components/IngredientsDynamicTable/";
import NutFactTable from "../../components/NutFactTable/";
import { BASE_URL, PORT, } from "../../utils/constants";
import JoditEditor from "jodit-react";
import { deleteRecipe } from "../../services/recipes";
import AWS from "aws-sdk";
import { useDispatch } from 'react-redux';
import { firebase } from '../../Firebase/firebase-config'
import { login, userApp, newUserApp  } from '../../actions/auth';
import { Spinner } from "reactstrap";
import { getUsers } from "../../services/user";

function DetailRecipe(){
    const navigate = useNavigate();
    const location = useLocation();
    const ingredientes = location.state.recipe.metaData.ingredients
    
    const [detailTable, setDetailTable] = useState([]);
    const [modal, setModal] = useState(false);


    const metaData = location.state.recipe.metaData;
    const Recipekey = location.state.recipe.Recipekey;

    const recipeId = `${BASE_URL}:3000/DetailRecipe/${Recipekey}`
    console.log(recipeId);

    const [content, setContent] = useState(location.state.recipe.metaData.procedures)

    const editor = useRef(null)
    
    const config = {
      toolbarAdaptive: false,
      placeholder:'escribe el detalle de tu receta aquí...',
      readonly: true,
      buttons:[
      'bold',
      'italic',
      '|',
      'ol',
      '|',
      'undo',
      'redo',    
      ]
    }

    
useEffect(() => {
    const loadData = async () => {
        setDetailTable(location.state.recipe.metaData.ingredients)
    };
    loadData();
  }, []);

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
        //console.log(admin);
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

  if ( checking ) {
    return (
      <>
        <Spinner
          className='spinner'
          color="info"
          type="grow"
          size="lg"
        ></Spinner>
          <h1 className='Waiting'>Espere...cargando Kóoben</h1>
        </> 
     )
}
   // ******Checking admin
    

  const toUpdateRecipe = (recipe) =>{
    navigate(`/update_recipe/${recipe.Recipekey}`,{state:{recipe}});
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

    //AWS
    AWS.config.update({
      accessKeyId: process.env.REACT_APP_KEY_ID,
      secretAccessKey: process.env.REACT_APP_SECRET_ACCESS_KEY,
    });
  
    const S3Client = new AWS.S3({
      params: { Bucket: "kooben" },
      region: "us-east-1",
    });
  

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

  const handleDelete = async (e) =>{
    e.preventDefault()
    console.log('Eliminando');

    try {
      await deleteRecipe(Recipekey);
      deleteImgFromBucket();
      //alert('¡ La receta fue creada exitosamente !')
      //cleanForm() hay que implementar correctamente
    } catch (error) {
      console.error(error.message);
    }
    
    toggle()
    navigate('/');
  } 

  console.log('original');
  console.log(detailTable);

  const toggle = () => setModal(!modal);

  const toPrintView = () =>{
    const title = location.state.recipe.metaData.title
    const tags = location.state.recipe.metaData.tags
    const synopsis = location.state.recipe.metaData.synopsis
    const url = location.state.recipe.metaData.url
    const procedures = location.state.recipe.metaData.procedures

    const data = {
      title,
      tags,
      synopsis,
      url,
      procedures,
      detailTable
    }

    console.log(data);

    navigate(`/print_view/${Recipekey}`, { state: { data } });
  }

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
                            {/* {location.state.recipe.metaData.procedures.map((item,index)=>(
                            <div className="steps-text"> <span class="step">{index+1}</span> :{item} </div>
                            ))} */}

                    <div className="editor">

                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config}
		                  tabIndex={1} // tabIndex of textarea
		                  onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                      //onChange={newContent => {}}
                    />
                    </div>

                    {/* <div class="fb-comments" data-href="https://localhost:3000/detail_recipe/6212b2f2526a4b03eab4b861" data-width="500" data-numposts="5"></div> */}

                    <h2 className="detailTitle">Imprime o guarda tu receta 🖨💾:</h2>

                    <Col sm={11}>
                      <div className="detailButtons" >
                        <button
                          className="detailExportBtn"
                          //onClick={() => window.print()}
                          onClick={() => {toPrintView()}}
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
                        {
                          admin ?
                          <>
                          <Button className="detailDeleteBtn" type="submit" onClick={toggle}>
                            Eliminar
                          </Button>
                          <Modal isOpen={modal} toggle={toggle}>
                            <ModalBody >
                              ¿Estás seguro de eliminar la receta?. ¡Esta acción no se puede deshacer!
                            </ModalBody>
                            <ModalFooter>
                                <Link to={'/'}>
                                <Button className="modal-button-delete" onClick={handleDelete} >
                                  Sí, ¡elimina receta!
                                </Button>
                                </Link>
                            </ModalFooter>
                          </Modal>
                        </>:
                        null
                        }
                      </div>
                    </Col>

             
                    </Row>
                </Col> 
            </Row>
        </Container>       
    );
}

export default DetailRecipe