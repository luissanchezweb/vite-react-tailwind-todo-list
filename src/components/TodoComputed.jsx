const TodoComputed = ({computedItemsLeft, clearCompleted}) => { 
    return (
        <section className="flex justify-between px-4 py-4 bg-white rounded-b-md dark:bg-gray-800 transition-all duration-1000">
            <span className="text-gray-400">{computedItemsLeft} items left</span>
            <button className="text-gray-400" onClick={clearCompleted}>Clear completed</button>
        </section>
    )
 }

 export default TodoComputed;