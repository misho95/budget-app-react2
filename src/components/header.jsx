import { Link } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

function Header(){

    const darkSlide = useRef();
    const darkBtn = useRef();

    const localTheme = localStorage.getItem('theme');
    const [ theme, setTheme ] = useState(localTheme ? localTheme : true);

    const darkMode = () => {
        setTheme(!theme);
    }

    useEffect( () => {
        if(theme === true && document.documentElement.classList.contains('dark')){
            document.documentElement.classList.remove('dark');
            darkSlide.current.classList.remove('left-8');
            darkSlide.current.classList.add('left-1');
            darkBtn.current.textContent = 'light_mode';
        } else {
            document.documentElement.classList.add('dark');
            darkSlide.current.classList.remove('left-1');
            darkSlide.current.classList.add('left-8');
            darkBtn.current.textContent = 'dark_mode';
        }
        localStorage.setItem('theme', theme);
    }, [theme])


    return(
        <div className="flex justify-between">
            <div className='flex gap-2'>
                <Link to='/' className='bg-purple-300 text-purple-800 p-1 flex rounded-full'>
                    <span className="material-symbols-outlined">
                    home
                    </span>
                </Link>
                <Link to='/login' className='bg-purple-300 text-purple-800 p-1 flex rounded-full'>
                    <span className="material-symbols-outlined">
                    account_circle
                    </span>
                </Link>
                <Link to='/registration' className='bg-purple-300 text-purple-800 p-1 flex rounded-full'>
                    <span className="material-symbols-outlined">
                    how_to_reg
                    </span>
                </Link>
            </div>
            <span>
                <div onClick={darkMode} className="w-16 h-8 bg-gray-200 dark:bg-gray-800 rounded-full border-2 border-gray-300 dark:border-gray-700 relative">
                    <div ref={darkSlide} className="w-6 h-6 bg-gray-400 dark:bg-gray-600 absolute left-1 top-1/2 -translate-y-1/2 rounded-full border-2 border-gray-300 dark:border-gray-700 flex justify-center items-center  duration-200">
                        <span ref={darkBtn} className="material-symbols-outlined text-gray-200 dark:text-gray-400 select-none text-sm" >
                            light_mode
                        </span>
                    </div>
                </div>
            </span>
        </div>
    )
}

export default Header;