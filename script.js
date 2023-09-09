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
            const apiKey = 'YOUR API IKEY';
            const response = await fetch('/generate-travel-plan', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
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
            travelPlanDiv.innerHTML = '<div>Sure, I can help you plan your trip to Delhi, India for 2 days. Here\'s a suggested itinerary:<div/>' +
                ' <div> Day 1: Morning: - Upon arrival at Delhi airport, you will be greeted by a private driver who will transfer you to your hotel. - After checking in and freshening up, head to Old Delhi to experience the rich historical and cultural heritage of the city. - Visit Jama Masjid, one of the largest mosques in India, and explore the bustling streets of Chandni Chowk, known for its vibrant markets and delectable street food. - Enjoy a rickshaw ride through the narrow lanes of the old city, immersing yourself in the charming chaos. Afternoon: - Have lunch at a local restaurant, trying traditional Delhi street food like paranthas or kebabs. - Visit Red Fort, a UNESCO World Heritage Site, known for its architectural grandeur and historical significance. - Explore Raj Ghat, the memorial site of Mahatma Gandhi, and pay homage to the \'Father of the Nation.\' - If time permits, you can visit the nearby National Gandhi Museum to learn more about his life and teachings. Evening: - Head to India Gate, an iconic war memorial, and enjoy a leisurely stroll along Rajpath. - Visit the nearby Rashtrapati Bhavan, the residence of the President of India, and enjoy the beautiful gardens. - For dinner, you can choose from one of the many fine dining options in the city, offering a variety of Indian and international cuisines. - Return to your hotel and relax for the night.</div>' +



                ' <div>Day 2: Morning: - After breakfast, start your day by visiting Humayun\'s Tomb, another UNESCO World Heritage Site known for its exquisite Mughal architecture. - Explore Qutub Minar complex, home to the tallest brick minaret in the world, surrounded by magnificent ruins and ancient tombs. Afternoon: - Enjoy a traditional Indian lunch at a renowned restaurant, trying dishes from different regions of the country. - Explore the National Museum, which showcases over 5,000 years of Indian art, history, and culture. - Visit the bustling markets of Connaught Place and indulge in some shopping for traditional Indian handicrafts, textiles, and jewelry. Evening: - To conclude your trip, witness the breathtaking sound and light show at the historical Red Fort, depicting the history of Delhi and its emperors. - After the show, you can enjoy a farewell dinner at a rooftop restaurant, offering a panoramic view of the city\'s skyline. Note: Please keep in mind that this itinerary is a suggestion and can be customized according to your interests and preferences. Additionally, it is essential to check the opening hours and availability of specific attractions and activities during your visit.</div>';
        }
    });
});





