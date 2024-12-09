import { useNavigate } from "react-router-dom";


export default function NewEntryPage() {
    const navigate = useNavigate();

    function handleStartJournaling() {
        navigate("/guided-journal");
    }

    return (
        <main className="page" id="main-content">
            <h1>New Entry</h1>
            <article
            onClick={handleStartJournaling}
            tabIndex={0}
            //the same function when pressed enter key
            onKeyDown={(event) => {
                if (event.key === "Enter") {
                    handleStartJournaling();
                }
            }}
            className="link-card">
                <h2>Guided journaling</h2>
                <p>Guided questions to inspire your thoughts</p>
            </article>

            <article className="link-card">
                <h2>Free journaling</h2>
                <p>An open page for your freeform writing</p>
            </article>
        </main>
    );
}