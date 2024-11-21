import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { articleService } from '@/_services';

const AArticleEdit = () => {
    const [article, setArticle] = useState({ title: '', description: '' });
    const [errors, setErrors] = useState({});
    const flag = useRef(false);
    const navigate = useNavigate();
    const { articleId } = useParams();

    const onChange = (e) => {
        setArticle({
            ...article,
            [e.target.name]: e.target.value
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!article.title) newErrors.title = 'Le titre est requis.';
        if (!article.description) newErrors.description = 'La description est requise.';
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            articleService.updateArticle(article)
                .then(() => navigate('/admin/article/index'))
                .catch(err => console.log(err));
        }
    };

    useEffect(() => {
        if (flag.current === false) {
            articleService.getArticle(articleId)
                .then(res => setArticle(res.data.data))
                .catch(err => console.log(err));
            flag.current = true;
        }
    }, [articleId]);

    return (
        <div className='AArticleEdit'>
            <h2>Modifier un article</h2>
            <form onSubmit={onSubmit}>
                <div className='group'>
                    <label htmlFor='title'>Titre</label>
                    <input 
                        type='text' 
                        name='title' 
                        id='title' 
                        value={article.title || ''} 
                        onChange={onChange} 
                    />
                    {errors.title && <p className="error">{errors.title}</p>}
                </div>

                <div className='group'>
                    <label htmlFor='description'>Description</label>
                    <textarea 
                        name='description' 
                        id='description' 
                        value={article.description || ''} 
                        onChange={onChange}>
                    </textarea>
                    {errors.description && <p className="error">{errors.description}</p>}
                </div>

                <div className='group'>
                    <button type='submit'>Modifier</button>
                </div>
            </form>
        </div>
    );
};

export default AArticleEdit;
