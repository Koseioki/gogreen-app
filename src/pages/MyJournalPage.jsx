import { useEffect, useState } from "react";
import MoodTracker from '../components/MoodTracker';
import MyEntries from '../components/MyEntries';
import { auth } from '../firebase-config';

export default function MyJournalPage() {
    const [hasEntries, setHasEntries] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function checkEntries() {
            const url = `https://gogreen-app-1d826-default-rtdb.firebaseio.com/users/${auth.currentUser?.uid}/entries.json`;
            const response = await fetch(url);
            const data = await response.json();
            setHasEntries(!!data);
            setLoading(false);
        }
        checkEntries();
    }, []);

    if (loading) {
        return <main className="page" id="main-content">
            <p>Loading...</p>
            </main>;
    }

    return (
        <main className="page" id="main-content">
            <h1>My Journal</h1>
            {/* show MoodTracker and MyEntries if the user has at least one entry */}
            {hasEntries ? (
                <>
                    <MoodTracker uid={auth.currentUser?.uid} />
                    <MyEntries uid={auth.currentUser?.uid} />
                </>
            ) : (
                <p>Start your journaling journey by creating your first entry</p>
            )}
        </main>
    );
}