import MainSearchBar from '../../components/MainSearchBar';
import Navbar from '../../components/NavBar';
import './NotFound.scss'
import {Container,
    Card,
    CardImg,
    CardImgOverlay,
    CardBody,
    CardTitle,
    CardText
} from 'reactstrap';
import {Link} from 'react-router-dom';


function NotFound(){

    const backgroundImagePath = '../../img/RuralMexicanKitchen.jpg';
    const altBackgroundImage = 'traditional mexican kitchen';

    const WarningMessage = () => {
        return(
            <h4>
                Ha sucedido un error. La página que estás buscando no existe.
            </h4>
        );
    };

    const ErrorCode = () =>{
        return(
            <h1>404</h1>
        );
    };

    const SearchRecipeSuggestion = () => {
        return(
            <h4>
                Si quieres buscar una nueva receta, da click <Link className='Link-To-Page' to='/'>aquí</Link>.
            </h4>
        );
    };

    const CreateRecipeSuggestion = () => {
        return (
        <h4>
            ¿Quiéres crear una nueva receta? Intenta <Link className='Link-To-Page' to='/'>aquí</Link>.
        </h4>
        );
    };

    const BackgroundImage = ({alt, src}) => {
        return(
            <>
            <img alt={alt} src={require(src)} />
            </>
        );
    };

    const AlternativeContainer = () => {
        return(
    <Card inverse>
    <CardImg
      alt="Card image cap"
      src='../../img/RuralMexicanKitchen.jpg'
      left
      width="50%"
      height="80%"
    />
    <CardBody>
    </CardBody>
  </Card>
        )
    }

    function AnotherImageContainer(){
        return(
            <div>
  <Card inverse>
    <CardImg
      className='Card-Image'
      alt="Card image cap"
      src="https://teocentli.com.mx/wp-content/uploads/2018/08/teocentli_cocina-1000x687.png"
      width="100%"
    />
    <CardImgOverlay>

      <WarningMessage />
      <ErrorCode />
      <SearchRecipeSuggestion />
      <CreateRecipeSuggestion />
    </CardImgOverlay>
  </Card>
</div>
        );
    };


    return(
        <>
        <row>

        <MainSearchBar />
        {/* <Navbar/> */}


        <AnotherImageContainer className=' col-l-10 Main-Content-Container' />
        </row>

        
        
        </>
    );
};

export default NotFound