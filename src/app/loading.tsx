import React from "react";

function GlobalLoading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-12 h-12 border-4 border-gray-300 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default GlobalLoading;
