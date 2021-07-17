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

projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const imgs = Object.values(photos.files);
    const docRef = db.collection("projects").doc();

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
