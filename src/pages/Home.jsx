import React from "react";
import { Link } from "react-router-dom";

import { BsArrowRight } from "react-icons/bs";

function Home() {
  return (
    <>
      <div className="container my-5">
        <div className="col-12 row m-0">
          <div className="col-7 d-flex align-items-center">
            <div>
              <h4 className="text-secondary">
                Ljubimac ti je sam pošto ti imaš obaveze?
              </h4>
              <h1 className="mb-3">Nadji pravog čuvara za svog ljubimca</h1>
              <p>
                Naša platforma ti pomaže da nadješ čuvara za svog najvoljenijeg
                ljubimca sa svega par klikova. Pogledaj oglase, kontaktiraj
                čuvara. toliko je jednostavno!
              </p>
              <Link className="btn btn-success" to={"/ads"}>
                Pogledaj oglase <BsArrowRight className="ms-2" />
              </Link>
            </div>
          </div>
          <img
            src="/img/hero.avif"
            alt="Dog"
            className="col-5 img-fluid rounded p-0 float-end"
          />
        </div>
      </div>
      <div class="bg-success bg-opacity-50 py-5">
        <div className="d-flex justify-content-center text-center gap-5 my-2">
          <div className="px-5">
            <h1>
              <strong>251</strong>
            </h1>
            <p>Postavljenih oglasa</p>
          </div>
          <div className="px-5">
            <h1>
              <strong>352</strong>
            </h1>
            <p>Srećnih ljubimaca</p>
          </div>
          <div className="px-5">
            <h1>
              <strong>183</strong>
            </h1>
            <p>Zadovoljnih korisnika</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
