import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeartCirclePlus, faInfo } from '@fortawesome/free-solid-svg-icons';
import useGlobalReducer from "../hooks/useGlobalReducer";
import { Link } from 'react-router-dom';

const Catalog = (props) => {
    const { store, dispatch } = useGlobalReducer();

    const addToFavorites = (uid, name, type) => {
        const currentFavorites = [...store.favorites];
        const checkFavorite = currentFavorites.find((item) => item.name === name);

        if (!checkFavorite) {
            dispatch({
                target: "favorites",
                type: "add",
                payload: {
                    uid,
                    name,
                    type,
                },
            });
            console.log(`Added ${uid} to favorites`);
        } else {
            console.log(`UID ${uid} is already in favorites`);
        }
    };

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
                        <Link to="#" onClick={() => addToFavorites(props.uid, props.name, props.type)}>
                        <FontAwesomeIcon icon={faHeartCirclePlus} />
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
