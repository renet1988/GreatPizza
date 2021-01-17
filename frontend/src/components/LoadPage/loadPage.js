import React from 'react';

function LoadPage(){
    return(
        <div className="row m-0 justify-content-center align-items-center vh-100">
            <div className="col-sm-4 ">
                <div className="text-center">
                    <div className="spinner-grow text-dark" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-dark" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                    <div className="spinner-grow text-dark" role="status">
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
            </div>  
        </div>
    )
}

export default LoadPage;