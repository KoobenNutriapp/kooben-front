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

let data = {}

const toDataURL = (url) => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
    }));

const exportHandler = async () => {
    console.log('llamando data')
    console.log(data);
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
    data = location.state.recipe.metaData
    console.log(data)
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
                    
                <DonationButton
                    ammount={"10.00"}
                    itemID="price_1KVNX9AqezYdKBDlm6ObBNND"
                ></DonationButton>
            

            </CardBody>
        </Card>
 


        <NoDonate className='No-Donate'/>
        <DownloadPDF className='Download-PDF'/>
        
        </Container>

        </Row>
        </>
    );
};

export default DonationPage