import Axios from './caller.service';

const getAllArticles = () => {
    return Axios.get('/articles');
};

const getArticle = (id) => {
    return Axios.get(`/articles/${id}`);
};

const addArticle = (article) => {
    return Axios.put('/articles', article);
};

const updateArticle = (article) => {
    return Axios.patch(`/articles/${article.id}`, article); // PATCH au lieu de PUT pour la mise à jour
};

const deleteArticle = (id) => {
    return Axios.delete(`/articles/${id}`);
};

export const articleService = {
    getAllArticles,
    getArticle,
    addArticle,
    updateArticle,
    deleteArticle,
};
