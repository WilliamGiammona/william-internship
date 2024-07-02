import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const HotCollections = () => {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  async function fetchData() {
    try {
      const { data } = await axios.get(
        "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
      );
      setApiData(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, [loading]);

  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
          <OwlCarousel
            className="owl-theme"
            loop
            margin={10}
            nav
            responsive={{
              0: {
                items: 1,
              },
              540: {
                items: 1,
              },
              600: {
                items: 2,
              },
              1000: {
                items: 4,
              },
            }}
          >
            {loading
              ? Array.from({ length: 4 }).map((_, index) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12 item"
                    key={index}
                  >
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Skeleton height={200} />
                      </div>
                      <div className="nft_coll_pp">
                        <Skeleton circle={true} height={50} width={50} />
                      </div>
                      <div className="nft_coll_info">
                        <Skeleton width={`60%`} />
                        <Skeleton width={`40%`} />
                      </div>
                    </div>
                  </div>
                ))
              : apiData.map((nftData, index) => (
                  <div
                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12 item"
                    key={index}
                  >
                    <div className="nft_coll">
                      <div className="nft_wrap">
                        <Link to="/item-details">
                          <img
                            src={nftData.nftImage}
                            className="lazy img-fluid"
                            alt=""
                          />
                        </Link>
                      </div>
                      <div className="nft_coll_pp">
                        <Link to="/author">
                          <img
                            className="lazy pp-coll"
                            src={nftData.authorImage}
                            alt=""
                          />
                        </Link>
                        <i className="fa fa-check"></i>
                      </div>
                      <div className="nft_coll_info">
                        <Link to="/explore">
                          <h4>{nftData.title}</h4>
                        </Link>
                        <span>ERC-{nftData.code}</span>
                      </div>
                    </div>
                  </div>
                ))}
          </OwlCarousel>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
