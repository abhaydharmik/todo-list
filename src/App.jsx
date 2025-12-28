import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { FaEdit, FaSave } from "react-icons/fa";
import { FaDeleteLeft } from "react-icons/fa6";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));

      setTodos(todos);
    }
  }, []);

  const savetoLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const toggleFinished = () => {
    setshowFinished(!showFinished);
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    // console.log(todos)
    savetoLS();
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    savetoLS();
  };

  const handleDelete = (e, id) => {
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    savetoLS();
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    // console.log(id)
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    // console.log(index)

    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    savetoLS();
  };

  return (
    <>
      <Navbar />

      <div className="container mx-2 sm:mx-4 md:mx-auto my-20 bg-violet-100 p-6 sm:p-4  rounded-xl min-h-[70vh] min-w-[80vw]">
        <div className="addTodo p-2">
          <h2 className="text-xl font-bold">Add Todo</h2>
          <div className="flex flex-row gap-4 my-2">
            <input
              type="text"
              name=""
              id=""
              onChange={handleChange}
              value={todo}
              className="min-w-[70vw] p-2 rounded-lg"
            />
            <button
              onClick={handleAdd}
              disabled={todo.length <= 3}
              className="bg-violet-600 disabled:bg-gray-500 text-white hover:bg-violet-800 px-2 py-2 rounded-lg"
            >
              <FaSave className="text-2xl" />
            </button>
          </div>
        </div>

        <div className="flex justify-between mx-4 my-6 gap-2 items-center">
          <h2 className="text-xl font-bold">Your Todos</h2>

          <div className="flex gap-2">
            <input
              type="checkbox"
              onChange={toggleFinished}
              checked={showFinished}
              name="show"
              id=""
              className="scale-150 accent-violet-500"
            />
            <label htmlFor="show" className="text-md font-medium">
              Show Finished
            </label>
          </div>
        </div>

        <div className="todos">
          {todos.length === 0 && (
            <div className="text-violet-500 text-center m-5">
              No Todos to Display
            </div>
          )}
          {todos.map((item) => {
            return (
              (showFinished || !item.isCompleted) && (
                <div
                  key={item.id}
                  className="flex justify-between gap-2 m-2 bg-violet-200 px-4 py-3 rounded-lg items-center"
                >
                  <div className="flex gap-4 items-center">
                    <input
                      name={item.id}
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.isCompleted}
                      className="accent-violet-600 scale-125"
                    />
                    <div className={item.isCompleted ? "line-through" : ""}>
                      {item.todo}
                    </div>
                  </div>
                  <div className="buttons flex gap-3">
                    <button
                      onClick={(e) => {
                        handleEdit(e, item.id);
                      }}
                      className="bg-violet-600 text-white text-sm hover:bg-violet-800 px-2 py-2 rounded-lg"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={(e) => {
                        handleDelete(e, item.id);
                      }}
                      className="bg-violet-600 text-white text-sm hover:bg-violet-800 px-2 py-2 rounded-lg"
                    >
                      <FaDeleteLeft />
                    </button>
                  </div>
                </div>
              )
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
