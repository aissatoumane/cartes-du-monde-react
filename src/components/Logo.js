import React from 'react';

const Logo = () => {
    return (
        <div className="logo">
            {/* les images importées depuis la balise img sont accessibles dans "public" 
            CE QUI VEUT DIRE QUE PAR DÉFAUT, LES BALISES IMG SONT RÉCUPÉRÉES DANS PUBLIC PAR REACT */}
            <img src="./logo192.png" alt="logo React" />
            <h3> Le monde de React </h3>
        </div>
    );
};

export default Logo;