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
    const data = location.state.recipe.metaData
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