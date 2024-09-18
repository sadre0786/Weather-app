import { useState } from "react";
import axios from "axios";
import cloudy from "/cloudy.png";
import foggy from "/foggy.png";
import rainy from "/rainy.png";
import snowy from "/snowy.png";
import sunny from "/sunny.png";
import error from "/error.png";

function App() {
  const [city, setCity] = useState("");
  const [Data, setData] = useState(null); // Set to null initially
  const [err, setErr] = useState("");
  const key = "76e90c2bdbd14667e80072f0614dc322";

  const handleCity = (e) => {
    setCity(e.target.value);
  };

  const getWeather = async () => {
    if (city === "") {
      setErr("Enter city name");
      setData(null)
      return;
    }

    
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`
      );
      setData(response);
      setErr(""); // Clear any previous error
    } catch (error) {
      console.log(error);
       if (error.response && error.response.status === 404) {
        setErr("City not found"); // Handle 404 error
        setData(null); // Clear data on error
      } else {
        setErr("Something went wrong");
      }
    }

    setCity("");
  };

  return (
    <>
      <div className="sm:p-0 p-4">
        <div className="grid justify-center card shadow-lg">
          <h1 className="text-center animate-bounce sm:text-5xl text-3xl mb-4 font-semibold">
            Weather App
          </h1>
          <div className="inputs flex justify-center align-middle">
            <input
              className="shadow-lg shadow-blue-100"
              value={city}
              type="text"
              onChange={handleCity}
            />
            <button className="shadow-lg shadow-blue-100" onClick={getWeather}>
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>

          {/* Display error message */}
          {err ? (
            <div className="flex justify-center items-center flex-col">
              <h2 className=" sm:text-4xl text-3xl text-center font-bold mt-7 text-red-800">
                {err}
              </h2>
              <div className="sm:h-[250px] h-[200px] sm:w-[250px] w-[200px] mt-4">
                <img className="h-full object-contain w-full" src={error} alt="" />
              </div>
            </div>
          ) : null}

          {/* Display weather data if available */}
          {Data && Data.data.weather ? (
            <div className="flex justify-center items-center flex-col">
              <h2 className=" sm:text-4xl text-3xl text-center font-bold mt-4 text-gray-800">
                {Data.data.name}
              </h2>

              <div className="sm:h-[250px] h-[200px] sm:w-[250px] w-[200px] mt-4">
                {Data.data.weather[0].description === "haze" && Data.data.main.temp >= 4 ? (
                  <img className="h-full object-contain w-full" src={foggy} alt="" />
                ) : null}

                {Data.data.weather[0].description === "broken clouds" && Data.data.main.temp >= 4 ? (
                  <img className="h-full object-contain w-full" src={cloudy} alt="" />
                ) : null}

                {Data.data.weather[0].description === "clear sky" && Data.data.main.temp >= 4 ? (
                  <img className="h-full object-contain w-full" src={sunny} alt="" />
                ) : null}

                {Data.data.weather[0].description === "overcast clouds" && Data.data.main.temp >= 4 ? (
                  <img className="h-full object-contain w-full" src={rainy} alt="" />
                ) : null}

                {Data.data.weather[0].description === "Rain" && Data.data.main.temp >= 4 ? (
                  <img className="h-full object-contain w-full" src={rainy} alt="" />
                ) : null}

                {Data.data.weather[0].description === "few clouds" && Data.data.main.temp >= 4 ? (
                  <img className="h-full object-contain w-full" src={cloudy} alt="" />
                ) : null}

                {Data.data.main.temp <= 4 ? (
                  <img className="h-full object-contain w-full" src={snowy} alt="" />
                ) : null}

                {/* Fallback image for unknown conditions */}
                {[
                  "few clouds",
                  "haze",
                  "overcast clouds",
                  "clear sky",
                  "broken clouds",
                  "Rain"
                ].includes(Data.data.weather[0].description) ? null : (
                  <img className="h-full object-contain w-full" src={cloudy} alt="" />
                )}
              </div>

              <h2 className=" sm:text-5xl text-4xl text-center font-extrabold mt-7 text-gray-800">
                {Math.floor(Data.data.main.temp)}°C
              </h2>
              <h2 className=" sm:text-3xl text-4xl text-center font-bold mt-7 text-gray-800">
                {Data.data.weather[0].description}
              </h2>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
}

export default App;
