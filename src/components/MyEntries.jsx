import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import formatDate  from "../utils/formatDate";
import { NavLink } from "react-router-dom";

import veryBad from "../images/very-bad.svg";
import bad from "../images/bad.svg";
import neutral from "../images/neutral.svg";
import good from "../images/good.svg";
import veryGood from "../images/very-good.svg";


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
            {/* <p>UID: {uid}</p> */}
            <ul className="entry-list">
                {entries && Object.keys(entries)
                    .sort((a, b) => new Date(entries[b].date) - new Date(entries[a].date))
                    .map(entryId => (
                        <li key={entryId}
                            onClick={() => handleClick(entryId)}
                            className="link-card"
                        >
                            <h3>
                                <NavLink to={`/my-journal/${entryId}`}>
                                    <span>
                                        {/* show the mood assessment, and changed the colour of the icons (not smart) */}
                                        {entries[entryId].mood === "0" && <img src={veryBad} alt="" style={{ filter: "invert(1) sepia(1) saturate(10000%) hue-rotate(180deg) brightness(0.5)" }} />}
                                        {entries[entryId].mood === "1" && <img src={bad} alt="" style={{ filter: "invert(1) sepia(1) saturate(10000%) hue-rotate(180deg) brightness(0.5)" }} />}
                                        {entries[entryId].mood === "2" && <img src={neutral} alt="" style={{ filter: "invert(1) sepia(1) saturate(10000%) hue-rotate(180deg) brightness(0.5)" }} />}
                                        {entries[entryId].mood === "3" && <img src={good} alt="" style={{ filter: "invert(1) sepia(1) saturate(10000%) hue-rotate(180deg) brightness(0.5)" }} />}
                                        {entries[entryId].mood === "4" && <img src={veryGood} alt="" style={{ filter: "invert(1) sepia(1) saturate(10000%) hue-rotate(180deg) brightness(0.5)" }} />}
                                        {formatDate(entries[entryId].date)}
                                    </span>
                                </NavLink>
                            </h3>
                            {/* show the first sentence from entries[entryId].negative[0], if it exists */}
                            <p>{entries[entryId].negative && entries[entryId].negative[0]}...</p>
                        </li>
                    ))}
            </ul>
        </div>
    )
}