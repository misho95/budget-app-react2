function HomeMidStats( {data} ){

    const stats = ['shopping', 'gym', 'family', 'invoice', 'other'];

    const calculateStats = (category) => {
        const filter = data.filter( (inv) => {
            if(category === inv.category) return inv;
        });

        
        if(filter.length > 0){
            const stats = filter.reduce( (val, el) => {
                    return val+= +el.amount;
            }, 0)
            return stats;
        } else {
            return 0;
        }

    }

    const top3 = data.sort( (a, b) => {
        return b.amount - a.amount;
    })

    const slice = top3.slice(0,3);

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
        <div className="w-full flex flex-col gap-5">
        <div className="flex flex-col sm:flex-row gap-2 text-center text-gray-600 dark:text-gray-300 p-1 justify-start items-center">
            <h1 className="text-md sm:text-lg bg-yellow-200 text-yellow-800 py-1 px-2 rounded-lg shadow-sm">შემოსავალი / გასავალი</h1>
            <div className="flex gap-2 flex-wrap sm:flex-nowrap justify-center">
                {
                    stats.map( (stat, index) => {
                        return(
                            <span key={index} className="bg-yellow-100 py-1 px-2 text-yellow-800 rounded-lg shadow-sm" >{translate(stat)} {calculateStats(stat)}</span>
                        )
                    })
                }
            </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 text-center text-gray-600 dark:text-gray-300 p-1 justify-start items-center">
            <h1 className="text-md sm:text-lg bg-yellow-200 text-yellow-800 py-1 px-2 rounded-lg shadow-sm">ტოპ 3</h1>
            <div className="flex gap-2 flex-wrap sm:flex-nowrap justify-center">
                {
                    slice.map( (stat, index) => {
                        return(
                            <span key={index} className="bg-yellow-100 py-1 px-2 text-yellow-800 rounded-lg shadow-sm" >{translate(stat.category)} {stat.amount}</span>
                        )
                    })
                } 
            </div>
        </div>
    </div>
    )
}

export default HomeMidStats;