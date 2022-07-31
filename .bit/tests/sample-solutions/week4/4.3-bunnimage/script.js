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

    const myForm = document.getElementById("bunnForm")
    const payload = new FormData(myForm);

    console.log(payload);

    const userName = document.getElementById("username").value;
    const output = document.getElementById("output");

    console.log("Posting your image...");

    const resp = await fetch("YOUR_URL", {
        method: 'POST',
        headers: {
            'codename': userName
        },
        body: payload
    });

    const data = await resp.text();
    console.log(data);
    output.textContent = "Your image has been stored successfully!";

});