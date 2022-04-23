const bunnForm = document.getElementById('bunnForm');

bunnForm.addEventListener('submit', function (event) {
    event.preventDefault();

    // Check the the File is a JPEG or PNG
    const image = document.getElementById('image').files[0];

    if (image.type !== 'image/jpeg' && image.type !== 'image/png') {
        alert('Please upload a JPEG or PNG file');
        return;
    }

    // Check that the file name is supplied
    if (document.getElementById('filename').value === '') {
        alert('Please provide a file name.')
        return;
    }

    const output = document.getElementById("output")
    output.textContent = 'Thanks!'

});
