import React, { useState } from 'react';

const UserList = () => {
  const [usuarios, setUsuarios] = useState([]);

  const cargarUsuarios = () => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('Error al obtener los datos');
        }
        return respuesta.json();
      })
      .then((data) => {
        setUsuarios(data);
      })
      .catch((error) => {
        console.error('Error en la petición:', error);
      });
  };

  return (
    <div>
      <h1>Lista de Usuarios</h1>
      <button onClick={cargarUsuarios}>Cargar usuarios</button>
      <ul>
        {usuarios.map((user) => (
          <li key={user.id}>
            <strong>{user.name}</strong><br />
            {user.email} - {user.address.city}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
