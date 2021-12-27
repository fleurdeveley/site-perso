(function() {
    var httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
        console.log('Impossible de créer une instance de XMLHTTP.');
        return false;
    }

    httpRequest.onreadystatechange = getProjects;
    httpRequest.open('GET', 'http://localhost:8080/api/projects');
    httpRequest.send();

    function getProjects() {
        if (httpRequest.readyState === XMLHttpRequest.DONE) {
          if (httpRequest.status === 200) {
            var projects = JSON.parse(httpRequest.responseText);
            projects.forEach(project => {
                console.log(project);

                var col = document.createElement("div");
                col.classList.add("col-md-12", "col-lg-6");

                var card = document.createElement("div");
                card.classList.add("card", "border-dark", "mb-3");

                var h4 = document.createElement("h4");
                h4.classList.add("card-header");
                h4.innerText = project.title;



                card.appendChild(h4);

                
                col.appendChild(card);

                var row = document.getElementById('projects');
                row.appendChild(col);



            }); 
          } else {
            console.log('Il y a eu un problème avec la requête.');
          }
        }
    }
})();
