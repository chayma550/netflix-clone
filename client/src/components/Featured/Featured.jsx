import React, { useEffect, useState } from 'react'
import "./Featured.scss"
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import axios from 'axios';
export default function Featured({type,setGenre}) {
const[content,setContent]=useState({});

useEffect(()=>{
const getRandomContent=async()=>{
  try{
    const res=await axios.get(`/movies/random?type=${type}`, {
      headers:{
        token:
        "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
      },
      });
      setContent(res.data);
    }catch(err){
    console.log(err)
  }
};
getRandomContent()
},[type])
  
  return (
    <div className='featured'>
        {type && (
            <div className="category">
            <span> { type === "movies" ? "Movies" : "Series"}</span>
            <select
             name="Genre"
              id="genre"
              onChange={(e) => setGenre(e.target.value)}
              >
            <option>Genre</option>
            <option value="adventure">Adventure</option>
            <option value="comedy">Comedy</option>
            <option value="crime">Crime</option>
            <option value="fantasy">Fantasy</option>
            <option value="historical">Historical</option>
            <option value="horror">Horror</option>
            <option value="romance">Romance</option>
            <option value="sci-fi">Sci-fi</option>
            <option value="thriller">Thriller</option>
            <option value="western">Western</option>
            <option value="animation">Animation</option>
            <option value="drama">Drama</option>
            <option value="documentary">Documentary</option>
                
                </select>    
                 </div>
        )}
        <img 
        src="https://thepopblogph.com/wp-content/uploads/2022/07/tv-film-netflix-grey-man-new-keyart.jpg"
        alt=''
        />
        <div className="info">

            <span className='desc'>
            {content.desc}
            </span>
        
        <div className="buttons">
            <button className='play'><PlayArrowIcon/>
            <span>Play</span>
            </button>
            <button className='more'><HelpOutlineIcon/>
            <span>Info</span>
                </button>
        </div>
        </div>
    </div>
  )
}
