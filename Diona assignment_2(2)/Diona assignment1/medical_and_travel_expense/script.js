// File: exercise1-medical-expense/script.js

// Set footer information
document.getElementById('footerAppId').textContent = '712041';
document.getElementById('footerSubmittedDate').textContent = 'March 28, 2024 20:43';

// Prescription Drugs Section
const prescriptionTableBody = document.querySelector("#prescription-drugs tbody");
medicalExpenseData.prescriptionDrugs.forEach((item) => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${item.drugName}</td>
    <td>${item.purchaseDate}</td>
    <td>${item.prescriptionDate}</td>
    <td>${item.provider}</td>
    <td>${item.amount}</td>
  `;
  prescriptionTableBody.appendChild(row);
});

// Over-the-Counter Drugs Section
const otcTableBody = document.querySelector("#otc-drugs tbody");
medicalExpenseData.otcDrugs.forEach((item) => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${item.drugName}</td>
    <td>${item.purchaseDate}</td>
    <td>${item.amount}</td>
    <td>${item.seller}</td>
    <td>${item.reason}</td>
  `;
  otcTableBody.appendChild(row);
});

// Medical Supplies Section
const suppliesTableBody = document.querySelector("#medical-supplies tbody");
medicalExpenseData.medicalSupplies.forEach((item) => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${item.item}</td>
    <td>${item.purchaseDate}</td>
    <td>${item.prescribed}</td>
    <td>${item.provider}</td>
    <td>${item.amount}</td>
    <td>${item.seller}</td>
  `;
  suppliesTableBody.appendChild(row);
});

// Parking Expenses Section
const parkingTableBody = document.querySelector("#parking-expenses tbody");
medicalExpenseData.parkingExpenses.forEach((item) => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${item.address}</td>
    <td>${item.date}</td>
    <td>${item.amount}</td>
    <td>${item.meter}</td>
  `;
  parkingTableBody.appendChild(row);
});

// Mileage Expenses Section
const mileageTableBody = document.querySelector("#mileage-expenses tbody");
medicalExpenseData.mileageExpenses.forEach((item) => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${item.appointmentDate}</td>
    <td>${item.providerAddress}</td>
    <td>${item.workAddress}</td>
    <td>${item.distance}</td>
  `;
  mileageTableBody.appendChild(row);
});

// Transit Expenses Section
const transitTableBody = document.querySelector("#transit-expenses tbody");
medicalExpenseData.transitExpenses.forEach((item) => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${item.date}</td>
    <td>${item.from}</td>
    <td>${item.to}</td>
    <td>${item.mode}</td>
    <td>${item.fare}</td>
  `;
  transitTableBody.appendChild(row);
});

// Form validation and interaction handling
document.addEventListener('DOMContentLoaded', function() {
    // Add event listeners for form validation
    const form = document.getElementById('expenseForm');
    
    // Handle form submission
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        validateForm();
    });

    // Add dynamic row functionality to tables
    const tables = document.querySelectorAll('.expense-section table');
    tables.forEach(table => {
        const addRowButton = document.createElement('button');
        addRowButton.textContent = 'Add Row';
        addRowButton.className = 'add-row-button';
        addRowButton.addEventListener('click', () => addTableRow(table));
        table.parentNode.insertBefore(addRowButton, table.nextSibling);
    });
});

// Form validation function
function validateForm() {
    let isValid = true;
    const tables = document.querySelectorAll('.expense-section table tbody');
    
    // Check if at least one expense is entered
    let hasExpenses = false;
    tables.forEach(table => {
        if (table.rows.length > 0) {
            hasExpenses = true;
        }
    });

    if (!hasExpenses) {
        alert('Please enter at least one expense.');
        isValid = false;
    }

    // Validate signature
    const signature = document.querySelector('.signature-line').textContent.trim();
    if (!signature) {
        alert('Please provide a signature.');
        isValid = false;
    }

    if (isValid) {
        // Here you would typically submit the form data
        alert('Form submitted successfully!');
    }
}

// Function to add a new row to a table
function addTableRow(table) {
    const tbody = table.querySelector('tbody');
    const newRow = document.createElement('tr');
    const headers = table.querySelectorAll('th');
    
    headers.forEach(header => {
        const cell = document.createElement('td');
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'table-input';
        cell.appendChild(input);
        newRow.appendChild(cell);
    });

    // Add delete button
    const deleteCell = document.createElement('td');
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'delete-row-button';
    deleteButton.addEventListener('click', () => newRow.remove());
    deleteCell.appendChild(deleteButton);
    newRow.appendChild(deleteCell);

    tbody.appendChild(newRow);
}

// Function to calculate totals
function calculateTotals() {
    const tables = document.querySelectorAll('.expense-section table');
    tables.forEach(table => {
        const amountColumn = table.querySelector('th:contains("Amount")');
        if (amountColumn) {
            const rows = table.querySelectorAll('tbody tr');
            let total = 0;
            rows.forEach(row => {
                const amountCell = row.cells[amountColumn.cellIndex];
                const amount = parseFloat(amountCell.textContent) || 0;
                total += amount;
            });
            
            // Add total row if it doesn't exist
            let totalRow = table.querySelector('.total-row');
            if (!totalRow) {
                totalRow = document.createElement('tr');
                totalRow.className = 'total-row';
                const cell = document.createElement('td');
                cell.colSpan = table.rows[0].cells.length - 1;
                cell.textContent = 'Total:';
                totalRow.appendChild(cell);
                const totalCell = document.createElement('td');
                totalCell.className = 'total-amount';
                totalRow.appendChild(totalCell);
                table.querySelector('tbody').appendChild(totalRow);
            }
            
            table.querySelector('.total-amount').textContent = total.toFixed(2);
        }
    });
}

// Helper function to check if element contains text
Element.prototype.contains = function(text) {
    return this.textContent.includes(text);
};
