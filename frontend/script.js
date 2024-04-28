let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");

signup.addEventListener("click", () => {
	slider.classList.add("moveslider");
	formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
	slider.classList.remove("moveslider");
	formSection.classList.remove("form-section-move");
});

document.querySelector(".clkbtn").addEventListener("click", async function() {
    // Get the username and password from the input fields
    var email = document.querySelector(".email").value;
    var password = document.querySelector(".password").value;
	// console.log(email)
	// console.log(password)

    try {
        // Make a POST request to your server to validate the login credentials
        const response = await fetch("http://localhost:3000/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        });

        // Check if the response is successful (status code 200-299)
        if (response.ok) {
            // Parse the JSON response
            const data = await response.json();
            
            // Check the response from the server (e.g., if login was successful)
            if (data.success) {
                // Redirect to the home page
                console.log(data.id) // Replace this with your desired URL
                localStorage.setItem("userId", data.id);  // Replace this with your desired URL

				window.location.href = "home.html";
            } else {
                // If login was not successful, display an error message
                alert(data.message);
            }
        } else {
            // If the server returns an error response, display an error message
            alert("Server error: Unable to process your request.");
        }
    } catch (error) {
        // If an error occurs during the fetch operation, display an error message
        console.error("Error:", error);
        alert("An unexpected error occurred. Please try again later.");
    }
});

// let forgetbtn = document.querySelector("#forgetPassword");
// var emailforPassword = document.querySelector(".email").value;

let forgetbtn = document.querySelector("#forgetPassword");
let emailInput = document.querySelector(".email"); // Assuming you have an input field with id 'email'

forgetbtn.addEventListener("click", async () => {
    const email = emailInput.value;

    try {
        const response = await fetch('http://localhost:3000/user/forgetpassword', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
        });

        const data = await response.json();

        if (response.ok) {
            alert(data.message);
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred, please try again later.');
    }
});


var myName = document.querySelector(".name");
var myEmail = document.querySelector(".email1");
var myPassword = document.querySelector(".password1");
var myconfirmPassword = document.querySelector(".confirmpassword");
var myRole = document.querySelector(".role");
var signupbtn = document.querySelector(".signupbtn");

signupbtn.addEventListener("click", async () => {
	try {
		var obj = {
			name: myName.value,
			email: myEmail.value,
			password: myPassword.value,
			confirmPassword: myconfirmPassword.value,
            role: myRole.value
		};
		// console.log(obj)
		const response = await fetch("http://localhost:3000/user/signup", {
			method: "POST", // Corrected the method to "POST"
			headers: {
				"Content-type": "application/json"
			},
			body: JSON.stringify(obj)
		});

		if (!response.ok) {
			throw new Error("Network response was not ok.");
		}

        const data = await response.json();
        console.log("Response Data:", data); // Print the response data

        // if (data.data && data.data.role === 'cycleowner') { // Check if the user is an admin
        //     console.log("Redirecting to addProduct.html");
        //     window.location.href = "addCycle.html"; // Redirect to add product page
        // } else {
        //     console.log("Redirecting to user-dashboard.html");
        //     window.location.href = "./index.html"; // Redirect to user dashboard
        // }

        alert('You are successfully signed in, Now you can login')

		// Proceed with further actions if needed
	} catch (error) {
		console.error("MISTAKE Error:", error);
		// Handle the error, such as showing an error message to the user
	}
});
