import React from "react";
import { auth, db } from "../../firebase-conf";
import "./Ads.css";
import { useState, useEffect } from "react";

import Ad from "../../components/Ads/Ad";
import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

import axios from "axios";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

const Ads = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [gradovi, setGradovi] = useState([]);
  const [userData, setUserData] = useState({});
  const [oglasi, setOglasi] = useState([]);
  const [reloadState, reload] = useState("");

  auth.onAuthStateChanged((e) => setLoggedIn(e != null));

  const adCollectionRef = collection(db, "ads");

  const getCities = async () => {
    await axios
      .post(`https://countriesnow.space/api/v0.1/countries/cities`, {
        country: "serbia",
      })
      .then((e) => setGradovi(e.data.data));
  };

  const getUserData = async () => {
    try {
      const userData = (
        await getDoc(doc(db, "users", auth.currentUser.uid))
      ).data();

      setUserData(userData);
    } catch (err) {
      console.error(err);
    }
  };

  const getAds = async (searchQuery) => {
    try {
      const data = await getDocs(adCollectionRef);
      const filteredData = data.docs
        .map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))
        .filter(
          (e) => e.title.includes(searchQuery) || e.about.includes(searchQuery)
        );
      setOglasi(filteredData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUserData();
    getCities();
    getAds("");
  }, [reloadState]);

  return (
    <>
      <div className="container d-flex justify-content-center my-5" id="ads">
        <div className="row col-9">
          <div className="col-3">
            {loggedIn ? (
              <Link className="btn btn-success mb-3 col-12" to={"/newad"}>
                Postavi oglas
              </Link>
            ) : (
              <button className="btn btn-success mb-3 col-12 disabled">
                Postavi oglas
              </button>
            )}
            <div className="input-group mb-3">
              <span className="input-group-text">
                <BsSearch />
              </span>
              <input
                type="text"
                className="form-control shadow-none"
                placeholder="Pretraga"
                onChange={(e) => getAds(e.target.value)}
              />
            </div>
            <div className="input-group mb-3">
              <select
                id="inputState"
                className="form-select"
                onChange={(e) => {}}
                value={"grad"}
              >
                <option>Grad</option>
                {gradovi.map((grad) => (
                  <option value={grad} key={grad}>
                    {grad}
                  </option>
                ))}
              </select>
            </div>
            <div className="input-group mb-3">
              <select
                id="inputState"
                className="form-select"
                onChange={(e) => {}}
                value={"Tražim čuvara"}
              >
                <option value={"Tražim čuvara"}>Tražim čuvara</option>
                <option>Nudim čuvanje</option>
              </select>
            </div>
            <div className="input-group">
              <select
                id="inputState"
                className="form-select"
                onChange={(e) => {}}
                value={"Sortiraj"}
              >
                <option>Sortiraj</option>
                <option>Jeftinije</option>
                <option>Skuplje</option>
                <option>Najnovije</option>
              </select>
            </div>
          </div>
          <div className="col-1 d-flex justify-content-center">
            <div className="vr"></div>
          </div>
          <div className="col-8">
            {oglasi.map((e) => (
              <Ad
                key={e.id}
                adData={e}
                isMyAd={e.creatorName == userData.name}
                reload={reload}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Ads;
