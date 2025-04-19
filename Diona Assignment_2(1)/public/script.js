let currentDataset = 1;

// Helper function to update text content with animation
function updateTextWithAnimation(element, newText) {
  element.style.opacity = '0';
  setTimeout(() => {
    element.textContent = newText;
    element.style.opacity = '1';
  }, 200);
}

// Function to update worker info section
function updateWorkerInfo(data) {
  const workerInfo = document.querySelector('.worker-info');
  const fields = workerInfo.querySelectorAll('.form-group span');
  
  fields[0].textContent = data.workerData.name;
  fields[1].textContent = data.workerData.id;
  fields[2].textContent = data.workerData.date;
  fields[3].textContent = data.workerData.project;
  
  // Update report date in header
  document.querySelector('.report-date').textContent = data.workerData.date;
}

// Function to update tasks table
function updateTasksTable(tasks) {
  const tbody = document.querySelector('.progress-table tbody');
  tbody.style.opacity = '0';
  
  setTimeout(() => {
    tbody.innerHTML = '';
    tasks.forEach(task => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${task.name}</td>
        <td>${task.description}</td>
        <td class="status-${task.status.toLowerCase()}">${task.status}</td>
        <td>${task.comments}</td>
      `;
      tbody.appendChild(row);
    });
    tbody.style.opacity = '1';
  }, 200);
}

// Function to update signature section
function updateSignatures(data) {
  const signatureSection = document.querySelector('.signature-section');
  const fields = signatureSection.querySelectorAll('.signature-field span');
  
  updateTextWithAnimation(fields[0], data.signatureData.supervisor);
  updateTextWithAnimation(fields[1], data.signatureData.date);
  updateTextWithAnimation(fields[2], data.signatureData.worker);
}

// Function to update the entire form
function updateForm(data) {
  updateWorkerInfo(data);
  updateTasksTable(data.tasksData);
  updateSignatures(data);
}

// Event listener for switching data
document.getElementById('switchDataBtn').addEventListener('click', async () => {
  try {
    const button = document.getElementById('switchDataBtn');
    button.disabled = true;
    
    const response = await fetch(`/switch-data?current=${currentDataset}`);
    const data = await response.json();
    
    updateForm(data);
    currentDataset = currentDataset === 1 ? 2 : 1;
    
    button.disabled = false;
  } catch (error) {
    console.error('Error switching data:', error);
    alert('Error switching data. Please try again.');
  }
});

// Event listener for PDF generation
document.getElementById('printBtn').addEventListener('click', async () => {
  try {
    const button = document.getElementById('printBtn');
    button.disabled = true;
    button.textContent = 'Generating PDF...';
    
    // Create a loading indicator
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'loading-indicator';
    loadingDiv.textContent = 'Preparing PDF...';
    document.body.appendChild(loadingDiv);
    
    // Make the request
    const response = await fetch('/generate-pdf');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    // Get the blob from the response
    const blob = await response.blob();
    
    // Create a URL for the blob
    const url = window.URL.createObjectURL(blob);
    
    // Create a temporary link and click it
    const a = document.createElement('a');
    a.href = url;
    a.download = 'worker-progress-report.pdf';
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    document.body.removeChild(loadingDiv);
    
    // Reset button
    button.textContent = 'Print PDF';
    button.disabled = false;
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF: ' + error.message);
    
    // Reset button
    const button = document.getElementById('printBtn');
    button.textContent = 'Print PDF';
    button.disabled = false;
    
    // Remove loading indicator if it exists
    const loadingDiv = document.querySelector('.loading-indicator');
    if (loadingDiv) {
      document.body.removeChild(loadingDiv);
    }
  }
});

// Add CSS transitions
document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = `
    .form-group span,
    .progress-table tbody,
    .signature-field span {
      transition: opacity 0.2s ease-in-out;
    }
  `;
  document.head.appendChild(style);
}); 