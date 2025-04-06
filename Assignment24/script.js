function validate() {
    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('Email').value.trim();
    const password = document.getElementById('Password').value;
    const conPassword = document.getElementById('conPassword').value;
    const errorMsg1 = document.getElementById('errorMessage1');
    const errorMsg2 = document.getElementById('errorMessage2');
    const errorMsg3 = document.getElementById('errorMessage3');
    const errorMsg4 = document.getElementById('errorMessage4');
    

    
    errorMsg1.textContent = '';
    errorMsg2.textContent = '';
    errorMsg3.textContent = '';
    errorMsg4.textContent = '';
 let isValid=true;
    
    if (fullName === '') {
        errorMsg1.textContent = "Invalid name: Name is required.";
        isValid=false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        errorMsg2.textContent = "Invalid email address.";
        isValid=false;
    }
   
    if (password.length < 8) {
        errorMsg3.textContent = "Password must be at least 8 characters long.";
        isValid=false;
    }
    
    if (password !== conPassword) {
        errorMsg4.textContent = "Passwords do not match.";
        isValid=false;
    }

    return isValid;
}
