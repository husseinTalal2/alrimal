const queryString = window.location.search;
const parameters = new URLSearchParams(queryString);
const value = parameters.get("q")

const randomNum = () => {
    return Math.random() * 100000;
};
const projectForm = document.getElementById("project-form");
const title = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const body = document.getElementById("body");
const date = document.getElementById("date");
const projectLocation = document.getElementById("location");
const category = document.getElementById("category");
const client = document.getElementById("client");

const artitle = document.getElementById("artitle");
const arsubtitle = document.getElementById("arsubtitle");
const arbody = document.getElementById("arbody");
const ardate = document.getElementById("ardate");
const arprojectLocation = document.getElementById("arlocation");
const arcategory = document.getElementById("arcategory");
const arclient = document.getElementById("arclient");

const photos = document.getElementById("photos");

const getInfo = async () => {
    
    await db
    .collection("projects").doc(value)
    .get()
    .then(doc => {
        doc = doc.data()
        console.log(doc);
        title.value = doc.en.title;
        subtitle.value = doc.en.subtitle;
        body.value = doc.en.body;
        date.value = doc.en.date;
        projectLocation.value = doc.en.projectLocation;
        category.value = doc.en.category;
        client.value = doc.en.client;
        
        artitle.value = doc.ar.title;
        arsubtitle.value = doc.ar.subtitle;
        arbody.value = doc.ar.body;
        ardate.value = doc.ar.date;
        arprojectLocation.value = doc.ar.projectLocation;
        arcategory.value = doc.ar.category;
        arclient.value = doc.ar.client;
    });    
}
if (value != null) {
    getInfo();
}

projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const imgs = Object.values(photos.files);
    let docRef;
    if(value != null){
        docRef = db.collection("projects").doc(value);    
    }else{
        docRef = db.collection("projects").doc();
    }

    imgs.forEach((img) => {
        const storageRef = storage
            .ref()
            .child("projects/" + docRef.id + "/" + randomNum());
        storageRef.put(img);
    });

    const data = {
        en: {
            title: title.value,
            subtitle: subtitle.value,
            body: body.value,
            date: date.value,
            projectLocation: projectLocation.value,
            category: category.value,
            client: client.value,
        },
        ar: {
            title: artitle.value,
            subtitle: arsubtitle.value,
            body: arbody.value,
            date: ardate.value,
            projectLocation: arprojectLocation.value,
            category: arcategory.value,
            client: arclient.value,
        },
    };

    docRef
        .set(data, { merge: true })
        .then(() => {
            alert("Project added successfully");
            projectForm.reset();
        });
});
