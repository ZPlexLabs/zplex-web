import React from "react";
import { useSelector } from "react-redux";
import PosterFallback from "../../assets/no-poster.png";
import Img from "../lazyLoadImage/Img";
import playButton from "../../assets/play-button.svg";

import "./style.scss";

const EpisodeCard = ({ data }) => {
    const { url } = useSelector((state) => state.home);
    const posterUrl = data.still_path
        ? url.poster + data.still_path
        : PosterFallback;

    const onEpisodeClick = () => {
        if (!data) return;
        const fileId = data.fileId;
        if (!fileId) return;
        console.log(`episode click ${data}`)
    }

    return (
        <div className="episode-card" onClick={onEpisodeClick}>
            <span className="episode-number">{data?.episode_number}</span>
            <div className="episode-thumb-container">
                <Img className="episode-thumb" src={posterUrl} alt={`Episode ${data?.episode_number} ${data?.name}`} />
                {data.fileId && <img class="play-icon" src={playButton} />}
            </div>
            <div className="episode-meta">
                <span className="episode-title">{data?.name}</span>
                <span className="episode-overview">{data?.overview ?? "No description"}</span>
            </div>
        </div>
    );
};

export default EpisodeCard;
