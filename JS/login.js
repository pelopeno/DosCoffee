document.addEventListener('DOMContentLoaded', function () {
    const username = document.getElementById('username');
    const password = document.getElementById('password');
    const submitBtn = document.querySelector('button');

    submitBtn.addEventListener('click', function () {

        // Check if either username or password is empty
        if (username.value === '' || password.value === '') {
            Swal.fire({
                title: 'Error!',
                text: 'Please fill in all fields.',
                icon: 'error',
                confirmButtonText: 'OK',
            });
            return;
        }
    });
});
