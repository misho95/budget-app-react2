import { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSearchParams } from "react-router-dom";
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select'
import FormControlLabel from '@mui/material/FormControlLabel'
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio'
import MenuItem  from '@mui/material/MenuItem'
import Button from '../components/button'

function Invoice(){

    const [searchParams, setSearchParams] = useSearchParams();
    const ID = searchParams.get('id');
    const dataBase = JSON.parse(localStorage.getItem('dataBase'));
    const [ localData, setLocalData ] = useState( dataBase ? dataBase : []);
    const [ date, setDate ] = useState('');
    const [ type, setType ] = useState(true);
    const [ cat, setCat ] = useState('');
    const [ amount , setAmount ] = useState('');
    const userID = localStorage.getItem('ID');


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

    const addInvoice = (e) => {
        e.preventDefault();

        setLocalData([...localData, {   id: uuidv4(),
        date: date,
        type: type,
        category: cat,
        amount: amount,
        icon: getIcon(cat),
        userID
    }])
  
        setDate('');
        setCat('');
        setType(true);
        setAmount('');
    }

    useEffect( () => {
        localStorage.setItem('dataBase', JSON.stringify(localData));
    }, [localData])

    const handleChange = () => {
        setType(!type);
    }

    useEffect( () => {
        
        if(ID !== null){
            const getInvByID = localData.filter( (inv) => {
                if(ID === inv.id) {return inv;}
            });

            setDate(getInvByID[0].date);
            setType(getInvByID[0].type);
            setCat(getInvByID[0].category);
            setAmount(getInvByID[0].amount);
          
        };

        }, [])

    const updateInvoice = (e) => {
        e.preventDefault();
        const update = localData.map( (inv) => {
            if(inv.id === ID){
                return {
                    ...inv,
                    date: date,
                    type: type,
                    category: cat,
                    amount: amount,
                    icon: getIcon(cat)
                }
            } else {
                return inv;
            }
        });

        setLocalData(update);
    }


    return(
        <>
            <div className="p-2 flex justify-center items-center">
                <form onSubmit={ID === null ? addInvoice : updateInvoice} className="w-full sm:w-1/2 flex flex-col text-gray-600 dark:text-gray-300 gap-3">
                        <fieldset className="border-2 border-gray-300 dark:border-gray-600 p-2">
                            <legend className="px-2 ">თარიღი</legend>
                            <input type="date" value={date} onChange={ (e) => { setDate(e.target.value)}} className="bg-gray-200 dark:bg-gray-800 w-full py-1 px-2 focus:outline-none" required/>
                        </fieldset>
                        <fieldset className="border-2 border-gray-300 dark:border-gray-600 p-2">
                            <legend className="px-2 ">მოდელი</legend>
                          
                            <FormControl>
                                <RadioGroup
                                          row
                                          aria-labelledby="demo-row-radio-buttons-group-label"
                                          name="row-radio-buttons-group"
                                    value={type}
                                    onChange={handleChange}
                                >
                                    <FormControlLabel value={true} control={<Radio />} label="შემოსავალი" />
                                    <FormControlLabel value={false} control={<Radio />} label="გასავალი" />
                                </RadioGroup>
                            </FormControl>
                        </fieldset>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label" className='textgray-800 dark:text-gray-200'>კატეგორია</InputLabel>
                                <Select className='border-2 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200'
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={cat}
                                    label="category"
                                    onChange={ (e) => { setCat(e.target.value)}}
                                >

                                        {type && <MenuItem value={'invoice'} >ინვოიცი</MenuItem>}
                                        {!type && <MenuItem value={'shopping'} >შოპინგი</MenuItem>}
                                        {!type && <MenuItem value={'gym'}>ვარჯიში</MenuItem>}
                                        {!type && <MenuItem value={'family'}>ოჯახი</MenuItem>}
                                        <MenuItem value={'other'}>სხვა</MenuItem>
                                   
                                </Select>
                            </FormControl>
                        <fieldset className="border-2 border-gray-300 dark:border-gray-600 p-2">
                            <legend className="px-2 ">რაოდენობა</legend>
                            <input type="text" value={amount} onChange={ (e) => { setAmount(e.target.value)}} placeholder="რაოდენობა.." className="bg-gray-200 dark:bg-gray-800 w-full py-1 px-2 focus:outline-none" required/>
                        </fieldset>
                        <Button name={ID === null ? 'დამატება' : 'განახლება'} />
                </form>
            </div>
        </>
    )
}

export default Invoice;