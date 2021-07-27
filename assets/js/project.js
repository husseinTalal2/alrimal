const queryString = window.location.search;
const isEnglish = window.location.href.split("/").includes("en");
const parameters = new URLSearchParams(queryString);
const id = parameters.get("q")
const fetchImages = async (section, id) => {
    let result = await storage.ref(section + "/" + id).listAll();
    
    let urlPromises = result.items.map((imageRef) =>
        imageRef.getDownloadURL()
    );
    
    return Promise.all(urlPromises);
};

const getProject = async (id) => {
    let project;

    await db
        .collection("projects")
        .doc(id)
        .get()
        .then((doc) => {
            project = isEnglish ? doc.data().en : doc.data().ar ;
        });

    return project;
}
(async function () {
    const project = await getProject(id)
    const imgs = await fetchImages("projects", id);
    const container = document.getElementById("project-body");
    let imgsElements = "";
    for(let i=0; i<imgs.length; i++){
        if(i==0){
            imgsElements += `<div class="carousel-item active"><img src=${imgs[i]} class='img-fluid' alt='project img'></div>`
        }else{
            imgsElements += `<div class="carousel-item"><img src=${imgs[i]} class='img-fluid' alt='project img'></div>`
        }
    }
    container.insertAdjacentHTML('afterbegin', `
<div class="col-md-8">
<div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <!-- Indicators -->
        <ol class="carousel-indicators"></ol>
        <!-- Wrapper for slides -->
        <div class="carousel-inner ">
${imgsElements}
        </div>
        <!-- Controls -->
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon"></span>
            </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
            <span class="carousel-control-next-icon"></span>
        </a>
    </div>
        
      
    
    <h2 class="title">${project.title}</h2>
    <p class="paragraph" id="body">
    ${project.body}
    </p>
</div>
<div class="col-md-4"><div class="portfolio-info">
    <h3 class="">Project Information</h3>
    <ul id="project-info">
        <li id="category"><strong>Department</strong>: ${project.category}</li>
        <li id="client"><strong>Client</strong>: ${project.client}</li>
        <li id="date"><strong>Date</strong>: ${project.date}</li>
        <li id="location"><strong>Location</strong>: ${project.projectLocation}</li>
    </ul>
  </div>
</div>
    `)    
})()