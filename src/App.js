import React, {Fragment, useState, useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';

function App() {

  //State del formulario
  const [busqueda, guardarBusqueda] = useState({
    cuidad: '',
    pais: ''
  });

  const [consultar, guardarConsultar] = useState(false);

  const [resultado, guardarResultado] = useState({});

  const [error, guardarError] = useState(false);

  const { cuidad, pais } = busqueda;

  useEffect(() => {
    const consultarAPI = async () => {
      if(consultar){
        const appID = 'b4de4c8bcf01812466292f51e7b0db88'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${cuidad},${pais}&appid=${appID}`

        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        guardarResultado(resultado);
        guardarConsultar(false);

        //Detecta si hubo errores
        if(resultado.cod === "404"){
          guardarError(true);
        }else{
          guardarError(false);
        }
      
      }
      
    }
    consultarAPI();
  }, [consultar]);

 

  return (
    <Fragment>
      <Header
          titulo = 'Clima React App'
      />
      <div className="contenedor-form">
        <div className="container">
            <div className="row">
              <div className="col m6 s12">
                <Formulario
                    busqueda={busqueda}
                    guardarBusqueda={guardarBusqueda}
                    guardarConsultar={guardarConsultar}
                />
              </div>
              <div className="col m6 s12">
                <Clima
                    resultado={resultado}
                />
              </div>
            </div>
        </div>
      </div>

    </Fragment>
  );
}

export default App;
