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

                var img = new Image();
                img.src = 'img/' + project.image;
                img.classList.add("card-img-top");
                card.appendChild(img);

                var cardFooter = document.createElement("div");
                cardFooter.classList.add("card-footer");

                var cardFooterContent = document.createElement('div');
                cardFooterContent.classList.add("d-flex", "justify-content-around");

                if(project.url_site.length >0) {
                    var demo = document.createElement("a");
                    demo.href = project.url_site;
                    demo.setAttribute("target", "_blank");
                    demo.classList.add("btn");
                    demo.innerText = "Démo";
                    
                    cardFooterContent.appendChild(demo);
                }

                if(project.url_github.length > 0) {
                    var gitHub = document.createElement("a");
                    gitHub.href = project.url_github;
                    gitHub.setAttribute("target", "_blank");
                    gitHub.classList.add("btn");
                    gitHub.innerText = "GitHub";   
                
                    cardFooterContent.appendChild(gitHub);
                }

                cardFooter.appendChild(cardFooterContent);
                card.appendChild(cardFooter);

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
