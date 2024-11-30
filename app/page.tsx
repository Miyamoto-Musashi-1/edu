"use client";
import { useState, useEffect } from "react";
import requestUtil from "../src/request";
import type { User } from "../src/types";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await requestUtil("/users");
      const json = await response.json();
      setUsers(json);
    } catch (error) {
      console.error(error);
    }
  };

  const createUser = async () => {
    if (!userName) {
      return alert("Please enter your name");
    }

    try {
      const response = await requestUtil("/users", {
        method: "POST",
        body: JSON.stringify({
          name: userName,
        }),
      });

      await response.json();
      setUserName("");
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteUser = async (user: User) => {
    try {
      await requestUtil(`/users/${user.id}`, {
        method: "DELETE",
      });
      fetchUsers();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
      </div>
      <div className="pb-4">
        <form id="createUserForm">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              value={userName}
              onChange={(event) => {
                setUserName(event.target.value);
              }}
              type="text"
              id="userName"
              name="userName"
              className="w-full px-3 py-2 border rounded shadow-sm focus:outline-none focus:ring focus:border-blue-300"
              placeholder="Enter user name"
              required
            />
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-200"
              onClick={(e) => {
                e.preventDefault();
                createUser();
              }}
            >
              Create new user
            </button>
          </div>
        </form>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full text-sm text-gray-600">
          <thead className="bg-gray-200 text-gray-800 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">ID</th>
              <th className="px-6 py-3 text-left">Name</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr className="border-t" key={user.id}>
                <td className="px-6 py-4">{user.id}</td>
                <td className="px-6 py-4">{user.name}</td>
                <td className="px-6 py-4 text-right">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition duration-200"
                    onClick={() => deleteUser(user)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
