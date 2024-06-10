import React from "react";
import { useParams } from "react-router-dom";
import "./style.scss";

import useFetch from "../../hooks/useFetch";
import DetailsBanner from "./detailsBanner/DetailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videosSection/VideosSection";
import Similar from "./carousels/Similar";
import Recommendation from "./carousels/Recommendation";
import Seasons from "../../components/seasons/Seasons";

const Details = () => {
    const { mediaType, id } = useParams();
    const { data: detailsData, loading: detailsLoading } = useFetch(`/${mediaType}/${id}`);
    const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
    const { data: credits, loading: creditsLoading } = useFetch(
        `/${mediaType}/${id}/credits`
    );

    return (
        <div>
            <DetailsBanner data={detailsData} loading={detailsLoading} video={data?.results?.[0]} crew={credits?.crew} />
            {detailsData?.seasons && detailsData.seasons.length > 0 && (
                <Seasons seasons={detailsData?.seasons} loading={detailsLoading} />
            )}
            <Cast data={credits?.cast} loading={creditsLoading} />
            <Similar mediaType={mediaType} id={id} />
            <Recommendation mediaType={mediaType} id={id} />
            <VideosSection data={data} loading={loading} />
        </div>
    );
};

export default Details;
