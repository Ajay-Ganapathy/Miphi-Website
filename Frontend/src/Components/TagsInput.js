import React, { useState, useEffect } from 'react';
import './tagsinput.modules.css';

const TagsInput = props => {
  const [tags, setTags] = useState([]);

  // Use useEffect to handle initial prop changes
  useEffect(() => {
    // Map props.tags to an array of tag names
    const initialTags = props.tags.map(tag => tag.name);
    props.setTags(initialTags);
  }, [props.tags]); // Depend on props.tags to update tags when props.tags change

  const removeTags = indexToRemove => {
    props.setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };

  //console.log(tags)
  const addTags = event => {
    const newTag = event.target.value.trim();
    if (newTag !== "") {
      setTags(tags => [...tags, newTag]);
      // Update parent components or other handlers
      props.setTags(tags => [...tags, newTag]);
      props.selectedTags(tags => [...tags, newTag]);
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
