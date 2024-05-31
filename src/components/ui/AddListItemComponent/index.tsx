import React, { useState } from "react";

// Define the type for our list items
interface Item {
  id: number;
  value: string;
}

const AddListItemComponent: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [inputValue, setInputValue] = useState<string>("");

  const addItem = () => {
    if (inputValue.trim() !== "") {
      const newItem: Item = { id: Date.now(), value: inputValue };
      setItems([...items, newItem]);
      setInputValue("");
    }
  };

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <div>
      <h1>Item List</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter an item"
      />
      <button onClick={addItem}>Add Item</button>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.value}{" "}
            <button onClick={() => removeItem(item.id)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AddListItemComponent;
