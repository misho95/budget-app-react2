import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'
import Button from "../components/button";

function Login(){

    const localUserData = JSON.parse(localStorage.getItem('userDataBase'));
    const [userData, setUserData] = useState( localUserData ? localUserData : []);
    const [ user, setUser] = useState('');
    const [ error, setError] = useState(null);
    const [ pass, setPass] = useState('');
    const Navigate = useNavigate();
    const [ passErr, setPassErr] = useState(null);

    const loginUser = (e) => {
        e.preventDefault();
        const userName = userData.find( (usr) => {
            if(usr.user === user) return usr;
        })

        if(!userName){
            setError('მომხმარებელი ვერ მოიძებნა');
            return;
        } else {
            setError(null);
        }

        if(userName.pass === pass){
            setPassErr(null);
            localStorage.setItem('ID', userName.id);
            Navigate('/');
        } else {
            setPassErr('პაროლი არასწორია');
        }
    }

    return(
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-gray-800 dark:text-gray-200 text-xl">ავტორიზაცია</h1>
            <form onSubmit={loginUser} className="w-full sm:w-1/3 flex flex-col gap-2">
                <fieldset className="border-2 border-gray-300 dark:border-gray-600 p-2">
                    <legend className="px-2 text-gray-500">სახელი</legend>
                    <input value={user} onChange={ (e) => setUser(e.target.value)} type="text" placeholder="სახელი" className="bg-gray-200 dark:bg-gray-800 w-full py-1 px-2 focus:outline-none text-gray-800 dark:text-gray-200" required/>
                </fieldset>
                 {error && <div className="text-red-500 pl-1">{error}</div>}
                <fieldset className="border-2 border-gray-300 dark:border-gray-600 p-2">
                    <legend className="px-2 text-gray-500">პაროლი</legend>
                    <input value={pass} onChange={ (e) => setPass(e.target.value)} type="password" placeholder="********" className="bg-gray-200 dark:bg-gray-800 w-full py-1 px-2 focus:outline-none text-gray-800 dark:text-gray-200" required/>
                </fieldset>
                {passErr && <div className="text-red-500 pl-1">{passErr}</div>}
                <Link to='/forgotPassword' className="text-gray-800 dark:text-gray-200">დაგავიწყდა პაროლი?</Link>
                <Button name={'შესვლა'} />
            </form>
        </div>
    )
}

export default Login;