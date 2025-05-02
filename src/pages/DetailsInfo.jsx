import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart, faInfo } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import DetailBox from "../components/DetailBox.jsx";

const url = "https://www.swapi.tech";

async function fetchDetails(route, contentId) {
    try {
        const response = await fetch(`${url}${route}${contentId}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Failed to fetch details:`, error);
    }
}

export const DetailsInfo = () => {
    const [details, setDetails] = useState(null);
    const { type, contentId } = useParams();

    useEffect(() => {
        fetchDetails(`/api/${type}/`, contentId).then((data) => {
            if (data) {
                setDetails(data.result.properties);
            }
        });
    }, [contentId]);

    return (
        <div className="container">
            <DetailBox details={details} />
        </div>
    );
};