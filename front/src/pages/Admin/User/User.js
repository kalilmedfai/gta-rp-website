import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { Table, Container } from 'react-bootstrap';
import { userService } from '@/_services';

import '@/components/admin/admin.css';

const User = () => {
    const [users, setUsers] = useState([]);
    const flag = useRef(false);

    useEffect(() => {
        if(flag.current === false){
            userService.getAllUsers()
                .then(res => {
                    setUsers(res.data.data);
                })
                .catch(err => console.log(err));
        }
        return () => flag.current = true;
    }, []);

    const delUser = (userId) => {
        userService.deleteUser(userId)
            .then(() => {
                setUsers((current) => current.filter(user => user.id !== userId));
            })
            .catch(err => console.log(err));
    };

    return (
        <Container fluid>
            <h2 className="my-4">Liste des utilisateurs</h2>
            {/* Conteneur pour permettre le défilement horizontal */}
            <div className="table-responsive-container">
                <Table striped bordered hover id="admin_body">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Pseudo</th>
                            <th>Email</th>
                            <th>Citizen ID</th>
                            <th>Date de création</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td>{user.id}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.citizenId}</td>
                                <td>{user.createdAt}</td>
                                <td>
                                    <Link to={`/admin/user/edit/${user.id}`} className="btn btn-primary btn-sm mx-1">Modifier</Link>
                                    <button className="btn btn-danger btn-sm mx-1" onClick={() => delUser(user.id)}>Supprimer</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </div>
        </Container>
    );
};

export default User;
