'use client';

import Link from 'next/link';
import { Flame, Sparkles, Clock } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 px-6 py-12">
      

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        <Link
          href="/top-users"
          className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition duration-300 flex flex-col items-center text-center"
        >
          <Flame className="text-orange-500 w-12 h-12 mb-4" />
          <h2 className="text-xl font-bold text-gray-900">Top Users</h2>
          <p className="text-gray-600">View most active users</p>
        </Link>

        <Link
          href="/posts"
          className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition duration-300 flex flex-col items-center text-center"
        >
          <Sparkles className="text-blue-600 w-12 h-12 mb-4" />
          <h2 className="text-xl font-bold text-gray-900">Trending Posts</h2>
          <p className="text-gray-600">Explore most discussed posts</p>
        </Link>

        <Link
          href="/feed"
          className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition duration-300 flex flex-col items-center text-center"
        >
          <Clock className="text-green-600 w-12 h-12 mb-4" />
          <h2 className="text-xl font-bold text-gray-900">Feed</h2>
          <p className="text-gray-600">See latest posts in real-time</p>
        </Link>
      </div>
    </div>
  );
}
