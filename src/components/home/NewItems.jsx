import React, { useState, useEffect } from "react";
<<<<<<< HEAD
import { Link } from "react-router-dom";
=======
>>>>>>> ExploreItems
import OwlCarousel from "react-owl-carousel";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";
import axios from "axios";
<<<<<<< HEAD

const Countdown = ({ expiryDate }) => {                       // Countdown component receives expiryDate (Unix ms timestamp) as a prop
  const calcTimeLeft = () => {                                // Inner helper function to calculate how much time is left
    const diff = expiryDate - Date.now();                     // Subtract current time from expiry time to get milliseconds remaining
    if (diff <= 0) return null;                               // If the countdown has expired or is invalid, return null to signal "done"
    const h = Math.floor(diff / 3600000);                     // Convert ms to whole hours (3,600,000 ms in an hour)
    const m = Math.floor((diff % 3600000) / 60000);           // Get remaining ms after hours are removed, then convert to whole minutes
    const s = Math.floor((diff % 60000) / 1000);              // Get remaining ms after minutes are removed, then convert to whole seconds
    return `${String(h).padStart(2, "0")}h 
    ${String(m).padStart(2, "0")}m 
    ${String(s).padStart(2, "0")}s`;                          // Return formatted string e.g. "03h 07m 05s", padStart ensures 2 digits always
  };

  const [timeLeft, setTimeLeft] = useState(calcTimeLeft);     // Initialize timeLeft state by immediately calling calcTimeLeft for the first value

  useEffect(() => {
    const timer = setInterval(() => {                         // Start an interval that fires every 1000ms (1 second)
      const t = calcTimeLeft();                               // Recalculate the remaining time on each tick
      setTimeLeft(t);                                         // Update state with the new time value, triggering a re-render
      if (!t) clearInterval(timer);                           // If calcTimeLeft returned null (expired), stop the interval
    }, 1000);
    return () => clearInterval(timer);                        // Cleanup: clear the interval when the component unmounts or expiryDate changes
  }, [expiryDate]);                                           // Re-run this effect if expiryDate prop changes

  if (!timeLeft) return null;                                 // If the countdown is done (null), render nothing
  return <div className="de_countdown">{timeLeft}</div>;      // Otherwise render the countdown string inside the expected className
};

// Create API back-end Data
=======
import NftCard, { NftCardSkeleton } from "../NftCard";

const carouselOptions = {
  loop: true,
  margin: 10,
  nav: true,
  dots: false,
  responsive: {
    0:   { items: 1 },
    576: { items: 2 },
    768: { items: 3 },
    992: { items: 4 },
  },
};

>>>>>>> ExploreItems
const NewItems = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          "https://us-central1-nft-cloud-functions.cloudfunctions.net/newItems"
        );
        setItems(response.data);
<<<<<<< HEAD
        setLoading(false);
      } catch (error) {
        console.error("Error fetching new items:", error);
=======
      } catch (error) {
        console.error("Error fetching new items:", error);
      } finally {
>>>>>>> ExploreItems
        setLoading(false);
      }
    };
    fetchItems();
  }, []);

<<<<<<< HEAD
  const options = {
    loop: true,
    margin: 10,
    nav: true,
    dots: false,
    responsive: {
      0:   { items: 1 },
      576: { items: 2 },
      768: { items: 3 },
      992: { items: 4 },
    },
  };

=======
>>>>>>> ExploreItems
  return (
    <section id="section-items" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>New Items</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>
<<<<<<< HEAD
          <div className="col-lg-12">
            {loading ? (
              // Loading Skeleton
              <OwlCarousel className="owl-theme" {...options} key="skeleton">
                {new Array(8).fill(0).map((_, index) => (
                  <div className="item" key={index}>
                    <div className="nft__item">
                      <div className="nft_coll_pp">
                        <div className="skeleton-box"></div>
                      </div>
                      <div className="nft_wrap">
                        <div className="skeleton-box"></div>
                      </div>
                      <div className="nft_coll_info">
                        <div className="skeleton-box"></div>
                        <div className="skeleton-box"></div>
                      </div>
                    </div>
=======

          <div className="col-lg-12">
            {loading ? (
              // ── Skeleton carousel ──────────────────────────────────────────
              <OwlCarousel className="owl-theme" {...carouselOptions} key="skeleton">
                {new Array(8).fill(0).map((_, index) => (
                  <div className="item" key={index}>
                    <NftCardSkeleton />
>>>>>>> ExploreItems
                  </div>
                ))}
              </OwlCarousel>
            ) : (
<<<<<<< HEAD
              // Actual Data
              <OwlCarousel className="owl-theme" {...options} key="items">
                {items.map((item) => (
                  <div className="item" key={item.id}>
                    <div className="nft__item">
                      <div className="author_list_pp">
                        <Link
                          to={`/author/${item.authorId}`}
                          data-bs-toggle="tooltip"
                          data-bs-placement="top"
                          title={`Creator: ${item.authorId}`}
                        >
                          <img className="lazy" src={item.authorImage} alt="" />
                          <i className="fa fa-check"></i>
                        </Link>
                      </div>

                      {item.expiryDate && (
                        <Countdown expiryDate={item.expiryDate} />
                      )}

                      <div className="nft__item_wrap">
                        <div className="nft__item_extra">
                          <div className="nft__item_buttons">
                            <button>Buy Now</button>
                            <div className="nft__item_share">
                              <h4>Share</h4>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-facebook fa-lg"></i>
                              </a>
                              <a href="" target="_blank" rel="noreferrer">
                                <i className="fa fa-twitter fa-lg"></i>
                              </a>
                              <a href="">
                                <i className="fa fa-envelope fa-lg"></i>
                              </a>
                            </div>
                          </div>
                        </div>
                        <Link to={`/item-details/${item.nftId}`}>
                          <img
                            src={item.nftImage}
                            className="lazy nft__item_preview"
                            alt=""
                          />
                        </Link>
                      </div>

                      <div className="nft__item_info">
                        <Link to={`/item-details/${item.nftId}`}>
                          <h4>{item.title}</h4>
                        </Link>
                        <div className="nft__item_price">{item.price} ETH</div>
                        <div className="nft__item_like">
                          <i className="fa fa-heart"></i>
                          <span>{item.likes}</span>
                        </div>
                      </div>
                    </div>
=======
              // ── Live data carousel ─────────────────────────────────────────
              <OwlCarousel className="owl-theme" {...carouselOptions} key="items">
                {items.map((item) => (
                  <div className="item" key={item.id}>
                    <NftCard
                      nftId={item.nftId}
                      nftImage={item.nftImage}
                      title={item.title}
                      price={item.price}
                      likes={item.likes}
                      authorId={item.authorId}
                      authorImage={item.authorImage}
                      expiryDate={item.expiryDate}
                    />
>>>>>>> ExploreItems
                  </div>
                ))}
              </OwlCarousel>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewItems;