function Regist(){
    return(
        <div className="flex flex-col justify-center items-center">
            <h1 className="text-gray-800 dark:text-gray-200 text-xl">Registration</h1>
            <form className="w-full sm:w-1/3 flex flex-col gap-2">
                <fieldset className="border-2 border-gray-300 dark:border-gray-600 p-2">
                    <legend className="px-2 text-gray-500">UserName</legend>
                    <input type="text" placeholder="username" className="bg-gray-200 dark:bg-gray-800 w-full py-1 px-2 focus:outline-none" required/>
                </fieldset>
                <fieldset className="border-2 border-gray-300 dark:border-gray-600 p-2">
                    <legend className="px-2 text-gray-500">Email</legend>
                    <input type="email" placeholder="example@mail" className="bg-gray-200 dark:bg-gray-800 w-full py-1 px-2 focus:outline-none" required/>
                </fieldset>
                <fieldset className="border-2 border-gray-300 dark:border-gray-600 p-2">
                    <legend className="px-2 text-gray-500">PassWord</legend>
                    <input type="password" placeholder="********" className="bg-gray-200 dark:bg-gray-800 w-full py-1 px-2 focus:outline-none" required/>
                </fieldset>
                <fieldset className="border-2 border-gray-300 dark:border-gray-600 p-2">
                    <legend className="px-2 text-gray-500">Re-PassWord</legend>
                    <input type="password" placeholder="********" className="bg-gray-200 dark:bg-gray-800 w-full py-1 px-2 focus:outline-none" required/>
                </fieldset>
                <button className="bg-purple-300 p-2">Login</button>
            </form>
        </div>
    )
}

export default Regist;