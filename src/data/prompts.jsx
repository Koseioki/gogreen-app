// data/prompts.js
const prompts = [
    {
        id: 1,
        type: 'radio',
        text: "How are you feeling today?",
        options: {
            '😣': 'Very bad',
            '🙁': 'Bad',
            '😐': 'Neutral',
            '🙂': 'Good',
            '😊': 'Very good'
        }
    },

    {
        id: 2,
        type: 'text',
        text: "What’s been the heaviest feeling on your heart today?"
    },
    {
        id: 3,
        type: 'text',
        text: "What made you feel good today, no matter how small?"
    }
];

export default prompts;
