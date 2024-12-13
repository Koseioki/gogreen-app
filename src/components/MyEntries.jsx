import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import formatDate  from "../utils/formatDate";

export default function MyEntries({ uid }) {
    const [entries, setEntries] = useState({});
    const url = `https://gogreen-app-1d826-default-rtdb.firebaseio.com/users/${uid}/entries.json`;
    const navigate = useNavigate();

    useEffect(() => {
        async function getEntries() {
            const response = await fetch(url);
            const data = await response.json();
            setEntries(data);
        }
        getEntries();

    }, [url]);

    function handleClick(entryId) {
        navigate(`/my-journal/${entryId}`);
        // console.log(entryId);
    }

    

    return (
        <div>
            <h2>My Entries</h2>
            <p>UID: {uid}</p>
            <ul>
                {entries && Object.keys(entries).map(entryId => (
                    <li key={entryId}
                    onClick={() => handleClick(entryId)}
                    className="link-card">
                        <h3>
                            {entries[entryId].mood}, {formatDate(entries[entryId].date)}
                            </h3>
                        {/* show the first sentence from entries[entryId].negative[0] */}
                        {/* {entries[entryId].negative[0].split(".")[0]}... */}
                    </li>
                ))}
            </ul>
        </div>
    )
}