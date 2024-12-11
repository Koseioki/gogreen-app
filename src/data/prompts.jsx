// data/prompts.js
const prompts = [
    {
        id: 1,
        type: 'radio',
        text: "How are you feeling today?",
        options: {
            0: 'Very bad',
            1: 'Bad',
            2: 'Neutral',
            3: 'Good',
            4: 'Very good'
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
