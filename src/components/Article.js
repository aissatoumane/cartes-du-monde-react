import axios from 'axios';
import React, { useState } from 'react';

const Article = ({ article }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState("");

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

    const handleEdit = () => {
        /* le rôle de la fonction ci-dessous est de gérer l'édition */
        const data = {
            author: article.author,
            content: editContent ? editContent : article.content,
            /* ici, il faut contrôler que le commentaire a bien été modifié */
            date: article.date,
            updatedDate: Date.now() /* correspond à la date à laquelle l'article a été MAJ.
            /!\ elle n'apparaitra pas dans le projet mais sera stockée dans la BDD
            */
        };
        axios.put("http://localhost:3004/articles/" + article.id, data).then(() => {
            setIsEditing(false);
        }); 
        /* on ajoute l'ID de l'article pour savoir de qui est l'article 
        data = informations à afficher issues de la variable data
        */
    };

    const handleDelete = () => {
        axios.delete("http://localhost:3004/articles/" + article.id)
    }

    return (
        <div 
        className="article"
        style={{ background: isEditing ? "#f3feff" : "white" }}
        >
            <div className="card-header">
                <h3> {article.author} </h3>
                <em> Posté le {dateFormatter(article.date)} </em>
            </div>
                {isEditing ? (
                    <textarea 
                    defaultValue={editContent ? editContent : article.content} /* si l'utilisateur a fait plusieurs modifications, on affiche la modification la plus récente */
                    autoFocus 
                    onChange={(e) => setEditContent(e.target.value)}></textarea> /* ici, le nouveau commentaire est stocké grâce à setEditContent */
                ) : (
                    <p> {editContent ? editContent : article.content} </p>
                )}
                {/* on affiche du texte de manière conditionnelle */}
            <div className="btn-container">
                {isEditing ? (
                    <button onClick={() => handleEdit()}>Valider</button> /* si on est en train d'éditer, on propose à l'utilisateur de valider */ ) : (
                    <button onClick={() => setIsEditing(true)}> Modifier </button>)}
                <button onClick={() => {
                    if(window.confirm("Êtes-vous sûr(e) de vouloir supprimer cet article ?")) {
                        handleDelete();
                    }
                }}> Supprimer </button>
                </div>
        </div>
    );
};

export default Article;