import React from 'react';

const DetailBox = ({ details }) => {
    if (!details) {
        return <div className="alert alert-info" role="alert">Loading details...</div>;
    }

    return (
        <div className="card mt-4">
            <div className="card-header bg-primary text-white">
                <h2 className="card-title mb-0">{details.name}</h2>
            </div>
            <div className="card-body">
                <div className="row">
                    <div className="col-md-6">
                        <p className="card-text"><strong>Gender:</strong> {details.gender}</p>
                        <p className="card-text"><strong>Skin Color:</strong> {details.skin_color}</p>
                        <p className="card-text"><strong>Hair Color:</strong> {details.hair_color}</p>
                        <p className="card-text"><strong>Height:</strong> {details.height} cm</p>
                        <p className="card-text"><strong>Eye Color:</strong> {details.eye_color}</p>
                    </div>
                    <div className="col-md-6">
                        <p className="card-text"><strong>Mass:</strong> {details.mass} kg</p>
                        <p className="card-text"><strong>Homeworld:</strong>
                            <a href={details.homeworld} target="_blank" rel="noopener noreferrer" className="ms-2">{details.homeworld}</a>
                        </p>
                        <p className="card-text"><strong>Birth Year:</strong> {details.birth_year}</p>
                        <p className="card-text"><strong>Created:</strong> {new Date(details.created).toLocaleDateString()} {new Date(details.created).toLocaleTimeString()}</p>
                        <p className="card-text"><strong>Edited:</strong> {new Date(details.edited).toLocaleDateString()} {new Date(details.edited).toLocaleTimeString()}</p>
                        <p className="card-text"><strong>URL:</strong>
                            <a href={details.url} target="_blank" rel="noopener noreferrer" className="ms-2">{details.url}</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DetailBox;