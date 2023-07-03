import React from "react";

import { FaCat, FaDog, FaDove } from "react-icons/fa";
import { BiMap } from "react-icons/bi";
import { BsPerson, BsCurrencyDollar, BsTelephone } from "react-icons/bs";

import AdType from "../../utils/AdType";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../../firebase-conf";

const Ad = ({ adData, isMyAd, reload }) => {
  let adImage = {
    icon: null,
    color: "",
  };

  const deleteAd = async () => {
    const ref = doc(db, "ads", adData.id);
    await deleteDoc(ref);
    reload(adData.id);
  };

  switch (adData.type) {
    case AdType.Dog:
      adImage.icon = <FaDog style={{ fontSize: 60 }} />;
      adImage.color = "#7dfc77";
      break;
    case AdType.Cat:
      adImage.icon = <FaCat style={{ fontSize: 60 }} />;
      adImage.color = "#77bafc";
      break;
    case AdType.Parrot:
      adImage.icon = <FaDove style={{ fontSize: 60 }} />;
      adImage.color = "#fcb177";
      break;
    default:
      adImage.icon = <BsPerson style={{ fontSize: 60 }} />;
      adImage.color = "#f58cbe";
      break;
  }

  return (
    <>
      <div className="card mb-3">
        <div className="row g-0">
          <div
            className="col-md-3 d-flex justify-content-center align-items-center"
            style={{ backgroundColor: adImage.color }}
          >
            {adImage.icon}
          </div>
          <div className="col-md-9">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="card-title">{adData.title}</h5>
                <div className="d-flex gap-3">
                  <small className="text-muted">
                    <BsCurrencyDollar className="mb-1" /> {adData.price} rsd/h
                  </small>
                  <small className="text-muted">
                    <BiMap className="mb-1" /> {adData.city}
                  </small>
                </div>
              </div>

              <p className="card-text">{adData.about}</p>
              <hr />
              <p className="card-text">
                <div className="d-flex justify-content-between align-items-center">
                  <p className="text-muted text-decoration-none m-0">
                    <BsPerson className="mb-1 me-1" />
                    {adData.creatorName}
                  </p>
                  {!isMyAd ? (
                    <a
                      class="text-muted text-decoration-none m-0"
                      href={"tel:" + adData.creatorPhoneNumber}
                    >
                      <BsTelephone className="mb-1 me-1" />
                      {adData.creatorPhoneNumber}
                    </a>
                  ) : (
                    <button className="btn btn-danger" onClick={deleteAd}>
                      Obriši oglas
                    </button>
                  )}
                </div>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Ad;
