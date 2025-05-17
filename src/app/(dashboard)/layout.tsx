import React from "react";

function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1>This is private</h1>
      <br />
      {children}
    </div>
  );
}

export default DashboardLayout;
