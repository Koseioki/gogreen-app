import { useEffect, useState } from "react"

export default function MyEntries({uid}){
    const [entries, setEntries] = useState({});

    const url = `https://gogreen-app-1d826-default-rtdb.firebaseio.com/users/${uid}/entries.json`;

    useEffect(() => {
        async function getEntries() {
            const response = await fetch(url);
            const data = await response.json();
            setEntries(data);
        }
        getEntries();

    }, [url]);

    return (
        <div>
            <h1>My Entries</h1>
            <p>UID: {uid}</p>
            <ul>
                {entries && Object.keys(entries).map(entryId => (
                    <li key={entryId}>
                        {/* {entryId}, */}
                        {entries[entryId].date},

                    </li>
                ))}
            </ul>
        </div>
    )
}