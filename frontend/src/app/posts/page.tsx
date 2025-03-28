'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface Post {
  id: number;
  userid: number;
  content: string;
  user_id: string;
  user_name: string;
  comment_count: number;
}

export default function TrendingPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:8000/posts?type=popular');
        setPosts(response.data);
      } catch (error) {
        console.error('Error fetching trending posts:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrending();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 via-pink-200 to-red-200 p-6 sm:p-8">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-3xl p-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-center mb-8 text-purple-900">
          Trending Posts
        </h1>

        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="text-center text-gray-600 mt-10">
            <p className="text-lg font-medium">
              No posts available at the moment.
            </p>
            <p className="text-sm mt-1">
              Please verify your <strong className="text-purple-700">AUTH_TOKEN</strong>.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-purple-100 rounded-2xl p-6 hover:bg-purple-200 transition-colors"
              >
                <h2 className="text-lg font-semibold text-gray-800">
                  {post.content || 'Untitled Post'}
                </h2>
                <p className="text-sm text-gray-600 mt-2">
                  by {post.user_name || 'Anonymous'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {post.comment_count} comments
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
