import React, { useEffect, useState } from 'react'
import requests from '../Request';
import axios from 'axios';
const Main = () => {
    const [movies, setmovies] = useState([]);
    const movie = movies[Math.floor(Math.random() * movies.length)]
    useEffect(() => {
        axios.get(requests.requestPopular).then((Response) => {
            setmovies(Response.data.results);
        })
    }, [])
    console.log(movie);
    const truncatestring=(str,num)=>{
        if(str?.length>num){
            return str.slice(0,num)+"...";
        }
        else{
            return str;
        }
    }
    return (
        <div className='w-full h-[550px] text-white'>
            <div className='w-full h-full'>
                <div className='absolute w-full h-[550px] bg-gradient-to-r from-black'></div>
                <img className='w-full h-full object-cover' src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`} alt={movie?.title} />
                <div className='absolute top-[20%] p-4 md:p-8'>
                     <h1 className='text-3xl md:text-5xl'>{movie?.title}</h1>
                    <div className='my-4'>
                        <button className='border bg-gray-50 text-black border-gray-300 py-2 px-5'>Play</button>
                        <button className='border ml-4 text-white border-gray-300 py-2 px-5'>Watch Later</button>
                    </div>
                    <p className='text-gray-400 text-sm'>Released:{movie?.release_date}</p>
                    <p className='text-gray-200 md:max-w-[75%] lg:max-w-[50%] xl:max-w-[35%]'>{truncatestring(movie?.overview,150)}</p>
                </div>
            </div>
        </div>
    )
}

export default Main
