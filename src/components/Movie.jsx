import React from 'react'
import { useState } from 'react';
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { UserAuth } from '../Context/AuthContext';
import { db } from '../Firebase';
import { doc,updateDoc,arrayUnion } from 'firebase/firestore';
const Movie = ({item}) => {
    const{user}=UserAuth();
    const [like, setlike] = useState(false);
    const [saved,setsaved]=useState(false);
    const movieId=doc(db,"users",`${user?.email}`);
    const savedShow=async ()=>{
        try{
            if(user?.email){
                setlike(!like);
                setsaved(true);
                await updateDoc(movieId,{
                    savedShows:arrayUnion({
                        id:item.id,
                        title:item.title,
                        image:item.backdrop_path
                    }),
                });
            }
            else{
                alert("please Login in first");
            }
        }
        catch(error){
            console.log(error);
        }
    }
    return (
        <>
            <div className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 '>
                <img src={`https://image.tmdb.org/t/p/w500/${item?.backdrop_path}`} alt={item?.title} />
                <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white '>
                    <p className='whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full'>{item.title}</p>
                    <p onClick={savedShow}>
                        {like ? <FaHeart className='absolute top-4 left-4 text-gray-400'></FaHeart> : <FaRegHeart className='absolute top-4 left-4 text-gray-400'></FaRegHeart>}
                    </p>
                </div>
            </div>
        </>
    )
}

export default Movie
