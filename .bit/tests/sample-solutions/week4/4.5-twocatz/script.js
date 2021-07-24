let submitButton = document.getElementById("submit");

submitButton.addEventListener("click", function(event) {
    event.preventDefault();
    if (document.getElementById("name").value != '') {
        let cat = document.getElementById("name").value
        document.getElementById("image").src = "https://cataas.com/cat/says/" + cat
    }
});