import { useEffect, useState } from "react";
import ResidentService from "../../services/ResidentService";
import "./ResidentInfo.css";

const ResidentInfo = ({ residentUrl }) => {
  const [resident, setResident] = useState(null); // Estado para almacenar la información del residente

  useEffect(() => {
    const fetchResidentInfo = async () => {
      try {
        const residentData = await ResidentService.getResidentInfo(residentUrl); // Obtiene la información del residente utilizando el servicio ResidentService
        setResident(residentData); // Actualiza el estado con la información del residente
      } catch (error) {
        console.error("Error fetching resident info:", error); // Manejo de errores si ocurre un error al obtener la información del residente
      }
    };
    fetchResidentInfo(); // Carga la información del residente al montar el componente y cuando residentUrl cambie
  }, [residentUrl]);

  if (!resident) {
    // Mostrar indicador de carga mientras se carga la información del residente
    return <p>Loading resident info...</p>;
  }

  return (
    <div className="card__residents">
      <div className="container__img__status">
        <img
          className="card__residents__img"
          src={resident.image}
          alt={resident.name}
        />
        <p className="status__live">{resident.status}</p>
      </div>
      <div className="container__characteristics">
        <h3 className="residents__tittle">{resident.name}</h3>
        <hr />
        <p>
          <b>specie: </b> {resident.species}
        </p>
        <p>
          <b>Origin: </b> {resident.origin.name}
        </p>
        <p>
          <b>Episode count: </b> {resident.episode.length}
        </p>
      </div>
    </div>
  );
};

export default ResidentInfo;

