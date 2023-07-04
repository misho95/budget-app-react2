import { useSearchParams } from "react-router-dom";
import { useState } from "react";
import Button from '../components/button'
import { useNavigate } from "react-router-dom";

function Profile(){

    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const ID = searchParams.get('id');
    const getUserData = JSON.parse(localStorage.getItem('userDataBase'));
    const user = getUserData.find( (usr) => {
        if(usr.id === ID) return usr;
    })

    const [editImg, setEditImg ] = useState(false);
    const [imgLink, setImgLink] = useState(user.profileImg);
    const changeImg =() => {
        setEditImg(true);
    }

    const changeLink = () => {
        const map = getUserData.map( (usr) => {
            if(usr.id === ID) {
            return {
                ...usr,
                profileImg: imgLink
            }
        } else {
            return usr
        }
    })

    localStorage.setItem('userDataBase', JSON.stringify(map));
    setEditImg(false);
    }

    const deleteUser = () => {
        const deleteUsr = getUserData.filter( (user) => {
            if(user.id !== ID) return user;
        });
        localStorage.setItem('userDataBase', JSON.stringify(deleteUsr));
        localStorage.removeItem('ID');
        setTimeout( () => {
            navigate('/')
        }, 200)
    }

    return(
        <div className="flex justify-center pt-10">
            <div className="w-1/2 border-2 border-gray-300 dark:border-gray-700 p-5 flex flex-col gap-5">
                <div className="border-b-2 border-b-purple-300 p-2">სახელი: {user.user}</div>
                <div className="border-b-2 border-b-purple-300 p-2">მეილი: {user.email}</div>
                <div className="border-b-2 border-b-purple-300 p-2">პაროლი: {user.pass}</div>
                { !editImg && <div className="border-b-2 border-b-purple-300 p-2 relative">პროფილის სურათი: {user.profileImg}
                <button onClick={changeImg} className="absolute top-0 right-0">
                    <span class="material-symbols-outlined">
                    edit
                    </span>
                </button>
                </div>
                }
                {
                editImg && 
                <div className="flex gap-2">
                    <input type="text" value={imgLink} onChange={(e) => { setImgLink(e.target.value) }} className="w-full p-1"/>
                    <Button name={'შეცვლა'} handler={changeLink} />
                </div>
                }
                <Button name={'მომხმარებლის წაშლა'} handler={deleteUser}/>
            </div>
        </div>
    )
}

export default Profile;