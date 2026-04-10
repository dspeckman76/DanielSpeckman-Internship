import React, { useEffect, useState } from "react";
import axios from "axios";
import NftCard, { NftCardSkeleton } from "../NftCard";

const AuthorItems = ({ authorId }) => {
  const [author, setAuthor] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authorId) return;
    axios
      .get(`https://us-central1-nft-cloud-functions.cloudfunctions.net/authors?author=${authorId}`)
      .then(({ data }) => setAuthor(data))
      .catch((error) => console.error("Failed to fetch author NFTs:", error))
      .finally(() => setLoading(false));
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
            : author?.nftCollection.map((nft) => (
                <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" key={nft.nftId}>
                  <NftCard
                    {...nft}
                    authorId={authorId}
                    authorImage={author?.authorImage}
                  />
                </div>
              ))}
        </div>
      </div>
    </div>
  );
};

export default AuthorItems;