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