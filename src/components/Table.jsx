import React, { useState } from "react";

const Table = ({ data }) => {
  const [sortedData, setSortedData] = useState(data);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: null });
  const [searchTerm, setSearchTerm] = useState("");
  const handleSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    const sorted = [...sortedData].sort((a, b) => {
      const aValue = key.includes(".")
        ? key.split(".").reduce((acc, curr) => acc && acc[curr], a)
        : a[key];
      const bValue = key.includes(".")
        ? key.split(".").reduce((acc, curr) => acc && acc[curr], b)
        : b[key];

      if (typeof aValue === "string" && typeof bValue === "string") {
        if (aValue.toLowerCase() < bValue.toLowerCase())
          return direction === "asc" ? -1 : 1;
        if (aValue.toLowerCase() > bValue.toLowerCase())
          return direction === "asc" ? 1 : -1;
      } else {
        if (aValue < bValue) return direction === "asc" ? -1 : 1;
        if (aValue > bValue) return direction === "asc" ? 1 : -1;
      }
      return 0;
    });

    setSortedData(sorted);
    setSortConfig({ key, direction });
  };

  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = data.filter(
      (user) =>
        user.name.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term) ||
        user.company.name.toLowerCase().includes(term)
    );
    setSortedData(filtered);
  };

  const getSortIcon = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === "asc" ? "▲" : "▼";
    }
    return null;
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by name, email, or company"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <div className="bg-white rounded-lg shadow-lg">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-indigo-600 text-white">
              <th
                onClick={() => handleSort("name")}
                className="px-4 py-3 text-left cursor-pointer"
              >
                Name {getSortIcon("name")}
              </th>
              <th
                onClick={() => handleSort("email")}
                className="px-4 py-3 text-left cursor-pointer"
              >
                Email {getSortIcon("email")}
              </th>
              <th
                onClick={() => handleSort("company.name")}
                className="px-4 py-3 text-left cursor-pointer"
              >
                Company Name {getSortIcon("company.name")}
              </th>
              <th className="px-4 py-3 text-left cursor-pointer">Phone</th>
              <th className="px-4 py-3 text-left cursor-pointer">Website</th>
              <th className="px-4 py-3 text-left cursor-pointer">City</th>
              <th className="px-4 py-3 text-left cursor-pointer">Street</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.map((user, index) => (
              <tr
                key={user.id}
                className={`${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-gray-200 transition-colors`}
              >
                <td className="px-4 py-3">{user.name}</td>
                <td className="px-4 py-3">{user.email}</td>
                <td className="px-4 py-3">{user.company.name}</td>
                <td className="px-4 py-3">{user.phone}</td>
                <td className="px-4 py-3">{user.website}</td>
                <td className="px-4 py-3">{user.address.city}</td>
                <td className="px-4 py-3">{user.address.street}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
