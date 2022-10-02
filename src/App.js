
import { useState, useEffect, useRef } from "react";
import { v4 } from "uuid";
import List from "./components/List";

import "./App.css"

const LOCAL_STORAGE_KEY = "Todo-List-App";

export default function App() {

  const textInput = useRef("");
  const [list, setList] = useState([]);

  useEffect(() => {
    // loads the list saved in localStorage
    let data = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (data) setList(data);
  }, [])

  useEffect(() => {
    // Saves to localStorage in every list render
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));

  }, [list])


  const handleAddButton = () => {
    // adds a new item to the list

    if (textInput.current.value === "") return;

    setList([
      {
        //? Generates a random id
        id: v4(),
        text: textInput.current.value
      },
      ...list]
    );

    textInput.current.value = "";
  }

  const deleteItem = (key) => {

    const newList = list.filter(item => item.id !== key);
    setList(newList);

  }


  const keyPressed = (e) => {
    //? Add new item using Enter
    if (e.key !== 'Enter') return
    handleAddButton()
  }

  return (
    <div className="App">
      <h1>Notes App</h1>
      <section>
        <input
          ref={textInput}
          className="text-input"
          placeholder="content"
          onKeyDown={(e) => { keyPressed(e) }}
        />
        <button
          className="add-item-btn"
          onClick={handleAddButton}
        >
          ADD
        </button>
      </section>
      <List list={list} deleteItem={deleteItem} />
    </div>
  )

}