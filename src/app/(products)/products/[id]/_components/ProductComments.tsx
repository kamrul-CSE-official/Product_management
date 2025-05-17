'use client';

import { useEffect, useState } from 'react';

interface Comment {
  _id: string;
  text: string;
  userId: {
    name: string;
    image?: string;
  };
}

interface ProductCommentsProps {
  productId: string;
}

export default function ProductComments({ productId }: ProductCommentsProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comments/${productId}`);
        const data = await res.json();
        if (data.success) {
          setComments(data.data ? [data.data] : []);
        }
      } catch (err) {
        console.error('Failed to load comments:', err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchComments();
    }
  }, [productId]);

  if (loading) return <p>Loading comments...</p>;
  if (!comments.length) return <p>No comments yet.</p>;

  return (
    <div className="space-y-4 mt-4">
      <h3 className="text-lg font-semibold">Comments</h3>
      {comments.map((comment) => (
        <div key={comment._id} className="bg-gray-100 p-3 rounded-md shadow">
          <div className="font-medium">{comment.userId.name}</div>
          <p>{comment.text}</p>
        </div>
      ))}
    </div>
  );
}
