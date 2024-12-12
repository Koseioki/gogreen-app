import { useNavigate, NavLink } from "react-router-dom";
import { auth } from "../firebase-config";
// import Nav from "../components/Nav";

export default function NewEntryPage() {
    const navigate = useNavigate();

    // console.log(auth.currentUser?.uid);
    async function handleStartJournaling() {
        async function createEntry(newEntry) {
            const url = "https://gogreen-app-1d826-default-rtdb.firebaseio.com/entries.json";
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(newEntry)
            });
            if (response.ok) {
                const data = await response.json();
                // console.log("New entry created: ", data);
                // Navigate to /guided-journal with the new entry id
                navigate(`/guided-journal/${data.name}`);
            } else {
                // console.log("Sorry, something went wrong");
            }
        }

        const newEntry = {
            date: new Date().toISOString(),
            uid: auth.currentUser.uid
        };

        createEntry(newEntry);
    }

    return (
        <main className="page" id="main-content">
            <h1>New Entry</h1>
            <article
                onClick={handleStartJournaling}
  
                className="link-card">
                <h2>
                    <NavLink>
                        Guided journalling
                    </NavLink>
                </h2>
                <p>Guided questions to inspire your thoughts</p>
            </article>

            <article className="link-card">
                <h2>Free journalling</h2>
                <p>An open page for your freeform writing</p>
            </article>
        </main>
    );
}
