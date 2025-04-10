import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./UserList.module.scss";

const UserList = ({ userDetailsRef }) => {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [pendingComments, setPendingComments] = useState({});
  const [savedComments, setSavedComments] = useState({});
  const navigate = useNavigate(); // Hook para redirigir

  const loadUsers = () => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching data");
        }
        return response.json();
      })
      .then((data) => {
        setUsers(data);
        setAllUsers(data);
      })
      .catch((error) => {
        console.error("Request error:", error);
      });
    console.log("users loaded");
  };

  const handleChange = (e, id) => {
    setPendingComments({
      ...pendingComments,
      [id]: e.target.value,
    });
  };

  const saveComment = (id) => {
    if (!pendingComments[id]) return;
    setSavedComments({
      ...savedComments,
      [id]: pendingComments[id],
    });
    setPendingComments({ ...pendingComments, [id]: "" });
    console.log("comment saved");
  };

  const deleteAllComments = () => {
    setSavedComments({});
    console.log("All comments deleted");
  };

  const viewDetails = (user) => {
    // Guarda los datos del usuario seleccionado en la referencia
    userDetailsRef.current = {
      ...user,
      comment: savedComments[user.id] || "No comments",
    };
    navigate("/Details"); // Redirige a la página de detalles
  };

  const filterUsers = (e) => {
    const searchText = e.target.value.toLowerCase();
    if (searchText === "") {
      setUsers(allUsers);
    } else {
      const filteredUsers = allUsers.filter((user) =>
        user.name.toLowerCase().startsWith(searchText)
      );
      setUsers(filteredUsers);
    }
  };

  return (
    <div className={styles.container}>
      <h1>User List</h1>
      <button onClick={loadUsers}>Load users</button>
      <button onClick={deleteAllComments}>Delete All Comments</button>
      <label className={styles.filterUser} htmlFor="userFilter">
        Filtra por nombre:
      </label>
      <input type="text" name="userFilter" onChange={filterUsers} />
      <div>
        {users.map((user) => (
          <ul className={styles.userCard} key={user.id}>
            <li>
              <strong>Name:</strong> {user.name}
            </li>
            <li>
              <strong>Email:</strong> {user.email}
            </li>
            <li>
              <strong>City:</strong> {user.address.city}
            </li>
            <label htmlFor={`input-${user.id}`}>Add comment:</label>
            <input
              type="text"
              id={`input-${user.id}`}
              value={pendingComments[user.id] || ""}
              onChange={(e) => handleChange(e, user.id)}
            />
            <button onClick={() => saveComment(user.id)}>Save comment</button>
            <button onClick={() => viewDetails(user)}>View Details</button>
          </ul>
        ))}
      </div>
    </div>
  );
};

export default UserList;