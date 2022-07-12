const bunnForm = document.getElementById('bunnForm');

bunnForm.addEventListener('submit', function (event) {
    event.preventDefault()

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

const downloadButton = document.getElementById("button2");

downloadButton.addEventListener("click", () => downloadImage());

async function downloadImage() {

    const username = document.getElementById("downloadusername").value;

    console.log("Attempting to get your pdf...");

    const resp = await fetch("INSERT_DOWNLOAD)URL", {
        method: 'GET',
        headers: {
            'username': username
        },
    });

    const data = await resp.json();

    console.log("PDF link received!")
    console.log(data.downloadUri)
    console.log(data.success)

    const link = data.downloadUri

    window.open(link, "_self")
}
