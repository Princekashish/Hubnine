import React, { useState } from "react";
import "./DropArea.css";

export default function DropArea({ onDrop }) {
  const [showDrop, setShowDrop] = useState(false);

  return (
    <div
      onDragEnter={() => setShowDrop(true)}
      onDragLeave={() => setShowDrop(false)}
      onDragOver={(e) => e.preventDefault()} // Necessary to allow a drop
      onDrop={(e) => {
        e.preventDefault(); // Necessary to prevent default handling
        onDrop(); // Call the parent onDrop handler
        setShowDrop(false); // Hide drop area after dropping
      }}
      className={showDrop ? "drop_area" : "hidden_area"}
    >
      Drop area
    </div>
  );
}
