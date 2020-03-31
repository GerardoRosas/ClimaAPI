import React, {Fragment, useState, useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';

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
    // eslint-disable-next-line
  }, [consultar]);

  let componente;
      if(error){
        componente = <Error mensaje="No hay resultados" />
      }else{ 
          componente = <Clima resultado={resultado} />
      }
  

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
                {componente}
              </div>
            </div>
        </div>
      </div>

    </Fragment>
  );
}

export default App;
