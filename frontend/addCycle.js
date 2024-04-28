var cycleName = document.querySelector(".cycleName");
var cycleColor = document.querySelector(".cycleColor");
var cycleHostelLane = document.querySelector(".cycleHostelLane");
var ownerNo = document.querySelector(".ownerNo");
var addbtn = document.querySelector(".addbtn");

addbtn.addEventListener("click", async () => {
    //alert("you are successfully uploaded your details, go back to reach home page");
    const userId = localStorage.getItem("userId");
    try {
        var obj = {
            name: cycleName.value,
            color: cycleColor.value,
            hostelLane: cycleHostelLane.value,
            mobileNo: ownerNo.value,
            id : userId
        };

        const response = await fetch("http://172.31.56.253:3000/cycle/crudCycle", {
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(obj)
        });

        //alert("you are successfully uploaded your details, go back to reach home page");

        // // Log the entire response object
        // console.log("Response:", response);
        // if (response.ok) {
        //     const data = await response.json();
        //     console.log("Response Status:", response.status); // Log the response status
        //     console.log("Response Data:", data); // Log the response data
        
        //     if (data.data || data.login) {
        //         // Store the token in local storage
        //         localStorage.setItem("token", data.login);
        
        //         // Redirect to the home page
        //         window.location.href = "home.html";
        //     } else {
        //         alert(data.message);
        //     }
        // } else {
        //     console.log("Error Status:", response.status); // Log the error status
        //     alert("Server error: Unable to process your request.");
        // }
        
        if (response.ok) {
            const data = await response.json();
            console.log("Response Status:", response.status); // Log the response status
            console.log("Response Data:", data); // Log the response data
        
            if (data.data || data.login) {
                
                //alert("you are successfully uploaded your details, go back to reach home page");

                // Store the token in local storage
                localStorage.setItem("token", data.login);
        
                // Redirect to the home page
                window.location.href = "home.html";
                // alert("you are successfully uploaded your details, go back to reach home page");
            } else {
                alert(data.message);
            }
        } else {
            console.log("Error Status:", response.status); // Log the error status
            alert("Server error: Unable to process your request.");
        }        

    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while processing your request.");
    }
});
