import { useState } from "react";

export default function App() {
  const [toDoList, setToDoList] = useState([]);
  const [editItem, setEditItem] = useState("");

  function hundleAddToDo(todo) {
    setToDoList((toDoList) => [...toDoList, todo]);
  }
  function hundleDeleteToDo(todo) {
    setToDoList((toDoList) => toDoList.filter((toDo) => toDo !== todo));
  }

  function hundleEditToDo(todo) {
    setToDoList((toDoList) =>
      toDoList.map((toDo) => (toDo === editItem ? todo : toDo))
    );
    setEditItem("");
  }

  return (
    <div className="app">
      <h1>Get Things Done!</h1>
      <Input onSetToDo={hundleAddToDo} />
      {toDoList.map((todo, i) =>
        editItem !== todo ? (
          <Item
            todo={todo}
            onDelete={hundleDeleteToDo}
            onEdit={setEditItem}
            key={i}
          />
        ) : (
          <Input editItem={editItem} onChange={hundleEditToDo} key={i} />
        )
      )}
    </div>
  );
}

function Input({ onSetToDo, editItem, onChange }) {
  const [toDo, setToDo] = useState("");
  return (
    <div>
      <div>
        {editItem ? (
          <input
            type="text"
            value={editItem}
            onChange={(e) => onChange(e.target.value)}
          />
        ) : (
          <input
            type="text"
            placeholder="What is the task today ?"
            value={toDo}
            onChange={(e) => setToDo(e.target.value)}
          />
        )}

        <button onClick={() => onSetToDo(toDo)}>Add Task</button>
      </div>
    </div>
  );
}

function Item({ todo, onDelete, onEdit }) {
  //const [deleteToDo, setDeleteToDo] = useState("");
  return (
    <div className="item">
      <span>{todo}</span>
      <div className="settings">
        <img src="edit.png" alt="edit" onClick={() => onEdit(todo)} />
        <img src="trash.png" alt="trash" onClick={() => onDelete(todo)} />
      </div>
    </div>
  );
}
