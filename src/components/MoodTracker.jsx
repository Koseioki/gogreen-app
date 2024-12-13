import React from 'react';
 import { useEffect, useState } from 'react';
import "./MoodTracker.css";

export default function MoodTracker( {uid}) {

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

  // Sample data: { date: "YYYY-MM-DD", points: 0-4 }
  const data = [
    { date: "2024-12-01", points: 2 },
    { date: "2024-12-02", points: 3 },
    { date: "2024-12-03", points: 1 },
    { date: "2024-12-04", points: 4 },
    { date: "2024-12-05", points: 0 },
  ];

  // Function to scale the points and dates for the graph
  const getScaledData = () => {
    const xScale = 100; // space between each data point on the x-axis
    const yScale = 50; // scale for the y-axis (height of the graph)

    return data.map((point, index) => ({
      x: index * xScale, // position on the x-axis
      y: yScale * (4 - point.points), // position on the y-axis (0-4, so 4 - points)
      date: point.date,
      points: point.points,
    }));
  };

  const scaledData = getScaledData();

  return (<>

    <div>
    <h2>Mood tracker</h2>
                <p>user id: {uid}</p>
    
                 {/* show all the entry ids */}
                <p>my entries</p>
                 <ul>
                    {entries && Object.keys(entries).map(entryId => (
    
                        <li key={entryId}>
                            {entryId},
                        {entries[entryId].mood},
                        {entries[entryId].date},
                        {entries[entryId].negative},
                        {entries[entryId].positive}
                        </li>
                        
                    ))}
                </ul>
                
               
            </div>
    <div className="graph-container">
      <svg width="500" height="300">
        <line
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
        />
        {scaledData.map((point, index) => (
          <React.Fragment key={index}>
            {/* Draw the points (dots) */}
            <circle cx={point.x} cy={point.y} r="5" fill="blue" />
            {/* Draw the lines connecting the points */}
            {index > 0 && (
              <line
                x1={scaledData[index - 1].x}
                y1={scaledData[index - 1].y}
                x2={point.x}
                y2={point.y}
                stroke="blue"
                strokeWidth="2"
              />
            )}
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
              bottom: '0px',
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