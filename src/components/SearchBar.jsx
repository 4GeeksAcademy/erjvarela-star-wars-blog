import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import useGlobalReducer from "../hooks/useGlobalReducer";
import React, { useState } from 'react';

export const SearchBar = () => {
    const { store } = useGlobalReducer();
    const [textInput, setTextInput] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const data = [
        { content: store.people?.content || [], type: "people" },
        { content: store.vehicles?.content || [], type: "vehicles" },
        { content: store.planets?.content || [], type: "planets" }
    ];

    const handleInputChange = (event) => {
        const value = event.target.value;
        setTextInput(value);

        if (value) {
            const filteredResults = [];

            data.forEach((item) => {
                const matches = item.content.filter((entry) =>
                    entry.name.toLowerCase().includes(value.toLowerCase())
                );
                matches.forEach((match) => {
                    filteredResults.push({ ...match, type: item.type });
                });
            });

            setSuggestions(filteredResults.slice(0, 5));
        } else {
            setSuggestions([]);
        }
    };

    const handleSuggestionClick = (item) => {
        setTextInput(item.name);
        setSuggestions([]);
        console.log("Selected:", item);
    };

    return (
        <div className="position-relative"> 
            <div className="input-group mb-3 mt-3">
                <div className="input-group-prepend">
                    <span className="input-group-text" id="search-bar-icon">
                        <Link to={`/search?query=${textInput}`}>
                            <FontAwesomeIcon icon={faMagnifyingGlass} />
                        </Link>
                    </span>
                </div>
                <input
                    type="text"
                    value={textInput}
                    onChange={handleInputChange}
                    className="form-control"
                    placeholder="Search..."
                    aria-label="Search"
                    aria-describedby="search-bar-icon"
                    style={{ width: "200px" }}
                />
            </div>
            {suggestions.length > 0 && (
                <div className="dropdown-menu show" style={{ width: "200px", position: 'absolute', zIndex: 1 }}>
                    {suggestions.map((item) => (
                        <Link
                            key={item.uid}
                            className="dropdown-item"
                            to={`/details/${item.type}/${item.uid}`}
                            onClick={() => handleSuggestionClick(item)}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
};