import "./NotFound.scss";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <>
      <div className="contenedor">
        <img
          src="https://kooben.s3.amazonaws.com/images/home-images/nachos-and-tasty-sauces.jpg"
          width="100%"
        />
        <div className="messageBox">
          <span className="m-404">404</span>
          <span className="userMessage">
            ¡Vaya!, ¡parece que la página que buscas no existe!
          </span>
          <Link className="linkNavbar btnCreateRecipe" to="/">
            <span className="linkToHome">
              💠 Si quieres ver una lista de recetas deliciosas y nutritivas ven
              aquí
            </span>
          </Link>
          <Link className="linkNavbar btnCreateRecipe" to="/my_recipe">
            <span className="linkToMyRecipe">
              🌐 Si quieres crear tu propia receta y sorprender a tus amigos ven
              acá
            </span>
          </Link>
        </div>
      </div>
    </>
  );
}

export default NotFound;
