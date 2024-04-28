const cycleBookButton = document.getElementById('cyclebook');
const bookRidingDiv = document.getElementById('bookRidingDiv');
const cycleList = document.getElementById('cycleList');
const noCycles = document.getElementById('noCycles');
const getCyclesButton = document.getElementById('getCycles'); // Defined getCyclesButton
const regestiranothercycle = document.getElementById('regestiranothercycle'); // Defined getCyclesButton
const sharedCycleNameSection = document.getElementById("sharedCycleSection");
const sharedCycleName = document.getElementById("sharedCycleName");
const newCycleFormSection = document.getElementById("newCycleFormSection");

cycleBookButton.addEventListener('click', () => {
    bookRidingDiv.style.display = 'block';
    bookRidingDiv.scrollIntoView({ behavior: 'smooth' });
});



// Open popup
document.getElementById("cycleshare").addEventListener("click", async function() {
    try {
        const userId = localStorage.getItem("userId");
        const response = await fetch(`http://172.31.56.253:3000/cycle/getCycleByUser?userId=${userId}`);
        console.log(response)
        if (response.ok) {
            const cycleData = await response.json();

            // If a cycle is already shared
            if (cycleData.cycle) {
                const { name, color, mobileNo } = cycleData.cycle;
                sharedCycleNameSection.style.display = "block";
                newCycleFormSection.style.display = "none";
                sharedCycleName.innerHTML = `
                    <p>Name: ${name}</p>
                    <p>Color: ${color}</p>
                    <p>Mobile No: ${mobileNo}</p>
                `;

            } 

            document.getElementById("popup").style.display = "block";
        } else {
            sharedCycleNameSection.style.display = "none";
            newCycleFormSection.style.display = "block";
            document.getElementById("popup").style.display = "block";

    }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while checking cycle details. Please try again later.");
    }
});


// Close popup
document.getElementById("closeBtn").addEventListener("click", function() {
    document.getElementById("popup").style.display = "none";
});

// Submit form
document.getElementById("submitCycle").addEventListener("click", async () => {
    try {
        const userId = localStorage.getItem("userId");
        const selectedLane = document.getElementById('hostelLane').value;
        var obj = {
            availability: false,
            userId: userId,
            name: document.getElementById("cycleName").value,
            color: document.getElementById("cycleColor").value,
            hostelLane: selectedLane,
            mobileNo: document.getElementById("ownerNo").value
        };

        const response = await fetch("http://172.31.56.253:3000/cycle/crudCycle", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(obj)
        });

        if (response.ok) {
            alert("You have successfully uploaded your cycle details.");
            document.getElementById("popup").style.display = "none";
        } else {
            alert("Failed to upload cycle details. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while uploading cycle details. Please try again later.");
    }
});

getCyclesButton.addEventListener('click', async () => {
    await fetchCycles();
});

const radioButtons = document.querySelectorAll('input[type=radio][name="hostelLane"]');

radioButtons.forEach(radioButton => {
    radioButton.addEventListener('change', async () => {
        await fetchCycles();
    });
});

async function fetchCycles() {
    try {
        const selectedLane = document.querySelector('input[type=radio][name="hostelLane"]:checked').value;
        const response = await fetch(`http://172.31.56.253:3000/cycle/getCyclesByLane?lane=${selectedLane}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.length === 0) {
            noCycles.style.display = 'block';
            cycleList.innerHTML = ''; // Clear existing cycles
        } else {
            noCycles.style.display = 'none';
            displayCycles(data.cycles);
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while fetching cycles. Please try again later.");
    }
}

function displayCycles(cycles) {
    cycleList.innerHTML = ''; // Clear existing cycles
    
    cycles.forEach(cycle => {
        // Determine the background color based on availability
        const availabilityColor = cycle.availability ? 'green' : 'red';

        const cycleCard = `
            <div class="cycle-card">
                <div class="cycle-info">
                    <h3>Name: ${cycle.name}</h3>
                    <p>Color: ${cycle.color}</p>
                    <p>Hostel Lane: ${cycle.hostelLane}</p>
                    <p>Mobile No: ${cycle.mobileNo}</p>
                    <div id="availability" style="background-color: ${availabilityColor};">Availability: ${cycle.availability}</div>
                </div>
                <div class="cycle-buttons">
                    <button class="request-button">Request</button>
                </div>
            </div>
        `;
        cycleList.insertAdjacentHTML('beforeend', cycleCard);
    });

    // Add Flexbox styling
    cycleList.style.display = 'flex';
    cycleList.style.flexWrap = 'wrap';
    cycleList.style.justifyContent = 'space-between'; // To evenly distribute cards
    cycleList.style.gap = '20px'; // Spacing between cards
}

document.getElementById("shareExistingCycle").addEventListener("click", async () => {
    try {
        const cycleId = localStorage.getItem("userId");
        console.log(cycleId)

        const response = await fetch(`http://172.31.56.253:3000/cycle/updateAvailability/${cycleId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ availability: true })
        });
        console.log(response)
        if (response.ok) {
            // Cycle availability updated successfully
            alert("You have successfully updated your cycle availability.");
            document.getElementById("popup").style.display = "none";
        } else {
            // If the server returns an error response, display an error message
            alert("Not able to change cycle availability. Please try again later.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while updating cycle availability. Please try again later.");
    }
});

document.getElementById("shareExistingCycle1").addEventListener("click", async () => {
    try {
        const cycleId = localStorage.getItem("userId");
        console.log(cycleId)

        const response = await fetch(`http://172.31.56.253:3000/cycle/updateAvailability/${cycleId}`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({ availability: false })
        });
        console.log(response)
        if (response.ok) {
            // Cycle availability updated successfully
            alert("You have successfully updated your cycle availability.");
            document.getElementById("popup").style.display = "none";
        } else {
            // If the server returns an error response, display an error message
            alert("Not able to change cycle availability. Please try again later.");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while updating cycle availability. Please try again later.");
    }
});

async function updateAccountToCycleOwner(userId) {
    const apiUrl = `http://172.31.56.253:3000/user/${userId}`;

    const payload = {
        role: 'cycleowner'
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data.message === 'data updated successfully';
    } catch (error) {
        console.error('Error updating account:', error);
        return false;
    }
};