import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

import "./style.scss";

import { fetchFromZplexApi } from "../../utils/api";
import ContentWrapper from "../../components/contentWrapper/ContentWrapper";
import MovieCard from "../../components/movieCard/MovieCard";
import Spinner from "../../components/spinner/Spinner";


const Explore = () => {
    const [data, setData] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const { mediaType } = useParams();
    const pageSize = 100;

    const fetchInitialData = () => {
        setLoading(true);
        const path = mediaType === "tv" ? "shows" : "movies";
        fetchFromZplexApi(`/${path}?pageNumber=1&pageSize=${pageSize}`).then((res) => {
            let newData = res.data.map((item) => {
                return {
                    ...item,
                    media_type: mediaType,
                };
            });
            res.data = newData;
            setData(res);
            setPageCount(res.pageCount);
            setLoading(false);
            setHasMore(!(res.pageCount !== 0 && res.pageCount === res.pageNumber));
        });
    };

    const fetchNextPageData = () => {
        if (pageCount === 0) return;
        if (pageCount === pageNumber) return;
        const path = mediaType === "tv" ? "shows" : "movies";
        fetchFromZplexApi(`/${path}?pageNumber=${pageNumber + 1}&pageSize=${pageSize}`)
            .then((res) => {
                let newData = res?.data?.map((item) => {
                    return {
                        ...item,
                        media_type: mediaType,
                    };
                });
                if (!newData) return;
                res.data = newData;

                if (data?.data) {
                    setData({
                        ...data,
                        data: [...data?.data, ...res.data],
                    });
                } else {
                    setData(res);
                }
                setHasMore(!(res.pageCount !== 0 && res.pageCount === res.pageNumber));
                setPageNumber(res.pageNumber);
            });
    };

    useEffect(() => {
        setData(null);
        setPageNumber(1);
        setPageCount(1);
        setHasMore(true);
        fetchInitialData();
    }, [mediaType]);

    return (
        <div className="explorePage">
            <ContentWrapper>
                <div className="pageHeader">
                    <div className="pageTitle">
                        {mediaType === "tv"
                            ? "Explore TV Shows"
                            : "Explore Movies"}
                    </div>
                </div>
                {loading && <Spinner initial={true} />}
                {!loading && (
                    <>
                        {data?.data?.length > 0 ? (

                            <InfiniteScroll
                                className="content"
                                dataLength={data?.data?.length || []}
                                next={fetchNextPageData}
                                hasMore={hasMore}
                                loader={<Spinner />}
                            >
                                {data?.data?.map((item, index) => {
                                    return (
                                        <MovieCard
                                            key={index}
                                            data={item}
                                            mediaType={mediaType}
                                        />
                                    );
                                })}
                            </InfiniteScroll>
                        ) : (
                            <span className="resultNotFound">
                                Sorry, Results not found!
                            </span>
                        )}
                    </>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Explore;
