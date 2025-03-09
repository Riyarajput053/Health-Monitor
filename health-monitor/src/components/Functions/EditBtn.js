import React, { useState, useRef } from "react";

const EditBtn = ({ initialValue, onEdit,title}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(initialValue || "");
  const inputRef = useRef(null);

  const handleEdit = () => {
    setIsEditing(true);
    if (inputRef.current) {
      inputRef.current.focus(); // Focus on input field upon edit
    }
  };

  const handleSave = () => {
    onEdit(value); // Call the provided onEdit function with the updated value
    setIsEditing(false);
  };


  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const content = isEditing ? (
  
    <input className="form-control" type="text" id="floatingInput" title={title} value={value} ref={inputRef} onChange={handleChange} /> 
  ) : (
    <p>{value}</p>
  );

  return (
    <div className="editable-box d-flex justify-content-between">
      {content}
      <button className="btn " onClick={isEditing ? handleSave : handleEdit}>
        {isEditing ? "Save" : <i class="fa-solid fa-pen-to-square"></i>}
      </button>
      
    </div>
  );
};

export default EditBtn;
