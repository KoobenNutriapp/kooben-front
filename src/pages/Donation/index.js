import NavBar from "../../components/NavBar";
import Buttons from "../../components/Buttons";
import {Button, Container, Row} from 'reactstrap'
import '../../styles/_colors.scss'
import image from '../../img/mexican-food-donation.jpg'
// import pdfmakedownload from "./pdfContainer";


//PDF document creation
import {pdfMake} from "pdfmake/build/pdfmake";
// import pdfFonts from "pdfmake/build/vfs_fonts";
// import documentDefination from "./DocumentDefination";

const urlQRCode = 'https://kooben.s3.amazonaws.com/QR-paypal-kooben'
const qrCodeAlt = 'Imagen de código QR para donación a Kooben'
const mainImageAlt = 'Imagen alusiva a la gastronomía mexicana.'



//============================== PDF document ============

const DocumentDefination = {
    content: [
      "First paragraph",
      "Another paragraph, this time a little bit longer to make sure, this line will be divided into at least two lines"
    ]
  };


  const pdfmakedownload = () => {
    pdfMake.createPdf(DocumentDefination).download();
  };




function DonationInvite(){
    return(
        <div>
            ¿Te gustó la app?, ¡Apóyanos con tu donativo?
        </div>
    )
}

function NoDonate(){
    return(
        <div>
            De momento no quiero apoyar ¡Gracias!
        </div>
    );
};

function MainImage(){
    return(
        <img src={image} alt={mainImageAlt} width={'200px'} />
    );
};

function QRCode(){
    return(
        <img src={urlQRCode} alt={qrCodeAlt} width={'200px'} />

    )
};


function PaypalLogo(){
    return(
        <div>
            <table border="0" cellpadding="10" cellspacing="0" align="center">
                    <tr>
                        <td align="center"></td>
                    </tr>
                    <tr>
                        <td align="center">
                        <a href="https://www.paypal.com/c2/webapps/mpp/paypal-popup?locale.x=en_C2" title="PayPal" onclick="javascript:window.open('https://www.paypal.com/c2/webapps/mpp/paypal-popup?locale.x=en_C2','WIPaypal','toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=yes, width=1060, height=700'); return false;">
                            <img src="https://www.paypalobjects.com/digitalassets/c/website/marketing/apac/C2/logos-buttons/optimize/Online_Primary_Acceptance_Mark_RGB_V2.jpg" alt="PayPal" /></a>
                        </td>
                    </tr>
                </table>
        </div>
    );
};

function RedirectingPayPalButton(){
        return(
        <form action="https://www.paypal.com/donate" method="post" target="_top">
            <input type="hidden" name="hosted_button_id" value="MQRFL8F42EH84" />
            <input type="image" src="https://www.paypalobjects.com/es_XC/MX/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donar con el botón PayPal" />
            <img alt="" border="0" src="https://www.paypal.com/es_MX/i/scr/pixel.gif" width="1" height="1" />
        </form>
    );
};

function DownloadPDF() {
    return (
      <div className="App">
        <h1>Hello CodeSandbox</h1>
        <h2>Start editing to see some magic happen!</h2>
        <Button color="primary" onClick={() => {
            pdfmakedownload()}}>Exportar</Button>

      </div>
    );
  }


function DonationPage(){
    return(
        <>
        <Row>
        <NavBar />

        </Row>
        <Row className="Main-Row-Container">
        <Container fluid className='General-Container col-lg-12'>
        <MainImage />
        <PaypalLogo />
        <NoDonate />
        <QRCode />
        <Buttons
        children={'Exportar'}
        size={'small'}
        color={'$mexican-pink'}
        />
        <DownloadPDF />
        <RedirectingPayPalButton />
        </Container>

        </Row>
        </>
    );
};

export default DonationPage