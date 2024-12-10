// data/prompts.js
const prompts = [
    {
        id: 1,
        type: 'radio',
        text: "How are you feeling today?",
        options: {
            1: 'Very bad',
            2: 'Bad',
            3: 'Neutral',
            4: 'Good',
            5: 'Very good'
        }
        // options: [1,2,3,4,5]
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
