import React from "react";

export function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        width: "100%",
        height: "100%",
        zIndex: 2000,
        top: 0,
        left: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    />
  );
}
