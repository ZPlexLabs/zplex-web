import React, { useRef, useState } from "react";
import {
    BsFillArrowLeftCircleFill,
    BsFillArrowRightCircleFill,
} from "react-icons/bs";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";

import "../carousel/style.scss";
import EpisodesPopup from "../episodesPopup/EpisodesPopup";

const Seasons = ({ seasons, loading }) => {
    const carouselContainer = useRef();
    const [show, setShow] = useState(false);
    const [seasonNumber, setSeasonNumber] = useState(null);
    const [seasonId, setSeasonId] = useState(null);
    const { url } = useSelector((state) => state.home);

    const navigation = (dir) => {
        const container = carouselContainer.current;

        const scrollAmount =
            dir === "left"
                ? container.scrollLeft - (container.offsetWidth + 20)
                : container.scrollLeft + (container.offsetWidth + 20);

        container.scrollTo({
            left: scrollAmount,
            behavior: "smooth",
        });
    };
    const seasonOnClick = (season) => {
        setSeasonNumber(season.season_number);
        setSeasonId(season.id);
        setShow(true);
    }

    const skItem = () => {
        return (
            <div className="skeletonItem">
                <div className="posterBlock skeleton"></div>
                <div className="textBlock">
                    <div className="title skeleton"></div>
                    <div className="date skeleton"></div>
                </div>
            </div>
        );
    };

    return (
        <div className="carousel">
            <ContentWrapper>
                <div className="carouselTitle">Seasons</div>
                <BsFillArrowLeftCircleFill
                    className="carouselLeftNav arrow"
                    onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className="carouselRighttNav arrow"
                    onClick={() => navigation("right")}
                />
                {!loading ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {seasons?.map((item) => {
                            const posterUrl = item.poster_path
                                ? url.poster + item.poster_path
                                : PosterFallback;
                            const title = "Season " + item.season_number;
                            return (
                                <div
                                    key={item.id}
                                    className="carouselItem"
                                    onClick={() =>
                                        seasonOnClick(item)
                                    }>
                                    <div className="posterBlock">
                                        <Img src={posterUrl} />
                                        <CircleRating rating={item.vote_average.toFixed(1) ?? 0.0} />
                                        {item.name !== title && (
                                            <div className="genres">
                                                <div key={item.name} className="genre">{item.name}</div>
                                            </div>
                                        )}
                                    </div>
                                    <div className="textBlock">
                                        <span className="title">{title}</span>
                                        <span className="date">{dayjs(item.air_date).format("MMM D, YYYY")}</span>
                                    </div>
                                </div>
                            );
                        })}
                        {seasonNumber && <EpisodesPopup
                            show={show}
                            setShow={setShow}
                            seasonNumber={seasonNumber}
                            setSeasonNumber={setSeasonNumber}
                            seasonId={seasonId}
                        />}
                    </div>
                ) : (
                    <div className="loadingSkeleton">
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                        {skItem()}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Seasons;
