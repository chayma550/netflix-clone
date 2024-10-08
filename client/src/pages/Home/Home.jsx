import React, { useEffect, useState } from 'react'
import "./Home.scss"
import Navbar from "../../components/Navbar/Navbar";
import Featured from '../../components/Featured/Featured';
import List from '../../components/List/List';
import newRequest from '../../utils/newRequest';
const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const res = await newRequest.get(
          `lists${type ? "?type=" + type : ""}${
            genre ? "&genre=" + genre : ""
          }`,
          {
            headers: {
              token:
              "Bearer "+JSON.parse(localStorage.getItem("user")).accessToken,
            },
          }
        );
        setLists(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre}  />
      {lists.map((list) => (
        <List list={list} />
      ))}
    </div>
  );
};

export default Home;