document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const form = document.getElementById('workerProgressForm');
    const resetFormBtn = document.getElementById('resetForm');
    const submitFormBtn = document.getElementById('submitForm');

    // Event listeners
    resetFormBtn.addEventListener('click', () => form.reset());

    // Form submission
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Validate form
        if (!form.checkValidity()) {
            alert('Please fill in all required fields');
            return;
        }

        // Get form data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        alert('Form submitted successfully!');
    });

    // Add validation feedback
    form.addEventListener('invalid', (e) => {
        e.preventDefault();
        const input = e.target;
        input.classList.add('invalid');
    }, true);

    // Remove validation feedback when input is valid
    form.addEventListener('input', (e) => {
        const input = e.target;
        if (input.classList.contains('invalid')) {
            input.classList.remove('invalid');
        }
    });
});