import { useState } from "react";

function HomeFilter( {data, handler} ){

const [date, setDate] = useState();
const [cat, setCat] = useState();
const [min, setMin ] = useState();
const [max, setMax] = useState();

const filterInvoice = (e) => {
    e.preventDefault();

const filteredData = data.filter(item => {
const isDateMatched = !date || item.date === date;
const isCategoryMatched = !cat || item.category.toLowerCase() === cat.toLowerCase();
const isAmountMatched = (!min || +item.amount > min) && (!max || +item.amount < max);
return isDateMatched && isCategoryMatched && isAmountMatched;
});

handler(filteredData);

}

const clearForm = () => {
    setDate('');
    setCat('');
    setMin('');
    setMax('');
}

    return(
        <div className="w-full flex justify-between">
        <form onSubmit={filterInvoice} className="w-full flex flex-col sm:flex-row gap-3 justify-around items-center">
                 <input value={date} onChange={(e) => setDate(e.target.value)} type="date" className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 rounded-md p-1"/>
                 <select value={cat} onChange={(e) => {setCat(e.target.value)}} className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 rounded-md p-1">
                     <option value="">ყველა</option>
                     <option value="shopping">შოპინგი</option>
                     <option value="gym">ვარჯიში</option>
                     <option value="family">ოჯახი</option>
                     <option value="invoice">ინვოისი</option>
                     <option value="other">სხვა</option>
                 </select>

                 <input value={min} onChange={(e) => setMin(e.target.value)} type="text" placeholder="min" className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 rounded-md p-1"/>

                 <input value={max} onChange={(e) => setMax(e.target.value)} type="text" placeholder="max" className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 rounded-md p-1"/>
            <div className="flex gap-5">
                <button type="reset" className="bg-purple-300 dark:bg-purple-400 py-2 px-4 rounded-md text-purple-700" onClick={clearForm}>გასუფთავება</button>
                <button type="submit" className="bg-purple-300 dark:bg-purple-400 py-2 px-4 rounded-md text-purple-700">გაფილტვრა</button>
            </div>
        </form>
     </div>
    )
}

export default HomeFilter;