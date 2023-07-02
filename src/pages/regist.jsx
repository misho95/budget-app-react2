import { useState, useEffect } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";


function Regist(){

    const localUserData = JSON.parse(localStorage.getItem('userDataBase'));
    const [userData, setUserData] = useState( localUserData ? localUserData : []);
    const [ user, setUser ] = useState('');
    const [ userErr, setUserErr] = useState(null);
    const [ userSucc, setUserSucc] = useState(null);
    const [ email, setEmail ] = useState('');
    const [ pass, setPass ] = useState('');
    const [ rePass, setRePass ] = useState('');
    const [ passErr, setPassErr ] = useState(null);
    const navigate = useNavigate(); 

    const checkUser = () => {
            if(user === ''){
                setUserErr('გთოხვთ შეავსოთ ველი');
                setUserSucc(null);
                return;
            }
                if(user.includes(' ')){
                setUserErr('არ გამოიყენო სფეისები');
                setUserSucc(null);
                return;
            }
         
            const checkUser = userData.find( (userData) => {
                if(userData.user === user) return userData;
            });

            if(checkUser) {
                setUserErr('უკვე არსებობს');
                setUserSucc(null);
                return;
            } else {
                setUserErr(null);
                setUserSucc('შესაძლებელია');
                return;
            }
    }

    const checkPass = () => {
        if(pass !== '' && rePass !== '' && pass !== rePass){
            setPassErr('პაროლები არ ემთხვევა');
        } else {
            setPassErr(null);
        }
    }

    const submitNewUser = (e) => {
        e.preventDefault();
        if(userErr || passErr){
            return;
        }
            setUserData([...userData, {
                id: uuidv4(),
                user,
                email,
                pass
            }]);

          setTimeout(() => {
            navigate('/signin')
          }, 1000);
    }

    useEffect( () => {
        localStorage.setItem('userDataBase', JSON.stringify(userData));
    }, [userData])



    return(
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-gray-800 dark:text-gray-200 text-xl">რეგისტრაცია</h1>
            <form onSubmit={submitNewUser} className="w-full sm:w-1/3 flex flex-col gap-2">
                <div>
                    <fieldset className="border-2 border-gray-300 dark:border-gray-600 p-2">
                        <legend className="px-2 text-gray-500">სახელი</legend>
                        <input value={user} onChange={(e) => { setUser(e.target.value)}} onBlur={checkUser} type="text" placeholder="სახელი" className="bg-gray-200 dark:bg-gray-800 w-full py-1 px-2 focus:outline-none text-gray-800 dark:text-gray-200" required/>
                    </fieldset>
                    {userErr && <div className="text-red-500 pl-1">{userErr}</div>} { userSucc && <div className="text-green-500 pl-1">{userSucc}</div> }
                </div>
                <fieldset className="border-2 border-gray-300 dark:border-gray-600 p-2">
                        <legend className="px-2 text-gray-500">მაილი</legend>
                        <input value={email} onChange={(e) => { setEmail(e.target.value)}} type="email" placeholder="Example@mail.com" className="bg-gray-200 dark:bg-gray-800 w-full py-1 px-2 focus:outline-none text-gray-800 dark:text-gray-200" required/>
                </fieldset>
                <div>
                    <fieldset className="border-2 border-gray-300 dark:border-gray-600 p-2">
                        <legend className="px-2 text-gray-500">პაროლი</legend>
                        <input value={pass} onChange={(e) => { setPass(e.target.value)}} onBlur={checkPass} type="password" placeholder="********" className="bg-gray-200 dark:bg-gray-800 w-full py-1 px-2 focus:outline-none text-gray-800 dark:text-gray-200" required/>
                    </fieldset>
                    {passErr && <div className="text-red-500 pl-1">{passErr}</div>}
                </div>
                <fieldset className="border-2 border-gray-300 dark:border-gray-600 p-2">
                        <legend className="px-2 text-gray-500">გაიმეორე პაროლი</legend>
                        <input value={rePass} onChange={(e) => { setRePass(e.target.value)}} onBlur={checkPass} type="password" placeholder="********" className="bg-gray-200 dark:bg-gray-800 w-full py-1 px-2 focus:outline-none text-gray-800 dark:text-gray-200" required/>
                    </fieldset>
                <button className="bg-purple-300 p-2">რეგისტრაცია</button>
            </form>
        </div>
    )
}

export default Regist;