import React from "react";

const NewsContent = ({ htmlContent }) => {
    // Ensure the HTML content is trusted or sanitized before rendering it
    const sanitizedHTML = { __html: htmlContent };

    return (
        <div>
            <div dangerouslySetInnerHTML={sanitizedHTML} />
        </div>
    );
};

export default NewsContent;
