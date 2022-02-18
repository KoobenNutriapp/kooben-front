import NavBar from "../../components/NavBar";
import Buttons from "../../components/Buttons";
import {Button, Card, Container, Row, CardImg, Navbar, CardTitle, CardGroup, CardBody} from 'reactstrap'
import '../../styles/_colors.scss'
import image from '../../img/mexican-food-donation.jpg'
// import PDFRecipeCreator from "../../services/PdfRecipeCreator";
// import MyDocument from "../../services/PDFGenerator";
// import { PDFViewer } from "@react-pdf/renderer";
// import pdfmakedownload from "./pdfContainer";
// import pdfmakedownload from '../../services/pdfRecipeGenerator'
import pdfmakedownload from "../../services/PdfRecipeCreator";

//PDF document creation
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// import documentDefination from "./DocumentDefination";

const urlQRCode = 'https://kooben.s3.amazonaws.com/QR-paypal-kooben'
const qrCodeAlt = 'Imagen de código QR para donación a Kooben'
const mainImageAlt = 'Imagen alusiva a la gastronomía mexicana.'

//=======================
// pdfMake.vfs = pdfFonts.pdfMake.vfs

//============================== PDF document ============

const oldData = {
    "total_energy": {
        "quantity": 64.15,
        "unit": "KCalorías"
    },
    "total_carbohydrate": {
        "quantity": 11.87,
        "unit": "g"
    },
    "total_sugars": {
        "quantity": 7.96,
        "unit": "g"
    },
    "total_fiber": {
        "quantity": 8.39,
        "unit": "g"
    },
    "total_sodium": {
        "quantity": 44.45,
        "unit": "mg"
    },
    "total_protein": {
        "quantity": 5.08,
        "unit": "g"
    },
    "total_fat": {
        "quantity": 0.51,
        "unit": "g"
    },
    "total_cholesterol": {
        "quantity": 0,
        "unit": "g"
    },
    "total_glycemic_load": {
        "quantity": 1.68
    },
    "_id": "61fc158a31438d0b54a7e427",
    "status": true,
    // "url": "",
    "url": "https://balan-kodemia-first-bucket.s3.us-west-1.amazonaws.com/telecaster.jpeg",
    // "url": "https://recetinas.com/wp-content/uploads/2019/10/ensalada-de-nopales.jpg",
    "type": "prehispanic",
    "title": "Ensalada de nopales 🌵🌵",
    "synopsis": "El nopal es sin duda uno de los ingredientes más representativos de la cocina Mexicana. Esta ensalada, aparte de ser Mexicana, es muy fresca, nutritiva y  también está llena de colores y sabores.",
    "tags": [
        "🌵healthy",
        "🐍prehispanic",
        "🔽low-calories",
        "🔼 high-fiber"
    ],
    "steps": [
        {
            "sequence": 1,
            "text": "iztapalapa Lava muy bien los nopales, la cebolla, el jitomate y el cilantro. Pon a desinfectar el cilantro con algún producto comercial durante 20 minutos.",
            "url": "https://i.blogs.es/ee8961/ensalada-nopales-3-1/1366_2000.jpg",
            "_id": "61fc259931438d0b54a7e555"
        },
        {
            "sequence": 2,
            "text": "Corta los nopales en cubos pequeños y ponlos a hervir en una olla con un poco de agua durante unos 15 minutos. Posteriormente escúrrelos y déjalos enfriar.",
            "url": "https://i.blogs.es/ee8961/ensalada-nopales-3-1/1366_2000.jpg",
            "_id": "61fc259931438d0b54a7e556"
        },
        {
            "sequence": 3,
            "text": "Corta la cebolla en rodajas y reserva. Corta los jitomates en cubos pequeños. No se te olvide afilar el cuchillo",
            "url": "https://i.blogs.es/ee8961/ensalada-nopales-3-1/1366_2000.jpg",
            "_id": "61fc259931438d0b54a7e557"
        },
        {
            "sequence": 4,
            "text": "Escurre y corta las raíces de las ramitas de cilantro. Reserva las hojas. Si es de tu gusto, puedes picar los tallos y reservar también.",
            "url": "https://i.blogs.es/ee8961/ensalada-nopales-3-1/1366_2000.jpg",
            "_id": "61fc259931438d0b54a7e558"
        },
        {
            "sequence": 5,
            "text": "En una ensaladera, incorpora y mezcla: los nopales cocidos, el jitomate en cubo, las rodajas de cebolla y agrega las hojas de cilantro y los tallos bien picados.",
            "url": "https://i.blogs.es/ee8961/ensalada-nopales-3-1/1366_2000.jpg",
            "_id": "61fc259931438d0b54a7e559"
        },
        {
            "sequence": 6,
            "text": "Adereza con la cucharadita de aceite de oliva, la sal y la pimienta cuautitlán.",
            "url": "https://i.blogs.es/ee8961/ensalada-nopales-3-1/1366_2000.jpg",
            "_id": "61fc259931438d0b54a7e55a"
        },
        {
            "sequence": 7,
            "text": "¡Disfruta!.",
            "url": "https://i.blogs.es/ee8961/ensalada-nopales-3-1/1366_2000.jpg",
            "_id": "61fc259931438d0b54a7e55b"
        }
    ],
    "author": "https://www.directoalpaladar.com/recetas-de-ensaladas/ensalada-de-nopales-receta-mexicana",
    "created": "22-01-2022,09:24",
    "edited": "27-01-2022,18:35",
    "likes": 259,
    "ids_of_likes": [
        "a1",
        "a2",
        "a3",
        "a4"
    ],
    "ingredients": [
        {
            "ingredient_equivalence": {
                "cup": 60,
                "spoon": 5,
                "piece": 110,
                "gram": 1
            },
            "ingredient_id": "61f0729a4a076cdebc709c87",
            "_id": "61fc259931438d0b54a7e55c"
        },
        {
            "ingredient_equivalence": {
                "cup": 55,
                "spoon": 6,
                "piece": 85,
                "gram": 1
            },
            "ingredient_id": "61f196d7980270914baee228",
            "_id": "61fc259931438d0b54a7e55d"
        }
    ],
    "__v": 0
}

const middleData = {
    "title":"Nopales con aguacate",
    "url":"https://kooben.s3.amazonaws.com/images/k-1645049441734",
    "type":"prehispanic",
    "synopsis":"Es la receta del año",
    "tags":["🌮mexicana","✅ bajo en calorías","✅ alto en fibra","🤤 delicioso"],
    "procedures":["paso 1","paso 2","paso 3","paso 4"],
    "author":"Rafael Martínez Reyes",
    "created":"16/02/2022 16:25:49",
    "edited":"16/02/2022 16:25:49",
    "total_energy":"96.90",
    "total_carbohydrate":"13.77",
    "total_sugars":"3.43",
    "total_fiber":"13.94",
    "total_sodium":"153.00",
    "total_protein":"5.17",
    "total_fat":"41.73",
    "total_cholesterol":"0.00",
    "total_glycemic_load":"0.9639",
    "ingredients":[
      {
        "firstLetter":"A",
        "equivalence":{
          "cup":2,
          "spoon":20,
          "piece":1,
          "gram":85},
        "_id":"6209e041767be76789298d11",
        "status":true,
        "name":"aguacate 🥑",
        "alias":["avocado","palta"],
        "url":"https://lopezdoriga.com/wp-content/uploads/2022/02/aguacate.jpg",
        "consistency":"S",
        "energy":0.42,
        "total_carbohydrate":0.0482,
        "dietary_fiber":0.047,
        "sugars":0.009,
        "calcium":0.17,
        "phosphorus":0.48,
        "iron":0.0055,
        "sodium":0.7,
        "potassium":4.85,
        "magnesium":0.29,
        "copper":0.0068,
        "zinc":0.0138,
        "manganese":0.0016,
        "selenium":0,
        "vitA":0.07,
        "vitB1":0.0006,
        "vitB2":0.0012,
        "vitB3":0.0138,
        "vitB6":0.0026,
        "vitB12":0,
        "vitC":0.01195,
        "folicAc":0.66,
        "vitD":0,
        "vitE":0,
        "vitK":0,
        "protein":0.0169,
        "total_fat":0.245,
        "saturated_fatty_acids":0.0213,
        "monounsaturated_fatty_acids":0.098,
        "polyunsaturated_fatty_acids":0.0182,
        "cholesterol":0,
        "glycemic_index":7,
        "__v":0}]}

        const data = {
            "_id": "620e708c160682c3b665e897",
            "url": "https://kooben.s3.amazonaws.com/images/k-1645113453740",
            "type": "prehispanic",
            "title": "Nopales con aguacate",
            "synopsis": "Porque sí",
            "tags": [
                "🐍prehispánico",
                "🤤 delicioso"
            ],
            "procedures": [
                "uno",
                "dos",
                "tres"
            ],
            "author": "Rafael Martínez Reyes",
            "total_energy": 96.9,
            "total_carbohydrate": 13.77,
            "total_sugars": 3.43,
            "total_fiber": 13.94,
            "total_sodium": 153,
            "total_protein": 5.17,
            "total_fat": 41.73,
            "total_cholesterol": 0,
            "total_glycemic_load": 0.9639,
            "created": "17/02/2022 09:58:04",
            "edited": "17/02/2022 09:58:04",
            "ingredients": [
                {
                    "equivalence": {
                        "cup": 2,
                        "spoon": 20,
                        "piece": 1,
                        "gram": 85
                    },
                    "_id": "6209e041767be76789298d11",
                    "name": "aguacate 🥑",
                    "alias": [
                        "avocado",
                        "palta"
                    ],
                    "url": "https://lopezdoriga.com/wp-content/uploads/2022/02/aguacate.jpg",
                    "consistency": "S",
                    "energy": 0.42,
                    "total_carbohydrate": 0.0482,
                    "dietary_fiber": 0.047,
                    "sugars": 0.009,
                    "calcium": 0.17,
                    "phosphorus": 0.48,
                    "iron": 0.0055,
                    "sodium": 0.7,
                    "potassium": 4.85,
                    "magnesium": 0.29,
                    "copper": 0.0068,
                    "zinc": 0.0138,
                    "manganese": 0.0016,
                    "selenium": 0,
                    "vitA": 0.07,
                    "vitB1": 0.0006,
                    "vitC": 0.01195,
                    "folicAc": 0.66,
                    "vitD": 0,
                    "vitE": 0,
                    "vitK": 0,
                    "protein": 0.0169,
                    "total_fat": 0.245,
                    "saturated_fatty_acids": 0.0213,
                    "monounsaturated_fatty_acids": 0.098,
                    "polyunsaturated_fatty_acids": 0.0182,
                    "cholesterol": 0,
                    "glycemic_index": 7
                },
                {
                    "equivalence": {
                        "cup": 2,
                        "spoon": 20,
                        "piece": 1,
                        "gram": 85
                    },
                    "_id": "6209dd55767be76789298d0c",
                    "name": "nopal cocido",
                    "alias": [
                        "tuna",
                        "tunera",
                        "higo de tuna",
                        "caitias",
                        "chumbera"
                    ],
                    "url": "https://media.justo.mx/products/VERDURAS-Nopal-4.jpg",
                    "consistency": "S",
                    "energy": 0.15,
                    "total_carbohydrate": 0.0328,
                    "dietary_fiber": 0.035,
                    "sugars": 0.0112,
                    "calcium": 1.64,
                    "phosphorus": 0.16,
                    "iron": 0.005,
                    "sodium": 0.2,
                    "potassium": 1.95,
                    "magnesium": 0.47,
                    "copper": 0.005,
                    "zinc": 0.0153,
                    "manganese": 0.0041,
                    "selenium": 0,
                    "vitA": 0.22,
                    "vitB1": 0.0001,
                    "vitC": 0.053,
                    "folicAc": 0,
                    "vitD": 0,
                    "vitE": 0,
                    "vitK": 0,
                    "protein": 0.0135,
                    "total_fat": 0.0005,
                    "saturated_fatty_acids": 0.0001,
                    "monounsaturated_fatty_acids": 0.0001,
                    "polyunsaturated_fatty_acids": 0.0002,
                    "cholesterol": 0,
                    "glycemic_index": 7
                }
            ],
            "__v": 0
        }

const toDataURL = (url) => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
    }));

const exportHandler = async () => {
    console.log('llamando')
    data.url2 = await toDataURL(data.url)
    console.log(data.url2)
    console.log('se codifico')
    console.log('Convierte PDF')
    await pdfmakedownload(data);
};

function DonationInvite(){
    return(
        <Card>

        <CardTitle className="text-center">
            ¿Te gustó la app?, ¡Apóyanos con tu donativo?
        </CardTitle>
        </Card>
    )
}

function NoDonate(){
    return(
        <Card className="text-center">
            De momento no quiero apoyar ¡Gracias!
        </Card>
    );
};

function MainImage(){
    return(
        <Card className="text-center Main-Image">
            <CardBody>

            <CardImg
            alt= ""
            src={mainImageAlt}
            // top 
            width='100%'
            />
            <img src={image} alt={mainImageAlt} width={'30%'}/>
            </CardBody>
        </Card>
    );
};

function QRCode(){
    return(
        <div className="text-center QR-Code">
            <img src={urlQRCode} alt={qrCodeAlt} width={'15%'} />

        </div>

    );
};


function PaypalLogo(){
    return(
        <div className="text-center Paypal-Logo">
            <table border="0" cellpadding="0" cellspacing="0" align="center">
                    <tr>
                        <td align="center"></td>
                    </tr>
                    <tr>
                        <td align="center">
                        <a href="https://www.paypal.com/c2/webapps/mpp/paypal-popup?locale.x=en_C2" title="PayPal" onclick="javascript:window.open('https://www.paypal.com/c2/webapps/mpp/paypal-popup?locale.x=en_C2','WIPaypal','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1060, height=700'); return false;">
                            <img width='80%' src="https://www.paypalobjects.com/digitalassets/c/website/marketing/apac/C2/logos-buttons/optimize/Online_Primary_Acceptance_Mark_RGB_V2.jpg" alt="PayPal" /></a>
                        </td>
                    </tr>
                </table>
        </div>
    );
};

function RedirectingPayPalButton(){
        return(
            <Card className="text-center">
                <CardBody>

                <form action="https://www.paypal.com/donate" method="post" target="_top">
                <input type="hidden" name="hosted_button_id" value="MQRFL8F42EH84" />
                <input type="image" src="https://www.paypalobjects.com/es_XC/MX/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donar con el botón PayPal" />
                <img alt="" border="0" src="https://www.paypal.com/es_MX/i/scr/pixel.gif" width="1" height="1" />
                </form>
                </CardBody>
            </Card>
        );
};

function DownloadPDF() {

    return (
      <Card className="text-center">
          <CardBody>
            <Button color="primary" onClick={exportHandler}>Exportar</Button>

          </CardBody>
      </Card>
    );
  }


function DonationPage(){

    return(
        <>

        <Navbar />


        <Row className="Main-Row-Container">
        <Container fluid className='General-Container col-lg-12'>
        <Navbar />
        <MainImage className='Main-Image'/>
        <DonationInvite className='Donation-Invite'/>


        <Card className="Paypal-QR-Container">
            <CardBody className="Paypal-QR-Container">
                {/* <CardGroup> */}
                    
            <PaypalLogo className='Paypal-Logo'/>
            {/* <QRCode className='QR-Code'/> */}
                {/* </CardGroup> */}

            </CardBody>
        </Card>
 
        {/* <CardGroup className=" text-center Logo-QR-Container">

            <Card className='Paypal-Logo-Container'>
            <PaypalLogo className='Paypal-Logo'/>

            </Card>

            <Card className="QR-Code-Container">
                
            <QRCode className='QR-Code'/>
            </Card>
        </CardGroup> */}
     
        <RedirectingPayPalButton className='Paypal-Button'/>


        <NoDonate className='No-Donate'/>
        <DownloadPDF className='Download-PDF'/>

        </Container>

        </Row>
        </>
    );
};

export default DonationPage