import { useNavigate, NavLink } from "react-router-dom";
import { useEffect } from "react";
import { auth } from "../firebase-config";
import chat from "../images/chat.svg";
import blank from "../images/blank.svg";

// import Nav from "../components/Nav";

export default function NewEntryPage() {

    useEffect(() => {
        document.title = 'New entry - Slow Diary';
    }, []);


    const navigate = useNavigate();
    // 
    const url = `https://gogreen-app-1d826-default-rtdb.firebaseio.com/users/${auth.currentUser?.uid}/entries.json`;

    // console.log(auth.currentUser?.uid);
    async function handleStartJournaling() {

        // add entry under the user's entries
        async function createEntry(newEntry) {
            const response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(newEntry)
            });
            if (response.ok) {
                const data = await response.json();
                navigate(`/guided-journal/${data.name}`);
            }


            else {
                console.log("Sorry, something went wrong");
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
            <div
                onClick={handleStartJournaling}
                className="link-card">

                <h2>
                    <NavLink>
                        <span><img src={chat} alt="" />
                            Guided journalling</span>
                    </NavLink>
                </h2>
                <p>Guided questions to inspire your thoughts</p>
            </div>

            <div className="link-card">

                <h2>
                    <span>
                        <img src={blank} alt="" />
                        Free journalling
                    </span>
                </h2>
                <p>An open page for your freeform writing</p>
            </div>
        </main>
    );
}
