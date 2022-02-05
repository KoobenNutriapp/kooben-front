import MainSearchBar from '../../components/MainSearchBar';
import './NotFound.scss'
import {Container} from 'reactstrap';
import {Link} from 'react-router-dom';


function NotFound(){

    const backgroundImagePath = '../../img/RuralMexicanKitchen.jpg';
    const altBackgroundImage = 'traditional mexican kitchen';

    const WarningMessage = () => {
        return(
            <h3>
                Ha sucedido un error. La página que estás buscando no existe.
            </h3>
        );
    };

    const ErrorCode = () =>{
        return(
            <h3>404</h3>
        );
    };

    const SearchRecipeSuggestion = () => {
        return(
            <h3>
                Si quieres buscar una nueva receta, da click <Link to='/home'>aquí</Link>.
            </h3>
        );
    };

    const CreateRecipeSuggestion = () => {
        return (
        <h3>
            ¿Quiéres crear una nueva receta? Intenta <Link to='/CreateRecipe'>aquí</Link>.
        </h3>
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
        <Container className='container Not-Found-Container' fluid>
            <MainSearchBar />
            <WarningMessage />
            <ErrorCode />
            <SearchRecipeSuggestion />
            <CreateRecipeSuggestion />
            {/* <BackgroundImage
            alt={altBackgroundImage}
            src={backgroundImagePath}
            /> */}
            {/* <img alt={'traditional mexican kitchen'} src={require('../../img/RuralMexicanKitchen.jpg')} /> */}
        </Container>|
        
        
        </>
    );
};

export default NotFound