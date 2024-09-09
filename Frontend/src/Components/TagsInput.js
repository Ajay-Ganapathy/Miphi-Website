import React from 'react';
import './tagsinput.modules.css'

const TagsInput = props => {
  const [tags, setTags] = React.useState([]);
  
  const removeTags = indexToRemove => {
    setTags([...tags.filter((_, index) => index !== indexToRemove)]);
  };

  const addTags = event => {
    if (event.target.value !== "") {
      setTags([...tags, event.target.value]);
      props.selectedTags([...tags, event.target.value]);
      event.target.value = "";
    }
  };

  return (
    <div className="tags-input" >
      <ul id="tags">
        {tags.map((tag, index) => (
          <li key={index} className="tag">
            <span className='tag-title'>{tag}</span>
            <span className='tag-close-icon'
              onClick={() => removeTags(index)}
            >
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
