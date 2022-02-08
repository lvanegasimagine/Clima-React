import React, {Fragment, useState, useEffect} from 'react';
import Clima from './components/Clima';
import Error from './components/Error';
import Formulario from './components/Formulario';
import Header from './components/Header';

function App() {

  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: ''
  });
  const {ciudad, pais} = busqueda;

  const [resultado, setResultado] = useState({});

  const [error, setError] = useState(false);
  // La funcion de este state es para que le useEffect le ejecute al momento de realizar el submit no por cada letra que uno digite estilo onChange
  
  const [consultar, setConsultar] = useState(false);

  
  
  useEffect(() => {
    const consultarApi = async () => {

      if(consultar){
        const appId = '66deecc8ca9dba115c04ef04ccd4ccd2';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();
        setResultado(resultado);
        setConsultar(false);

        /// Detecta si hubo resultado correcto en la consulta

        if(resultado.cod === "404"){
          setError(true)
        }else{
          setError(false)
        }
      }


    }

    consultarApi()
  }, [consultar]);

  let componente;
  if(error) {
    componente = <Error mensaje="No hay resultados" />
  } else {
    componente = <Clima 
                    resultado={resultado}
                />
  }
  
  return (
    <Fragment>
      <Header titulo="Clima React App"/>
      <div className="contenedor-form">
      <div className="container">
        <div className="row">
          <div className="col m6 s12">
            <Formulario busqueda={busqueda} setBusqueda={setBusqueda} setConsultar={setConsultar} />
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
