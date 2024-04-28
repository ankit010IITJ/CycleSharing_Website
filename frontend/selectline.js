async function getCycles() {
    const hostelLane = document.getElementById('hostelLane').value;

    try {
        const response = await fetch('/api/getCyclesInLane', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ hostelLane: hostelLane }),
        });

        const data = await response.json();

        if (response.ok) {
            displayCycles(data.data);
        } else {
            displayMessage(data.message);
        }
    } catch (error) {
        displayMessage('Error retrieving cycles');
    }
}

function displayCycles(cycles) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';

    if (cycles.length > 0) {
        const ul = document.createElement('ul');

        cycles.forEach(cycle => {
            const li = document.createElement('li');
            li.textContent = `Cycle ID: ${cycle._id}, Name: ${cycle.name}, Hostel Lane: ${cycle.hostelLane}`;
            ul.appendChild(li);
        });

        resultsDiv.appendChild(ul);
    } else {
        displayMessage('No cycles found');
    }
}

function displayMessage(message) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<p>${message}</p>`;
}