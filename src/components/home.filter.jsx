function HomeFilter(){
    return(
        <div className="w-full flex justify-between">
        <form id="filterForm" className="w-full flex flex-col sm:flex-row gap-3 justify-around items-center">
                 <input id="filterDate" type="date" className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 rounded-md p-1"/>
                 <select id="filterCategory" className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 rounded-md p-1">
                     <option>Any</option>
                     <option>shopping</option>
                     <option>gym</option>
                     <option>family</option>
                     <option>invoice</option>
                     <option>other</option>
                 </select>

                 <input id="filterMin" type="text" placeholder="min" className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 rounded-md p-1"/>

                 <input id="filterMax" type="text" placeholder="max" className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 rounded-md p-1"/>

             <button className="bg-purple-300 dark:bg-purple-400 py-2 px-4 rounded-md text-purple-700">Filter</button>
        </form>
     </div>
    )
}

export default HomeFilter;