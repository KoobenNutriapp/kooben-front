import IngredientsDynamicTable from "../../components/IngredientsDynamicTable/";
import { login, userApp, newUserApp  } from '../../actions/auth';
import { useLocation, useNavigate } from 'react-router-dom';
import NutFactTable from "../../components/NutFactTable/";
import { firebase } from '../../Firebase/firebase-config'
import { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "reactstrap";
import { getUsers } from "../../services/user";
import { useDispatch } from 'react-redux';
import JoditEditor from "jodit-react";
import { Spinner } from "reactstrap";
import "./PrintView.scss";

function PrintView(){
    const navigate = useNavigate();
    const location = useLocation(); 
    const [detailTable, setDetailTable] = useState([]);
    const [modal, setModal] = useState(false);
    const Recipekey = location.state.Recipekey;
    const [content, setContent] = useState(location.state.data.procedures)
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
        setDetailTable(location.state.data.detailTable)
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

    return(
        <Container className="containerPreview" fluid>
     
            <Row className="rowPreview">
                <Col className="mainPreview">
                    <h1 className="previewRecipeTitle">{location.state.data.title}</h1>                
                    <div class="d-flex flex-row justify-content-center">
                        { location.state.data.tags[0] ? (<span className="badge rounded-pill bg-primary">{location.state.data.tags[0]}</span>):('')}
                        { location.state.data.tags[1] ? (<span className="badge rounded-pill bg-secondary">{location.state.data.tags[1]}</span>):('')}
                        { location.state.data.tags[2] ? (<span className="badge rounded-pill bg-success">{location.state.data.tags[2]}</span>):('')}
                        { location.state.data.tags[3] ? (<span className="badge rounded-pill bg-danger">{location.state.data.tags[3]}</span>):('')}
                        { location.state.data.tags[4] ? (<span className="badge rounded-pill  bg-info text-dark">{location.state.data.tags[4]}</span>):('')}
                    </div>

                    <div className="previewGeneralBox">
                        <div className="previewSynopsis">
                            <h6>Sinopsis:</h6>
                            {location.state.data.synopsis}
                        </div>    
                        <div className="previewImage">
                          <img className="previewUrlImage" src={location.state.data.url}/>
                        </div>
                    </div>

                    <h2>Ingredientes:</h2>

                    <Row className="previewFrameTables">
                        <Col className="previewIngredientsTable">
                            <IngredientsDynamicTable 
                                ingredients={detailTable} 
                                nutData={handleBypassToNutTable}
                                showBin={'no bin'}
                            />
                        </Col>
                        <Col className="previewNutritionalTable">
                          <NutFactTable 
                            ingredient={detailTable}
                          />
                        </Col>
                    </Row>
                    <Row> 
                    <h2 className="previewTitle">Procedimiento: </h2>
       
                    <div className="previewEditor">

                    <JoditEditor
                      ref={editor}
                      value={content}
                      config={config}
		                  tabIndex={1}
		                  onBlur={newContent => setContent(newContent)}
                    />
                    </div>

                    <h2 className="previewTitle">Imprime o guarda tu receta 🖨💾:</h2>

                    <Col sm={11}>
                      <div className="previewButtons" >
                        <button
                          className="previewExportBtn"
                          onClick={() => window.print()}
                        >
                          Imprimir o guardar
                        </button>
                      </div>
                    </Col>
                    </Row>
                </Col> 
            </Row>
        </Container>       
    );
}

export default PrintView
