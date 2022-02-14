import { useEffect, useState } from "react";
import { Table } from "reactstrap";
import { useDispatch, useSelector } from 'react-redux';
import { createIngredient } from "../../actions/auth";
import "./NutFactTable.scss";

const NutFactTable = ({ingredient,operation, typePortion, firstSelection, quantity}) => {

  const [portion, setPortion] = useState(0)
  const [energy, setEnergy] = useState(0)
  const [total_carbohydrate, setTotal_carbohydrate] = useState(0)
  const [dietary_fiber, setDietary_fiber] = useState(0)
  const [sugars, setSugars] = useState(0)
  const [calcium, setCalcium] = useState(0)
  const [phosphorus, setPhosphorus] = useState(0)
  const [iron, setIron] = useState(0)
  const [sodium, setSodium] = useState(0)
  const [potassium, setPotassium] = useState(0)
  const [magnesium, setMagnesium] = useState(0)
  const [copper, setCopper] = useState(0)
  const [zinc, setZinc] = useState(0)
  const [manganese, setManganese] = useState(0)
  const [selenium, setSelenium] = useState(0)
  const [lithium, setLithium] = useState(0)
  const [vitA, setVitA] = useState(0)
  const [carotene, setCarotene] = useState(0)
  const [bcarotene, setBcarotene] = useState(0)
  const [vitB1, setVitB1] = useState(0)
  const [vitB2, setVitB2] = useState(0)
  const [vitB3, setVitB3] = useState(0)
  const [vitB6, setVitB6] = useState(0)
  const [vitB12, setVitB12] = useState(0)
  const [vitC, setVitC] = useState(0)
  const [folicAc, setFolicAc] = useState(0)
  const [vitD, setVitD] = useState(0)
  const [vitE, setVitE] = useState(0)
  const [vitK, setVitK] = useState(0)
  const [protein, setProtein] = useState(0)
  const [total_fat, setTotal_fat] = useState(0)
  const [saturated_fatty_acids, setSaturated_fatty_acids] = useState(0)
  const [monounsaturated_fatty_acids, setMonounsaturated_fatty_acids] = useState(0)
  const [polyunsaturated_fatty_acids, setPolyunsaturated_fatty_acids] = useState(0)
  const [cholesterol, setCholesterol] = useState(0)
  const [glycemic_load, setGlycemic_load] = useState(0)

  // console.log(ingredient);
  // console.log(operation);
  // console.log(id);
  // console.log(quantity);

  // DV Dailly %
  const dvCarbohydrate = (total_carbohydrate * 100) / 275
  const dvFiber = (dietary_fiber * 100) / 35
  const dvSugars = (sugars * 100) / 36
  const dvProtein = (protein * 100) / 65
  const dvFat = (total_fat * 100) / 71.5
  const dvSaturated_fatty_acids = (saturated_fatty_acids * 100) / 22
  const dvMonounsaturated_fatty_acids = (monounsaturated_fatty_acids * 100) / 14.3
  const dvPolyunsaturated_fatty_acids = (polyunsaturated_fatty_acids * 100) / 7.15
  const dvCholesterol = (cholesterol * 100) / 0.3
  const dvSodium = (sodium * 100) / 2300
  const dvCalcium = (calcium * 100) / 2500
  const dvPhosphorus = (phosphorus * 100) / 700
  const dvIron = (iron * 100) / 18
  const dvPotassium = (potassium * 100) / 3400
  const dvMagnesium = (magnesium * 100) / 420
  const dvCopper = (copper * 100) / 900
  const dvZinc = (zinc * 100) / 11
  const dvManganese = (manganese * 100) / 2.3
  const dvSelenium = (selenium * 100) / 55
  const dvLithium = (lithium * 100) / 0.1
  const dvVitA = (vitA * 100) / 900
  const dvCarotene = (carotene * 100) / 2
  const dvBcarotene = (bcarotene * 100) / 4
  const dvVitB1 = (vitB1 * 100) / 1.2
  const dvVitB2 = (vitB2 * 100) / 1.4
  const dvVitB3 = (vitB3 * 100) / 16
  const dvVitB6 = (vitB6 * 100) / 1.7
  const dvVitB12 = (vitB12 * 100) / 2.4
  const dvVitC = (vitC * 100) / 90
  const dvFolicAc = (folicAc * 100) / 400
  const dvVitD = (vitD * 100) / 15
  const dvVitE = (vitE * 100) / 15
  const dvVitK = (vitK * 100) / 100

// REDUX
  const dispatch = useDispatch();
  const [tempArray, setTempArray] = useState([])

  useEffect(() => {
    const test = () =>dispatch(createIngredient())
    test()
    const fillArray = () =>{
      setTempArray(ingredient)
    }
    fillArray()
    console.log('entra a use effect');
    //prepareArray()
    manageIngredients()
    }
, [ingredient]);

const dataRedux = useSelector (state => state.ingredient)
//console.log(dataRedux.portion);

// const prepareArray = () =>{
//   tempArray.forEach(item=>{
//     console.log(item);
//   })
// }


const manageIngredients = () =>{
  console.log(ingredient);
  const portion = ingredient.reduce((acc,item)=> {
    return acc + (item?.equivalence.gram || 0)},0)
    setPortion(portion.toFixed(0))
    console.log('portion: ' + portion.toFixed(2));

  const energy = ingredient.reduce((acc,item)=> {
    return acc + (item?.energy || 0)},0)
    setEnergy(energy.toFixed(0))
    console.log('energy: ' + energy.toFixed(2));
  
  const total_carbohydrate = ingredient.reduce((acc,item)=> {
    return acc + (item?.total_carbohydrate || 0)},0)
    setTotal_carbohydrate(total_carbohydrate.toFixed(2))
    console.log('total_carbohydrate: ' + total_carbohydrate.toFixed(2));

  const dietary_fiber = ingredient.reduce((acc,item)=> {
    return acc + (item?.dietary_fiber || 0)},0)
    setDietary_fiber(dietary_fiber.toFixed(2))
    console.log('dietary_fiber: ' + dietary_fiber.toFixed(2));
    
  const sugars = ingredient.reduce((acc,item)=> {
    return acc + (item?.sugars || 0)},0)
    setSugars(sugars.toFixed(2))
    console.log('sugars: ' + sugars.toFixed(2));
  
  const calcium = ingredient.reduce((acc,item)=> {
    return acc + (item?.calcium || 0)},0)
    setCalcium(calcium.toFixed(2))
    console.log('calcium: ' + calcium.toFixed(2));

  const phosphorus = ingredient.reduce((acc,item)=> {
    return acc + (item?.phosphorus || 0)},0)
    setPhosphorus(phosphorus.toFixed(2))
    console.log('phosphorus: ' + phosphorus.toFixed(2));    
  
  const iron = ingredient.reduce((acc,item)=> {
    return acc + (item?.iron || 0)},0)
    setIron(iron.toFixed(2))
    console.log('iron: ' + iron.toFixed(2));
  
  const sodium = ingredient.reduce((acc,item)=> {
    return acc + (item?.sodium || 0)},0)
    setSodium(sodium.toFixed(2))
    console.log('sodium: ' + sodium.toFixed(2));

  const potassium = ingredient.reduce((acc,item)=> {
    return acc + (item?.potassium || 0)},0)
    setPotassium(potassium.toFixed(2))
    console.log('potassium: ' + potassium.toFixed(2));
    
  const magnesium = ingredient.reduce((acc,item)=> {
    return acc + (item?.magnesium || 0)},0)
    setMagnesium(magnesium.toFixed(2))
    console.log('magnesium: ' + magnesium.toFixed(2));
  
  const copper = ingredient.reduce((acc,item)=> {
    return acc + (item?.copper || 0)},0)
    setCopper(copper.toFixed(2))
    console.log('copper: ' + copper.toFixed(2));

  const zinc = ingredient.reduce((acc,item)=> {
    return acc + (item?.zinc || 0)},0)
    setZinc(zinc.toFixed(2))
    console.log('zinc: ' + zinc.toFixed(2));   

  const manganese = ingredient.reduce((acc,item)=> {
    return acc + (item?.manganese || 0)},0)
    setManganese(manganese.toFixed(2))
    console.log('manganese: ' + manganese.toFixed(2));
  
  const selenium = ingredient.reduce((acc,item)=> {
    return acc + (item?.selenium || 0)},0)
    setSelenium(selenium.toFixed(2))
    console.log('selenium: ' + selenium.toFixed(2));

  const lithium = ingredient.reduce((acc,item)=> {
    return acc + (item?.lithium || 0)},0)
    setLithium(lithium.toFixed(2))
    console.log('lithium: ' + lithium.toFixed(2));
    
  const vitA = ingredient.reduce((acc,item)=> {
    return acc + (item?.vitA || 0)},0)
    setVitA(vitA.toFixed(2))
    console.log('vitA: ' + vitA.toFixed(2));
  
  const carotene = ingredient.reduce((acc,item)=> {
    return acc + (item?.carotene || 0)},0)
    setCarotene(carotene.toFixed(2))
    console.log('carotene: ' + carotene.toFixed(2));

  const bcarotene = ingredient.reduce((acc,item)=> {
    return acc + (item?.bcarotene || 0)},0)
    setBcarotene(bcarotene.toFixed(2))
    console.log('bcarotene: ' + bcarotene.toFixed(2));    
  
  const vitB1 = ingredient.reduce((acc,item)=> {
    return acc + (item?.vitB1 || 0)},0)
    setVitB1(vitB1.toFixed(2))
    console.log('vitB1: ' + vitB1.toFixed(2));
  
  const vitB2 = ingredient.reduce((acc,item)=> {
    return acc + (item?.vitB2 || 0)},0)
    setVitB2(vitB2.toFixed(2))
    console.log('vitB2: ' + vitB2.toFixed(2));
  const vitB3 = ingredient.reduce((acc,item)=> {
    return acc + (item?.vitB3 || 0)},0)
    setVitB3(vitB3.toFixed(2))
    console.log('vitB3: ' + vitB3.toFixed(2));
    
  const vitB6 = ingredient.reduce((acc,item)=> {
    return acc + (item?.vitB6 || 0)},0)
    setVitB6(vitB6.toFixed(2))
    console.log('vitB6: ' + vitB6.toFixed(2));
  
  const vitB12 = ingredient.reduce((acc,item)=> {
    return acc + (item?.vitB12 || 0)},0)
    setVitB12(vitB12.toFixed(2))
    console.log('vitB12: ' + vitB12.toFixed(2));

  const vitC = ingredient.reduce((acc,item)=> {
    return acc + (item?.vitC || 0)},0)
    setVitC(vitC.toFixed(2))
    console.log('vitC: ' + vitC.toFixed(2)); 

  const folicAc = ingredient.reduce((acc,item)=> {
    return acc + (item?.folicAc || 0)},0)
    setFolicAc(folicAc.toFixed(2))
    console.log('folicAc: ' + folicAc.toFixed(2));
  
  const vitD = ingredient.reduce((acc,item)=> {
    return acc + (item?.vitD || 0)},0)
    setVitD(vitD.toFixed(2))
    console.log('vitD: ' + vitD.toFixed(2));

  const vitE = ingredient.reduce((acc,item)=> {
    return acc + (item?.vitE || 0)},0)
    setVitE(vitE.toFixed(2))
    console.log('vitE: ' + vitE.toFixed(2));
    
  const vitK = ingredient.reduce((acc,item)=> {
    return acc + (item?.vitK || 0)},0)
    setVitK(vitK.toFixed(2))
    console.log('vitK: ' + vitK.toFixed(2));
  
  const protein = ingredient.reduce((acc,item)=> {
    return acc + (item?.protein || 0)},0)
    setProtein(protein.toFixed(2))
    console.log('protein: ' + protein.toFixed(2));

  const total_fat = ingredient.reduce((acc,item)=> {
    return acc + (item?.total_fat || 0)},0)
    setTotal_fat(total_fat.toFixed(2))
    console.log('total_fat: ' + total_fat.toFixed(2));    
  
  const saturated_fatty_acids = ingredient.reduce((acc,item)=> {
    return acc + (item?.saturated_fatty_acids || 0)},0)
    setSaturated_fatty_acids(saturated_fatty_acids.toFixed(2))
    console.log('saturated_fatty_acids: ' + saturated_fatty_acids.toFixed(2));
  
  const monounsaturated_fatty_acids = ingredient.reduce((acc,item)=> {
    return acc + (item?.monounsaturated_fatty_acids || 0)},0)
    setMonounsaturated_fatty_acids(monounsaturated_fatty_acids.toFixed(2))
    console.log('monounsaturated_fatty_acids: ' + monounsaturated_fatty_acids.toFixed(2));

  const polyunsaturated_fatty_acids = ingredient.reduce((acc,item)=> {
    return acc + (item?.polyunsaturated_fatty_acids || 0)},0)
    setPolyunsaturated_fatty_acids(polyunsaturated_fatty_acids.toFixed(2))
    console.log('polyunsaturated_fatty_acids: ' + polyunsaturated_fatty_acids.toFixed(2));
    
  const cholesterol = ingredient.reduce((acc,item)=> {
    return acc + (item?.cholesterol || 0)},0)
    setCholesterol(cholesterol.toFixed(2))
    console.log('cholesterol: ' + cholesterol.toFixed(2));
}
    
  return (
      <div className="frameNutFactTable">
        <Table hover className="nutTable">
           <thead>
             <tr>
               <th colSpan="3" className="titleTable">Información nutricional</th>
             </tr>
             <tr className="label-container">
                {
                  sugars > 0.1 ? <img className="nut-label"src="https://kooben.s3.amazonaws.com/images/azucares.png"/> : null
                }
                {
                  energy > 0.1 ? <img className="nut-label"src="https://kooben.s3.amazonaws.com/images/calorias.png"/> : null
                }
                {
                  saturated_fatty_acids > 0 ? <img className="nut-label"src="https://kooben.s3.amazonaws.com/images/grasa.png"/> : null
                }
                {
                  sodium > 0.1 ? <img className="nut-label"src="https://kooben.s3.amazonaws.com/images/sodio.png"/> : null
                }
             </tr>
             {portion ? (
               <tr className="thickLine">
                <th>Tamaño de la porción:</th>
                <th colSpan="2">{portion} gramos</th>
               </tr>
             ): (
                <tr className="thickLine">
                  <th>Tamaño de la porción:</th>
                  <th colSpan="2">{portion} gramos</th>
                </tr>
             )}
             {energy ? (
               <tr className="mediumLine">
                <th>Energía:</th>
                <th colSpan="2">{energy*portion} Kcalorías</th>
               </tr>
             ): (
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
               <td>{total_carbohydrate} g</td>
               <th className="center">{dvCarbohydrate.toFixed(0)*portion}%</th>
             </tr>
             ): (
                ''
             )}
             
             <tr>
               <td> - Fibra:</td>
               <td>{dietary_fiber} g</td>
               <th className="center">{dvFiber.toFixed(0)*portion} %</th>
             </tr>
             <tr>
               <td> - Azúcares:</td>
               <td>{sugars} </td>
               <th className="center">{dvSugars.toFixed(0)*portion} %</th>
               <th className="center"></th>
             </tr>
             {glycemic_load ? (
               <tr>
               <th>Carga glucémica total:</th>
               <th className="center" colSpan="2">{glycemic_load}</th>
             </tr>
               ): (
                  ''
               )}
             
             {total_fat ? (
               <tr>
               <th>Grasa total:</th>
               <td>{total_fat} g</td>
               <th className="center">{dvFat.toFixed(0)*portion} %</th>
             </tr>
               ): (
                 ''
               )}

            {saturated_fatty_acids ? (
              <tr>
              <td> - Ácidos grasos saturados:</td>
              <td>{saturated_fatty_acids} g</td>
              <th className="center">{dvSaturated_fatty_acids.toFixed(0)*portion} %</th>
            </tr>
              ): (
               ''
              )}

            {monounsaturated_fatty_acids ? (
              <tr>
              <td> - Ácidos grasos monoinsaturados:</td>
              <td>{monounsaturated_fatty_acids} g</td>
              <th className="center">{dvMonounsaturated_fatty_acids.toFixed(0)*portion} %</th>
            </tr>
                ): (
                  ''
                )}
            
            {polyunsaturated_fatty_acids ? (
              <tr>
              <td> - Ácidos grasos polinsaturados:</td>
              <td>{polyunsaturated_fatty_acids} g</td>
              <th className="center">{dvPolyunsaturated_fatty_acids.toFixed(0)*portion} %</th>
            </tr>
                ): (
                  ''
                )}

             {protein ? (
               <tr>
               <th>Proteínas totales:</th>
               <td>{protein} g</td>
               <th className="center">{dvProtein.toFixed(0)*portion} %</th>
             </tr>
               ): (
                  ''
               )}
             
             {cholesterol ? (
               <tr>
               <th>Colesterol total:</th>
               <td>{cholesterol} g</td>
               <th className="center">{dvCholesterol.toFixed(0)*portion} %</th>
             </tr>
               ): (
                  ''
               )}
             
             {sodium ? (
               <tr>
               <th>Sodio:</th>
               <td>{sodium} mg</td>
               <th className="center">{dvSodium.toFixed(0)*portion} %</th>
             </tr>
               ): (
                  ''
               )}
             
             {calcium ? (
               <tr>
               <th>Calcio:</th>
               <td>{calcium} mg</td>
               <th className="center">{dvCalcium.toFixed(0)*portion} %</th>
             </tr>
               ): (
                  ''
               )}
             
             {phosphorus ? (
               <tr>
               <th>Fósforo:</th>
               <td>{phosphorus} mg</td>
               <th className="center">{dvPhosphorus.toFixed(0)*portion} %</th>
             </tr>
               ): (
                  ''
               )}
             
             {iron ? (
               <tr>
               <th>Hierro:</th>
               <td>{iron} mg</td>
               <th className="center">{dvIron.toFixed(0)*portion} %</th>
             </tr>
               ): (
                  ''
               )}
             
             {potassium ? (
               <tr>
               <th>Potasio:</th>
               <td>{potassium} mg</td>
               <th className="center">{dvPotassium.toFixed(0)*portion} %</th>
             </tr>
               ): (
                  ''
               )}
             
             {magnesium ? (
               <tr>
               <th>Magnesio:</th>
               <td>{magnesium} mg</td>
               <th className="center">{dvMagnesium.toFixed(0)*portion} %</th>
             </tr>
               ): (
                  ''
               )}
             
             {copper ? (
               <tr>
               <th>Cobre:</th>
               <td>{copper} mg</td>
               <th className="center">{dvCopper.toFixed(0)*portion} %</th>
             </tr>
               ): (
                  ''
               )}
             
             {zinc ? (
               <tr>
               <th>Zinc:</th>
               <td>{zinc} mg</td>
               <th className="center">{dvZinc.toFixed(0)*portion} %</th>
             </tr>
               ): (
                  ''
               )}
             
             {manganese ? (
               <tr>
               <th>Manganeso:</th>
               <td>{manganese} mg</td>
               <th className="center">{dvManganese.toFixed(0)*portion} %</th>
             </tr>
               ): (
                  ''
               )}
             
             {selenium ? (
               <tr>
               <th>Selenio:</th>
               <td>{selenium} mg</td>
               <th className="center">{dvSelenium.toFixed(0)*portion} %</th>
             </tr>
               ): (
                  ''
               )}
             
             {lithium ? (
               <tr>
               <th>Litio:</th>
               <td>{lithium} mg</td>
               <th className="center">{dvLithium.toFixed(0)*portion} %</th>
             </tr>
               ): (
                  ''
               )}
             
             {vitA ? (
               <tr>
               <th>Vitamina A:</th>
               <td>{vitA} ug</td>
               <th className="center">{dvVitA.toFixed(0)*portion} %</th>
             </tr>
               ): (
                  ''
               )}
             
             {carotene ? (
               <tr>
               <th>Caroteno:</th>
               <td>{carotene} mg</td>
               <th className="center">{dvCarotene.toFixed(0)*portion} %</th>
             </tr>
               ): (
                  ''
               )}
             
             {bcarotene ? (
               <tr>
               <th>Beta-caroteno:</th>
               <td>{bcarotene} mg</td>
               <th className="center">{dvBcarotene.toFixed(0)*portion} %</th>
             </tr>
               ): (
                  ''
               )}
             
             {vitB1 ? (
               <tr>
               <th>Vitamina B1:</th>
               <td>{vitB1} mg</td>
               <th className="center">{dvVitB1.toFixed(0)*portion} %</th>
             </tr>
               ): (
                  ''
               )}
             
             {vitB2 ? (
               <tr>
               <th>Vitamina B2:</th>
               <td>{vitB2} mg</td>
               <th className="center">{dvVitB2.toFixed(0)*portion} %</th>
             </tr>
               ): (
                  ''
               )}
             
             {vitB3 ? (
               <tr>
               <th>Vitamina B3:</th>
               <td>{vitB3} mg</td>
               <th className="center">{dvVitB3.toFixed(0)*portion} %</th>
             </tr>
               ): (
                  ''
               )}
             {vitB6 ? (
               <tr>
               <th>Vitamina B6:</th>
               <td>{vitB6} mg</td>
               <th className="center">{dvVitB6.toFixed(0)*portion} %</th>
             </tr>
               ): (
                  ''
               )}
             {vitB12 ? (
               <tr>
               <th>Vitamina B12:</th>
               <td>{vitB12} mg</td>
               <th className="center">{dvVitB12.toFixed(0)*portion} %</th>
             </tr>
               ): (
                  ''
               )}
             {vitC ? (
               <tr>
               <th>Vitamina C:</th>
               <td>{vitC} mg</td>
               <th className="center">{dvVitC.toFixed(0)*portion} %</th>
             </tr>
               ): (
                  ''
               )}
             {folicAc ? (
               <tr>
               <th>Ácido Fólico:</th>
               <td>{folicAc} mg</td>
               <th className="center">{dvFolicAc.toFixed(0)*portion} %</th>
             </tr>
               ): (
                  ''
               )}
             {vitD ? (
               <tr>
               <th>Vitamina D:</th>
               <td>{vitD} mg</td>
               <th className="center">{dvVitD.toFixed(0)*portion} %</th>
             </tr>
               ): (
                  ''
               )}
             {vitE ? (
               <tr>
               <th>Vitamina E:</th>
               <td>{vitE} mg</td>
               <th className="center">{dvVitE.toFixed(0)*portion} %</th>
             </tr>
               ): (
                  ''
               )}
             {vitK ? (
               <tr>
                <th>Vitamina K:</th>
                  <td>{vitK} mg</td>
                <th className="center">{dvVitK.toFixed(0)*portion} %</th>
              </tr>
               ): (
                  ''
               )}
           </tbody>
        </Table>
      </div>
  )};

export default NutFactTable;
