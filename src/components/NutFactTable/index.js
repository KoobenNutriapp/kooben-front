import { useEffect, useState } from "react";
import { Table } from "reactstrap";
//import { useDispatch, useSelector } from "react-redux";

import "./NutFactTable.scss";

const NutFactTable = ({
  ingredient,
  operation,
  typePortion,
  firstSelection,
  quantity,
}) => {
  const [portion, setPortion] = useState(0);
  const [energy, setEnergy] = useState(0);
  const [total_carbohydrate, setTotal_carbohydrate] = useState(0);
  const [dietary_fiber, setDietary_fiber] = useState(0);
  const [sugars, setSugars] = useState(0);
  const [calcium, setCalcium] = useState(0);
  const [phosphorus, setPhosphorus] = useState(0);
  const [iron, setIron] = useState(0);
  const [sodium, setSodium] = useState(0);
  const [potassium, setPotassium] = useState(0);
  const [magnesium, setMagnesium] = useState(0);
  const [copper, setCopper] = useState(0);
  const [zinc, setZinc] = useState(0);
  const [manganese, setManganese] = useState(0);
  const [selenium, setSelenium] = useState(0);
  const [vitA, setVitA] = useState(0);
  const [vitB1, setVitB1] = useState(0);
  const [vitB2, setVitB2] = useState(0);
  const [vitB3, setVitB3] = useState(0);
  const [vitB6, setVitB6] = useState(0);
  const [vitB12, setVitB12] = useState(0);
  const [vitC, setVitC] = useState(0);
  const [folicAc, setFolicAc] = useState(0);
  const [vitD, setVitD] = useState(0);
  const [vitE, setVitE] = useState(0);
  const [vitK, setVitK] = useState(0);
  const [protein, setProtein] = useState(0);
  const [total_fat, setTotal_fat] = useState(0);
  const [saturated_fatty_acids, setSaturated_fatty_acids] = useState(0);
  const [monounsaturated_fatty_acids, setMonounsaturated_fatty_acids] =
    useState(0);
  const [polyunsaturated_fatty_acids, setPolyunsaturated_fatty_acids] =
    useState(0);
  const [cholesterol, setCholesterol] = useState(0);
  const [glycemic_load, setGlycemic_load] = useState(0);

  // DV Dailly %
  const dvCarbohydrate = (total_carbohydrate * 100) / 130;
  const dvFiber = (dietary_fiber * 100) / 25;
  const dvSugars = (sugars * 100) / 50;
  const dvProtein = (protein * 100) / 73;
  const dvFat = (total_fat * 100) / 66.7;
  const dvSaturated_fatty_acids = (saturated_fatty_acids * 100) / 22.2;
  const dvMonounsaturated_fatty_acids =
    (monounsaturated_fatty_acids * 100) / 15.6;
  const dvPolyunsaturated_fatty_acids =
    (polyunsaturated_fatty_acids * 100) / 17.7;
  const dvCholesterol = (cholesterol * 100) / 2600;
  const dvSodium = (sodium * 100) / 2300;
  const dvCalcium = (calcium * 100) / 1000;
  const dvPhosphorus = (phosphorus * 100) / 1200;
  const dvIron = (iron * 100) / 15;
  const dvPotassium = (potassium * 100) / 3500;
  const dvMagnesium = (magnesium * 100) / 340;
  const dvCopper = (copper * 100) / 3;
  const dvZinc = (zinc * 100) / 12;
  const dvManganese = (manganese * 100) / 2.3;
  const dvSelenium = (selenium * 100) / 5500;
  const dvVitA = (vitA * 100) / 900;
  const dvVitB1 = (vitB1 * 100) / 800;
  const dvVitB2 = (vitB2 * 100) / 1.3;
  const dvVitB3 = (vitB3 * 100) / 16;
  const dvVitB6 = (vitB6 * 100) / 1.1;
  const dvVitB12 = (vitB12 * 100) / 3.0;
  const dvVitC = (vitC * 100) / 84;
  const dvFolicAc = (folicAc * 100) / 460;
  const dvVitD = (vitD * 100) / 15;
  const dvVitE = (vitE * 100) / 11;
  const dvVitK = (vitK * 100) / 120;

  // REDUX
  //const dispatch = useDispatch();

  useEffect(() => {
    //const test = () => dispatch(createIngredient());
    //test();
    //console.log("entra a use effect");
    //prepareArray()
    manageIngredients();
  }, [ingredient]);

  //const dataRedux = useSelector((state) => state.ingredient);
  //console.log(dataRedux.portion);

  // const prepareArray = () =>{
  //   tempArray.forEach(item=>{
  //     console.log(item);
  //   })
  // }

  const manageIngredients = () => {
    console.log(ingredient);
  
    const portion = ingredient.reduce((acc, item) => {
      return acc + (item?.equivalence.gram || 0);
    }, 0);
    setPortion(portion.toFixed(0));
    console.log("portion: " + portion.toFixed(2));

    const energy = ingredient.reduce((acc, item) => {
      return acc + (item?.energy * item.equivalence.gram || 0);
    }, 0);
    setEnergy(energy.toFixed(4));
    console.log("energy: " + energy.toFixed(4));

    const total_carbohydrate = ingredient.reduce((acc, item) => {
      return acc + (item?.total_carbohydrate * item.equivalence.gram || 0);
    }, 0);
    setTotal_carbohydrate(total_carbohydrate.toFixed(4));
    console.log("total_carbohydrate: " + total_carbohydrate.toFixed(4));

    const dietary_fiber = ingredient.reduce((acc, item) => {
      return acc + (item?.dietary_fiber * item.equivalence.gram || 0);
    }, 0);
    setDietary_fiber(dietary_fiber.toFixed(4));
    console.log("dietary_fiber: " + dietary_fiber.toFixed(4));

    const sugars = ingredient.reduce((acc, item) => {
      return acc + (item?.sugars * item.equivalence.gram || 0);
    }, 0);
    setSugars(sugars.toFixed(4));
    console.log("sugars: " + sugars.toFixed(4));

    const calcium = ingredient.reduce((acc, item) => {
      return acc + (item?.calcium * item.equivalence.gram || 0);
    }, 0);
    setCalcium(calcium.toFixed(4));
    console.log("calcium: " + calcium.toFixed(4));

    const phosphorus = ingredient.reduce((acc, item) => {
      return acc + (item?.phosphorus * item.equivalence.gram || 0);
    }, 0);
    setPhosphorus(phosphorus.toFixed(4));
    console.log("phosphorus: " + phosphorus.toFixed(4));

    const iron = ingredient.reduce((acc, item) => {
      return acc + (item?.iron * item.equivalence.gram || 0);
    }, 0);
    setIron(iron.toFixed(4));
    console.log("iron: " + iron.toFixed(4));

    const sodium = ingredient.reduce((acc, item) => {
      return acc + (item?.sodium * item.equivalence.gram || 0);
    }, 0);
    setSodium(sodium.toFixed(4));
    console.log("sodium: " + sodium.toFixed(4));

    const potassium = ingredient.reduce((acc, item) => {
      return acc + (item?.potassium * item.equivalence.gram || 0);
    }, 0);
    setPotassium(potassium.toFixed(4));
    console.log("potassium: " + potassium.toFixed(4));

    const magnesium = ingredient.reduce((acc, item) => {
      return acc + (item?.magnesium * item.equivalence.gram || 0);
    }, 0);
    setMagnesium(magnesium.toFixed(4));
    console.log("magnesium: " + magnesium.toFixed(4));

    const copper = ingredient.reduce((acc, item) => {
      return acc + (item?.copper * item.equivalence.gram || 0);
    }, 0);
    setCopper(copper.toFixed(4));
    console.log("copper: " + copper.toFixed(4));

    const zinc = ingredient.reduce((acc, item) => {
      return acc + (item?.zinc * item.equivalence.gram || 0);
    }, 0);
    setZinc(zinc.toFixed(4));
    console.log("zinc: " + zinc.toFixed(4));

    const manganese = ingredient.reduce((acc, item) => {
      return acc + (item?.manganese * item.equivalence.gram || 0);
    }, 0);
    setManganese(manganese.toFixed(4));
    console.log("manganese: " + manganese.toFixed(4));

    const selenium = ingredient.reduce((acc, item) => {
      return acc + (item?.selenium * item.equivalence.gram || 0);
    }, 0);
    setSelenium(selenium.toFixed(4));
    console.log("selenium: " + selenium.toFixed(4));

    const vitA = ingredient.reduce((acc, item) => {
      return acc + (item?.vitA * item.equivalence.gram || 0);
    }, 0);
    setVitA(vitA.toFixed(4));
    console.log("vitA: " + vitA.toFixed(4));

    const vitB1 = ingredient.reduce((acc, item) => {
      return acc + (item?.vitB1 * item.equivalence.gram || 0);
    }, 0);
    setVitB1(vitB1.toFixed(4));
    console.log("vitB1: " + vitB1.toFixed(4));

    const vitB2 = ingredient.reduce((acc, item) => {
      return acc + (item?.vitB2 * item.equivalence.gram || 0);
    }, 0);
    setVitB2(vitB2.toFixed(4));
    console.log("vitB2: " + vitB2.toFixed(4));
    const vitB3 = ingredient.reduce((acc, item) => {
      return acc + (item?.vitB3 * item.equivalence.gram || 0);
    }, 0);
    setVitB3(vitB3.toFixed(4));
    console.log("vitB3: " + vitB3.toFixed(4));

    const vitB6 = ingredient.reduce((acc, item) => {
      return acc + (item?.vitB6 * item.equivalence.gram || 0);
    }, 0);
    setVitB6(vitB6.toFixed(4));
    console.log("vitB6: " + vitB6.toFixed(4));

    const vitB12 = ingredient.reduce((acc, item) => {
      return acc + (item?.vitB12 * item.equivalence.gram || 0);
    }, 0);
    setVitB12(vitB12.toFixed(4));
    console.log("vitB12: " + vitB12.toFixed(4));

    const vitC = ingredient.reduce((acc, item) => {
      return acc + (item?.vitC * item.equivalence.gram || 0);
    }, 0);
    setVitC(vitC.toFixed(4));
    console.log("vitC: " + vitC.toFixed(4));

    const folicAc = ingredient.reduce((acc, item) => {
      return acc + (item?.folicAc * item.equivalence.gram || 0);
    }, 0);
    setFolicAc(folicAc.toFixed(4));
    console.log("folicAc: " + folicAc.toFixed(4));

    const vitD = ingredient.reduce((acc, item) => {
      return acc + (item?.vitD * item.equivalence.gram || 0);
    }, 0);
    setVitD(vitD.toFixed(4));
    console.log("vitD: " + vitD.toFixed(4));

    const vitE = ingredient.reduce((acc, item) => {
      return acc + (item?.vitE * item.equivalence.gram || 0);
    }, 0);
    setVitE(vitE.toFixed(4));
    console.log("vitE: " + vitE.toFixed(4));

    const vitK = ingredient.reduce((acc, item) => {
      return acc + (item?.vitK * item.equivalence.gram || 0);
    }, 0);
    setVitK(vitK.toFixed(4));
    console.log("vitK: " + vitK.toFixed(4));

    const protein = ingredient.reduce((acc, item) => {
      return acc + (item?.protein * item.equivalence.gram || 0);
    }, 0);
    setProtein(protein.toFixed(4));
    console.log("protein: " + protein.toFixed(4));

    const total_fat = ingredient.reduce((acc, item) => {
      return acc + (item?.total_fat * item.equivalence.gram || 0);
    }, 0);
    setTotal_fat(total_fat.toFixed(4));
    console.log("total_fat: " + total_fat.toFixed(4));

    const saturated_fatty_acids = ingredient.reduce((acc, item) => {
      return acc + (item?.saturated_fatty_acids * item.equivalence.gram || 0);
    }, 0);
    setSaturated_fatty_acids(saturated_fatty_acids.toFixed(4));
    console.log("saturated_fatty_acids: " + saturated_fatty_acids.toFixed(4));

    const monounsaturated_fatty_acids = ingredient.reduce((acc, item) => {
      return acc + (item?.monounsaturated_fatty_acids * item.equivalence.gram || 0);
    }, 0);
    setMonounsaturated_fatty_acids(monounsaturated_fatty_acids.toFixed(4));
    console.log(
      "monounsaturated_fatty_acids: " + monounsaturated_fatty_acids.toFixed(4)
    );

    const polyunsaturated_fatty_acids = ingredient.reduce((acc, item) => {
      return acc + (item?.polyunsaturated_fatty_acids * item.equivalence.gram || 0);
    }, 0);
    setPolyunsaturated_fatty_acids(polyunsaturated_fatty_acids.toFixed(4));
    console.log(
      "polyunsaturated_fatty_acids: " + polyunsaturated_fatty_acids.toFixed(4)
    );

    const cholesterol = ingredient.reduce((acc, item) => {
      return acc + (item?.cholesterol * item.equivalence.gram || 0);
    }, 0);
    setCholesterol(cholesterol.toFixed(4));
    console.log("cholesterol: " + cholesterol.toFixed(4));

    const glycemic_load = ingredient.reduce((acc, item) => {
      return (
        acc + ((item?.total_carbohydrate * item?.glycemic_index * item.equivalence.gram) / 100 || 0)
      );
    }, 0);
    setGlycemic_load(glycemic_load.toFixed(4));
    console.log("glycemic_load: " + glycemic_load.toFixed(4));
  };

  return (
    <div className="frameNutFactTable">
      <Table hover className="nutTable">
        <thead>
          <tr>
            <th colSpan="3" className="titleTable">
              Información nutricional
            </th>
          </tr>
          <div className="label-container">
            {sugars > 10 ? (
              <img
                className="nut-label"
                src="https://kooben.s3.amazonaws.com/images/azucares.png"
              />
            ) : null}
            {energy > 400 ? (
              <img
                className="nut-label"
                src="https://kooben.s3.amazonaws.com/images/calorias.png"
              />
            ) : null}
            {saturated_fatty_acids > 4.44 ? (
              <img
                className="nut-label"
                src="https://kooben.s3.amazonaws.com/images/grasa.png"
              />
            ) : null}
            {sodium > 500 ? (
              <img
                className="nut-label"
                src="https://kooben.s3.amazonaws.com/images/sodio.png"
              />
            ) : null}
          </div>
          {portion ? (
            <tr className="thickLine">
              <th>Tamaño de la porción:</th>
              <th colSpan="2">{portion} gramos</th>
            </tr>
          ) : (
            <tr className="thickLine">
              <th>Tamaño de la porción:</th>
              <th colSpan="2">{portion} gramos</th>
            </tr>
          )}
          {energy ? (
            <tr className="mediumLine">
              <th>Energía:</th>
              <th colSpan="2">{Number(energy).toFixed(0)} Kcalorías</th>
            </tr>
          ) : (
            <tr className="thickLine">
              <th>Tamaño de la porción:</th>
              <th colSpan="2">No hay Energía</th>
            </tr>
          )}
        </thead>
        <tbody>
          <tr>
            <th></th>
            <td></td>
            <th className="center">% de valor diario *</th>
          </tr>
          {total_carbohydrate ? (
            <tr>
              <th>Carbohidratos totales:</th>
              <td className="value">
                {Number(total_carbohydrate).toFixed(1)} g</td>
              <th className="center">
                {Number(dvCarbohydrate).toFixed(0)}%</th>
            </tr>
          ) : (
            ""
          )}

          <tr>
            <td> - Fibra:</td>
            <td className="value">{Number(dietary_fiber).toFixed(1)} g</td>
            <th className="center">{Number(dvFiber).toFixed(0)} %</th>
          </tr>
          <tr>
            <td> - Azúcares:</td>
            <td className="value">{Number(sugars).toFixed(1)} g</td>
            <th className="center">{Number(dvSugars).toFixed(0)} %</th>
            <th className="center"></th>
          </tr>
          {glycemic_load ? (
            <tr>
              <th>Carga glucémica total:</th>
              <th className="center" colSpan="2">
                {Number(glycemic_load).toFixed(2)}
              </th>
            </tr>
          ) : (
            ""
          )}

          {total_fat ? (
            <tr>
              <th>Grasa total:</th>
              <td className="value">{Number(total_fat).toFixed(1)} g</td>
              <th className="center">{Number(dvFat).toFixed(0)} %</th>
            </tr>
          ) : (
            ""
          )}

          {saturated_fatty_acids ? (
            <tr>
              <td> - Ácidos grasos saturados:</td>
              <td className="value">
                {Number(saturated_fatty_acids).toFixed(1)} g</td>
              <th className="center">
                {Number(dvSaturated_fatty_acids).toFixed(0)} %</th>
            </tr>
          ) : (
            ""
          )}

          {monounsaturated_fatty_acids ? (
            <tr>
              <td> - Ácidos grasos monoinsaturados:</td>
              <td className="value">
                {Number(monounsaturated_fatty_acids).toFixed(1)} g</td>
              <th className="center">
                {Number(dvMonounsaturated_fatty_acids).toFixed(0)} %</th>
            </tr>
          ) : (
            ""
          )}

          {polyunsaturated_fatty_acids ? (
            <tr>
              <td> - Ácidos grasos polinsaturados:</td>
              <td className="value">
                {Number(polyunsaturated_fatty_acids).toFixed(1)} g</td>
              <th className="center">
                {Number(dvPolyunsaturated_fatty_acids).toFixed(0)} %</th>
            </tr>
          ) : (
            ""
          )}

          {protein ? (
            <tr>
              <th>Proteínas totales:</th>
              <td className="value">{Number(protein).toFixed(1)} g</td>
              <th className="center">{Number(dvProtein).toFixed(0)} %</th>
            </tr>
          ) : (
            ""
          )}

          {cholesterol ? (
            <tr>
              <th>Colesterol total:</th>
              <td className="value">{Number(cholesterol).toFixed(1)} mg</td>
              <th className="center">
                {Number(dvCholesterol).toFixed(0)} %</th>
            </tr>
          ) : (
            ""
          )}

          {sodium ? (
            <tr>
              <th>Sodio:</th>
              <td className="value">{Number(sodium).toFixed(1)} mg</td>
              <th className="center">{Number(dvSodium).toFixed(0)} %</th>
            </tr>
          ) : (
            ""
          )}

          {calcium ? (
            <tr>
              <th>Calcio:</th>
              <td className="value">{Number(calcium).toFixed(1)} mg</td>
              <th className="center">{Number(dvCalcium).toFixed(0)} %</th>
            </tr>
          ) : (
            ""
          )}

          {phosphorus ? (
            <tr>
              <th>Fósforo:</th>
              <td className="value">{Number(phosphorus).toFixed(1)} mg</td>
              <th className="center">
                {Number(dvPhosphorus).toFixed(0)} %
              </th>
            </tr>
          ) : (
            ""
          )}

          {iron ? (
            <tr>
              <th>Hierro:</th>
              <td className="value">{Number(iron).toFixed(1)} mg</td>
              <th className="center">{Number(dvIron).toFixed(0)} %</th>
            </tr>
          ) : (
            ""
          )}

          {potassium ? (
            <tr>
              <th>Potasio:</th>
              <td className="value">{Number(potassium).toFixed(1)} mg</td>
              <th className="center">{Number(dvPotassium).toFixed(0)} %</th>
            </tr>
          ) : (
            ""
          )}

          {magnesium ? (
            <tr>
              <th>Magnesio:</th>
              <td className="value">{Number(magnesium).toFixed(1)} mg</td>
              <th className="center">{Number(dvMagnesium).toFixed(0)} %</th>
            </tr>
          ) : (
            ""
          )}

          {copper ? (
            <tr>
              <th>Cobre:</th>
              <td className="value">{Number(copper).toFixed(1)} mg</td>
              <th className="center">{Number(dvCopper).toFixed(0)} %</th>
            </tr>
          ) : (
            ""
          )}

          {zinc ? (
            <tr>
              <th>Zinc:</th>
              <td className="value">{Number(zinc).toFixed(1)} mg</td>
              <th className="center">{Number(dvZinc).toFixed(0)} %</th>
            </tr>
          ) : (
            ""
          )}

          {manganese ? (
            <tr>
              <th>Manganeso:</th>
              <td className="value">{Number(manganese).toFixed(1)} mg</td>
              <th className="center">{Number(dvManganese).toFixed(0)} %</th>
            </tr>
          ) : (
            ""
          )}

          {selenium ? (
            <tr>
              <th>Selenio:</th>
              <td className="value">{Number(selenium).toFixed(1)} mg</td>
              <th className="center">{Number(dvSelenium).toFixed(0)} %</th>
            </tr>
          ) : (
            ""
          )}

          {vitA ? (
            <tr>
              <th>Vitamina A:</th>
              <td className="value">{Number(vitA).toFixed(1)} ug</td>
              <th className="center">{Number(dvVitA).toFixed(0)} %</th>
            </tr>
          ) : (
            ""
          )}

          {vitB1 ? (
            <tr>
              <th>Vitamina B1:</th>
              <td className="value">{Number(vitB1).toFixed(1)} ug</td>
              <th className="center">{Number(dvVitB1).toFixed(0)} %</th>
            </tr>
          ) : (
            ""
          )}

          {vitB2 ? (
            <tr>
              <th>Vitamina B2:</th>
              <td className="value">{Number(vitB2).toFixed(1)} mg</td>
              <th className="center">{Number(dvVitB2).toFixed(0)} %</th>
            </tr>
          ) : (
            ""
          )}

          {vitB3 ? (
            <tr>
              <th>Vitamina B3:</th>
              <td className="value">{Number(vitB3).toFixed(1)} mg</td>
              <th className="center">{Number(dvVitB3).toFixed(0)} %</th>
            </tr>
          ) : (
            ""
          )}
          {vitB6 ? (
            <tr>
              <th>Vitamina B6:</th>
              <td className="value">{Number(vitB6).toFixed(1)} mg</td>
              <th className="center">{Number(dvVitB6).toFixed(0)} %</th>
            </tr>
          ) : (
            ""
          )}
          {vitB12 ? (
            <tr>
              <th>Vitamina B12:</th>
              <td className="value">{Number(vitB12).toFixed(1)} ug</td>
              <th className="center">{Number(dvVitB12).toFixed(0)} %</th>
            </tr>
          ) : (
            ""
          )}
          {vitC ? (
            <tr>
              <th>Vitamina C:</th>
              <td className="value">{Number(vitC).toFixed(1)} mg</td>
              <th className="center">{Number(dvVitC).toFixed(0)} %</th>
            </tr>
          ) : (
            ""
          )}
          {folicAc ? (
            <tr>
              <th>Ácido Fólico:</th>
              <td className="value">{Number(folicAc).toFixed(1)} ug</td>
              <th className="center">{Number(dvFolicAc).toFixed(0)} %</th>
            </tr>
          ) : (
            ""
          )}
          {vitD ? (
            <tr>
              <th>Vitamina D:</th>
              <td className="value">{Number(vitD).toFixed(1)} ug</td>
              <th className="center">{Number(dvVitD).toFixed(0)} %</th>
            </tr>
          ) : (
            ""
          )}
          {vitE ? (
            <tr>
              <th>Vitamina E:</th>
              <td className="value">{Number(vitE).toFixed(1)} mg</td>
              <th className="center">{Number(dvVitE).toFixed(0)} %</th>
            </tr>
          ) : (
            ""
          )}
          {vitK ? (
            <tr>
              <th>Vitamina K:</th>
              <td className="value">{Number(vitK).toFixed(1)} ug</td>
              <th className="center">{Number(dvVitK).toFixed(0)} %</th>
            </tr>
          ) : (
            ""
          )}
        </tbody>
      </Table>
      <span className="bottom-label">
        * Valores basados en una dieta de 2000 Kcalorías para la población
        mexicana
      </span>
    </div>
  );
};

export default NutFactTable;
