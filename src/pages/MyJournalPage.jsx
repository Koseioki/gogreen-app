import MoodTracker from '../components/MoodTracker';
import MyEntries from '../components/MyEntries';
import { auth } from '../firebase-config';

export default function MyJournalPage() {
    return (
        <main className="page" id="main-content">
        <h1>My Journal</h1>
        <MoodTracker uid={auth.currentUser?.uid} />
        <MyEntries uid={auth.currentUser?.uid} />
        </main>
    );
}