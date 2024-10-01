import {  useContext, useState } from "react";
import "./Navbar.scss";
import { Link } from "react-router-dom";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CircleNotificationsIcon from '@mui/icons-material/CircleNotifications';
import SearchIcon from '@mui/icons-material/Search';
import { AuthContext } from "../../authContext/AuthContext";
import { logout } from "../../authContext/AuthActions";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const{dispatch}=useContext(AuthContext)
  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };
  const currentUser=JSON.parse(localStorage.getItem("currentUser"))

  return (
    <div className={isScrolled ? "navbar scrolled" : "navbar"}>
      <div className="container">
        <div className="left">
          <Link to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png"
            alt=""
          />
          </Link>
          <Link to="/" style={{textDecoration:"none",color:"white"}}>
            <span>Home</span>
          </Link>
          <Link to="/series"style={{textDecoration:"none",color:"white"}}>
            <span className="navbarmainLinks">Series</span>
          </Link>
          <Link to="/movies" style={{textDecoration:"none",color:"white"}}>
            <span className="navbarmainLinks">Movies</span>
          </Link>
          <span>New and Popular</span>
          <span>My List</span>
        </div>
        <div className="right">
          <SearchIcon  className="icon" />
          <span>KID</span>
          <CircleNotificationsIcon className="icon" />
          <img
            src="https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
            alt=""
          />
          <div className="profile">
            <ArrowDropDownIcon className="icon" />
            <div className="options">
              <span>Settings</span>
              <span onClick={()=>dispatch(logout())} >Logout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;