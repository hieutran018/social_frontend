import './ckc_social_logo.png';
import React from "react";
import { Helmet } from "react-helmet";

class Application extends React.Component {
    render() {
        return (
            <div className="application">
                <Helmet>
                    <meta charSet="utf-8" />
                    <title>CKC Social</title>
                    <link rel="canonical" href="./ckc_social_logo.png" />
                </Helmet>
                ...
            </div>
        );
    }
};

export default Application;