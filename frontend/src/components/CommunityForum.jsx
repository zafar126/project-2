import React from "react";
import { Link } from "react-router-dom";
import { MessageCircle, Heart, User } from "lucide-react";

export default function CommunityForum() {
  const posts = [
    {
      id: 1,
      title: "Best natural remedies for a cold?",
      author: "Priya S.",
      replies: 12,
      likes: 5,
    },
    {
      id: 2,
      title: "My experience with a personalized diet plan",
      author: "Rohan V.",
      replies: 8,
      likes: 15,
    },
    {
      id: 3,
      title: "Tips for staying hydrated in summer",
      author: "Aisha K.",
      replies: 20,
      likes: 22,
    },
  ];

  return (
    <div className="min-h-screen p-4 pt-20 bg-gray-50 bg-[url('/public/bg-forum.jpg')] bg-cover bg-center">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Community Forum</h2>
        <div className="space-y-4">
          {posts.map((post) => (
            <div key={post.id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
              <h3 className="text-lg font-semibold text-blue-700 hover:underline">
                <Link to={`/forum/${post.id}`}>{post.title}</Link>
              </h3>
              <div className="flex items-center text-gray-600 text-sm mt-1">
                <User size={16} className="mr-1" />
                <span>{post.author}</span>
                <MessageCircle size={16} className="ml-4 mr-1" />
                <span>{post.replies} Replies</span>
                <Heart size={16} className="ml-4 mr-1" />
                <span>{post.likes} Likes</span>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 text-center">
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition">
            Start a new discussion
          </button>
        </div>
      </div>
    </div>
  );
}