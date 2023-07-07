import TodoItem from "./TodoItem";

const TodoList = ({todos, removeTodo, updateTodo}) => { 
    return (
        <div className=" rounded-t-md overflow-hidden bg-white mt-8 transition-all dark:bg-gray-800 duration-1000">
            {todos.map((todo) =>(
                <TodoItem key={todo.id} todo={todo} removeTodo={removeTodo} updateTodo={updateTodo}></TodoItem>
            ))}
         
        </div>
    )
 }

 export default TodoList;