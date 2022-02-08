import React, {Fragment, useState, useEffect} from 'react';
import Formulario from './components/Formulario';
import Header from './components/Header';

function App() {

  const [busqueda, setBusqueda] = useState({
    ciudad: '',
    pais: ''
  });
  // La funcion de este state es para que le useEffect le ejecute al momento de realizar el submit no por cada letra que uno digite estilo onChange
  
  const [consultar, setConsultar] = useState(false);

  const {ciudad, pais} = busqueda;
  
  useEffect(() => {
    console.log(ciudad, pais);
  }, [consultar]);
  
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
            2
          </div>
        </div>
      </div>
      </div>
    </Fragment>
  );
}

export default App;
