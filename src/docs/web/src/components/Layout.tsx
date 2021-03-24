import React from "react";
import Nav from "./Nav";
import Router from "./Router";

export default function Layout() {
  return (
    <div
      style={{
        display: "flex",
      }}
    >
      <aside>
        <Nav />
      </aside>
      <main style={{ flex: 1 }}>
        <Router />
      </main>
    </div>
  );
}
