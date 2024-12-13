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

// date formatting (good job chatGPT!)
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'long' });
        const year = date.getFullYear();
      
        // Get the suffix for the day (st, nd, rd, th)
        const getDaySuffix = (day) => {
          if (day > 3 && day < 21) return 'th';
          switch (day % 10) {
            case 1: return 'st';
            case 2: return 'nd';
            case 3: return 'rd';
            default: return 'th';
          }
        };
      
        return `${day}${getDaySuffix(day)} ${month} ${year}`;
      };


    return (
        <div>
            <h1>My Entries</h1>
            <p>UID: {uid}</p>
            <ul>
                {entries && Object.keys(entries).map(entryId => (
                    <li key={entryId}>
                        {/* {entryId}, */}
                        {entries[entryId].mood}, {formatDate(entries[entryId].date)},
                        {/* show the first sentence from entries[entryId].negative[0] */}
                        {entries[entryId].negative[0].split(".")[0]}...
                    </li>
                ))}
            </ul>
        </div>
    )
}