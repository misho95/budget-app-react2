import { useState } from "react";

function HomeTopStats( {data} ){

    const filter = (val) => {
        const filter = data.filter( (inv) => {
            if(inv.type === val) return inv;
        })
        return filter;
    }

    const income = () => {
        const filt = filter(true);
        const result = filt.reduce( ( val, el) => {
            return val+= +el.amount;
        }, 0)
        return result;
    }

    const expense = () => {
        const filt = filter(false);
        const result = filt.reduce( ( val, el) => {
            return val+= +el.amount;
        }, 0)
        return result;
    }

    const diff = () => {
        const result = income() - expense();
        return result;
    }

    return(
        <div id="topStats" className="flex justify-center items-center gap-3 text-gray-600 dark:text-gray-300 text-lg">
        <span className="bg-green-100 text-green-800 py-1 px-2 rounded-lg shadow-sm">
            {income()}
        </span>
        <span className="bg-purple-200 text-purple-800 py-1 px-2 rounded shadow-sm">
            {diff()}
        </span>
        <span className="bg-red-200 text-red-800 py-1 px-2 rounded shadow-sm">
            {expense()}
        </span>
 </div>
    )
}

export default HomeTopStats;