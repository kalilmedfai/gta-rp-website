import React from 'react';
import { Route, Routes } from 'react-router-dom'


import { ALayout, Dashboard } from '@/pages/Admin'

const AdminRouter = () => {
    return (
        <Routes>

            <Route element={<ALayout/>}>

                <Route path='/dashboard' element={<Dashboard/>}/>
            
            
            </Route>

        </Routes>
    );
};

export default AdminRouter;