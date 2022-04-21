import React from 'react';

const Card = ({ country }) => {
    console.log(country);
    /* ({ country }) permet d'accéder à la donnée qu'on veut */
    return (
        <li className="card">
            <img src={country.flags.svg} alt={"drapeau " + country.translations.fra.common} />
            {/* le alt est affiché de manière dynamique */}
            <div className="infos">
                <h2> {country.translations.fra.common} </h2>
                <h4> { country.capital } </h4>
                <p>Pop. = { country.population.toLocaleString() } </p>
                {/* toLocaleString() = séparateur de millier */}
            </div>
        </li>
    );
};

export default Card;