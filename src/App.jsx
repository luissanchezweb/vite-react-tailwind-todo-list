import { useEffect, useState } from "react";
import Header from "./components/Header";
import TodoComputed from "./components/TodoComputed";
import TodoCreate from "./components/TodoCreate";
import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";
import { DragDropContext } from "@hello-pangea/dnd";

const initialStateTodos = JSON.parse(localStorage.getItem("todos")) || [];

const reorder = (list, startIndex, endIndex) => {
  const result = [...list];
  const [removed] = result.splice(startIndex,1);
  result.splice(endIndex, 0 , removed);
  return result;
}

const App = () => {

  const [todos, setTodos] = useState(initialStateTodos);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos])

  const createTodo = (title) => {
    const newTodo = {
      id: Date.now(),
      title,
      completed: false
    }

    setTodos([...todos, newTodo])
  }

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  const updateTodo = (id) => {
    setTodos(todos.map(todo => todo.id === id ? {...todo, completed: !todo.completed} : todo))
  }

  const computedItemsLeft = todos.filter((todo) => !todo.completed).length;

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  }

  const [filter, setFilter] = useState("all");

  const changeFilter = (filter) => setFilter(filter);

  const filteredTodos = () => {
    switch (filter) {
      case "all":
          return todos;
      case "active":
        return todos.filter((todo) => !todo.completed);    
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  }

  const handleDragEnd = (result) => {
    const { destination, source} = result;
    if (!destination) return;
    if(source.index === destination.index &&
      source.droppableId === destination.droppableId)
      return;

      setTodos((prevTasks) => reorder(prevTasks, source.index, destination.index));
  } 

  return (
    <div
      className="dark:bg-gray-900 dark:bg-[url('./assets/images/bg-mobile-dark.jpg')] min-h-screen
      bg-gray-300 bg-[url('./assets/images/bg-mobile-light.jpg')] bg-contain bg-no-repeat transition-all duration-1000
      md:bg-[url('./assets/images/bg-desktop-light.jpg')] md:dark:bg-[url('./assets/images/bg-desktop-dark.jpg')]"
    >
      {/** Header */}
      <Header></Header>
      <main className="container mx-auto mt-8 px-4">

        {/*TodoCreate*/}
       <TodoCreate createTodo={createTodo}></TodoCreate>

        <DragDropContext onDragEnd={handleDragEnd}>
          {/* TodoList (TodoItem) TodoUpdate & TodoDelete */}
          <TodoList todos={filteredTodos()} removeTodo={removeTodo} updateTodo={updateTodo}></TodoList>
        </DragDropContext>
        {/* TodoComputed */}
        <TodoComputed computedItemsLeft={computedItemsLeft} clearCompleted={clearCompleted}></TodoComputed>

        {/* TodoFilter */}
        <TodoFilter changeFilter={changeFilter} filter={filter}></TodoFilter>
      </main>
      
      <p className="text-center mt-8 dark:text-gray-400">Drag and drop to reorder list</p>
    </div>
  );
};

export default App;
