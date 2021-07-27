const projects = [
    {
      id:1,
      title: " Aran Island residential complex",
      info: "A complete residential complex with all services",
      img: "./assets/img/projects/aran/1.jpg",
      category:"management",
      href: "/en/projects/aran"
    },
    {
      id:2,
      title: " Janat Wasit water park",
      info: "",
      img: "./assets/img/projects/jannat-wasit/3.jpg",
      category:"management",
      href: "/en/projects/jannat-wasit"
    },
    {
      id:3,
      title: "Interior Designs",
      info: "A collection of interior designs",
      img: "./assets/img/projects/designs/1.jpg",
      category:"design",
      href: "/en/projects/designs"
    },
    {
      id:4,
      title: "Gardens and exterior designs",
      info: "A collection of exterior and garden designs",
      img: "./assets/img/projects/gardens/11.jpg",
      category:"design",
      href: "/en/projects/gardens"
    },
    {
      id:5,
      title: "Rehabilitation and development of Biarat Al Sham restaurant",
      info: "Exterior designs for Biarat Al Sham Restaurant",
      img: "./assets/img/projects/alsham/3.jpg",
      category:"design",
      href: "/en/projects/alsham"
    },
  ]
  
const getProjects = async () => {
    let projects;
    await db
        .collection("projects")
        .get()
        .then((querySnapshot) => {
            projects = querySnapshot.docs.map((doc) => doc);
        });

    return projects;
};

const fetchImages = async (section, id) => {
  let result = await storage.ref(section + "/" + id).listAll();
  
  let urlPromises = result.items.map((imageRef) =>
      imageRef.getDownloadURL()
  );
  
  return Promise.all(urlPromises);
};
(async function(){
  const projects = await getProjects()
  projects.forEach(async (doc) => {

    const imgs = await fetchImages("projects", doc.id)
    const project = doc.data().en
    const container = $(".portfolio-container")[0];
    container.insertAdjacentHTML('afterbegin',`
    
      <div class="col-md-4 portfolio-item filter-${project.category}">
        <div class="property-card">
          <a href="/en/projects/?q=${doc.id}">
            <div class="property-image" style="background-image:url(${imgs[0]});">
            </div>
          </a>
          <div class="property-description">
            <h5>${project.title}</h5>
            <p>${project.subtitle}</p>
          </div>
        </div>
      </div>
    `)
  })
})()
