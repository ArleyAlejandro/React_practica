import React from "react";

const UserDetails = ({ userDetailsRef }) => {
  const user = userDetailsRef.current; // Obtén los datos del usuario desde la referencia

  if (!user) {
    return <p>No user selected</p>;
  }

  return (
    <div>
      <h1>User Details</h1>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>
      <p>
        <strong>City:</strong> {user.address.city}
      </p>
      <p>
        <strong>Comment:</strong> {user.comment}
      </p>
    </div>
  );
};

export default UserDetails;