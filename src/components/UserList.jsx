import React, { useState } from 'react';

const UserList = () => {
    const [usuarios, setUsuarios] = useState([]);
    const [inputs, setInputs] = useState({});
    const [comentariosGuardados, setComentariosGuardados] = useState({});

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

    const manejarCambio = (e, id) => {
        setInputs({
            ...inputs,
            [id]: e.target.value
        });
    };

    const guardarComentario = (id) => {
        if (!inputs[id]) return; // si está vacío no guardamos nada
        setComentariosGuardados({
            ...comentariosGuardados,
            [id]: inputs[id]
        });
        alert(`Comentario para el usuario ${id} guardado: ${inputs[id]}`);
        setInputs({ ...inputs, [id]: '' }); // limpiar el input después de guardar
    };

    return (
        <div>
            <h1>Lista de Usuarios</h1>
            <button onClick={cargarUsuarios}>Cargar usuarios</button>
            <div>
                {usuarios.map((user) => (
                    <ul key={user.id}>
                        <li><strong>Nombre:</strong> {user.name}</li>
                        <li><strong>Email:</strong> {user.email}</li>
                        <li><strong>Ciudad:</strong> {user.address.city}</li>

                        <label htmlFor={`input-${user.id}`}>Añadir comentario:</label>
                        <input
                            type="text"
                            id={`input-${user.id}`}
                            value={inputs[user.id] || ''}
                            onChange={(e) => manejarCambio(e, user.id)}
                        />
                        <button onClick={() => guardarComentario(user.id)}>Guardar comentario</button>

                        {comentariosGuardados[user.id] && (
                            <p><strong>Comentario guardado:</strong> {comentariosGuardados[user.id]}</p>
                        )}
                    </ul>
                ))}
            </div>
        </div>
    );
};

export default UserList;
