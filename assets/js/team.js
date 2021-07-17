const randomNum = () => {
    return Math.random() * 100000;
};
const teamForm = document.getElementById("team-form");
const name = document.getElementById("name");
const desc = document.getElementById("description");
const arname = document.getElementById("arname");
const ardesc = document.getElementById("ardescription");
const teamPhoto = document.getElementById("team-photo");

teamForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const img = teamPhoto.files[0];
    const docRef = db.collection("team").doc();
    const storageRef = storage
        .ref()
        .child("team/" + docRef.id + "/" + randomNum());

    storageRef.put(img);
    const teamData = {
        en: {
            name: name.value,
            desc: desc.value,
        },
        ar: {
            arname: arname.value,
            ardesc: ardesc.value,
        },
    };
    console.log(teamData);
    docRef
        .set(teamData, { merge: true })
        .then(() => {
            alert("Member added successfully");
            teamForm.reset();
        });
});