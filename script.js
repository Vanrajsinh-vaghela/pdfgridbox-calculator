document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.calc-card');
    const mainContainer = document.querySelector('main.container');

    cards.forEach(card => {
        card.addEventListener('click', () => {
            const calcType = card.getAttribute('data-calc');
            loadCalculator(calcType, card.textContent);
        });
    });

    function loadCalculator(type, title) {
        if (type === 'age') {
            mainContainer.innerHTML = `
                <div class="calc-interface">
                    <button class="back-btn" onclick="location.reload()">← Back to Calculators</button>
                    <h2>${title}</h2>
                    <div class="form-group">
                        <label>Date of Birth:</label>
                        <input type="date" id="dob">
                    </div>
                    <button class="btn" onclick="calculateAge()">Calculate Age</button>
                    <div id="result" class="result-box"></div>
                </div>
            `;
        } else if (type === 'emi') {
            mainContainer.innerHTML = `
                <div class="calc-interface">
                    <button class="back-btn" onclick="location.reload()">← Back to Calculators</button>
                    <h2>${title}</h2>
                    <div class="form-group">
                        <label>Loan Amount (₹):</label>
                        <input type="number" id="loanAmount" placeholder="e.g. 1000000">
                    </div>
                    <div class="form-group">
                        <label>Interest Rate (% P.A.):</label>
                        <input type="number" id="interestRate" placeholder="e.g. 8.5">
                    </div>
                    <div class="form-group">
                        <label>Loan Tenure (Months):</label>
                        <input type="number" id="tenure" placeholder="e.g. 240">
                    </div>
                    <button class="btn" onclick="calculateEMI()">Calculate EMI</button>
                    <div id="result" class="result-box"></div>
                </div>
            `;
        } else {
            alert(`${title} interface is coming soon!`);
        }
    }
});

function calculateAge() {
    const dob = document.getElementById('dob').value;
    const resultBox = document.getElementById('result');
    if (!dob) {
        resultBox.innerHTML = "Please select your date of birth.";
        return;
    }
    const birthDate = new Date(dob);
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
        months--;
        days += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
    }
    if (months < 0) {
        years--;
        months += 12;
    }
    resultBox.innerHTML = `Your Age: <strong>${years} Years, ${months} Months, ${days} Days</strong>`;
}

function calculateEMI() {
    const p = parseFloat(document.getElementById('loanAmount').value);
    const r = parseFloat(document.getElementById('interestRate').value) / 12 / 100;
    const n = parseFloat(document.getElementById('tenure').value);
    const resultBox = document.getElementById('result');

    if (!p || !r || !n) {
        resultBox.innerHTML = "Please enter valid numbers in all fields.";
        return;
    }

    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;

    resultBox.innerHTML = `
        <p>Monthly EMI: <strong>₹${emi.toFixed(2)}</strong></p>
        <p>Total Interest: <strong>₹${totalInterest.toFixed(2)}</strong></p>
        <p>Total Payment: <strong>₹${totalPayment.toFixed(2)}</strong></p>
    `;
}
