// Dataset 1
const dataset1 = {
    employeeName: "John Doe",
    employeeId: "EMP001",
    department: "Engineering",
    requestDate: "2024-04-17",
    medicalExpenses: [
        { date: "2024-04-01", description: "Doctor Consultation", amount: 150 },
        { date: "2024-04-05", description: "Lab Tests", amount: 200 },
        { date: "2024-04-10", description: "Medication", amount: 75 }
    ],
    travelExpenses: [
        { date: "2024-04-02", description: "Taxi to Hospital", amount: 25 },
        { date: "2024-04-06", description: "Train to Lab", amount: 15 },
        { date: "2024-04-11", description: "Bus to Pharmacy", amount: 10 }
    ],
    totalMedicalExpenses: 425,
    totalTravelExpenses: 50,
    grandTotal: 475
};

// Dataset 2
const dataset2 = {
    employeeName: "Jane Smith",
    employeeId: "EMP002",
    department: "Marketing",
    requestDate: "2024-04-18",
    medicalExpenses: [
        { date: "2024-04-03", description: "Dental Checkup", amount: 300 },
        { date: "2024-04-07", description: "X-Ray", amount: 150 },
        { date: "2024-04-12", description: "Prescription", amount: 100 }
    ],
    travelExpenses: [
        { date: "2024-04-04", description: "Car Rental", amount: 50 },
        { date: "2024-04-08", description: "Parking", amount: 20 },
        { date: "2024-04-13", description: "Taxi", amount: 30 }
    ],
    totalMedicalExpenses: 550,
    totalTravelExpenses: 100,
    grandTotal: 650
};

module.exports = {
    dataset1,
    dataset2
}; 