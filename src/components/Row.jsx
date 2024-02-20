import React, { useEffect, useState } from 'react'
import { MdChevronLeft,MdChevronRight } from "react-icons/md";
import axios from 'axios';
import Movie from './Movie';
const Row = ({ title, requests,id }) => {
    const [movies, setmovies] = useState([]);
    useEffect(() => {
        axios.get(requests).then((Response) => {
            setmovies(Response.data.results);
        })
    }, [requests]);
    const slideleft=()=>{
        var slider=document.getElementById('slider'+id);
        slider.scrollLeft=slider.scrollLeft-500;
    }
    const slideright=()=>{
        var slider=document.getElementById('slider'+id);
        slider.scrollLeft=slider.scrollLeft+500;
    }
    return (
        <>
            <h2 className='text-white font-bold md:text-xl p-4'>{title}</h2>
            <div className='relative flex item-center group'>
            <MdChevronLeft onClick={slideleft} size={40} className='bg-white rounded-full absolute  top-[35%] opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'></MdChevronLeft>
                <div id={'slider'+id} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
                    {movies.map((item, id) => {
                        return <Movie item={item} key={id}></Movie>
                    })}
                </div>
             <MdChevronRight onClick={slideright} size={40} className='bg-white rounded-full absolute  top-[35%] right-[0%] opacity-50 hover:opacity-100 cursor-pointer z-10 hidden group-hover:block'></MdChevronRight>   
            </div>
        </>
    )
}

export default Row
