import NavBar from "../../components/NavBar";
import Buttons from "../../components/Buttons";
import {Container, Row} from 'reactstrap'
import '../../styles/_colors.scss'
import image from '../../img/mexican-food-donation.jpg'


const urlQRCode = 'https://kooben.s3.amazonaws.com/QR-paypal-kooben'
const qrCodeAlt = 'Imagen de código QR para donación a Kooben'
const mainImageAlt = 'Imagen alusiva a la gastronomía mexicana.'



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

// function PayPalButton(){
//     return(
//         <div id="donate-button-container">
//         <div id="donate-button"></div>
//         <script src="https://www.paypalobjects.com/donate/sdk/donate-sdk.js" charset="UTF-8"></script>
//         <script>
//         PayPal.Donation.Button({
//         env:'production',
//         hosted_button_id:'MQRFL8F42EH84',
//         image: {
//         src:'https://www.paypalobjects.com/es_XC/i/btn/btn_donate_LG.gif',
//         alt:'Donar con el botón PayPal',
//         title:'PayPal - The safer, easier way to pay online!',
//         }}).render('#donate-button');
//         </script>
//         </div>

//     )
// }

// function PayPalButton(){
//         return(
//             <>
//             <div id="donate-button-container">
//             <div id="donate-button"></div>
//             <script src="https://www.paypalobjects.com/donate/sdk/donate-sdk.js" charset="UTF-8"></script>
//             <script>
//                 {PayPal.Donation.Button({
//                 env:'production',
//                 hosted_button_id:'MQRFL8F42EH84',
//                 image: {
//                 src:'https://www.paypalobjects.com/es_XC/i/btn/btn_donate_LG.gif',
//                 alt:'Donar con el botón PayPal',
//                 title:'PayPal - The safer, easier way to pay online!',
//                 }}).render('#donate-button')};
//             </script>
//             </div>
//             </>
    
//         )
//     }

    function RedirectingPayPalButton(){
        return(
            <form action="https://www.paypal.com/donate" method="post" target="_top">
<input type="hidden" name="hosted_button_id" value="MQRFL8F42EH84" />
<input type="image" src="https://www.paypalobjects.com/es_XC/MX/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donar con el botón PayPal" />
<img alt="" border="0" src="https://www.paypal.com/es_MX/i/scr/pixel.gif" width="1" height="1" />
</form>
        );
    };





function DonationPage(){
    return(
        <>
        <Row>
        <NavBar />

        </Row>
        <Row>
        <MainImage />
        <Container className='col-lg-8'>

        <NoDonate />
        <QRCode />
        <Buttons
        children={'Exportar'}
        size={'small'}
        color={'$mexican-pink'}
        />
        <RedirectingPayPalButton />
        </Container>

        </Row>
        </>
    );
};

export default DonationPage;