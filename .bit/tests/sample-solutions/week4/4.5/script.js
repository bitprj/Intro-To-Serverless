function y1k3s() {
    if (document.getElementById("name").value != '') {
        let cat = document.getElementById("name").value
        document.getElementById("image").src = "https://cataas.com/cat/says/" + cat
    }
  }