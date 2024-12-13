import { useParams, useNavigate } from "react-router-dom";
import { useEffect,useState } from "react";
import { auth } from "../firebase-config";
import formatDate from "../utils/formatDate";

export default function EntryDetailPage (){
    const [entry, setEntry] = useState({});
    const {entryId} = useParams();
    const navigate = useNavigate();

    // get the entry data using entryId
    useEffect(() => {
        async function getEntry() {
            const response = await fetch(`https://gogreen-app-1d826-default-rtdb.firebaseio.com/users/${auth.currentUser?.uid}/entries/${entryId}.json`);
            const data = await response.json();
            // console.log(data);
            setEntry(data);
        }
        getEntry();
        // console.log(entry);
    }
    , [entryId]);

    function handleBack(){
        navigate(-1);
    }

    return(
        <main className="page" id="main-content">
                    <button className="back-button" onClick={handleBack}>Back</button>

        <h1>{formatDate(entry.date)}</h1>
        <p>entry id: {entryId}</p>
        <p>mood: {entry.mood}</p>
        {/* list all the things inside entry.negative */}
        <ul>
            {entry.negative && entry.negative.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>
        {/* the same thing to the positive */}
        <ul>
            {entry.positive && entry.positive.map((item, index) => (
                <li key={index}>{item}</li>
            ))}
        </ul>



        </main>

    );
}