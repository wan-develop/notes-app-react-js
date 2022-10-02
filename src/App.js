
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


  function handleAddButton() {
    // adds a new item to the list
    const textInputCurr = textInput.current;
    if (textInputCurr.value === "") return;

    setList([
      {
        id: v4(),
        text: textInputCurr.value
      },
      ...list]
    );

    textInputCurr.value = "";
  }

  function deleteItem(key) {

    const newList = list.filter(item => item.id !== key);
    setList(newList);

  }

  return (
    <div className="App">
      <h1>Todo List</h1>
      <section>
        <input
          ref={textInput}
          className="text-input"
          placeholder="texto"
          />
        <button
          className="add-item-btn"
          onClick={handleAddButton}
          >
          Adicionar
        </button>
      </section>
        <List list={list} deleteItem={deleteItem} />
    </div>
  )

}