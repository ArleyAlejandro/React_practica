import React, { useState } from "react";

function XML() {
  const [users, setUsers] = useState([]);

  const loadUsersFromXML = () => {
    fetch("users.xml") // Asegúrate de que el archivo XML esté en la carpeta `public`
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error fetching XML");
        }
        return response.text();
      })
      .then((xmlString) => {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlString, "application/xml");
        const userNodes = xmlDoc.getElementsByTagName("user");

        const users = Array.from(userNodes).map((userNode) => ({
          id: userNode.getElementsByTagName("id")[0].textContent,
          name: userNode.getElementsByTagName("name")[0].textContent,
          email: userNode.getElementsByTagName("email")[0].textContent,
          address: {
            city: userNode.getElementsByTagName("city")[0].textContent,
          },
        }));

        setUsers(users);
        console.log("Users loaded from XML:", users);
      })
      .catch((error) => {
        console.error("Error loading XML:", error);
      });
  };

  return (
    <div>
      <h1>XML User List</h1>
      <button onClick={loadUsersFromXML}>Load Users from XML</button>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <strong>Name:</strong> {user.name} <br />
            <strong>Email:</strong> {user.email} <br />
            <strong>City:</strong> {user.address.city}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default XML;