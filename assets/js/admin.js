(async function () {

    firebase.auth().onAuthStateChanged((user) => {
        if (!user) {
            window.location.replace("/admin/login.html")
        }
      });


    const fetchImages = async (section, id) => {
        let result = await storage.ref(section + "/" + id).listAll();
        
        let urlPromises = result.items.map((imageRef) =>
            imageRef.getDownloadURL()
        );
        
        return Promise.all(urlPromises);
    };
    
    const getInfo = async (section) => {
        let info;
        await db
        .collection(section)
        .get()
        .then((querySnapshot) => {
            info = querySnapshot.docs.map((doc) => {
                return { id: doc.id, data: doc.data() };
            });
        });    
        return Promise.all(info)
    }

    async function getProjects() {
        const data =  getInfo("projects");
        data.then(projects => {
            projects.forEach(item => {
                createProjectCard(item);
            })
        })
    }
    const getTeam = async () => {
        const teamItems = getInfo("team")
        teamItems.then(data => {
            data.forEach(item => {
                createTeamCard(item);
            })
        })
    };
    
    const getNews = () => {
        const newsItems = getInfo("news")
        newsItems.then(data => {
            data.forEach(item => {
                createNewsCard(item);
            })
        })
    };
    
        
    const projectsContainer = document.getElementById("projects-container");
    const teamContainer = document.getElementById("team-container");
    const newsContainer = document.getElementById("news-container");
    
    
    async function createProjectCard(project) {
        const imgs = await fetchImages("projects", project.id);
        projectsContainer.insertAdjacentHTML(
            "afterbegin",
            `
            <div class="card " style="width: 18rem;">
                <img class="card-img-top" src=${imgs[0]} alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${project.data.en.title}</h5>
                    <p class="card-text">${project.data.en.subtitle}</p>
                    <a href="./post.html?q=${project.id}" class="btn btn-primary">Edit</a>
                    <button class="btn btn-danger delete-project" data-id=${project.id}>Delete</button>

                </div>
            </div>
        `
        );
    }

    async function createNewsCard(item) {
        const imgs = await fetchImages("news", item.id);

        newsContainer.insertAdjacentHTML(
            "afterbegin",
            `
            <div class="card " style="width: 18rem;">
                <img class="card-img-top" src=${imgs[0]} alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${item.data.en.title}</h5>
                    <p class="card-text">${item.data.en.subtitle}</p>
                    <a href="./news.html?q=${item.id}" class="btn btn-primary">Edit</a>
                    <button class="btn btn-danger delete-item" data-id=${item.id}>Delete</button>

                </div>
            </div>
        `
        );
    }
    async function createTeamCard(member) {
        const imgs = await fetchImages("team", member.id);

        teamContainer.insertAdjacentHTML(
            "afterbegin",
            `
            <div class="card " style="width: 18rem;">
                <img class="card-img-top" src=${imgs[0]} alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${member.data.en.name}</h5>
                    <p class="card-text">${member.data.en.desc}</p>
                    <a href="./team.html?q=${member.id}" class="btn btn-primary">Edit</a>
                    <button class="btn btn-danger delete-member" data-id=${member.id}>Delete</button>

                </div>
            </div>
        `
        );
    }


    

    
    getTeam()
    getNews()
    getProjects()


    //evenListeners
    const deleteOne = (section, id) => {
        db.collection(section)
            .doc(id)
            .delete()
            .then(() => {
                storage.ref().child(`/${section}/${id}`).listAll().then((listResults) => {
                    console.log("from storage");
                    listResults.items.forEach((item) => {
                        console.log("from delete");
                        item.delete();
                    });
                    alert("successfully deleted!");
                    window.location.href = "/admin";
                }).catch((e) => {
                    console.error(e);
                })
            })
            .catch((error) => {
                console.error("Error removing : ", error);
            });
    };
    
    const deleteProjectsBtns =
        document.getElementsByClassName("delete-project");
    const deleteMembersBtns =
        document.getElementsByClassName("delete-member");
    const deleteNewsBtns =
        document.getElementsByClassName("delete-item");

    setTimeout(() => {
        for (let i = 0; i < deleteProjectsBtns.length; i++) {
            const deleteProjectsBtn = deleteProjectsBtns[i];
            
            deleteProjectsBtn.addEventListener("click", (e) => {
                
                deleteOne("projects", e.target.getAttribute("data-id"))
                
            });
        }

        for (let i = 0; i < deleteMembersBtns.length; i++) {
            const deleteMembersBtn = deleteMembersBtns[i]
            
            deleteMembersBtn.addEventListener("click", (e) => {
                
                deleteOne("team", e.target.getAttribute("data-id"))
            });
        }

        for (let i = 0; i < deleteNewsBtns.length; i++) {
            const deleteNewsBtn = deleteNewsBtns[i]
            
            deleteNewsBtn.addEventListener("click", (e) => {
                
                deleteOne("news", e.target.getAttribute("data-id"))
            });
        }
        
    }, 2500);







    const logoutBtn = document.getElementById("logout-btn")
    logoutBtn.addEventListener('click', () => {
        firebase.auth().signOut().then(() => {
            alert("signed out")
        }).catch((error) => {
            console.error(error);
        });
    })
})();
