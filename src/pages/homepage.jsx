import HomeFilter from "../components/home.filter";
import HomeTopStats from "../components/home.topstats"
import HomeMidStats from "../components/home.midstats";
import { useState, useReducer, useEffect } from "react";
import { Link } from "react-router-dom";

function HomePage(){

    const dataBase = JSON.parse(localStorage.getItem('dataBase'));
    const [ data, setData ] = useState( dataBase ? dataBase : []);
    const [filterData, setFilterData] = useState(null);
    const [ render, setRender] = useState([]);

    const filterReducer = (state, action) => {
        switch (action.type) {
          case 'SORT_DATE':
            return 'DATE';
          case 'SORT_EXPENSE':
            return 'EXPENSE';
          case 'SORT_INCOME':
            return 'INCOME';
          case 'SORT_AMOUNTINC':
            return 'AMOUNTINC';
          case 'SORT_AMOUNTDEC':
            return 'AMOUNTDEC';
          default:
            throw new Error();
        }
      };

      const [filter, dispatchFilter] = useReducer(filterReducer, 'DATE');

      const filteredData = data.filter(inv => {
        if (filter === 'DATE') {
          return data.sort( (a, b) => {
            return new Date(b.date) - new Date(a.date);
          })
        }
    
        if (filter === 'EXPENSE') {
            return data.sort( (a, b) => {
              return a.type - b.type;
            })
          }
        if (filter === 'INCOME') {
            return data.sort( (a, b) => {
              return b.type - a.type;
            })
          }

        if (filter === 'AMOUNTINC') {
            return data.sort( (a, b) => {
              return a.amount - b.amount;
            })
          }

        if (filter === 'AMOUNTDEC') {
            return data.sort( (a, b) => {
              return b.amount - a.amount;
            })
          }
    
        return false;
      });

    const sortData = (e) => {
        const input = e.target.value;
        switch(input){
            case 'Date':
                dispatchFilter({ type: 'SORT_DATE' });
                break;
            case 'Expense':
                dispatchFilter({ type: 'SORT_EXPENSE' });
                break;
            case 'Income':
                dispatchFilter({ type: 'SORT_INCOME' });
                break;
            case 'Amount inc':
                dispatchFilter({ type: 'SORT_AMOUNTINC' });
                break;
            case 'Amount dec':
                dispatchFilter({ type: 'SORT_AMOUNTDEC' });
                break;
            default:
                throw new Error();
        }
    }

        const deleteInv = (id) => {
            const deleteData = localData.filter( (inv) => {
                if(inv.id !== id) return inv;
            });

            setLocalData(deleteData);
            localStorage.setItem('dataBase', JSON.stringify(deleteData));

        }

        const getFilterData = (filter) => {
          setFilterData(filter);
          setIfFilter(true);
        }

        useEffect( () => {

          if(filterData !== null){
            setRender(filterData);
          } else {
            setRender(data);
          }

        }, [data, filterData]);


    return(
        <div className="flex flex-col gap-5">
            <HomeFilter data={data} handler={getFilterData} />
            <HomeTopStats data={data} />
            <HomeMidStats data={data} />
            <div className="w-full flex flex-col gap-3">
                <div className="w-full flex justify-end">
                    <select onChange={sortData} className="bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 border-2 border-gray-300 dark:border-gray-600 p-1">
                        <option>Date</option>
                        <option>Expense</option>
                        <option>Income</option>
                        <option>Amount inc</option>
                        <option>Amount dec</option>
                    </select>
                </div>
                <div className="flex gap-3 flex-wrap">

                <Link to='/invoice'>
                <div  className="bg-purple-300 text-purple-800 w-full sm:w-fit h-fit p-10 flex justify-center items-center rounded-lg cursor-pointer shadow-sm">
                    <span className="material-symbols-outlined select-none text-2xl">
                        add_box
                    </span>
                </div>
                </Link>
                    {
                        render.map( (inv) => {
                            return(
                                <div key={inv.id} className={`w-full sm:w-fit h-fit ${inv.type ? 'bg-green-300' : 'bg-red-300'}  p-3 rounded-lg text-gray-800 flex flex-col gap-2 relative pr-12 shadow-sm`}>
                                    <div className="absolute right-3 top-3 pb-3 h-full flex flex-col justify-between">
                                        <button onClick={() => deleteInv(inv.id)}>
                                            <span className="material-symbols-outlined">
                                                delete
                                            </span>
                                        </button>
                                        <Link to={`/invoice?id=${inv.id}`}>
                                            <button>
                                                <span className="material-symbols-outlined">
                                                    edit
                                                </span>
                                            </button>
                                        </Link>
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