const bunnForm = document.getElementById('bunnForm');

bunnForm.addEventListener('submit', function (event) {
  event.preventDefault()
  var myform = document.getElementById("bunnForm")
  var payload = new FormData(myform);
  console.log(payload)
  var username = document.getElementById("username").value;
  const output = document.getElementById("output");
  
  if (username != '') {
      output.textContent = "Thanks!"

      console.log("Posting your image...");
      const resp = await fetch("YOUR_URL", {
          method: 'POST',
          headers: {
              'codename' : username
          },
          body: payload
      });

      var data = await resp.text();
      console.log(data);
      output.textContent = "Your image has been stored successfully!"
  } else {
      alert("No name error.")
  }
});
  
let downloadButton = document.getElementById("button2");

downloadButton.addEventListener("click", () => downloadImage())

  async function downloadImage() {
    var username = document.getElementById("downloadusername").value;
    console.log("Attempting to get your pdf...");
    const resp = await fetch("INSERT_DOWNLOAD)URL", {
        method: 'GET',
        headers: {
            'username' : username
        },
    });
  
    var data = await resp.json();
    console.log("PDF link received!")
    console.log(data.downloadUri)
    console.log(data.success)
    const link = data.downloadUri
    var success = data.success
  
    window.open(link, "_self")
  }
