import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faInfo } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Catalog = (props) => {
    return (
            <div className="card" style={{ width: "13rem" }}>
                <img
                    src="https://via.placeholder.com/286x180"
                    className="card-img-top"
                    alt={props.name}
                    style={{ height: "150px", objectFit: "cover" }}
                />
                <div className="card-body">
                    <h5 className="card-title text-center">{props.name}</h5>
                    <div className="d-flex gap-3 justify-content-center">
                        <Link to="#">
                            <FontAwesomeIcon icon={faHeart} />
                        </Link>
                        <Link to={`/details/${props.type}/${props.uid}`}>
                            <FontAwesomeIcon icon={faInfo} />
                        </Link>
                    </div>
                </div>
            </div>
    );
};

export default Catalog;
