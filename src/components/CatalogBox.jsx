import Catalog from "../components/Catalog.jsx";

const CatalogBox = (props) => {
    return (
        <div className="container">
            <div className="people-catalog mt-5 mb-5 d-flex flex-column">
                <div>
                    <h2>{props.title}</h2>
                </div>
                <div className="d-flex flex-row gap-3 col-12 flex-wrap justify-content-center mt-3">
                    {props.contents.map((content) => (
                        <Catalog
                            name={content.name}
                            type={props.contentType}
                            key={content.uid}
                            uid={content.uid}
                            url={content.url}
                        />
                    ))}
                </div>
                <div className="d-flex flex-row gap-3 col-12 flex-wrap justify-content-center mt-3">
                    {props.numberOfContent.map((number) => (
                        <button
                            type="button"
                            className="btn btn-outline-primary"
                            key={number}
                            onClick={() => props.setPage(number)}
                        >
                            {number}
                        </button>
                    ))}
                </div>
                <hr />
            </div>
        </div>
    );
};

export default CatalogBox;