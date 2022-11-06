export const fetchCards = async () => {
    return await fetch('https://localhost:5001/api/cards').then(res => res.json());
};