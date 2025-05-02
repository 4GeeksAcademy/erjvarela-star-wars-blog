import CatalogBox from "../components/CatalogBox.jsx";
import useGlobalReducer from "../hooks/useGlobalReducer";
import { useEffect } from "react";

const url = "https://www.swapi.tech";

async function fetchContent(route, page, dispatch, target) {
    try {
        console.log(`Fetching: ${url}${route}${page}`);
        const response = await fetch(`${url}${route}${page}`);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        const data = await response.json();

        // Validar la estructura de los datos
        if (!data.results || !Array.isArray(data.results)) {
            throw new Error("Invalid data structure: results is not an array");
        }

        // Actualizar el store
        dispatch({
            target,
            type: "set",
            payload: {
                content: data.results,
                page: page,
                totalPages: data.total_pages,
            },
        });
    } catch (error) {
        console.error(`Failed to fetch ${route}:`, error);
    }
}

function generatePageNumbers(totalPages) {
    let array = [];
    for (let i = 1; i <= totalPages; i++) {
        array.push(i);
    }
    return array;
}

export const Home = () => {
    const { store, dispatch } = useGlobalReducer();

    useEffect(() => {
        // Verificar si los datos ya están en el store o si la página cambió
        if (!store.people.content || store.people.content.length === 0 || store.people.page !== 1) {
            fetchContent(`/api/people?page=`, store.people.page, dispatch, "people");
        }
        if (!store.vehicles.content || store.vehicles.content.length === 0 || store.vehicles.page !== 1) {
            fetchContent(`/api/vehicles?page=`, store.vehicles.page, dispatch, "vehicles");
        }
        if (!store.planets.content || store.planets.content.length === 0 || store.planets.page !== 1) {
            fetchContent(`/api/planets?page=`, store.planets.page, dispatch, "planets");
        }
    }, [store.people, store.vehicles, store.planets]);

    return (
        <>
            <CatalogBox
                title="People"
                numberOfContent={Array.from({ length: store.people.totalPages || 1 }, (_, i) => i + 1)}
                contents={store.people.content || []}
                setPage={(page) =>
                    dispatch({
                        target: "people",
                        type: "set",
                        payload: { ...store.people, page },
                    })
                }
                contentType="people"
            />
            <CatalogBox
                title="Vehicles"
                numberOfContent={Array.from({ length: store.vehicles.totalPages || 1 }, (_, i) => i + 1)}
                contents={store.vehicles.content || []}
                setPage={(page) =>
                    dispatch({
                        target: "vehicles",
                        type: "set",
                        payload: { ...store.vehicles, page },
                    })
                }
                contentType="vehicles"
            />
            <CatalogBox
                title="Planets"
                numberOfContent={Array.from({ length: store.planets.totalPages || 1 }, (_, i) => i + 1)}
                contents={store.planets.content || []} 
                setPage={(page) =>
                    dispatch({
                        target: "planets",
                        type: "set",
                        payload: { ...store.planets, page },
                    })
                }
                contentType="planets"
            />
        </>
    );
};