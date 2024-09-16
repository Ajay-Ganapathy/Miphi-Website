import React, { useState, useEffect } from 'react';
import './tagsinput.modules.css';

const TagsInput = props => {
  const [tags, setTags] = useState([...props.tags]);

  useEffect(() => {
    setTags([...props.tags]);
  }, [props.tags]);

  const removeTags = indexToRemove => {
    const updatedTags = tags.filter((_, index) => index !== indexToRemove);
    setTags(updatedTags);
    props.setTags(updatedTags); 
  };

  const addTags = event => {
    const newTag = event.target.value.trim();
    if (newTag !== "") {
      const updatedTags = [...tags, newTag];
      setTags(updatedTags);
      props.setTags(updatedTags); 
      props.selectedTags(updatedTags);
      event.target.value = ""; 
    }
  };

  return (
    <div className="tags-input">
      <ul id="tags">
        {tags.map((tag, index) => (
          <li key={index} className="tag">
            <span className='tag-title'>{tag}</span>
            <span className='tag-close-icon' onClick={() => removeTags(index)}>
              x
            </span>
          </li>
        ))}
      </ul>
      <input
        type="text"
        style={{ outline: "none" }}
        onKeyDown={event => {
          if (event.key === "Enter") {
            event.preventDefault();
            addTags(event);
          }
        }}
        placeholder="Press enter to add tags"
      />
    </div>
  );
};

export default TagsInput;
