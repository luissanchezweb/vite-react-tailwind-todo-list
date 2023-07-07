import { useState } from "react";

const TodoCreate = ({createTodo}) => { 

    const [title, setTitle] = useState('');

    const handleSubmitAddTodo = (e) => {
        e.preventDefault();

        if(!title.trim()) {
            return setTitle("");
        }
        
        createTodo(title);
        setTitle("");
    }

    return (
        <form onSubmit={handleSubmitAddTodo} className="transition-all duration-1000 dark:bg-gray-800 flex items-center gap-4 overflow-hidden rounded-md bg-white px-4 py-4">
          <span className="inline-block h-5 w-5 rounded-full border-2"></span>
          <input
            onChange={(e) => setTitle(e.target.value)}
            className="w-full text-gray-500 outline-none dark:bg-gray-800 transition-all duration-1000"
            type="text"
            placeholder="Create a new todo..."
          />
        </form>
    )
 }

 export default TodoCreate;