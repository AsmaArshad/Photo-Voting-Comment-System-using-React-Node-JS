import React, { useEffect, useRef, useState } from "react";
import './Home.css'
import img from '../assets/background6.jpg'
import { Link, Outlet } from 'react-router-dom';
import Dropzone from "./Dropzone";
import ImageContainer from "./imageContainer";

let increment = 1;

function Home(props) {
    // let IdHandler = (id) => {

    // }


    let footer = useRef();
    let [loadPhoto, setloadPhoto] = useState([])
    let apiCall = (e) => {
        if (e[0].isIntersecting) {
            increment = increment + 1;
            let LoadPhotos = async function () {
                try {


                    let res = await fetch(`http://localhost:4700/LoadPhoto?page=${increment}`);

                    if (!res.ok) throw new Error('photo are not found')
                    let data = await res.json();
                    setloadPhoto(data)



                } catch (err) {
                    console.error(err);

                }
            }
            LoadPhotos();
        }


    }
    useEffect(() => {
        const Observer = new IntersectionObserver(apiCall, {
            root: null,
            threshold: 0

        })
        // console.log(Observer)
        if (footer.current) Observer.observe(footer.current)

    }, [])

    useEffect(() => {
        let LoadPhotos = async function () {
            try {


                let res = await fetch("http://localhost:4700/LoadPhoto?page=1");

                if (!res.ok) throw new Error('photo are not found')
                let data = await res.json();
                setloadPhoto(data)



            } catch (err) {
                console.error(err);

            }
        }
        LoadPhotos();
    }, [])

    // console.log(loadPhoto.data)

    return (
        <>



            {/* ////////////////modal end//////////////////// */}
            <header >
                <Link to={'/addphoto'}><button type="button" className="btn " >Add Photo</button></Link>
            </header>


            {loadPhoto.data ? loadPhoto.data.map((data) => (
                <ImageContainer
                    img={`/public/uploads/${data.Photo_Path}`}
                    id={data.Id}
                    key={data.Id}
                    totalComment={data.Total_Comments}
                    VoteCount={data.Vote_Count}
                    userName={data.user}
                // onIdReceiver={IdHandler }
                />
            )) : <div style={{ height: '100vh', width: '400px', marginLeft: '50%' }}>
                <div className="spinner-border" role="status" > <span className="sr-only">Loading...</span></div>
            </div>
            }
            <div ref={footer}>footer</div>

        </>
    )
}

export default Home;