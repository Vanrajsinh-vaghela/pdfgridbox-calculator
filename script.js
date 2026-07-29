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
        let htmlContent = `
            <div class="calc-interface">
                <button class="back-btn" onclick="location.reload()">← Back to Calculators</button>
                <h2>${title}</h2>
        `;

        if (type === 'age') {
            htmlContent += `
                <div class="form-group"><label>Date of Birth:</label><input type="date" id="dob"></div>
                <button class="btn" onclick="calculateAge()">Calculate Age</button>
            `;
        } else if (type === 'emi') {
            htmlContent += `
                <div class="form-group"><label>Loan Amount (₹):</label><input type="number" id="loanAmount" placeholder="e.g. 1000000"></div>
                <div class="form-group"><label>Interest Rate (% P.A.):</label><input type="number" id="interestRate" placeholder="e.g. 8.5"></div>
                <div class="form-group"><label>Loan Tenure (Months):</label><input type="number" id="tenure" placeholder="e.g. 240"></div>
                <button class="btn" onclick="calculateEMI()">Calculate EMI</button>
            `;
        } else if (type === 'gst') {
            htmlContent += `
                <div class="form-group"><label>Initial Amount (₹):</label><input type="number" id="gstAmount" placeholder="e.g. 5000"></div>
                <div class="form-group"><label>GST Rate (%):</label><input type="number" id="gstRate" placeholder="e.g. 18"></div>
                <button class="btn" onclick="calculateGST('add')">Add GST</button>
                <button class="btn" onclick="calculateGST('remove')" style="margin-top:0.5rem; background:#6c757d;">Remove GST</button>
            `;
        } else if (type === 'bmi') {
            htmlContent += `
                <div class="form-group"><label>Weight (kg):</label><input type="number" id="weight" placeholder="e.g. 70"></div>
                <div class="form-group"><label>Height (cm):</label><input type="number" id="height" placeholder="e.g. 175"></div>
                <button class="btn" onclick="calculateBMI()">Calculate BMI</button>
            `;
        } else if (type === 'sip') {
            htmlContent += `
                <div class="form-group"><label>Monthly Investment (₹):</label><input type="number" id="sipAmount" placeholder="e.g. 5000"></div>
                <div class="form-group"><label>Expected Return Rate (% P.A.):</label><input type="number" id="sipRate" placeholder="e.g. 12"></div>
                <div class="form-group"><label>Time Period (Years):</label><input type="number" id="sipYears" placeholder="e.g. 10"></div>
                <button class="btn" onclick="calculateSIP()">Calculate SIP</button>
            `;
        } else if (type === 'fd') {
            htmlContent += `
                <div class="form-group"><label>Principal Amount (₹):</label><input type="number" id="fdPrincipal" placeholder="e.g. 100000"></div>
                <div class="form-group"><label>Interest Rate (% P.A.):</label><input type="number" id="fdRate" placeholder="e.g. 6.5"></div>
                <div class="form-group"><label>Time Period (Years):</label><input type="number" id="fdYears" placeholder="e.g. 5"></div>
                <button class="btn" onclick="calculateFD()">Calculate FD</button>
            `;
        } else {
            htmlContent += `<p>This calculator interface is under development.</p>`;
        }

        htmlContent += `<div id="result" class="result-box"></div></div>`;
        mainContainer.innerHTML = htmlContent;
    }
});

// Calculator Logic Functions
function calculateAge() {
    const dob = document.getElementById('dob').value;
    const resultBox = document.getElementById('result');
    if (!dob) { resultBox.innerHTML = "Please select your date of birth."; return; }
    const birthDate = new Date(dob);
    const today = new Date();
    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();
    if (days < 0) { months--; days += new Date(today.getFullYear(), today.getMonth(), 0).getDate(); }
    if (months < 0) { years--; months += 12; }
    resultBox.innerHTML = `Your Age: <strong>${years} Years, ${months} Months, ${days} Days</strong>`;
}

function calculateEMI() {
    const p = parseFloat(document.getElementById('loanAmount').value);
    const r = parseFloat(document.getElementById('interestRate').value) / 12 / 100;
    const n = parseFloat(document.getElementById('tenure').value);
    const resultBox = document.getElementById('result');
    if (!p || !r || !n) { resultBox.innerHTML = "Please enter valid numbers."; return; }
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = emi * n;
    const totalInterest = totalPayment - p;
    resultBox.innerHTML = `<p>Monthly EMI: <strong>₹${emi.toFixed(2)}</strong></p><p>Total Interest: <strong>₹${totalInterest.toFixed(2)}</strong></p><p>Total Payment: <strong>₹${totalPayment.toFixed(2)}</strong></p>`;
}

function calculateGST(mode) {
    const amount = parseFloat(document.getElementById('gstAmount').value);
    const rate = parseFloat(document.getElementById('gstRate').value);
    const resultBox = document.getElementById('result');
    if (!amount || !rate) { resultBox.innerHTML = "Please enter valid numbers."; return; }
    let gstAmount, totalAmount, originalAmount;
    if (mode === 'add') {
        gstAmount = (amount * rate) / 100;
        totalAmount = amount + gstAmount;
        resultBox.innerHTML = `<p>GST Amount: <strong>₹${gstAmount.toFixed(2)}</strong></p><p>Total Amount: <strong>₹${totalAmount.toFixed(2)}</strong></p>`;
    } else {
        originalAmount = amount / (1 + rate / 100);
        gstAmount = amount - originalAmount;
        resultBox.innerHTML = `<p>Original Amount: <strong>₹${originalAmount.toFixed(2)}</strong></p><p>GST Amount: <strong>₹${gstAmount.toFixed(2)}</strong></p>`;
    }
}

function calculateBMI() {
    const weight = parseFloat(document.getElementById('weight').value);
    const height = parseFloat(document.getElementById('height').value) / 100;
    const resultBox = document.getElementById('result');
    if (!weight || !height) { resultBox.innerHTML = "Please enter valid weight and height."; return; }
    const bmi = weight / (height * height);
    let category = "";
    if (bmi < 18.5) category = "Underweight";
    else if (bmi < 25) category = "Normal weight";
    else if (bmi < 30) category = "Overweight";
    else category = "Obese";
    resultBox.innerHTML = `<p>Your BMI: <strong>${bmi.toFixed(2)}</strong></p><p>Category: <strong>${category}</strong></p>`;
}

function calculateSIP() {
    const p = parseFloat(document.getElementById('sipAmount').value);
    const i = parseFloat(document.getElementById('sipRate').value) / 12 / 100;
    const n = parseFloat(document.getElementById('sipYears').value) * 12;
    const resultBox = document.getElementById('result');
    if (!p || !i || !n) { resultBox.innerHTML = "Please enter valid numbers."; return; }
    const maturity = p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    const invested = p * n;
    const returns = maturity - invested;
    resultBox.innerHTML = `<p>Invested Amount: <strong>₹${invested.toFixed(2)}</strong></p><p>Estimated Returns: <strong>₹${returns.toFixed(2)}</strong></p><p>Total Value: <strong>₹${maturity.toFixed(2)}</strong></p>`;
}

function calculateFD() {
    const p = parseFloat(document.getElementById('fdPrincipal').value);
    const r = parseFloat(document.getElementById('fdRate').value) / 100;
    const t = parseFloat(document.getElementById('fdYears').value);
    const resultBox = document.getElementById('result');
    if (!p || !r || !t) { resultBox.innerHTML = "Please enter valid numbers."; return; }
    const maturity = p * Math.pow((1 + r / 4), 4 * t); // Quarterly compounding
    const interest = maturity - p;
    resultBox.innerHTML = `<p>Invested Amount: <strong>₹${p.toFixed(2)}</strong></p><p>Total Interest: <strong>₹${interest.toFixed(2)}</strong></p><p>Maturity Value: <strong>₹${maturity.toFixed(2)}</strong></p>`;
}
