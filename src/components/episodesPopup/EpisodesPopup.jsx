import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchDataFromApi, fetchFromZplexApi } from "../../utils/api";

import EpisodeCard from "../episodeCard/EpisodeCard";
import CloseButton from "../closeBtn/CloseButton ";
import Spinner from "../spinner/Spinner";
import "./style.scss";

const EpisodesPopup = ({ show, setShow, seasonNumber, setSeasonNumber, seasonId, showName }) => {
    const { mediaType, id } = useParams();
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchEpisodes = async () => {
        try {
            const original = await fetchDataFromApi(`/${mediaType}/${id}/season/${seasonNumber}`);
            const zplex = await fetchFromZplexApi(`/shows/${id}/seasons/${seasonId}`);

            let newEpisodes = original?.episodes.map((item) => {
                const fileId = zplex.find((episode) => episode.id === item.id)?.fileId;
                if (!fileId) return item;
                return {
                    ...item,
                    fileId: fileId,
                };
            });

            original.episodes = newEpisodes;
            setData(original);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching episodes:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (seasonNumber) {
            fetchEpisodes();
        }
    }, [seasonNumber]);

    const hidePopup = () => {
        setShow(false);
        setSeasonNumber(null);
    };

    return (
        <div className={`seasonPopup ${show ? "visible" : ""}`}>
            <div className="opacityLayer" onClick={hidePopup}></div>
            <div className="seasonsList">
                <CloseButton className="seasonPopupCloseButton" onClick={hidePopup} />
                {loading ? (<Spinner initial={true} />) : (
                    <>
                        <span className="season-title">{"Season " + data?.season_number}</span>
                        <div className="episodesList">
                            {data?.episodes.map((episode) => (
                                <EpisodeCard key={episode.id} data={episode}
                                    title={`${showName} - S${String(seasonNumber).padStart(2, '0')}E${String(episode.episode_number).padStart(2, '0')} - ${episode.name}`}
                                />
                            ))}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default EpisodesPopup;
