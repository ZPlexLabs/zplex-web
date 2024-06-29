import React from "react";
import dayjs from "dayjs";
import { useSelector } from "react-redux";

import "./style.scss";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";

const MovieCard = ({ data, fromSearch, mediaType }) => {
    const { url } = useSelector((state) => state.home);
    const posterPath = data.posterPath || data.poster_path;
    const posterUrl = posterPath
        ? url.poster + posterPath
        : PosterFallback;

    return (
        <a className="movieCard" href={`/${data.media_type || mediaType}/${data.id}`}>
            <div className="posterBlock">
                <Img className="posterImg" src={posterUrl} />
            </div>
            <div className="textBlock">
                <span className="title">{data.title || data.name}</span>
                <span className="date">
                    {dayjs(data.release_date).format("MMM D, YYYY")}
                </span>
            </div>
        </a>
    );
};

export default MovieCard;
