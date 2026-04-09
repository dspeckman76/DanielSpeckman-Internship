import React, { useEffect, useState } from "react";
import axios from "axios";
import NftCard, { NftCardSkeleton } from "../NftCard";

const AuthorItems = ({ authorId }) => {
  const [nfts, setNfts] = useState([]);
  const [authorImage, setAuthorImage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authorId) return;

    const fetchAuthorNfts = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(
          `https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`
        );
        setAuthorImage(data.authorImage);
        setNfts(data.nftCollection ?? []);
      } catch (error) {
        console.error("Failed to fetch author NFTs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAuthorNfts();
  }, [authorId]);

  return (
    <div className="de_tab_content">
      <div className="tab-1">
        <div className="row">
          {loading
            ? new Array(8).fill(0).map((_, index) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={index}>
                  <NftCardSkeleton />
                </div>
              ))
            : nfts.map((nft) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={nft.nftId}>
                  <NftCard
                    nftId={nft.nftId}
                    nftImage={nft.nftImage}
                    title={nft.title}
                    price={nft.price}
                    likes={nft.likes}
                    authorId={authorId}
                    authorImage={authorImage}
                    expiryDate={nft.expiryDate}
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;