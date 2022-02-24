import { Container, Row, Col } from "reactstrap";
import { Button, Modal, ModalBody, ModalFooter } from "reactstrap";
import { useLocation, useNavigate, Link } from "react-router-dom";
import "./DetailRecipe.scss";
import { useState, useEffect, useRef } from "react";
import IngredientsDynamicTable from "../../components/IngredientsDynamicTable/";
import NutFactTable from "../../components/NutFactTable/";
//import PdfCreationButton from "../../components/pdfCreationButton/index";
// import JoditEditor from "jodit-react";
// import SaveAltIcon from '@mui/icons-material/SaveAlt';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { deleteRecipe } from "../../services/recipes";
import AWS from "aws-sdk";
import { useDispatch } from "react-redux";
import { firebase } from "../../Firebase/firebase-config";
import { login, userApp, newUserApp } from "../../actions/auth";
import { Spinner } from "reactstrap";
import { getUsers } from "../../services/user";
import GeneratePdfButton from "../../components/GeneratePdfButton/GeneratePdfButton";


function DetailRecipe() {
  const navigate = useNavigate();
  const location = useLocation();
  const [detailTable, setDetailTable] = useState([]);
  const [modal, setModal] = useState(false);
  const metaData = location.state.recipe.metaData;
  const Recipekey = location.state.recipe.Recipekey;
  const [content, setContent] = useState(
    location.state.recipe.metaData.procedures
  );
  const detailSynopsis = location.state.recipe.metaData.synopsis;

  const editor = useRef(null);
  const config = {
    toolbarAdaptive: false,
    readonly: true,
    buttons: [],
  };

  useEffect(() => {
    const loadData = async () => {
      setDetailTable(location.state.recipe.metaData.ingredients);
    };
    loadData();
  }, []);

  // ******Checking admin
  const [checking, setChecking] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [admin, setAdmin] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user?.uid) {
        dispatch(login(user.uid, user.displayName));
        validateRol(user.email);
        //console.log(admin);
        dispatch(newUserApp);
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
        setAdmin(false);
      }
      setChecking(false);
    });
  }, [dispatch, checking, isLoggedIn, admin]);

  const validateRol = async (emailToValidate) => {
    const data = await getUsers();
    const userList = data.data.users;
    const UserExist = userList.filter((user) => {
      return user.mail === emailToValidate;
    });
    console.log(UserExist);
    if (UserExist.length === 1) {
      dispatch(userApp("admin"));
      setAdmin(true);
    }
  };

  if (checking) {
    return (
      <>
        <Spinner
          className="spinner"
          color="info"
          type="grow"
          size="lg"
        ></Spinner>
        <h1 className="Waiting">Espere...cargando Kóoben</h1>
      </>
    );
  }
  // ******Checking admin

  const toUpdateRecipe = (recipe) => {
    navigate(`/update_recipe/${recipe.Recipekey}`, { state: { recipe } });
  };

  const toDonationPage = (recipe) => {
    console.log("Navega donation page con info para exportar ");
    console.log(recipe);
    navigate(`/Donation`, { state: { recipe } });
  };

  const handleBypassToNutTable = (ingredient, operation, portion, quantity) => {
    console.log(ingredient);
    console.log(operation);
    console.log(portion);
    console.log(quantity);

    const gramFactor = 85;
    const cupFactor = 2;
    const spoonFactor = 20;
    const pieceFactor = 1;

    const newDetailTable = detailTable.map((item) => {
      if (item._id === ingredient._id) {
        if (portion === "cup") {
          console.log("entra a cup");
          console.log("cantidad: " + quantity);
          console.log("gramos: " + item.equivalence.gram);
          console.log("tazas: " + item.equivalence.cup);
          item.equivalence.gram = (quantity * gramFactor) / cupFactor;
          item.equivalence.cup = quantity;
          item.equivalence.spoon = (quantity * spoonFactor) / cupFactor;
          item.equivalence.piece = (quantity * pieceFactor) / cupFactor;
        } else if (portion === "piece") {
          console.log("entra a piece");
          console.log("cantidad: " + quantity);
          console.log("piezas: " + item.equivalence.piece);
          console.log("gramos: " + item.equivalence.gram);
          item.equivalence.gram = quantity * gramFactor;
          item.equivalence.piece = quantity;
          item.equivalence.cup = quantity * pieceFactor * cupFactor;
          item.equivalence.spoon = quantity * spoonFactor;
        } else if (portion === "spoon") {
          console.log("entra a spooon");
          console.log("cantidad: " + quantity);
          console.log("cucharadas: " + item.equivalence.spoon);
          console.log("gramos: " + item.equivalence.gram);
          item.equivalence.gram = (quantity * gramFactor) / spoonFactor;
          item.equivalence.spoon = quantity;
          item.equivalence.cup = (quantity * cupFactor) / spoonFactor;
          item.equivalence.piece = quantity / spoonFactor;
        } else if (portion === "gram") {
          console.log("entra a gram");
          console.log("cantidad: " + quantity);
          console.log("gramos: " + item.equivalence.gram);
          item.equivalence.gram = quantity;
          item.equivalence.cup = (quantity * cupFactor) / gramFactor;
          item.equivalence.piece = quantity / gramFactor;
          item.equivalence.spoon = (quantity * spoonFactor) / gramFactor;
        }
      }
      return item;
    });

    setDetailTable(newDetailTable);
  };

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
    const tempUrl = location.state.recipe.metaData.url.split("k-");
    const imageToDelete = tempUrl[1];

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

  const handleDelete = async (e) => {
    e.preventDefault();
    console.log("Eliminando");

    try {
      await deleteRecipe(Recipekey);
      deleteImgFromBucket();
      //alert('¡ La receta fue creada exitosamente !')
      //cleanForm() hay que implementar correctamente
    } catch (error) {
      console.error(error.message);
    }

    toggle();
    navigate("/");
  };

  console.log("original");
  console.log(detailTable);

  const toggle = () => setModal(!modal);

  const toPrintView = () => {
    const title = location.state.recipe.metaData.title;
    const tags = location.state.recipe.metaData.tags;
    const synopsis = location.state.recipe.metaData.synopsis;
    const url = location.state.recipe.metaData.url;
    const procedures = location.state.recipe.metaData.procedures;

    const data = {
      title,
      tags,
      synopsis,
      url,
      procedures,
      detailTable,
    };

    console.log(data);

    navigate(`/print_view/${Recipekey}`, { state: { data } });
  };

  // const fixedDescription = detailSynopsis.replace(/(<([^>]+)>)/gi, "");
  // const fixedProcedures = content.replace(/(<([^>]+)>)/gi, "");
  // const finalProcedures = fixedProcedures.replace(/\&nbsp;/g, '<p>');
  // console.log(fixedProcedures);

  return (
    <Container className="containerDetail" fluid>
      <Row className="rowDetail">
        <Col className="mainDetail">
          {/* <h1 className="detailRecipeTitle">
            {location.state.recipe.metaData.title}
          </h1> */}


          {/* <div className="detailGeneralBox">
                        <div className="detailSynopsis">
                            {location.state.recipe.metaData.synopsis}
                        </div>    
                    </div> */}

          {/* <div className="detailGeneralBox">
            <h2>Sinopsis:</h2>
            <JoditEditor
              ref={editor}
              value={location.state.recipe.metaData.synopsis}
              config={config}
              tabIndex={1}
            />
          </div> */}

          <div>
            <div className="detailGeneralBox">

            <div className="d-flex flex-row justify-content-center mb-3">
            {location.state.recipe.metaData.tags[0] ? (
              <span className="badge rounded-pill bg-secondary">
                {location.state.recipe.metaData.tags[0]}
              </span>
            ) : (
              ""
            )}
            {location.state.recipe.metaData.tags[1] ? (
              <span className="badge rounded-pill bg-secondary">
                {location.state.recipe.metaData.tags[1]}
              </span>
            ) : (
              ""
            )}
            {location.state.recipe.metaData.tags[2] ? (
              <span className="badge rounded-pill bg-secondary">
                {location.state.recipe.metaData.tags[2]}
              </span>
            ) : (
              ""
            )}
            {location.state.recipe.metaData.tags[3] ? (
              <span className="badge rounded-pill bg-secondary">
                {location.state.recipe.metaData.tags[3]}
              </span>
            ) : (
              ""
            )}
            {location.state.recipe.metaData.tags[4] ? (
              <span className="badge rounded-pill  bg-info text-dark">
                {location.state.recipe.metaData.tags[4]}
              </span>
            ) : (
              ""
            )}
          </div>

              <img
                className="detailUrlImage"
                src={location.state.recipe.metaData.url}
              ></img>
              <div className="detailTitleInImage detailRecipeTitle">
                {location.state.recipe.metaData.title}
              </div>
              {/* <div className="detailSynopsisInImage">{fixedDescription}</div> */}
              <div
                className="detailSynopsisInImage"
                dangerouslySetInnerHTML={{ __html: detailSynopsis }}
              ></div>
              <div
                className="detailProceduresInImage"
                dangerouslySetInnerHTML={{ __html: content }}
              ></div>
            </div>
          </div>

          <div className="detailControls">
            {/* <Tooltip title="guardar receta" placement="left-start">
              <IconButton>
                <SaveAltIcon 
                  className="saveRecipe" 
                  onClick={<GeneratePdfButton content={metaData}  />}
                />
              </IconButton>
            </Tooltip> */}

              <GeneratePdfButton
                    content={metaData}
              />

            <Tooltip title="editar receta" >
              <IconButton>
                <EditIcon className="editRecipe" onClick={() => {toUpdateRecipe({ Recipekey, metaData })}}/>
              </IconButton>
            </Tooltip>
            {admin ? (
              <>
                <Tooltip title="eliminar receta" placement="right-start">
                  <IconButton>
                    <DeleteForeverIcon className="deleteRecipe" type="submit" onClick={toggle} />
                  </IconButton>
                </Tooltip>
                <Modal isOpen={modal} toggle={toggle}>
                  <ModalBody>
                    ¿Estás seguro de eliminar la receta?. ¡Esta acción no se
                    puede deshacer!
                  </ModalBody>
                  <ModalFooter>
                    <Link to={"/"}>
                      <Button
                        className="modal-button-delete"
                        onClick={handleDelete}
                      >
                        Sí, ¡elimina receta!
                      </Button>
                    </Link>
                  </ModalFooter>
                </Modal>
              </>
            ) : null
            }
          </div>

          {/* <Col sm={11}>
              <div className="detailButtons">
                <button
                  className="detailExportBtn"
                  //onClick={() => window.print()}
                  onClick={() => {
                    toPrintView();
                  }}
                >
                  Exportar
                </button>
                {/* <PdfCreationButton
                    content={metaData}
                  /> */}
                {/* <GeneratePdfButton
                 content={metaData}
                 />
                <button
                  className="detailPublishBtn"
                  onClick={() => {
                    toUpdateRecipe({ Recipekey, metaData });
                  }}
                >
                  Editar
                </button>
                {admin ? (
                  <>
                    <Button
                      className="detailDeleteBtn"
                      type="submit"
                      onClick={toggle}
                    >
                      Eliminar
                    </Button>
                    <Modal isOpen={modal} toggle={toggle}>
                      <ModalBody>
                        ¿Estás seguro de eliminar la receta?. ¡Esta acción no se
                        puede deshacer!
                      </ModalBody>
                      <ModalFooter>
                        <Link to={"/"}>
                          <Button
                            className="modal-button-delete"
                            onClick={handleDelete}
                          >
                            Sí, ¡elimina receta!
                          </Button>
                        </Link>
                      </ModalFooter>
                    </Modal>
                  </>
                ) : null}
              </div>
            </Col> */
            } 

          <h2>Ingredientes:</h2>

          <Row className="detailFrameTables">
            <Col className="detailIngredientsTable">
              <div className="detailIngredientsContainer">
                <IngredientsDynamicTable
                  className="ingredientsTable"
                  ingredients={detailTable}
                  nutData={handleBypassToNutTable}
                  showBin={"no bin"}
                />
              </div>
            </Col>
            <Col className="detailNutritionalTable">
              <NutFactTable
                className="nutFactTable" 
                ingredient={detailTable} 
              />
            </Col>
          </Row>
          <Row>
            {/* <h2 className="detailTitle">Procedimiento: </h2>

            <div className="editor">
              <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1}
                onBlur={(newContent) => setContent(newContent)}
              />
            </div> */}

            <div
              className="fb-comments"
              data-href={`https://www.koo-ben.com/detail_recipe/${Recipekey}`}
              data-width=""
              data-numposts="10"
            ></div>

            {/* <h2 className="detailTitle">Imprime o guarda tu receta 💾:</h2> */}


          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default DetailRecipe;
