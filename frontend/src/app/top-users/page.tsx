'use client';

import { useEffect, useState } from "react";

interface User {
  user_name: string;
  post_count: number;
}

export default function TopUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const getInitials = (name: string) => {
    const words = name.split(' ');
    const initials = words.map(word => word[0]).join('');
    return initials.toUpperCase();
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await fetch("http://localhost:8000/users");
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.error("Failed to fetch top users:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 via-pink-200 to-red-200 p-6 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-3xl p-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-purple-900">
          Top 5 Active Users
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : users.length === 0 ? (
          <div className="text-center text-gray-600 mt-10">
            <p className="text-lg font-medium">
              No user data available right now.
            </p>
            <p className="text-sm mt-1">
              Please check your <strong className="text-purple-700">AUTH_TOKEN</strong> or try again later.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {users.map((user, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-purple-100 rounded-2xl hover:bg-purple-200 transition-colors"
              >
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-purple-500 text-white rounded-full flex items-center justify-center text-xl font-bold">
                    {getInitials(user.user_name)}
                  </div>
                  <div>
                    <h2 className="font-semibold text-lg text-gray-800">
                      {user.user_name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Posts: {user.post_count}
                    </p>
                  </div>
                </div>
                <div className="text-purple-600 font-bold text-lg">
                  #{index + 1}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
