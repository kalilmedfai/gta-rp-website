import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Container } from 'react-bootstrap';
import { articleService } from '@/_services';

const AArticle = () => {
    const [articles, setArticles] = useState([]);
    const flag = useRef(false);

    useEffect(() => {
        if (flag.current === false) {
            // Récupération des articles
            articleService.getAllArticles()
                .then(res => {
                    setArticles(res.data.data);
                })
                .catch(err => console.log(err));
        }
        return () => (flag.current = true);
    }, []);

    const deleteArticle = (articleId) => {
        articleService.deleteArticle(articleId)
            .then(() => {
                setArticles(current => current.filter(article => article.id !== articleId));
            })
            .catch(err => console.log(err));
    };

    return (
        <Container fluid>
            <h2 className="my-4">Liste des articles</h2>
            <div className="table-responsive-container">
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Titre</th>
                            <th>Description</th>
                            <th>Date de création</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {articles.map(article => (
                            <tr key={article.id}>
                                <td>{article.id}</td>
                                <td>{article.title}</td>
                                <td>{article.description}</td>
                                <td>{new Date(article.createdAt).toLocaleDateString()}</td>
                                <td>
                                    <Link to={`/admin/article/edit/${article.id}`} className="btn btn-primary btn-sm mx-1">Modifier</Link>
                                    <button className="btn btn-danger btn-sm mx-1" onClick={() => deleteArticle(article.id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};

export default AArticle;
