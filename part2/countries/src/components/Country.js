import React from "react";
import "../App.css";

const Country = ({ country }) => {

    // for (const key in country.languages) {
    //     return <li key={key}>{country.languages[key]}</li>;
    // };

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
        </div>
    );
};

export default Country;