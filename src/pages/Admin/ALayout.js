import React from 'react';
import { Outlet } from 'react-router-dom';

const ALayout = () => {
    return (
        <div className='ALayout'>
            Layout Admin
            <Outlet/>
        </div>
    );
};

export default ALayout;