import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";

function ForgotPassword(){

    const users = JSON.parse(localStorage.getItem('userDataBase'));
    const [ localUsers, setLocalUsers] = useState(users ? users : []);
    const [ user, setUser] = useState('');
    const [ ifTrue, setIfTrue ] = useState(false);
    const [ pass, setPass] = useState('');
    const [ rePass, setRePass] = useState('');
    const [userErr, setUserErr] = useState(null);
    const [passErr, setPassErr] = useState(null);
    const navigation = useNavigate();

    const forget = (e) => {
        e.preventDefault();
        const find = localUsers.find( (usr) => {
          if(usr.user === user) return usr;
        })

        if(find){
            setIfTrue(true);
        } else {
            setUserErr("მომხმარებელი არ მოიძებნა");
        }
    }

    const changePassword = (e) => {
        e.preventDefault();
        if(pass === rePass){
            const map = localUsers.map( (usr) => {
                if(usr.user === user){
                    return{
                        ...usr,
                       pass
                    }
                } else {
                    return usr;
                }
            })
    
            setLocalUsers(map);
            setPassErr(null);
            setTimeout( () => {
                navigation('/signin')
            }, 200)

        } else {
            setPassErr("პაროლები არ ემთხვევა");
        }
      
    }

    useEffect( () => {
        localStorage.setItem('userDataBase', JSON.stringify(localUsers));
    }, [localUsers])

    return(
        <div className="flex flex-col justify-center items-center">
        <h1 className="text-gray-800 dark:text-gray-200 text-xl">პაროლის აღდგენა</h1>
        {
            !ifTrue &&   <form onSubmit={forget} className="w-full sm:w-1/3 flex flex-col gap-2">
            <fieldset className="border-2 border-gray-300 dark:border-gray-600 p-2">
                <legend className="px-2 text-gray-500">სახელი</legend>
                <input value={user} onChange={ (e) => setUser(e.target.value)} type="text" placeholder="სახელი" className="bg-gray-200 dark:bg-gray-800 w-full py-1 px-2 focus:outline-none text-gray-800 dark:text-gray-200" required/>
            </fieldset>
            {userErr && <div className="text-red-500 pl-1">{userErr}</div>}
            <Button name={'გაგზავნა'} />
        </form>
        }
      
        {
            ifTrue && <form onSubmit={changePassword} className="w-full sm:w-1/3 flex flex-col gap-2">
            <fieldset className="border-2 border-gray-300 dark:border-gray-600 p-2">
                <legend className="px-2 text-gray-500">პაროლი</legend>
                <input value={pass} onChange={ (e) => setPass(e.target.value)} type="text" placeholder="*******" className="bg-gray-200 dark:bg-gray-800 w-full py-1 px-2 focus:outline-none text-gray-800 dark:text-gray-200" required/>
            </fieldset>
            <fieldset className="border-2 border-gray-300 dark:border-gray-600 p-2">
                <legend className="px-2 text-gray-500">გაიმეორე პაროლი</legend>
                <input value={rePass} onChange={ (e) => setRePass(e.target.value)} type="text" placeholder="*******" className="bg-gray-200 dark:bg-gray-800 w-full py-1 px-2 focus:outline-none text-gray-800 dark:text-gray-200" required/>
            </fieldset>
            {passErr && <div className="text-red-500 pl-1">{passErr}</div>}
           <Button name={'განაახლე პაროლი'} />
            </form>
        }
    </div>
    )
}

export default ForgotPassword;