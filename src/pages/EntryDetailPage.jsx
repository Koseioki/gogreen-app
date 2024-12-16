import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase-config";
import formatDate from "../utils/formatDate";
import back from "../images/back.svg";

import veryBad from "../images/very-bad.svg";
import bad from "../images/bad.svg";
import neutral from "../images/neutral.svg";
import good from "../images/good.svg";
import veryGood from "../images/very-good.svg";

// import edit from "../images/edit.svg";

export default function EntryDetailPage() {
    const [entry, setEntry] = useState({});
    const { entryId } = useParams();
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
    }, [entryId, auth.currentUser]);

        


    // delete the entry
    async function handleDelete() {
        //ask if the user is sure
        const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
        if (confirmDelete) {
            //delete the entry
            await fetch(`https://gogreen-app-1d826-default-rtdb.firebaseio.com/users/${auth.currentUser?.uid}/entries/${entryId}.json`, {
                method: "DELETE",

            });
            alert("Entry deleted");
            navigate("/my-journal");
        }
    }

    // delete the feelings
    // async function handleDeleteNote(event) {
    //     //ask if the user is sure
    //     const confirmDelete = window.confirm("Are you sure you want to delete this feeling?");
    //     if (confirmDelete) {
    //         const feeling = event.target.textContent;
    //         //delete the feeling
    //         const newNegative = entry.negative.filter(item => item !== feeling);
    //         const newPositive = entry.positive.filter(item => item !== feeling);
    //         await fetch(`https://gogreen-app-1d826-default-rtdb.firebaseio.com/users/${auth.currentUser?.uid}/entries/${entryId}.json`, {
    //             method: "PATCH",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 negative: newNegative,
    //                 positive: newPositive,
    //             }),
    //         });
    //         alert("Feeling deleted");
    //         //refresh the page
    //         window.location.reload();
    //     }
    // }

    // edit note
    // async function handleEditNote(event) {
    //     //edit the note selected
    //     const note = event.target.textContent;
    //     console.log(note);
    //     const newNote = window.prompt("Edit your note", note);
    //     if (newNote) {
    //         const newNegative = entry.negative.map(item => item === note ? newNote : item);
    //         const newPositive = entry.positive.map(item => item === note ? newNote : item);
    //         await fetch(`https://gogreen-app-1d826-default-rtdb.firebaseio.com/users/${auth.currentUser?.uid}/entries/${entryId}.json`, {
    //             method: "PATCH",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({
    //                 negative: newNegative,
    //                 positive: newPositive,
    //             }),
    //         });
    //         alert("Note edited");
    //         //refresh the page
    //         window.location.reload

    //     }
    // }


        function handleBack() {
            navigate(-1);
        }

        return (
            <main className="page" id="main-content">
                <button className="back-button" onClick={handleBack}><img src={back} alt="" /> Back</button>

{/* read only when {entry} exists */}
                {entry && (
                    <>
                <h1 className="icon-and-text">
                    {/* show the mood assessment, and changed the colour of the icons (not smart) */}
                    
                        
                            {entry.mood === "0" && <img src={veryBad} alt="" />}
                            {entry.mood === "1" && <img src={bad} alt="" />}
                            {entry.mood === "2" && <img src={neutral} alt="" />}
                            {entry.mood === "3" && <img src={good} alt="" />}
                            {entry.mood === "4" && <img src={veryGood} alt="" />}
                        
                    
                    {formatDate(entry.date)}
                </h1>


                {/* list all the things inside entry.negative */}
                <ul className="reflection-cards">
                    {entry.negative && entry.negative.map((item, index) => (
                        <li
                            // className="link-card icon-and-text"
                            // onClick={handleEditNote}
                            // tabIndex={0}
                            // excute when the user press enter
                            // onKeyDown={event => {
                            //     if (event.key === "Enter") {
                            //         handleEditNote(event);
                            //     }
                            // }}

                            key={index}
                        >
                 
                                    {item}
           
                        </li>
                    ))}
                </ul>
                {/* the same thing to the positive */}
                <ul className="reflection-cards">
                    {entry.positive && entry.positive.map((item, index) => (
                        <li
                            // className="link-card icon-and-text"
                            // onClick={handleDeleteNote}
                            // tabIndex={0}
                            // excute when the user press enter
                            // onKeyDown={event => {
                            //     if (event.key === "Enter") {
                            //         handleDeleteNote(event);
                            //     }
                            // }}

                            key={index}
                        >
                    

                                    {item}
                            
                        </li>
                    ))}
                </ul>
                </>
                )}

                {/* delete button */}
                <button className="button delete-button" onClick={handleDelete}>Delete this entry</button>

            </main>

        );
    }