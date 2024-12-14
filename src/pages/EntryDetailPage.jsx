import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { auth } from "../firebase-config";
import formatDate from "../utils/formatDate";
import back from "../images/back.svg";

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
    }
        , [entryId]);

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
    async function handleDeleteFeelings(event) {
        //ask if the user is sure
        const confirmDelete = window.confirm("Are you sure you want to delete this feeling?");
        if (confirmDelete) {
            const feeling = event.target.textContent;
            //delete the feeling
            const newNegative = entry.negative.filter(item => item !== feeling);
            const newPositive = entry.positive.filter(item => item !== feeling);
            await fetch(`https://gogreen-app-1d826-default-rtdb.firebaseio.com/users/${auth.currentUser?.uid}/entries/${entryId}.json`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    negative: newNegative,
                    positive: newPositive,
                }),
            });
            alert("Feeling deleted");
            //refresh the page
            window.location.reload();
        }
    }

    function handleBack() {
        navigate(-1);
    }

    return (
        <main className="page" id="main-content">
            <button className="back-button" onClick={handleBack}><img src={back} alt=""/> Back</button>

            <h1>{formatDate(entry.date)}</h1>
            <p>entry id: {entryId}</p>
            <p>mood: {entry.mood}</p>
            {/* list all the things inside entry.negative */}
            <ul>
                {entry.negative && entry.negative.map((item, index) => (
                    <li className="link-card" onClick={handleDeleteFeelings} key={index}>{item}</li>
                ))}
            </ul>
            {/* the same thing to the positive */}
            <ul>
                {entry.positive && entry.positive.map((item, index) => (
                    <li className="link-card" onClick={handleDeleteFeelings} key={index}>{item}</li>
                ))}
            </ul>


            {/* delete button */}
            <button className="button delete-button" onClick={handleDelete}>Delete this entry</button>

        </main>

    );
}