import React from 'react';
import { Route, Routes } from 'react-router-dom'


import { ALayout, Dashboard } from '@/pages/Admin'
import { User, UEdit, Add } from '@/pages/Admin/User'
import { AProduct, AProductEdit, AProductAdd } from '@/pages/Admin/Product'
import { AArticle, AArticleEdit, AArticleAdd } from '@/pages/Admin/Article'

import Error from '@/_utils/Error'

const AdminRouter = () => {
    return (
        <Routes>

            <Route element={<ALayout/>}>
                {/* Permet de faire en sorte de tomber sur le dashboard dans /admin au lieu de /admin/dashboard  */}
                <Route index element={<Dashboard/>}/>

                <Route path='dashboard' element={<Dashboard/>}/>
                <Route path='user'>
                    <Route path='index' element={<User/>}/>
                    <Route path='edit/:uid' element={<UEdit/>}/>
                    <Route path='Add' element={<Add/>}/>
                </Route>
                <Route path='product'>
                    <Route path='index' element={<AProduct/>}/>
                    <Route path='edit/:productId' element={<AProductEdit/>}/>
                    <Route path='Add' element={<AProductAdd/>}/>
                </Route>
                <Route path='article'>
                    <Route path="index" element={<AArticle />} />
                    <Route path="add" element={<AArticleAdd />} />
                    <Route path="edit/:articleId" element={<AArticleEdit />} />
                </Route>
                
                <Route path='*' element={<Error/>}/>
            
            </Route>

        </Routes>
    );
};

export default AdminRouter;