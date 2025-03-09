import { React, useState } from "react";

const Folder = ({ title, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
    <div className="bar">
    <div className="px-4 pt-2 d-flex justify-content-between">
      <h4>{title}</h4>
      <div className="px-4">
        <i
          className="fa-solid fa-chevron-down fa-lg"
          onClick={toggleExpand}
        ></i>
      </div>
    </div>
    {isExpanded && (
      <div style={{ padding: "10px" }}>{children}</div>
    )}
  </div>
  </div>
  );
};

export default Folder;
