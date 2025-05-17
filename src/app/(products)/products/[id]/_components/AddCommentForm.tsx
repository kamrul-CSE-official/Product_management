"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";

interface AddCommentFormProps {
  productId: string;
  onCommentAdded?: () => void; // Callback for parent component
}

export default function AddCommentForm({
  productId,
  onCommentAdded,
}: AddCommentFormProps) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    text: string;
    type: "success" | "error";
  } | null>(null);
  const [characterCount, setCharacterCount] = useState(0);
  const maxLength = 500;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const trimmedComment = comment.trim();
      if (!trimmedComment) {
        setMessage({ text: "Comment cannot be empty", type: "error" });
        return;
      }

      if (trimmedComment.length > maxLength) {
        setMessage({
          text: `Comment exceeds ${maxLength} characters`,
          type: "error",
        });
        return;
      }

      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: productId,
          comment: trimmedComment,
          userName: "Current User",
          userImage: "https://avatar.iran.liara.run/public/17",
        }),
      });

      if (!res.ok) {
        throw new Error(await res.text());
      }

      const data = await res.json();
      if (data.success) {
        setComment("");
        setCharacterCount(0);
        setMessage({ text: "Comment posted successfully!", type: "success" });
        if (onCommentAdded) {
          onCommentAdded(); // Notify parent component
        }
      } else {
        throw new Error(data.message || "Failed to post comment");
      }
    } catch (err) {
      console.error("Comment submission error:", err);
      setMessage({
        text: err instanceof Error ? err.message : "Failed to post comment",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setComment(value);
    setCharacterCount(value.length);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div className="relative">
        <textarea
          value={comment}
          onChange={handleCommentChange}
          required
          rows={4}
          maxLength={maxLength}
          className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
          placeholder="Share your thoughts about this product..."
          disabled={loading}
        />
        <div className="absolute bottom-2 right-2 text-xs text-gray-500 bg-white px-1 rounded">
          {characterCount}/{maxLength}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <button
          type="submit"
          disabled={loading || !comment.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
        >
          {loading && <Loader2 className="h-4 w-4 animate-spin" />}
          {loading ? "Posting..." : "Post Comment"}
        </button>

        {message && (
          <p
            className={`text-sm ${
              message.type === "success" ? "text-green-600" : "text-red-600"
            }`}
          >
            {message.text}
          </p>
        )}
      </div>
    </form>
  );
}
