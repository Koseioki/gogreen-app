import MoodTracker from '../components/MoodTracker';
import { auth } from '../firebase-config';

export default function MyJournalPage() {
    return (
        <main className="page" id="main-content">
        <h1>My Journal</h1>
        <MoodTracker uid={auth.currentUser?.uid} />
        <h2>My entries</h2>
        </main>
    );
}