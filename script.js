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

        switch(type) {
            case 'age':
                htmlContent += `
                    <div class="form-group"><label>Date of Birth:</label><input type="date" id="dob"></div>
                    <button class="btn" onclick="calculateAge()">Calculate Age</button>
                `;
                break;
            case 'emi':
            case 'loan':
                htmlContent += `
                    <div class="form-group"><label>Loan Amount (₹):</label><input type="number" id="loanAmount" placeholder="e.g. 1000000"></div>
                    <div class="form-group"><label>Interest Rate (% P.A.):</label><input type="number" id="interestRate" placeholder="e.g. 8.5"></div>
                    <div class="form-group"><label>Loan Tenure (Months):</label><input type="number" id="tenure" placeholder="e.g. 240"></div>
                    <button class="btn" onclick="calculateEMI()">Calculate Loan/EMI</button>
                `;
                break;
            case 'gst':
                htmlContent += `
                    <div class="form-group"><label>Initial Amount (₹):</label><input type="number" id="gstAmount" placeholder="e.g. 5000"></div>
                    <div class="form-group"><label>GST Rate (%):</label><input type="number" id="gstRate" placeholder="e.g. 18"></div>
                    <button class="btn" onclick="calculateGST('add')">Add GST</button>
                    <button class="btn" onclick="calculateGST('remove')" style="margin-top:0.5rem; background:#6c757d;">Remove GST</button>
                `;
                break;
            case 'bmi':
                htmlContent += `
                    <div class="form-group"><label>Weight (kg):</label><input type="number" id="weight" placeholder="e.g. 70"></div>
                    <div class="form-group"><label>Height (cm):</label><input type="number" id="height" placeholder="e.g. 175"></div>
                    <button class="btn" onclick="calculateBMI()">Calculate BMI</button>
                `;
                break;
            case 'sip':
                htmlContent += `
                    <div class="form-group"><label>Monthly Investment (₹):</label><input type="number" id="sipAmount" placeholder="e.g. 5000"></div>
                    <div class="form-group"><label>Expected Return (% P.A.):</label><input type="number" id="sipRate" placeholder="e.g. 12"></div>
                    <div class="form-group"><label>Time Period (Years):</label><input type="number" id="sipYears" placeholder="e.g. 10"></div>
                    <button class="btn" onclick="calculateSIP()">Calculate SIP</button>
                `;
                break;
            case 'fd':
                htmlContent += `
                    <div class="form-group"><label>Principal Amount (₹):</label><input type="number" id="fdPrincipal" placeholder="e.g. 100000"></div>
                    <div class="form-group"><label>Interest Rate (% P.A.):</label><input type="number" id="fdRate" placeholder="e.g. 6.5"></div>
                    <div class="form-group"><label>Time Period (Years):</label><input type="number" id="fdYears" placeholder="e.g. 5"></div>
                    <button class="btn" onclick="calculateFD()">Calculate FD</button>
                `;
                break;
            case 'rd':
                htmlContent += `
                    <div class="form-group"><label>Monthly Deposit (₹):</label><input type="number" id="rdMonthly" placeholder="e.g. 2000"></div>
                    <div class="form-group"><label>Interest Rate (% P.A.):</label><input type="number" id="rdRate" placeholder="e.g. 7.0"></div>
                    <div class="form-group"><label>Time Period (Months):</label><input type="number" id="rdMonths" placeholder="e.g. 12"></div>
                    <button class="btn" onclick="calculateRD()">Calculate RD</button>
                `;
                break;
            case 'percentage':
                htmlContent += `
                    <div class="form-group"><label>What is</label><input type="number" id="pNum1" placeholder="e.g. 20"></div>
                    <div class="form-group"><label>% of</label><input type="number" id="pNum2" placeholder="e.g. 500"></div>
                    <button class="btn" onclick="calculatePercentage()">Calculate Percentage</button>
                `;
                break;
            case 'discount':
                htmlContent += `
                    <div class="form-group"><label>Original Price (₹):</label><input type="number" id="discPrice" placeholder="e.g. 2000"></div>
                    <div class="form-group"><label>Discount Percentage (%):</label><input type="number" id="discRate" placeholder="e.g. 15"></div>
                    <button class="btn" onclick="calculateDiscount()">Calculate Discount</button>
                `;
                break;
            case 'currency':
                htmlContent += `
                    <div class="form-group"><label>Amount in USD ($):</label><input type="number" id="usdAmount" placeholder="e.g. 100"></div>
                    <button class="btn" onclick="calculateCurrency()">Convert to INR (Approx ₹83)</button>
                `;
                break;
            case 'scientific':
                htmlContent += `
                    <div class="form-group"><label>Enter Number or Expression:</label><input type="text" id="sciInput" placeholder="e.g. Math.sqrt(81) or 5*5"></div>
                    <button class="btn" onclick="calculateScientific()">Calculate</button>
                `;
                break;
            case 'simple':
                htmlContent += `
                    <div class="form-group"><label>Principal (₹):</label><input type="number" id="simpPrin" placeholder="e.g. 10000"></div>
                    <div class="form-group"><label>Rate (%):</label><input type="number" id="simpRate" placeholder="e.g. 5"></div>
                    <div class="form-group"><label>Time (Years):</label><input type="number" id="simpTime" placeholder="e.g. 2"></div>
                    <button class="btn" onclick="calculateSimpleInterest()">Calculate Simple Interest</button>
                `;
                break;
            case 'average':
                htmlContent += `
                    <div class="form-group"><label>Enter numbers separated by comma:</label><input type="text" id="avgInput" placeholder="e.g. 10, 20, 30, 40"></div>
                    <button class="btn" onclick="calculateAverage()">Calculate Average</button>
                `;
                break;
            case 'time':
                htmlContent += `
                    <div class="form-group"><label>Hours:</label><input type="number" id="timeHours" placeholder="e.g. 4"></div>
                    <div class="form-group"><label>Minutes to add:</label><input type="number" id="timeMins" placeholder="e.g. 90"></div>
                    <button class="btn" onclick="calculateTime()">Add Time</button>
                `;
                break;
            case 'date-diff':
                htmlContent += `
                    <div class="form-group"><label>Start Date:</label><input type="date" id="startDate"></div>
                    <div class="form-group"><label>End Date:</label><input type="date" id="endDate"></div>
                    <button class="btn" onclick="calculateDateDiff()">Calculate Difference</button>
                `;
                break;
            case 'compound':
                htmlContent += `
                    <div class="form-group"><label>Principal (₹):</label><input type="number" id="compPrin" placeholder="e.g. 50000"></div>
                    <div class="form-group"><label>Annual Rate (%):</label><input type="number" id="compRate" placeholder="e.g. 8"></div>
                    <div class="form-group"><label>Years:</label><input type="number" id="compYears" placeholder="e.g. 3"></div>
                    <button class="btn" onclick="calculateCompound()">Calculate Compound Interest</button>
                `;
                break;
            case 'income-tax':
                htmlContent += `
                    <div class="form-group"><label>Annual Income (₹):</label><input type="number" id="incomeVal" placeholder="e.g. 800000"></div>
                    <button class="btn" onclick="calculateTax()">Estimate Tax</button>
                `;
                break;
            case 'cgpa':
                htmlContent += `
                    <div class="form-group"><label>Enter GPA values separated by comma:</label><input type="text" id="cgpaInput" placeholder="e.g. 8.5, 9.0, 7.8"></div>
                    <button class="btn" onclick="calculateCGPA()">Calculate CGPA</button>
                `;
                break;
            case 'percentage-inc':
                htmlContent += `
                    <div class="form-group"><label>Initial Value:</label><input type="number" id="incInit" placeholder="e.g. 100"></div>
                    <div class="form-group"><label>Final Value:</label><input type="number" id="incFinal" placeholder="e.g. 150"></div>
                    <button class="btn" onclick="calculatePercentageIncrease()">Calculate Increase</button>
                `;
                break;
            default:
                htmlContent += `<p>Calculator interface ready.</p>`;
        }

        htmlContent += `<div id="result" class="result-box"></div></div>`;
        mainContainer.innerHTML = htmlContent;
    }
});

// Calculation Functions
function calculateAge() {
    const dob = document.getElementById('dob').value;
    const res = document.getElementById('result');
    if (!dob) { res.innerHTML = "Please select date of birth."; return; }
    const b = new Date(dob), t = new Date();
    let y = t.getFullYear() - b.getFullYear(), m = t.getMonth() - b.getMonth(), d = t.getDate() - b.getDate();
    if (d < 0) { m--; d += new Date(t.getFullYear(), t.getMonth(), 0).getDate(); }
    if (m < 0) { y--; m += 12; }
    res.innerHTML = `Age: <strong>${y} Years, ${m} Months, ${d} Days</strong>`;
}

function calculateEMI() {
    const p = parseFloat(document.getElementById('loanAmount').value);
    const r = parseFloat(document.getElementById('interestRate').value) / 12 / 100;
    const n = parseFloat(document.getElementById('tenure').value);
    const res = document.getElementById('result');
    if (!p || !r || !n) { res.innerHTML = "Enter valid numbers."; return; }
    const emi = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    res.innerHTML = `<p>Monthly EMI: <strong>₹${emi.toFixed(2)}</strong></p><p>Total Payment: <strong>₹{(emi * n).toFixed(2)}</strong></p>`;
}

function calculateGST(mode) {
    const amt = parseFloat(document.getElementById('gstAmount').value);
    const rate = parseFloat(document.getElementById('gstRate').value);
    const res = document.getElementById('result');
    if (!amt || !rate) { res.innerHTML = "Enter valid numbers."; return; }
    if (mode === 'add') {
        const gst = (amt * rate) / 100;
        res.innerHTML = `<p>GST: <strong>₹${gst.toFixed(2)}</strong></p><p>Total: <strong>₹${(amt + gst).toFixed(2)}</strong></p>`;
    } else {
        const orig = amt / (1 + rate / 100);
        res.innerHTML = `<p>Original: <strong>₹${orig.toFixed(2)}</strong></p><p>GST: <strong>₹${(amt - orig).toFixed(2)}</strong></p>`;
    }
}

function calculateBMI() {
    const w = parseFloat(document.getElementById('weight').value);
    const h = parseFloat(document.getElementById('height').value) / 100;
    const res = document.getElementById('result');
    if (!w || !h) { res.innerHTML = "Enter valid values."; return; }
    const bmi = w / (h * h);
    res.innerHTML = `BMI: <strong>${bmi.toFixed(2)}</strong>`;
}

function calculateSIP() {
    const p = parseFloat(document.getElementById('sipAmount').value);
    const i = parseFloat(document.getElementById('sipRate').value) / 12 / 100;
    const n = parseFloat(document.getElementById('sipYears').value) * 12;
    const res = document.getElementById('result');
    if (!p || !i || !n) { res.innerHTML = "Enter valid values."; return; }
    const mat = p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    res.innerHTML = `<p>Invested: <strong>₹${(p*n).toFixed(2)}</strong></p><p>Total Value: <strong>₹${mat.toFixed(2)}</strong></p>`;
}

function calculateFD() {
    const p = parseFloat(document.getElementById('fdPrincipal').value);
    const r = parseFloat(document.getElementById('fdRate').value) / 100;
    const t = parseFloat(document.getElementById('fdYears').value);
    const res = document.getElementById('result');
    if (!p || !r || !t) { res.innerHTML = "Enter valid values."; return; }
    const mat = p * Math.pow((1 + r / 4), 4 * t);
    res.innerHTML = `Maturity Value: <strong>₹${mat.toFixed(2)}</strong>`;
}

function calculateRD() {
    const p = parseFloat(document.getElementById('rdMonthly').value);
    const r = parseFloat(document.getElementById('rdRate').value) / 100;
    const n = parseFloat(document.getElementById('rdMonths').value);
    const res = document.getElementById('result');
    if (!p || !r || !n) { res.innerHTML = "Enter valid values."; return; }
    const mat = p * n + (p * n * (n + 1) * r) / (24 * 12);
    res.innerHTML = `RD Maturity Value: <strong>₹${mat.toFixed(2)}</strong>`;
}

function calculatePercentage() {
    const n1 = parseFloat(document.getElementById('pNum1').value);
    const n2 = parseFloat(document.getElementById('pNum2').value);
    const res = document.getElementById('result');
    if (isNaN(n1) || isNaN(n2)) { res.innerHTML = "Enter valid numbers."; return; }
    res.innerHTML = `Result: <strong>${(n1 * n2) / 100}</strong>`;
}

function calculateDiscount() {
    const p = parseFloat(document.getElementById('discPrice').value);
    const d = parseFloat(document.getElementById('discRate').value);
    const res = document.getElementById('result');
    if (isNaN(p) || isNaN(d)) { res.innerHTML = "Enter valid numbers."; return; }
    const save = (p * d) / 100;
    res.innerHTML = `<p>Savings: <strong>₹${save.toFixed(2)}</strong></p><p>Final Price: <strong>₹${(p - save).toFixed(2)}</strong></p>`;
}

function calculateCurrency() {
    const usd = parseFloat(document.getElementById('usdAmount').value);
    const res = document.getElementById('result');
    if (isNaN(usd)) { res.innerHTML = "Enter valid amount."; return; }
    res.innerHTML = `Converted Amount: <strong>₹${(usd * 83).toFixed(2)}</strong>`;
}

function calculateScientific() {
    const expr = document.getElementById('sciInput').value;
    const res = document.getElementById('result');
    try {
        const val = eval(expr);
        res.innerHTML = `Result: <strong>${val}</strong>`;
    } catch(e) {
        res.innerHTML = "Invalid expression.";
    }
}

function calculateSimpleInterest() {
    const p = parseFloat(document.getElementById('simpPrin').value);
    const r = parseFloat(document.getElementById('simpRate').value);
    const t = parseFloat(document.getElementById('simpTime').value);
    const res = document.getElementById('result');
    if (isNaN(p) || isNaN(r) || isNaN(t)) { res.innerHTML = "Enter valid numbers."; return; }
    const si = (p * r * t) / 100;
    res.innerHTML = `Simple Interest: <strong>₹${si.toFixed(2)}</strong>`;
}

function calculateAverage() {
    const input = document.getElementById('avgInput').value;
    const res = document.getElementById('result');
    const arr = input.split(',').map(Number).filter(n => !isNaN(n));
    if (arr.length === 0) { res.innerHTML = "Enter valid numbers separated by commas."; return; }
    const sum = arr.reduce((a, b) => a + b, 0);
    res.innerHTML = `Average: <strong>${(sum / arr.length).toFixed(2)}</strong>`;
}

function calculateTime() {
    const h = parseFloat(document.getElementById('timeHours').value) || 0;
    const m = parseFloat(document.getElementById('timeMins').value) || 0;
    const res = document.getElementById('result');
    const totalMins = (h * 60) + m;
    const resH = Math.floor(totalMins / 60);
    const resM = totalMins % 60;
    res.innerHTML = `Total Time: <strong>${resH} Hours ${resM} Minutes</strong>`;
}

function calculateDateDiff() {
    const s = document.getElementById('startDate').value;
    const e = document.getElementById('endDate').value;
    const res = document.getElementById('result');
    if (!s || !e) { res.innerHTML = "Select both dates."; return; }
    const diffTime = Math.abs(new Date(e) - new Date(s));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    res.innerHTML = `Difference: <strong>${diffDays} Days</strong>`;
}

function calculateCompound() {
    const p = parseFloat(document.getElementById('compPrin').value);
    const r = parseFloat(document.getElementById('compRate').value) / 100;
    const t = parseFloat(document.getElementById('compYears').value);
    const res = document.getElementById('result');
    if (isNaN(p) || isNaN(r) || isNaN(t)) { res.innerHTML = "Enter valid numbers."; return; }
    const amt = p * Math.pow(1 + r, t);
    res.innerHTML = `Compound Total: <strong>₹${amt.toFixed(2)}</strong>`;
}

function calculateTax() {
    const inc = parseFloat(document.getElementById('incomeVal').value);
    const res = document.getElementById('result');
    if (isNaN(inc)) { res.innerHTML = "Enter valid income."; return; }
    let tax = 0;
    if (inc > 700000) tax = (inc - 700000) * 0.10;
    res.innerHTML = `Estimated Tax: <strong>₹${tax.toFixed(2)}</strong>`;
}

function calculateCGPA() {
    const input = document.getElementById('cgpaInput').value;
    const res = document.getElementById('result');
    const arr = input.split(',').map(Number).filter(n => !isNaN(n));
    if (arr.length === 0) { res.innerHTML = "Enter valid CGPA values."; return; }
    const sum = arr.reduce((a, b) => a + b, 0);
    res.innerHTML = `CGPA: <strong>${(sum / arr.length).toFixed(2)}</strong>`;
}

function calculatePercentageIncrease() {
    const init = parseFloat(document.getElementById('incInit').value);
    const fin = parseFloat(document.getElementById('incFinal').value);
    const res = document.getElementById('result');
    if (isNaN(init) || isNaN(fin) || init === 0) { res.innerHTML = "Enter valid numbers."; return; }
    const pct = ((fin - init) / init) * 100;
    res.innerHTML = `Percentage Increase: <strong>${pct.toFixed(2)}%</strong>`;
}
