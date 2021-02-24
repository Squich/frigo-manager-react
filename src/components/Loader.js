import React from 'react';

const Loader = () => {
    return (
        <div className="d-flex justify-content-center my-5">
            <div className="lds-roller">
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    )
}

export default Loader;