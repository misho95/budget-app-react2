function Button( {name, handler} ){
    return(
        <button onClick={handler} className="bg-purple-300 p-2 shadow-sm shadow-gray-500 dark:shadow-gray-900 outline-double outline-purple-200 dark:outline-gray-600 text-purple-800">{name}</button>
    )
}

export default Button;