import MainSearchBar from '../../components/MainSearchBar';
import Navbar from '../../components/NavBar';
import './NotFound.scss'
import {Container, Nav, Row} from 'reactstrap';
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


    return(
        <>
        <Container className='Not-Found-Container' fluid>

            {/* <MainSearchBar /> */}
            <Navbar/>
            <Row>
                <Container className='Main-Content-Container col-xs-12 col-lg-8'>
                    <WarningMessage />
                    <ErrorCode />
                    <SearchRecipeSuggestion />
                    <CreateRecipeSuggestion />
                </Container>
            </Row>
        </Container>
        
        
        </>
    );
};

export default NotFound