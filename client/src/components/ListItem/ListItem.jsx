import "./ListItem.scss"

import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";

export default function ListItem({ index,item }) {
  const [isHovered, setIsHovered] = useState(false);
  const [movie, setMovie] = useState({});
    useEffect(()=>{
    const getMovie=async()=>{
      try{
         const res=await newRequest.get("/movies/find/"+ item,{
          headers:{
            token:
            "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
          }
         })
        setMovie(res.data)
      }catch(err){
        console.log(err)
      }
    };
    getMovie()  
  },[item])


  
  return (
    <Link to={{ pathname: "/watch", movie: movie }}>

    <div
      className="listItem"
      style={{ left: isHovered && index * 225 - 50 + index * 2.5 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img
        src={movie?.imgSm}
        alt=""
      />
      {isHovered && (
        <>
          <video src={movie.trailer} autoPlay={true} loop />
          <div className="itemInfo">
            <div className="icons">
              <PlayArrowIcon  className="icon" />
              <AddCircleOutlineIcon className="icon" />
              <ThumbUpOffAltIcon className="icon" />
              <ThumbDownOffAltIcon className="icon" />
            </div>
            <div className="itemInfoTop">
              <span>{movie.duration}</span>
              <span className="limit">+{movie.limit}</span>
              <span>{movie.year}</span>
            </div>
            <div className="desc">
              {movie.desc}
            </div>
            <div className="genre">Action</div>
          </div>
        </>
      )}
    </div>
    </Link>

  );
}