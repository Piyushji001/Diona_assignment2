// File: exercise1-medical-expense/data.js

const medicalExpenseData = {
    appId: "712041",
    submittedDate: "March 28, 2024 20:43",
    claimNo: "20042047",
  
    prescriptionDrugs: [
      {
        drugName: "Naproxen",
        purchaseDate: "February 28, 2024",
        prescriptionDate: "February 29, 2024",
        provider: "Dr. Best",
        amount: "$20.00"
      }
    ],
  
    otcDrugs: [
      {
        drugName: "Advil",
        purchaseDate: "March 28, 2024",
        amount: "$8.00",
        seller: "Shoppers Drug Mart",
        reason: "Pain"
      }
    ],
  
    medicalSupplies: [
      {
        item: "Tensor",
        purchaseDate: "February 28, 2024",
        prescribed: "Yes",
        provider: "Dr. Best",
        amount: "$10.00",
        seller: "Shoppers Drug Mart"
      }
    ],
  
    parkingExpenses: [
      {
        address: "333 St Mary Ave, Winnipeg MB R3C 4A5, Canada",
        date: "March 28, 2024",
        amount: "$10.00",
        meter: "12245"
      }
    ],
  
    mileageExpenses: [],
  
    transitExpenses: [
      {
        date: "2024-03-15",
        from: "",
        to: "HSC Winnipeg Women's Hospital, 665 William Ave, Winnipeg MB R3E 0Z2, Canada",
        mode: "Bus",
        fare: "3.00"
      },
      {
        date: "2024-03-20",
        from: "25 Furby St, Winnipeg MB R3C 2A2, Canada",
        to: "456 Health Clinic Ave, Winnipeg, MB",
        mode: "Taxi",
        fare: "15.00"
      }
    ]
  };
  
// Sample data for Medical & Travel Expense Request form
const formData = {
    // Form metadata
    metadata: {
        workerAppId: "WA123456",
        submittedDate: new Date().toLocaleDateString(),
        claimNo: "CL789012"
    },

    // Prescription Drugs
    prescriptionDrugs: [
        {
            drugName: "Ibuprofen",
            datePurchased: "2024-04-01",
            prescriptionDate: "2024-03-28",
            healthcareProvider: "Dr. Smith",
            paidAmount: 25.50
        },
        {
            drugName: "Amoxicillin",
            datePurchased: "2024-04-05",
            prescriptionDate: "2024-04-03",
            healthcareProvider: "Dr. Johnson",
            paidAmount: 45.75
        }
    ],

    // Over-the-Counter Drugs
    otcDrugs: [
        {
            drugName: "Tylenol",
            datePurchased: "2024-04-02",
            paidAmount: 12.99,
            sellerName: "Shoppers Drug Mart",
            reason: "Pain relief"
        }
    ],

    // Medical Supplies
    medicalSupplies: [
        {
            itemPurchased: "Knee Brace",
            datePurchased: "2024-04-03",
            wasPrescribed: true,
            healthcareProvider: "Dr. Smith",
            paidAmount: 89.99,
            sellerName: "Medical Supply Co."
        }
    ],

    // Parking Expenses
    parkingExpenses: [
        {
            address: "123 Medical Center Dr",
            date: "2024-04-01",
            amount: 8.50,
            meterNumber: "P123"
        }
    ],

    // Mileage Expenses
    mileageExpenses: [
        {
            appointmentDate: "March 28, 2024",
            healthcareAddress: "",
            workplaceAddress: "WCB, 333 Broadway, Winnipeg MB R3C 4W3, Canada",
            km: "20 km"
        }
    ],

    // Transit Expenses
    transitExpenses: [
        {
            date: "2024-04-02",
            startingPoint: "Home",
            healthcareProviderFacility: "Winnipeg General Hospital",
            mode: "Bus",
            totalFare: 3.25
        }
    ]
};

// Function to populate form with data
function populateForm() {
    // Set metadata
    document.getElementById('appId').textContent = formData.metadata.workerAppId;
    document.getElementById('submittedDate').textContent = formData.metadata.submittedDate;
    document.getElementById('claimNo').textContent = formData.metadata.claimNo;

    // Populate prescription drugs table
    populateTable('prescription-drugs', formData.prescriptionDrugs);

    // Populate OTC drugs table
    populateTable('otc-drugs', formData.otcDrugs);

    // Populate medical supplies table
    populateTable('medical-supplies', formData.medicalSupplies);

    // Populate parking expenses table
    populateTable('parking-expenses', formData.parkingExpenses);

    // Populate mileage expenses table
    populateTable('mileage-expenses', formData.mileageExpenses);

    // Populate transit expenses table
    populateTable('transit-expenses', formData.transitExpenses);
}

// Helper function to populate tables
function populateTable(tableId, data) {
    const tableBody = document.querySelector(`#${tableId} tbody`);
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        Object.values(item).forEach(value => {
            const cell = document.createElement('td');
            cell.textContent = value;
            row.appendChild(cell);
        });
        tableBody.appendChild(row);
    });
}

// Initialize form when DOM is loaded
document.addEventListener('DOMContentLoaded', populateForm);
  