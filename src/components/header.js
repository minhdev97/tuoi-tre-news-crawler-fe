import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getCategories, selectCategoryList } from '../features/categorySlice';
import { useNavigate } from 'react-router-dom';
import "../assets/header.css"
const Header = () => {
    const categoryList = useSelector(selectCategoryList);
    const dispatch = useDispatch();
    const navigate = useNavigate(); // Initialize the navigate function

    const fetchCategories = async () => {
        if (categoryList == null) {
            await dispatch(getCategories());
        }
    };

    useEffect(() => {
        fetchCategories();
    }, [categoryList]);


    useEffect(() => {
        fetchCategories();
    }, []);

    const transformedCategories = categoryList ? categoryList.map(category => ({
        name: category.categoryName,
        id: category.id,
    })) : [];

    const handleCategoryClick = (categoryId,categoryName) => {
        if (categoryName === "Trang chủ") {
            navigate('/');
        } else {
            navigate(`/${categoryId}`);
        }
    };

    return (
        <div className="card">
            <nav className="navbar navbar-expand-lg navbar-light border-0">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav">
                        {transformedCategories.map(category => (
                            <li className="nav-item" key={category.id}>
                                <a className="nav-link category-link" onClick={() => handleCategoryClick(category.id, category.name)}>
                                    {category.name}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Header;
