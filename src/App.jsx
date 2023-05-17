import { useEffect, useState } from "react";
import LocationService from "./services/LocationService";
import Location from "./components/Location/Location";
import ResidentInfo from "./components/ResidentInfo/ResidentInfo";
import SuggestionList from "./components/SuggestionList/SuggestionList";
import "./App.css";

function App() {
  const [location, setLocation] = useState(null);
  const [residentIds, setResidentIds] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState("");
  const [loading, setLoading] = useState(true); // Estado para indicar si se está cargando la información

  useEffect(() => {
    const fetchRandomLocation = async () => {
      try {
        let locationData = null;
        let residentIds = [];

        while (residentIds.length < 5) {
          locationData = await LocationService.getRandomLocation();
          residentIds = locationData.residents.map((residentUrl) =>
            residentUrl.split("/").pop()
          );
        }
        setLocation(locationData);
        setResidentIds(residentIds);
        setLoading(false); // Termina la carga de información
      } catch (error) {
        console.error("Error fetching random location:", error);
        setLoading(false); // Termina la carga de información en caso de error
      }
    };

    fetchRandomLocation();
  }, []);

  const handleSearch = async () => {
    // Resto del código...

    setLoading(true); // Inicia la carga de información al realizar la búsqueda

    if (searchTerm) {
      try {
        const response = await LocationService.searchLocationsByName(
          searchTerm
        );
        const locationData = response.results[0];
        setLocation(locationData);
        setResidentIds(
          locationData.residents.map((residentUrl) =>
            residentUrl.split("/").pop()
          )
        );
        setSelectedSuggestion("");
        setSearchTerm("");
        setSuggestions([]);
        setLoading(false); // Termina la carga de información
      } catch (error) {
        console.error("Error fetching location data:", error);
        setLoading(false); // Termina la carga de información en caso de error
      }
    }
  };

  const handleSearchInputChange = async (event) => {
    const value = event.target.value;
    setSearchTerm(value);

    if (value) {
      try {
        const response = await LocationService.searchLocationsByName(value);
        const suggestions = response.results.map((location) => location.name);
        setSuggestions(suggestions);
      } catch (error) {
        console.error("Error fetching location suggestions:", error);
      }
    } else {
      setSuggestions([]); // Limpiar las sugerencias cuando el campo de búsqueda está vacío
    }
  };

  const handleSuggestionClick = async (suggestion) => {
    console.log("Sugerencia seleccionada:", suggestion);

    try {
      const response = await LocationService.searchLocationsByName(suggestion);
      const locationData = response.results[0];
      setLocation(locationData);
      setResidentIds(
        locationData.residents.map((residentUrl) =>
          residentUrl.split("/").pop()
        )
      );
      setSelectedSuggestion(suggestion); // Establecer la sugerencia seleccionada
      setSearchTerm(""); // Reiniciar el término de búsqueda
      setSuggestions([]); // Limpiar las sugerencias
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  return (
    <>
       <header className="header__container">
        <div className="container__tittle">
          <h1 className="app__tittle">RICK AND MORTY</h1>
        </div>
        <div className="search-container">
          <input
            className="search__text"
            type="text"
            value={searchTerm}
            onChange={handleSearchInputChange}
            placeholder="Search locations by name..."
          />
          <button className="button__search" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="suggestions-list">
          <SuggestionList
            suggestions={suggestions}
            handleSuggestionClick={handleSuggestionClick}
          />
        </div>
      </header>
      <section className="dimension__details">
        {loading ? (
          <p>Loading location...</p> // Pantalla de carga mientras se obtiene la ubicación
        ) : (
          location && (
            <Location
              name={location.name}
              type={location.type}
              dimension={location.dimension}
              residentCount={location.residents.length}
            />
          )
        )}
      </section>
      <section>
        <div className="residents__container">
          {residentIds.map((residentId) => (
            <ResidentInfo
              key={residentId}
              residentUrl={`https://rickandmortyapi.com/api/character/${residentId}`}
            />
          ))}
        </div>
      </section>
    </>
  );
}

export default App;
