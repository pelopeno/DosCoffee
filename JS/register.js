document.addEventListener("DOMContentLoaded", function () {
    const formSteps = document.querySelectorAll(".form-step");
    const nextButton = document.getElementById("nextButton");
    const prevButton = document.getElementById("prevButton");
    const registerButton = document.getElementById("submitButton");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const contactNumber = document.getElementById("contact_no");
    const confirmPasswordInput = document.getElementById("confirm_pass");
    const usernameError = document.getElementById("usernameError");
    const passwordError = document.getElementById("passwordError");

    let currentStep = 0;

    // Function to show the current step
    function showStep(step) {
        formSteps.forEach((formStep, index) => {
            formStep.classList.toggle("active", index === step);
        });
    }

    nextButton.addEventListener("click", function () {
        // Validate username
        const usernameRegex = /^[a-zA-Z0-9]*$/;
        const digits = /^[0-9]*$/;

        if (!usernameRegex.test(usernameInput.value)) {
            usernameError.textContent = "Only letters and numbers are allowed.";
            return;
        } else {
            usernameError.textContent = "";
        }
    
        // Check if all required fields are filled
        if (
            !usernameInput.value.trim() || 
            !passwordInput.value.trim() || 
            !confirmPasswordInput.value.trim()
        ) {
            Swal.fire({
                title: 'Error!',
                text: 'Please fill in all fields.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        } else {
            Swal.fire({
                title: 'Next Step',
                text: 'Proceeding to the next step!',
                icon: 'success',
                confirmButtonText: 'Continue',
            });
        }

        if(!digits.test(contactNumber.value) ) {
            Swal.fire({
                title: 'Error!',
                text: 'Please input Numbers only.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }
       
    
        // Validate passwords
        if (passwordInput.value !== confirmPasswordInput.value) {
            Swal.fire({
                title: 'Error!',
                text: 'Passwords do not match.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            passwordError.textContent = "Passwords do not match.";
            return;
        } else {
            passwordError.textContent = "";
        }
    
        // Go to the next step
        currentStep++;
        showStep(currentStep);
    });
    

    // Go back to the previous step
    prevButton.addEventListener("click", function () {
        currentStep--;
        showStep(currentStep);
    });

    registerButton.addEventListener("click", function (event) {
        document.getElementById("multiStepForm").submit();

        if(contactNumber.value.length !== 11){
            Swal.fire({
                title: 'Error!',
                text: 'Contact Number should be 11 Digits.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }
    });
    
    showStep(currentStep);
});
