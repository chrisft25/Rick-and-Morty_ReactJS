import React, { useEffect, useState } from "react";
import FiveFirst from "./FiveFirst.jsx";
import ListaFavoritos from "./favoritos.jsx";

const ContentComponent = ({ id = {}, setId = {} }) => {
  const [personaje, setPersonaje] = useState([]);
  const [favoritos, setFavoritos] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("rickMorty") !== null) {
      setFavoritos(JSON.parse(localStorage.getItem("rickMorty")));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem("rickMorty", JSON.stringify(favoritos));
  }, [favoritos]);

  useEffect(() => {
    obtenerPersonajes(id);
  }, [id]);

  function cambiarUp() {
    setId(parseInt(id, 10) + 1);
    obtenerPersonajes(parseInt(id, 10));
  }
  function cambiarDown() {
    if (parseInt(id, 10) > 1) {
      setId(parseInt(id, 10) - 1);
      obtenerPersonajes(parseInt(id, 10));
    } else {
      obtenerPersonajes(parseInt(id, 10));
    }
  }

  const handleClick = (e) => {
    let datos = favoritos.filter((fav) => fav.id === personaje.id);
    if (datos.length === 0 && favoritos.length < 5) {
      setFavoritos([...favoritos, { id: personaje.id, name: personaje.name }]);
    } else {
      alert(
        "No puedes agregar dos veces el mismo personaje y maximo cinco favoritos."
      );
    }
  };

  const obtenerPersonajes = async (id) => {
    const datos = await fetch(`${process.env.REACT_APP_API_URL}/character/${id}`);
    const datosPersonaje = await datos.json();
    setPersonaje(datosPersonaje);
  };

  return (
    <>
      <div className="container">
        <div className="card selectCard">
          <img src={personaje.image} alt=""></img>
          <h1>{personaje.name}</h1>
          <div className="selectInfo">
            <h2>{personaje.species}</h2>
            <p>Especie</p>
            <h2>{personaje.gender}</h2>
            <p>Genero</p>
            <h2>{personaje.status}</h2>
            <p>Estado</p>
            <button onClick={cambiarDown} className="btnChangePerson left">
              <i className="fas fa-arrow-left"></i>
            </button>
            <button onClick={cambiarUp} className="btnChangePerson right">
              <i className="fas fa-arrow-right"></i>
            </button>
          </div>
          <i onClick={handleClick} className="far like fa-thumbs-up"></i>
        </div>

        <div className="card mainCard">
          <h2 className="encabezado">Personajes Principales</h2>
          <FiveFirst />
          <ListaFavoritos favoritos={favoritos} setFavoritos={setFavoritos} />
        </div>
      </div>
    </>
  );
};

export default ContentComponent;
