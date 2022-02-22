import IngredientsDynamicTable from "../../components/IngredientsDynamicTable/";
import { useLocation } from "react-router-dom";
import NutFactTable from "../../components/NutFactTable/";
import { useState, useEffect, useRef } from "react";
import { Container, Row, Col } from "reactstrap";
import JoditEditor from "jodit-react";
import "./PrintView.scss";

function PrintView() {
  const location = useLocation();
  const [detailTable, setDetailTable] = useState([]);

  const editor = useRef(null);
  const config = {
    toolbarAdaptive: false,
    readonly: true,
    buttons: [],
  };

  useEffect(() => {
    const loadData = () => {
      setDetailTable(location.state.data.detailTable);
    };
    loadData();
  }, []);

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

  return (
    <Container className="containerPreview" fluid>
      <Row className="rowPreview">
        <Col className="mainPreview">
          <h1 className="previewRecipeTitle">{location.state.data.title}</h1>
          <div className="previewTags">
            {location.state.data.tags[0] ? (
              <span className="badge rounded-pill bg-primary">
                {location.state.data.tags[0]}
              </span>
            ) : (
              ""
            )}
            {location.state.data.tags[1] ? (
              <span className="badge rounded-pill bg-secondary">
                {location.state.data.tags[1]}
              </span>
            ) : (
              ""
            )}
            {location.state.data.tags[2] ? (
              <span className="badge rounded-pill bg-success">
                {location.state.data.tags[2]}
              </span>
            ) : (
              ""
            )}
            {location.state.data.tags[3] ? (
              <span className="badge rounded-pill bg-danger">
                {location.state.data.tags[3]}
              </span>
            ) : (
              ""
            )}
            {location.state.data.tags[4] ? (
              <span className="badge rounded-pill  bg-info text-dark">
                {location.state.data.tags[4]}
              </span>
            ) : (
              ""
            )}
          </div>

          <h2>Sinopsis:</h2>

          <div className="previewGeneralBox">
            <JoditEditor
              ref={editor}
              value={location.state.data.synopsis}
              config={config}
              tabIndex={1}
            />
          </div>
          <h2>Ingredientes:</h2>
          <Row className="previewFrameTables">
            <Col className="previewIngredientsTable">
              <IngredientsDynamicTable
                ingredients={detailTable}
                nutData={handleBypassToNutTable}
                showBin={"no bin"}
              />
            </Col>
            <Col className="previewNutritionalTable">
              <NutFactTable ingredient={detailTable} />
            </Col>
          </Row>
          <Row>
            <h2 className="previewTitle">Procedimiento: </h2>

            <div className="previewEditor">
              <JoditEditor
                ref={editor}
                value={location.state.data.procedures}
                config={config}
                tabIndex={1}
              />
            </div>

            <h2 className="previewTitle">Imprime o guarda tu receta 🖨💾:</h2>

            <Col sm={11}>
              <div className="previewButtons">
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

export default PrintView;
