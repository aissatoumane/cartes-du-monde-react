import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Card from './Card';

const Countries = () => {
        /* le useEffect s'applique lorsque le composant est monté. [] = callback, mettre les données sous forme de tableau */

        /* intérêt de la méthode ci-dessus : vérifier qu'on récupère bien les données que l'on souhaite (ici, les données de l'API restcountries) 
            axios.get = va me chercher xx 
            then() = quand tu l'auras récupéré, montre le moi pour que je puisse en faire un console.log */

        /* une fois la data récupérée, on la stocke dans une variable en utilisant un useState 
        /!\ on ne peut pas modifier la variable directement ! il faut passer par setData 
        avantage de useState : les données se MAJ en temps réel
        */
    const [data, setData] = useState([]);
    const [rangeValue, setRangeValue] = useState(36);
    const [selectedRadio, setSelectedRadio] = useState("");
    const radios = ["Africa", "America", "Asia", "Europe", "Oceanie"];
    /* conseil : utiliser 12 car il est le multiple de beaucoup de nombres */

    useEffect(() => {
        axios
        .get("https://restcountries.com/v3.1/all")
        .then((res) => setData(res.data));
    }, [])


    return (
        <div className='countries'>
            <ul className="radio-container">
                        <input 
                        type="range" 
                        min="1" 
                        max="250" 
                        defaultValue={rangeValue} 
                        onChange={ (e) => setRangeValue(e.target.value) } />

                {radios.map((continent) => (
                    <li>
                        <input 
                        type="radio" 
                        id={continent} name="continentRadio" 
                        onChange={(e) => setSelectedRadio(e.target.id)}/>                        
                        <label htmlFor={continent}> {continent}</label>
                    </li>
                ))}
            </ul>
            {/* on donne une valeur par défaut à input -> à chaque changement, elle sera MAJ grâce à la récupération de l'évènement e */}

            {/* il est obligatoire de donner une key unique à chaque enfant d'une liste */}

            {/* pour qu'on ne puisse cocher qu'un élément, ajouter un name */}
            <ul>
                {data
                .slice(0, rangeValue)
                .map((country, index) => (
                        <Card key={index} country={country} />
                    ))
            /* la props débute à country
               country = nom de la donnée passée au composant enfant Card */

/* *************************************************** */
            /* slice : permet de limiter l'affichage à un certain nombre 
               ex : .slice(0, 5) = coupe à partir de 0 et ne garde que 5 éléments */
                }
            </ul>
        </div>
    );
};

export default Countries;