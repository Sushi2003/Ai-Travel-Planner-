document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('travel-form');
    const travelPlanDiv = document.getElementById('travel-plan');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const location = document.getElementById('location').value;
        const date = document.getElementById('date').value;
        const duration = document.getElementById('duration').value;
        const travelers = document.getElementById('travelers').value;

        try {
            // Send user input to the server for processing
            const response = await fetch('/generate-travel-plan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    location,
                    date,
                    duration,
                    travelers,
                }),
            });

            const data = await response.json();

            // Display the travel plan in the UI
            travelPlanDiv.innerHTML = `<h2>Travel Plan:</h2><p>${data.travelPlan}</p>`;
        } catch (error) {
            console.error('Error:', error);
            travelPlanDiv.innerHTML = '<p>Error generating travel plan.</p>';
        }
    });
});
