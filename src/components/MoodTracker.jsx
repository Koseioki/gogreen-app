import React from 'react';
import { useEffect, useState } from 'react';
import "./MoodTracker.css";
// import formatDate from "../utils/formatDate";

export default function MoodTracker({ uid }) {
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


    // for shorter date format
    function formatDate(dateString) {
        // Create a new Date object from the input date string
        const date = new Date(dateString);
    
        // Define an array of month abbreviations
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    
        // Get the day and month
        const day = date.getDate(); // Day of the month (1-31)
        const month = monthNames[date.getMonth()]; // Month abbreviation
    
        // Return the formatted string
        return `${day} ${month}`;
    }
    



    // Convert the original entry data to something like { date: "2024-12-01", mood: 2 }
    const data = Object.keys(entries).map(key => {
        return {
            date: formatDate(entries[key].date),
            mood: parseInt(entries[key].mood, 10) // Convert mood to a number
        };
    });
    // console.log(data);

    // Function to scale the mood and dates for the graph
    const getScaledData = () => {
        const xScale = 100; // space between each data point on the x-axis
        const yScale = 50; // scale for the y-axis (height of the graph)

        return data.map((point, index) => ({
            x: index * xScale, // position on the x-axis
            y: yScale * (4 - point.mood), // position on the y-axis (0-4, so 4 - mood)
            date: point.date,
            mood: point.mood,
        }));
    };

    const scaledData = getScaledData();

    return (
    <>

        <div>
            <h2>Mood tracker</h2>
            {/* <p>user id: {uid}</p> */}
        </div>

        {/* the graph itself */}
        <div className="graph-container">
            <svg>
                {/* <line
                    x1="0"
                    y1="300"
                    x2="500"
                    y2="300"
                    stroke="black"
                    strokeWidth="2" // X-axis line
                /> 
                <line
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="300"
                    stroke="black"
                    strokeWidth="2" // Y-axis line
                /> */}
                {scaledData.map((point, index) => (
                    <React.Fragment key={index}>
                                    {/* Draw the lines connecting the mood */}
                                    {index > 0 && (
                            <line
                                x1={scaledData[index - 1].x}
                                y1={scaledData[index - 1].y}
                                x2={point.x}
                                y2={point.y}
                                
                            />
                        )}
                        {/* Draw the mood (dots) */}
                        <circle cx={point.x} cy={point.y} />
            
                    </React.Fragment>
                ))}
            </svg>
            {/* X-axis labels */}
            <div className="x-axis-labels">
                {scaledData.map((point, index) => (
                    <div
                        key={index}
                        style={{
                            position: 'absolute',
                            left: `${point.x}px`,
                            // bottom: '0',
                            transform: 'translateX(-50%)',
                        }}
                    >
                        <span>{point.date}</span>
                    </div>
                ))}
            </div>
        </div>

    </>
    );
}






// import './MoodTracker.css';


// export default function MoodTracker({ uid }) {

//     




//     return (
//

//     );
// }