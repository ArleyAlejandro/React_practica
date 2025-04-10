import React, { useState } from "react";
import styles from "./UserList.module.scss";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]); 
  const [pendingComments, setPendingComments] = useState({});
  const [savedComments, setSavedComments] = useState({});

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

  const cleanComments = () => {
    setSavedComments({});
    console.log("comments cleaned");
  };

  const filterUsers = (e) => {
    const searchText = e.target.value.toLowerCase();
    if (searchText === "") {
      setUsers(allUsers);
    } else {
      const filteredUsers = allUsers.filter((user) =>
        // user.name.toLowerCase().includes(searchText)
        user.name.toLowerCase().startsWith(searchText)
      );
      setUsers(filteredUsers);
    }
  };

  return (
    <div className={styles.container}>
      <h1>User List</h1>
      <button onClick={loadUsers}>Load users</button>
      <button onClick={cleanComments}>Clean comments</button>
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

            {savedComments[user.id] && (
              <p>
                <strong>Saved comment:</strong> {savedComments[user.id]}
              </p>
            )}
          </ul>
        ))}
      </div>
    </div>
  );
};

export default UserList;
