import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

function Invoice(){

    const dataBase = JSON.parse(localStorage.getItem('dataBase'));
    const [ localData, setLocalData ] = useState( dataBase ? dataBase : []);
    const [ date, setDate ] = useState('');
    const [ type, setType ] = useState(true);
    const [ cat, setCat ] = useState('');
    const [ amount , setAmount ] = useState('');

    const addInvoice = (e) => {
        e.preventDefault();
        console.log(date, cat, type, amount);

        const getIcon = (val) => {
            switch(val){
                case 'shopping':
                    return 'storefront'
                case 'gym':
                    return 'exercise'
                case 'family':
                    return 'family_restroom'
                case 'invoice':
                    return 'request_page'
                case 'other':
                    return 'payments'
            };
        }

        setLocalData([...localData, {   id: uuidv4(),
        date: date,
        type: type,
        category: cat,
        amount: amount,
        icon: getIcon(cat) }])
        console.log(cat);
    }

    useEffect( () => {
        localStorage.setItem('dataBase', JSON.stringify(localData));
    }, [localData])

    return(
        <>
            <div className="p-2 flex justify-center items-center">
                <form onSubmit={addInvoice} className="w-full sm:w-1/2 flex flex-col text-gray-600 dark:text-gray-300 gap-3">
                        <fieldset className="border-2 border-gray-300 dark:border-gray-600 p-2">
                            <legend className="px-2 ">Date</legend>
                            <input type="date" value={date} onChange={ (e) => { setDate(e.target.value)}} className="bg-gray-200 dark:bg-gray-800 w-full py-1 px-2 focus:outline-none" required/>
                        </fieldset>
                        <fieldset className="border-2 border-gray-300 dark:border-gray-600 p-2">
                            <legend className="px-2 ">Type</legend>
                          
                                Income
                                <input type="radio" name="income" onClick={() => { setType(true)}} />
                    
                                Expense
                                <input type="radio" name="income" onClick={() => { setType(false)}} />
                
                        </fieldset>
                        <fieldset className="border-2 border-gray-300 dark:border-gray-600 p-2">
                            <legend className="px-2 ">Category</legend>
                            <select value={cat} onChange={ (e) => { setCat(e.target.value)}} className="bg-gray-200 dark:bg-gray-800 w-full py-1 px-2 focus:outline-none" required>
                                {type ? <>
                                <option>invoice</option>
                                <option>other</option>
                                </> : <>
                                <option>shopping</option>
                                <option>gym</option>
                                <option>family</option>
                                <option>other</option>
                                </>}
                            </select>
                        </fieldset>
                        <fieldset className="border-2 border-gray-300 dark:border-gray-600 p-2">
                            <legend className="px-2 ">Amount</legend>
                            <input type="text" value={amount} onChange={ (e) => { setAmount(e.target.value)}} placeholder="amount.." className="bg-gray-200 dark:bg-gray-800 w-full py-1 px-2 focus:outline-none" required/>
                        </fieldset>
                        <button className="bg-purple-300 text-purple-800 p-3">Add New Invoice</button>
                </form>
            </div>
        </>
    )
}

export default Invoice;