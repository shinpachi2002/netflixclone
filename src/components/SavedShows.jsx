import React from 'react'
import { useState,useEffect } from 'react'
import { UserAuth } from '../Context/AuthContext'
import { db } from '../Firebase'
import { updateDoc,doc,snapshot, onSnapshot } from 'firebase/firestore'
import { MdChevronLeft,MdChevronRight } from 'react-icons/md'
import { AiOutlineClose } from "react-icons/ai";
const SavedShows = () => {
    const[movies,setmovies]=useState([]);
    const{user}=UserAuth();
    const slideleft=()=>{
        var slider=document.getElementById('slider');
        slider.scrollLeft=slider.scrollLeft-500;
    }
    const slideright=()=>{
        var slider=document.getElementById('slider');
        slider.scrollLeft=slider.scrollLeft+500;
    }
    useEffect(()=>{
           onSnapshot(doc(db,'users',`${user?.email}`),(doc)=>{
                 setmovies(doc.data()?.savedShows);
           })
    },[user?.email]) 
    const movieref=doc(db,'users',`${user?.email}`);
    const deleteshow=async (passedID)=>{
          try{
              const result=movies.filter((item)=>item.id!==passedID);
              await updateDoc(movieref,{
                savedShows:result,
              })
          }
          catch(error){
             console.log(error);
          }
    }
    return (
        <div>
            <div className='relative flex item-center group top-[450px]'>
                <MdChevronLeft onClick={slideleft} size={40} className='bg-white rounded-full absolute  top-[35%] opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'></MdChevronLeft>
                <div id={'slider'} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
                    {movies.map((item, id) => {
                        return (<div key={id} className='w-[160px] sm:w-[200px] md:w-[240px] lg:w-[280px] inline-block cursor-pointer relative p-2 '>
                            <img src={`https://image.tmdb.org/t/p/w500/${item?.image}`} alt={item?.title} />
                            <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white '>
                                <p className='whitespace-normal text-xs md:text-sm font-bold flex justify-center items-center h-full'>{item.title}</p>
                            </div>
                            <AiOutlineClose onClick={()=>{return deleteshow(item.id)}} className='absolute text-gray-300 top-4 right-4'></AiOutlineClose>
                        </div>)
                    })}
                </div>
                <MdChevronRight onClick={slideright} size={40} className='bg-white rounded-full absolute  top-[35%] right-[0%] opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'></MdChevronRight>
            </div>
        </div>
    )
}

export default SavedShows
