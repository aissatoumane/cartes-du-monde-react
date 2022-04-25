import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Article from '../components/Article';
import Logo from '../components/Logo';
import Navigation from '../components/Navigation';

const Blog = () => {
    const [blogData, setBlogData] = useState([]);
    /* cela fait partie des bonnes pratiques de sépcifier le type de données attendues avec useState */
    const [author, setAuthor] = useState("");
    const [content, setContent] = useState("");
    const [error, setError] = useState(false);

    const getData = () => {
            axios
            .get("http://localhost:3004/articles")
            .then((res) => setBlogData(res.data));
        };

    useEffect(() => getData(), []);

    /* ici, on veut que quand le composant est en train d'être appelé, il soit "joué" 
        [] = callback, très important !
    */ 

    const handleSubmit = (e) => {
        e.preventDefault();
        /* preventDefault : va empêcher le formulaire d'avoir son comportement par défaut aka recharger la page */

        if(content.length < 140) {
             setError(true);
        } else {
            axios.post("http://localhost:3004/articles", {
                author,
                content,
                date: Date.now()
            });
            setError(false);
            setAuthor("");
            setContent("");
            getData();
        }
        /* ici on vérifie que le contenu est bien supérieur à 14O caractères avant de valider le formulaire 
            - s'il est inférieur à 140 caractères, message d'erreur (voir ligne 58) 
            - s'il est supérieur à 140 caractères :
            .post(URL où poster le commentaire, objet des données à passer à l'URL)
        */
        
        /* author / content = author: author / content: content
        */

        /* setAuthor / setContent = variables créées pour vider le contenu des balises. Pour que cela fonctionne, il faut attribuer des values "author" et "content" à l'<input name> et au <textarea content> (voir lignes 68 & 77)
        */

        /* rôle de getData à la ligne 41 : actualiser le useState de blogData */
    }
        

    return (
        <div className="blog-container">
            <Logo />
            <Navigation />
            <h1> Blog </h1>

            <form onSubmit={(e) => handleSubmit(e)}>
            {/* handleSubmit : se charge de vérifier si les conditions ont été respectées et, le cas échéants, d'envoyer un message d'erreur ex : Votre texte doit contenir au moins 140 caractères */}
                <input 
                type="text" 
                placeholder='Nom' 
                onChange={(e) => setAuthor(e.target.value)} 
                value={author}
                />

                <textarea 
                style={{ border: error ? "1px solid red" : "1px solid #61dafb" }}
                /* la ligne ci-dessus applique un style conditionnel à la textarea (elle devient rouge quand on a - de 140 caractères et reprend sa couleur normale dans le cas contraire) */
                placeholder='Message' 
                onChange={(e) => setContent(e.target.value)}
                value={content}
                ></textarea>
                {error && <p> Veuillez écrire un minimum de 140 caractères </p>}
                {/* la ligne ci-dessus veut dire que si j'ai une erreur, je renvoie le <p> */}

                <input 
                type="submit" 
                value="Envoyer" 
                />
                {/* input value est la SEULE MANIÈRE DE MODIFIER OU RÉCUPÉRER DES DONNÉES D'UN INPUT */}
            </form>
            <ul>
                {blogData
                .sort((a, b) => b.date - a.date)
                /* ligne ci-dessus : tri des articles du plus récent au plus ancien */
                .map((article) => (
                    <Article key={article.id} article={article} />
                /* affichage des articles */
                ))};
            </ul>
        </div>
    );
};

export default Blog;

