import React, {useEffect, useState} from 'react';
import Header from "../components/header";
import {useDispatch, useSelector} from "react-redux";
import {getHomePageNews, getNewsByCategoryId, selectNewsList} from "../features/newsSlice";
import {Link, useParams} from "react-router-dom";
import { ProgressSpinner } from 'primereact/progressspinner';

const HomePage = () => {
    const dispatch = useDispatch();
    const {categoryId} = useParams();
    const homePageNewsList = useSelector(selectNewsList);
    const [homePageNews, setHomePageNews] = useState([]);
    const [pageSize, setPageSize] = useState(12);
    const [page, setPage] = useState(0)
    const [scrollPosition, setScrollPosition] = useState(0);


    const [isLoading, setIsLoading] = useState(false);
    const [showSpinner, setShowSpinner] = useState(false);
    const fetchHomePageNews = (categoryId,page,pageSize) => {
        setShowSpinner(false);
        setIsLoading(false);
        if (categoryId) {
            dispatch(getNewsByCategoryId({ id: categoryId, page, pageSize }))
        } else {
            dispatch(getHomePageNews({ page, pageSize }));
        }
    };

    useEffect(() => {
        fetchHomePageNews(categoryId,page,pageSize);
    }, [pageSize, categoryId]);

    useEffect(() => {
        fetchHomePageNews(categoryId,page,pageSize);
    }, []);

    useEffect(() => {
        if (homePageNewsList && homePageNewsList.content) {
            setHomePageNews(homePageNewsList.content);
        }
        }, [homePageNewsList]);

    const handleScroll = () => {
        const scrollTop = window.scrollY;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        const scrollPercentage = (scrollTop / (documentHeight - windowHeight)) * 100;

        setScrollPosition(scrollPercentage);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    useEffect(() => {
        if (scrollPosition >= 95) {
            setIsLoading(true);
            setShowSpinner(true);
            setTimeout(() => {
                    setPageSize(prevPageSize => prevPageSize + 12);
                    setPage(prevPage => prevPage + 1);
                    window.scrollTo({
                        bot: (document.documentElement.scrollHeight - window.innerHeight) * 0.1,
                        behavior: "smooth"
                    });
            }, 1000
            )
        }
    }, [scrollPosition]);

    return (
        <>
            <Header />
                <div className="container">
                    <div className="row">
                        {homePageNews?.map((homePageNew) => (
                            <div className="col-lg-3 col-md-4 col-sm-6 mb-4 pl-3" key={homePageNew.id}>
                                <Link to={`/news/${homePageNew.id}`}>
                                    <div className="card" style={{ height: '500px' }}>
                                        <img src={homePageNew.img} className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <h5 className="card-title">{homePageNew.title}</h5>
                                            <p className="card-text">{homePageNew.detailSapo}</p>
                                            <span className="badge badge-success">{homePageNew.category}</span>
                                            <div style={{ float: 'right' }}>{homePageNew.publishDate}</div>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))}
                    </div>
                    {showSpinner && (
                        <div className="card flex justify-content-center">
                            <ProgressSpinner />
                        </div>
                    )}
                </div>
        </>

    );
}

export default HomePage;
