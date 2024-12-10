import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../components/Table";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-200 p-4">
      <h1 className="text-4xl font-bold mb-4 text-indigo-600 text-center">
        User Management Dashboard
      </h1>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <Table data={users} />
        </div>
      )}
    </div>
  );
};

export default UserList;
