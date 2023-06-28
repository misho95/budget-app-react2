import HomeFilter from "../components/home.filter";
import HomeTopStats from "../components/home.topstats"
import HomeMidStats from "../components/home.midstats";
import { useState } from "react";
import { redirect } from "react-router-dom";

function HomePage(){

    const dataBase = JSON.parse(localStorage.getItem('dataBase'));
    const [ localData, setLocalData ] = useState( dataBase ? dataBase : []);

        const redirectToInvoice = () => {
            //რეაქტ რუტერის დახმარებით რედირექტი ვერ გავაკეთე
            window.location.href = "/invoice";
          };

    return(
        <div className="flex flex-col gap-5">
            <HomeFilter />
            <HomeTopStats />
            <HomeMidStats />
            <div className="w-full flex flex-col gap-3">
                <div className="w-full flex justify-end">
                    <select className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 p-1">
                        <option>Date</option>
                        <option>Expense</option>
                        <option>Income</option>
                        <option>Amount inc</option>
                        <option>Amount dec</option>
                    </select>
                </div>
                <div className="flex gap-3 flex-wrap">

                <div onClick={redirectToInvoice} className="bg-purple-300 text-purple-800 w-full sm:w-fit h-fit p-10 flex justify-center items-center rounded-lg cursor-pointer shadow-sm">
                    <span className="material-symbols-outlined select-none text-2xl">
                        add_box
                    </span>
                </div>
                
                    {
                        localData.map( (inv) => {
                            return(
                                <div key={inv.id} className={`w-full sm:w-fit h-fit ${inv.type ? 'bg-green-300' : 'bg-red-300'}  p-3 rounded-lg text-gray-800 flex flex-col gap-2 relative pr-12 shadow-sm`}>
                                    <div className="absolute right-3 top-3 pb-3 h-full flex flex-col justify-between">
                                        <button>
                                            <span className="material-symbols-outlined">
                                                delete
                                                </span>
                                        </button>
                                        <button>
                                            <span className="material-symbols-outlined">
                                                edit
                                            </span>
                                        </button>
                                    </div>
                                    <div className="flex items-center gap-2"><span className="material-symbols-outlined">
                                        calendar_month
                                        </span>{inv.date}</div>
                                    <div className="flex items-center gap-2"><span className="material-symbols-outlined">{inv.icon}</span> {inv.category}</div>
                                    <div className="flex items-center gap-2"><span className="material-symbols-outlined">
                                        paid
                                        </span> {inv.amount}</div>
                                </div>
                            )
                        })
                    }
                </div>
        
            </div>
        </div>
    )
}

export default HomePage;