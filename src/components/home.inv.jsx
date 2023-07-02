import { Link } from 'react-router-dom'

function HomeInv( {id, date, type, category, icon, amount, deleteInv}){

    const translate = (val) => {
        switch(val){
            case 'shopping':
                return 'შოპინგი';
            case 'gym':
                return 'ვარჯიში';
            case 'family':
                return 'ოჯახი';
            case 'invoice':
                return 'ინვოისი';
            case 'other':
                return 'სხვა';
        }
    }

    return(
        <div key={id} className={`w-full sm:w-fit h-fit ${type ? 'bg-green-300' : 'bg-red-300'}  p-3 rounded-lg text-gray-800 flex flex-col gap-2 relative pr-12 shadow-sm`}>
        <div className="absolute right-3 top-3 pb-3 h-full flex flex-col justify-between">
            <button onClick={() => deleteInv(id)}>
                <span className="material-symbols-outlined">
                    delete
                </span>
            </button>
            <Link to={`/invoice?id=${id}`}>
                <button>
                    <span className="material-symbols-outlined">
                        edit
                    </span>
                </button>
            </Link>
        </div>
        <div className="flex items-center gap-2"><span className="material-symbols-outlined">
            calendar_month
            </span>{date}</div>
        <div className="flex items-center gap-2"><span className="material-symbols-outlined">{icon}</span> {translate(category)}</div>
        <div className="flex items-center gap-2"><span className="material-symbols-outlined">
            paid
            </span> {amount}</div>
    </div>
    )
}

export default HomeInv;