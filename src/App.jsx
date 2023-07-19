import React from "react";

import { Distancia } from "./assets/Components/Context/Distancia/Distancias";

import "./index.css"
//import "./App.css"
import Map from "./assets/Components/Map";
// import Anuncios from "./assets/Components/Anuncios/Anuncios";

export default function App() {

  return (
   <>
    <Distancia>
    <div className="container-aap">
    <Map></Map>
    </div>
    </Distancia>
    {/* <Anuncios/> */}
   </>
  );
}