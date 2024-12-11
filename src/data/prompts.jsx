// data/prompts.js
const prompts = [
    {
        id: 0,
        type: 'radio',
        text: "How are you feeling today?",
        options: {
            0: 'Very bad',
            1: 'Bad',
            2: 'Neutral',
            3: 'Good',
            4: 'Very good'
        }
    },

    {
        id: 1,
        type: 'text',
        text: "What’s been the heaviest feeling on your heart today?"
    },
    {
        id: 2,
        type: 'text',
        text: "You’ve released a little weight. Keep breathing—you’ve got this."
    },
    {
        id: 3,
        type: 'text',
        text: "What made you feel good today, no matter how small?"
    },
    {
        id: 4,
        type: 'text',
        text: "You’re filling your mind with positivity—what a wonderful gift to yourself."
    },
    {
        id: 5,
        type: 'text',
        text: "Here’s what you shared today. You’ve taken an important step—thank you for being kind to yourself."
    },
    {
        id: 6,
        type: 'text',
        text: "Today’s your entry is complete! Great job taking time for yourself today."
    }
];

export default prompts;
