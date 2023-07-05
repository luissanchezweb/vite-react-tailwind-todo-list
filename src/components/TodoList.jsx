import TodoItem from "./TodoItem";

const TodoList = ({todos, removeTodo, updateTodo}) => { 
    return (
        <div className=" rounded-t-md bg-white mt-8">
            {todos.map((todo) =>(
                <TodoItem key={todo.id} todo={todo} removeTodo={removeTodo} updateTodo={updateTodo}></TodoItem>
            ))}
         
        </div>
    )
 }

 export default TodoList;