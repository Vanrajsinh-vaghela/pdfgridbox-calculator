document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.calc-card');
    cards.forEach(card => {
        card.addEventListener('click', () => {
            const calcType = card.getAttribute('data-calc');
            alert(`Opening ${card.textContent} interface.`);
        });
    });
});
