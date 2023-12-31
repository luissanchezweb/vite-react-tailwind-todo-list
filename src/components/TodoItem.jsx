import CrossIcon from "./icons/IconCross";
import IconCheck from "./icons/IconCheck";
import React from "react";

const TodoItem = React.forwardRef(
  ({ todo, removeTodo, updateTodo, ...props }, ref) => {
    const { id, title, completed } = todo;

    return (
      <article
        {...props}
        ref={ref}
        className="flex gap-4 border-b border-b-gray-400 px-4 py-4 "
      >
        <button
          className={`${
            completed
              ? "flex h-5 w-5 flex-none items-center justify-center rounded-full border-2 bg-gradient-to-b from-indigo-500 via-purple-500 to-pink-500"
              : "inline-block h-5 w-5 flex-none rounded-full border-2"
          }`}
          onClick={() => updateTodo(id)}
        >
          {completed && <IconCheck></IconCheck>}
        </button>
        <p
          className={`grow text-gray-700 dark:text-gray-400 ${
            completed && "line-through"
          }`}
        >
          {title}
        </p>
        <button className="ml-auto" onClick={() => removeTodo(id)}>
          <CrossIcon></CrossIcon>
        </button>
      </article>
    );
  }
);

export default TodoItem;
