import HomeFilter from "../components/home.filter";
import HomeTopStats from "../components/home.topstats"
import HomeMidStats from "../components/home.midstats";
import HomeInv from "../components/home.inv";
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

      const filteredData = render.filter(inv => {
        if (filter === 'DATE') {
          return render.sort( (a, b) => {
            return new Date(b.date) - new Date(a.date);
          })
        }
    
        if (filter === 'EXPENSE') {
            return render.sort( (a, b) => {
              return a.type - b.type;
            })
          }
        if (filter === 'INCOME') {
            return render.sort( (a, b) => {
              return b.type - a.type;
            })
          }

        if (filter === 'AMOUNTINC') {
            return render.sort( (a, b) => {
              return a.amount - b.amount;
            })
          }

        if (filter === 'AMOUNTDEC') {
            return render.sort( (a, b) => {
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
            const deleteData = data.filter( (inv) => {
                if(inv.id !== id) return inv;
            });

            setData(deleteData);
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

                <Link to='/invoice' className="w-full sm:w-fit h-fit">
                <div  className="bg-purple-300 text-purple-800 w-full sm:w-fit h-fit p-10 flex justify-center items-center rounded-lg cursor-pointer shadow-sm">
                    <span className="material-symbols-outlined select-none text-2xl">
                        add_box
                    </span>
                </div>
                </Link>
                    {
                        render.map( (inv) => {
                            return(
                              <HomeInv key={inv.id} id={inv.id} date={inv.date} type={inv.type} category={inv.category} icon={inv.icon} amount={inv.amount} deleteInv={deleteInv}/>
                            )
                        })
                    }
                </div>
        
            </div>
        </div>
    )
}

export default HomePage;