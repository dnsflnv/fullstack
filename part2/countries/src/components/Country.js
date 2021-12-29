import React, { useEffect } from "react";
import axios from "axios";
import "../App.css";

const WEATHER_API_KEY = process.env.REACT_APP_API_KEY;

const Country = ({ country }) => {

    const query = 'https://api.openweathermap.org/data/2.5/weather?q=' + country.capital + '&appid=' + WEATHER_API_KEY;
    console.log(query);
    let weather;

    useEffect(() => {
        axios
            .get(query)
            .then(response => {
                weather = response.data;
                console.log(weather);
            })
    }, []);

    return (
        <div>
            <h1>{country.name.common}</h1>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h2>Languages</h2>
            <ul>
                {Object.entries(country.languages).map(([key, lng]) => <li key={key}>{lng}</li>)}
            </ul>
            <div className="flag">{country.flag}</div>
            <h2>Weather in {country.capital}</h2>
            <p>{weather.name}</p>

        </div>
    );
};

export default Country;