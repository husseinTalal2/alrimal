const projects = [
    {
      id:1,
      title: " مجمع اران السكني ",
      info: "مجمع سكني متكامل مع جميع الخدمات",
      img: "./assets/img/projects/aran/1.jpg",
      category:"management",
      href: "/ar/projects/aran"
    },
    {
      id:2,
      title: " مدينة العاب جنات واسط المائية",
      info: "",
      img: "./assets/img/projects/jannat-wasit/3.jpg",
      category:"management",
      href: "/ar/projects/jannat-wasit"
    },
    {
      id:3,
      title: "تصاميم داخلية",
      info: "مجموعة من التصاميم الداخلية",
      img: "./assets/img/projects/designs/11.jpg",
      category:"design",
      href: "/ar/projects/designs"
    },
    {
      id:4,
      title: "تصاميم خارجية و حدائق",
      info: "مجموعة من التصاميم الخارجية و الحدائق",
      img: "./assets/img/projects/gardens/1.jpg",
      category:"design",
      href: "/ar/projects/gardens"
    },
    {
      id:5,
      title: "تأهيل و تطوير مطعم بيارة الشام",
      info: "التصاميم الخارجية لمطعم بيارة الشام",
      img: "./assets/img/projects/alsham/3.jpg",
      category:"design",
      href: "/ar/projects/alsham"
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
    const project = doc.data().ar
    const container = $(".portfolio-container")[0];
    container.insertAdjacentHTML('afterbegin',`
    
      <div class="col-md-4 portfolio-item filter-${project.category}">
        <div class="property-card">
          <a href="/ar/projects/?q=${doc.id}">
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
    container.style.height = "auto"
  })
})()
