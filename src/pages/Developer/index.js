import "./Developer.scss";
import { Link } from "react-router-dom";
import { checkout } from "../../services/subscriptions";
import { useEffect,useState } from "react";

function Developer() {
    const [linkStripe, setlinkStripe] = useState([]);

    useEffect(() => {
        const handleCheckout=async ()=>{
            const checkOutURL = await checkout()
            console.log('checkOutURL: '+ JSON.stringify(checkOutURL))
            setlinkStripe(checkOutURL.session.url)
    
        }
        handleCheckout();
      },);

  return (  
        <main role="main">

            <section class="jumbotron text-center">
                <div class="container">
                <h1 class="jumbotron-heading">Tameme API</h1>
                <p class="lead text-muted">Tameme una palabra que proviene del náhuatl, que significa cargar. Los tamemes eran los encargados de cumplir con las entregas, ahora solo consúmela.</p>
                <p>
                    <a href={linkStripe} class="btn btn-primary my-2">Usar Tameme</a>
                    {/* <a href="#" class="btn btn-secondary my-2">Secondary action</a> */}
                </p>
                </div>
            </section>

            <div class="album py-5 bg-light">
                <div class="container">

                <div class="row">
                    <div class="col-md-4">
                    <div class="card mb-4 box-shadow">
                        <img class="card-img-top" src="https://upload.wikimedia.org/wikipedia/commons/9/9a/Gull_portrait_ca_usa.jpg" alt="Card image cap"/>
                        <div class="card-body">
                        <p class="card-text">Las APIs simplifican la forma en que los desarrolladores integran los componentes de la aplicación en una arquitectura existente, lo que facilita la creación de aplicaciones y microservicios con mayor rapidez.</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                            <button type="button" title="Proximamente!" class="btn btn-sm btn-outline-secondary addMore">Ver</button>
                            </div>
                            <small class="text-muted">Próximamente</small>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="col-md-4">
                    <div class="card mb-4 box-shadow">
                        <img class="card-img-top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png" alt="Card image cap"/>
                        <div class="card-body">
                        <p class="card-text">Reúne información sobre cada ingrediente de tu platillo, documentación y un fragmento de código para ayudarlo a implementar el código en tu aplicación.</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                            <button type="button" title="Proximamente!" class="btn btn-sm btn-outline-secondary addMore">Ver</button>
                            </div>
                            <small class="text-muted">Próximamente</small>
                        </div>
                        </div>
                    </div>
                    </div>
                    <div class="col-md-4">
                    <div class="card mb-4 box-shadow">
                        <img class="card-img-top" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/1200px-Image_created_with_a_mobile_phone.png" alt="Card image cap"/>
                        <div class="card-body">
                        <p class="card-text">Ve la información de lo que usas y facturación para obtener un desglose de los gastos de API.</p>
                        <div class="d-flex justify-content-between align-items-center">
                            <div class="btn-group">
                            <button type="button" title="Proximamente!" class="btn btn-sm btn-outline-secondary addMore">Ver</button>
                            </div>
                            <small class="text-muted">Próximamente</small>
                        </div>
                        </div>
                    </div>
                    </div>
  
                </div>
                </div>
            </div>

            </main>
  );
}

export default Developer;
