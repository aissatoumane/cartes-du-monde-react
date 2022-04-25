import React, { useState } from 'react';

const Article = ({ article }) => {
    const [isEditing, setIsEditing] = useState(false);

    const dateFormatter = (date) => {
        let newDate = new Date(date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
            second: "numeric"
            /* paramètres de toLocaleDateString = 
        (langue et zone géographique, format de la date) */
        });
        return newDate;
    };

    return (
        <div className="article">
            <div className="card-header">
                <h3> {article.author} </h3>
                <em> Posté le {dateFormatter(article.date)} </em>
            </div>
                {isEditing ? (
                    <textarea defaultValue={article.content}> </textarea> 
                ) : (
                    <p> {article.content} </p>
                )}
                {/* on affiche du texte de manière conditionnelle */}
            <div className="btn-container">
                <button onClick={() => setIsEditing(true)}> Modifier </button>
                <button> Supprimer </button>
                </div>
        </div>
    );
};

export default Article;