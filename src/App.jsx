import { useState } from "react";
import Header from "./components/Header";
import TodoComputed from "./components/TodoComputed";
import TodoCreate from "./components/TodoCreate";
import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";

const initialStateTodos = [
  {
    id:1, title: "Go to the gym", completed: false
  },
  {
    id:2, title: "Complete online javascript course", completed: true
  },
  {
    id:3, title: "Buy books", completed: true
  }
]

const App = () => {

  const [todos, setTodos] = useState(initialStateTodos);

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

  return (
    <div
      className="min-h-screen
      bg-gray-300 bg-[url('./assets/images/bg-mobile-light.jpg')] bg-contain bg-no-repeat"
    >
      {/** Header */}
      <Header></Header>
      <main className="container mx-auto mt-8 px-4">

        {/*TodoCreate*/}
       <TodoCreate createTodo={createTodo}></TodoCreate>

        {/* TodoList (TodoItem) TodoUpdate & TodoDelete */}
        <TodoList todos={filteredTodos()} removeTodo={removeTodo} updateTodo={updateTodo}></TodoList>

        {/* TodoComputed */}
        <TodoComputed computedItemsLeft={computedItemsLeft} clearCompleted={clearCompleted}></TodoComputed>

        {/* TodoFilter */}
        <TodoFilter changeFilter={changeFilter} filter={filter}></TodoFilter>
      </main>
      
      <p className="text-center mt-8">Drag and drop to reorder list</p>
    </div>
  );
};

export default App;
