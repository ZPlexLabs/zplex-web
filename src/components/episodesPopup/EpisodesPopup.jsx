import React from "react";
import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import EpisodeCard from "../episodeCard/EpisodeCard";
import CloseButton from "../closeBtn/CloseButton ";
import "./style.scss";

const EpisodesPopup = ({ show, setShow, seasonNumber, setSeasonNumber }) => {
    const { mediaType, id } = useParams();
    const { data, loading } = useFetch(`/${mediaType}/${id}/season/${seasonNumber}`);

    const hidePopup = () => {
        setShow(false);
        setSeasonNumber(null);
    };
    
    return (
        <div className={`seasonPopup ${show ? "visible" : ""}`}>
            <div className="opacityLayer" onClick={hidePopup}></div>
            <div className="seasonsList">
                <CloseButton className="seasonPopupCloseButton" onClick={hidePopup} />

                {loading ? (
                    <div className="skeletonBlock">
                        <div className="skeletonItem"></div>
                        <div className="skeletonItem"></div>
                        <div className="skeletonItem"></div>
                        <div className="skeletonItem"></div>
                    </div>
                ) : (
                    <>
                        <span className="season-title">{"Season " + data?.season_number}</span>
                        <div className="episodesList">
                            {data?.episodes.map((episode) => (
                                <EpisodeCard key={episode.id} data={episode} />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default EpisodesPopup;
