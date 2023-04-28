import React, { useState,useEffect } from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";


//defines a shopping list UI
function ShoppingList() {
  //state to track category of items to see
  const [selectedCategory, setSelectedCategory] = useState("All");
  //store item initialised in an empty array
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/items")
      .then((r) => r.json())
      .then((items) => console.log(items));
  }, []);
  function handleDeleteItem(deletedItem) {
    console.log("In ShoppingCart:", deletedItem);
  }

  function handleAddItem(newItem) {
    setItems([...items,, newItem]);
  }
  function handleUpdateItem(updatedItem) {
    const updatedItems = items.map((item) => {
      if (item.id === updatedItem.id) {
        return updatedItem;
      } else {
        return item;
      }
    });
    setItems(updatedItems);
  }

  
  function handleCategoryChange(category) {
  //func to be called when the user select a new category  
    setSelectedCategory(category);
  }
  //func filter item based on  currently selected category
  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;
  // Otherwise, only items that belong to the selected category are returned
    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem} />
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {/* pass it as a prop to Item */}
        {itemsToDisplay.map((item) => (
          <Item
            key={item.id}
            item={item}
            onUpdateItem={handleUpdateItem}
            onDeleteItem={handleDeleteItem}
          />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;
