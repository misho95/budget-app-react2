function Regist(){

    const localUserData = JSON.parse(localStorage.getItem('userDataBase'));
    const [userData, setUserData] = useState( localUserData ? localUserData : []);
    const [ user, setUser ] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');
    const [rePass, setRePass] = useState('');

    const submitNewUser = (e) => {
        e.preventDefault();
        if(pass !== rePass){
            alert('passwords do not match')
            return;
        }

            setUserData([...userData, {
                id: uuidv4(),
                user,
                email,
                pass,
            }]);

    }

    useEffect( () => {
        localStorage.setItem('userDataBase', JSON.stringify(userData));
    }, [userData])

    return(
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-gray-800 dark:text-gray-200 text-xl">Registration</h1>
            <form className="w-full sm:w-1/3 flex flex-col gap-2">
                <fieldset className="border-2 border-gray-300 dark:border-gray-600 p-2">
                    <legend className="px-2 text-gray-500">UserName</legend>
                    <input value={user} onChange={(e)=> { setUser(e.target.value)}} type="text" placeholder="username" className="bg-gray-200 dark:bg-gray-800 w-full py-1 px-2 focus:outline-none text-gray-800 dark:text-gray-200" required/>
                </fieldset>
                <fieldset className="border-2 border-gray-300 dark:border-gray-600 p-2">
                    <legend className="px-2 text-gray-500">Email</legend>
                    <input value={email} onChange={(e) => { setEmail(e.target.value)}} type="email" placeholder="example@mail" className="bg-gray-200 dark:bg-gray-800 w-full py-1 px-2 focus:outline-none text-gray-800 dark:text-gray-200" required/>
                </fieldset>
                <fieldset className="border-2 border-gray-300 dark:border-gray-600 p-2">
                    <legend className="px-2 text-gray-500">PassWord</legend>
                    <input value={pass} onChange={(e) => {setPass(e.target.value)}} type="password" placeholder="********" className="bg-gray-200 dark:bg-gray-800 w-full py-1 px-2 focus:outline-none text-gray-800 dark:text-gray-200" required/>
                </fieldset>
                <fieldset className="border-2 border-gray-300 dark:border-gray-600 p-2">
                    <legend className="px-2 text-gray-500">Re-PassWord</legend>
                    <input value={rePass} onChange={(e) => {setRePass(e.target.value)}} type="password" placeholder="********" className="bg-gray-200 dark:bg-gray-800 w-full py-1 px-2 focus:outline-none text-gray-800 dark:text-gray-200" required/>
                </fieldset>
                <button className="bg-purple-300 p-2">Login</button>
            </form>
        </div>
    )
}

export default Regist;