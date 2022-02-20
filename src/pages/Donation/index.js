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
import DonationButton from "../../components/DonationButton"
//PDF document creation
// import pdfMake from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// import documentDefination from "./DocumentDefination";
import {useLocation} from 'react-router-dom';

const urlQRCode = 'https://kooben.s3.amazonaws.com/QR-paypal-kooben'
const qrCodeAlt = 'Imagen de código QR para donación a Kooben'
const mainImageAlt = 'Imagen alusiva a la gastronomía mexicana.'

//=======================
// pdfMake.vfs = pdfFonts.pdfMake.vfs

//============================== PDF document ============

        const data = {
            "_id": "620e708c160682c3b665e897",
            "url": "https://kooben.s3.amazonaws.com/images/k-1645113453740",
            "type": "prehispanic",
            "title": "Nopales con aguacate",
            "synopsis": "Ya sea por la temporada, por el tiempo o simplemente por el antojo de comer algo rico y nutritivo, preparar esta ensalada de nopales picante con agucate es una buena opción. Los ingredientes para prepararla son muy económicos y va muy bien con la carne a la plancha.",
            "tags": [
                "🐍prehispánico",
                "🤤 delicioso"
            ],
            "procedures": [
                "Limpia perfectamente los nopales, asegúrate de que no tengan espinas y córtalos.",
                "Cuece los nopales con suficiente agua, una cucharada de sal y un diente de ajo.",
                "Pica finamente el cilantro, corta la cebolla, los tomates y filetea los chiles.",
                "Luego de 20 minutos en el fuego, escurre los nopales (cuida que el ajo no se mezcla en la ensalada) y espera que enfríen un poco.",
                "Revuelve los nopales con el resto de las verduras y añade el jugo de limón. Añade sal al gusto; sirve con queso Cotija y rebanadas de aguacate fresco."
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

    const location = useLocation();

    console.log('******DONATION');
    console.log(location)

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
        <DonationButton
          ammount={"10.00"}
          itemID="price_1KVNX9AqezYdKBDlm6ObBNND"
        ></DonationButton>
        </Container>

        </Row>
        </>
    );
};

export default DonationPage