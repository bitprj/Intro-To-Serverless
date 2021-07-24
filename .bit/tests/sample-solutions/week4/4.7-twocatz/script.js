let submitButton = document.getElementById("submit");

submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    let url = `${AZURE_URL}&name1=${document.getElementById("name1").value}&name2=${document.getElementById("name2").value}&name3=${document.getElementById("name3").value}&name4=${document.getElementById("name4").value}`
    let resp = await fetch(url, {
            method: 'GET'
        });
        
        let result = await resp.json()
  
        document.getElementById("image1").src = "data:image/png;base64," + result.cat1
        document.getElementById("image2").src = "data:image/png;base64," + result.cat2
        document.getElementById("image3").src = "data:image/png;base64," + result.cat3
        document.getElementById("image4").src = "data:image/png;base64," + result.cat4
});