function HomeMidStats(){
    return(
        <div className="w-full flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row gap-2 text-center text-gray-600 dark:text-gray-300 p-1 justify-start items-center">
            <h1 className="text-lg bg-yellow-200 text-yellow-800 py-1 px-2 rounded-lg shadow-sm">income/expense</h1>
                        <span className="bg-yellow-100 py-1 px-2 text-yellow-800 rounded-lg shadow-sm" >invoice / 500</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 text-center text-gray-600 dark:text-gray-300 p-1 justify-start items-center">
            <h1 className="text-lg bg-yellow-200 text-yellow-800 py-1 px-2 rounded-lg shadow-sm">Top 3</h1>
                        <span className="bg-yellow-100 py-1 px-2 text-yellow-800 rounded-lg shadow-sm" >shopping / 200</span>     
        </div>
    </div>
    )
}

export default HomeMidStats;