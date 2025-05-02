import { NavLink, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faTrash } from "@fortawesome/free-solid-svg-icons";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { SearchBar } from "./SearchBar.jsx";

export const Navbar = () => {
    const { store, dispatch } = useGlobalReducer();

    const removefavorite = (uid) => {
        const currentFavorites = [...store.favorites];
        const checkFavorite = currentFavorites.find((item) => item.uid === uid);

        if (checkFavorite) {
            dispatch({
                target: "favorites",
                type: "remove",
                payload: {
                    removeId: uid,
                },
            });
        }
    };

    return (
        <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
            <div className="container">
                <NavLink className="navbar-brand" to="/">
                    <img src="https://lumiere-a.akamaihd.net/v1/images/sw_logo_stacked_2x-52b4f6d33087_7ef430af.png?region=0,0,586,254" alt="Startwars" width="100" height="48" />
                </NavLink>
                <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <div className="d-flex align-items-center" style={{ width: '100%', maxWidth: '800px' }}>
                        <div className="col-lg-8">
                            <SearchBar />
                        </div>
                        <div className="nav-item dropdown ms-auto">
                            <button
                                className="nav-link dropdown-toggle d-flex align-items-center gap-2"
                                href="#"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ color: "white" }} // Added inline style to make the text white
                            >
                                <FontAwesomeIcon icon={faHeart} style={{ color: "red"}}/>
                                <span>Favorites</span>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-end">
                                {store.favorites ? (
                                    store.favorites.map((item, index) => (
                                        <li key={index}>
                                            <div className="dropdown-item d-flex justify-content-between align-items-center">
                                                <Link className="dropdown-item" to={`/details/${item.type}/${item.uid}`}>
                                                    {item.name}
                                                </Link>
                                                <button onClick={() => { removefavorite(item.uid) }} className="btn btn-danger btn-sm">
                                                    <FontAwesomeIcon icon={faTrash} />
                                                </button>
                                            </div>
                                        </li>
                                    ))
                                ) : (
                                    <li>
                                        <Link className="dropdown-item" to="#">
                                            No favorites
                                        </Link>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};