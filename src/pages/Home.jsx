import CatalogBox from "../components/CatalogBox.jsx";
import { useEffect, useState } from "react";

const url = "https://www.swapi.tech";

async function fetchContent(route, setContentFunction, setNumberFunction) {
    try {
        console.log(`${url}${route}`);
        const response = await fetch(`${url}${route}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();
        generateNumberArray(data.total_pages, setNumberFunction);
        setContentFunction(data.results);
    } catch (error) {
        console.error(`Failed to fetch ${route}:`, error);
    }
}

function generateNumberArray(n, setNumberFunction) {
    const arr = [];
    for (let i = 1; i <= n; i++) {
        arr.push(i);
    }
    setNumberFunction(arr);
}

export const Home = () => {
    const [people, setPeople] = useState([]);
    const [numberPeople, setNumberPeople] = useState([]);
    const [pagePeople, setPagePeople] = useState(1);

    const [vehicles, setVehicles] = useState([]);
    const [numberVehicles, setNumberVehicles] = useState([]);
    const [pageVehicles, setPageVehicles] = useState(1);

	const [planets, setPlanets] = useState([]);
	const [numberPlanets, setNumberPlanets] = useState([]);
	const [pagePlanets, setPagePlanets] = useState(1);

    useEffect(() => {
        fetchContent(`/api/people?page=${pagePeople}`, setPeople, setNumberPeople);
        fetchContent(`/api/vehicles?page=${pageVehicles}`, setVehicles, setNumberVehicles);
		fetchContent(`/api/planets?page=${pagePlanets}`, setPlanets, setNumberPlanets);
        console.log(pagePeople, pageVehicles);
    }, [pagePeople, pageVehicles, pagePlanets]);

    return (
        <>
            <CatalogBox title="People" numberOfContent={numberPeople} contents={people} setPage={setPagePeople} contentType="people"/>
            <CatalogBox title="Vehicles" numberOfContent={numberVehicles} contents={vehicles} setPage={setPageVehicles} contentType="vehicles"/>
			<CatalogBox title="Planets" numberOfContent={numberPlanets} contents={planets} setPage={setPagePlanets} contentType="planets"/>
        </>
    );
};