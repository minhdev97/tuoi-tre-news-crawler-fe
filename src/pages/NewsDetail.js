import React, { useEffect } from "react";
import Header from "../components/header";
import { useDispatch, useSelector } from "react-redux";
import { getNewsDetail, selectNewsDetail, selectLoadingNews } from "../features/newsSlice";
import { useParams } from "react-router-dom";
import NewsContent from "../components/newsContent";
import "../assets/newsDetail.css";
import {ProgressSpinner} from "primereact/progressspinner";

const NewsDetail = () => {
    const dispatch = useDispatch();
    const { newsId } = useParams();
    const newsDetail = useSelector(selectNewsDetail);
    const loadingNews = useSelector(selectLoadingNews);

    useEffect(() => {
        dispatch(getNewsDetail(newsId));
    }, [newsId]);

    return (
        <>
            <Header />
            {loadingNews ? (
                <div className="card flex justify-content-center">
                    <ProgressSpinner />
                </div>
            ) : (
                <>
                    {newsDetail && (
                        <>
                            <h4>
                                <span className="badge badge-pill badge-light" style={{ float: "right" }}>
                                    {newsDetail.publishDate}
                                </span>
                            </h4>
                            <h4>
                                <span className="badge badge-success">{newsDetail.category}</span>
                            </h4>
                            <h1>{newsDetail.title}</h1>
                            <h3>{newsDetail.detailSapo}</h3>
                            <NewsContent htmlContent={newsDetail.newsContent} />
                        </>
                    )}
                </>
            )}
        </>
    );
};

export default NewsDetail;
