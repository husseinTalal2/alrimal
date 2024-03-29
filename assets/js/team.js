const queryString = window.location.search;
const parameters = new URLSearchParams(queryString);
const value = parameters.get("q")

const teamForm = document.getElementById("team-form");
const name = document.getElementById("name");
const desc = document.getElementById("description");
const position = document.getElementById("position");
const arname = document.getElementById("arname");
const ardesc = document.getElementById("ardescription");
const arposition = document.getElementById("arposition");
const teamPhoto = document.getElementById("team-photo");

const getInfo = async () => {

    await db
    .collection("team").doc(value)
    .get()
    .then(doc => {
        doc = doc.data()
        name.value=doc.en.name;        
        desc.value=doc.en.desc;        
        position.value=doc.en.position;        
        ardesc.value=doc.ar.desc;        
        arposition.value=doc.ar.position;        
        arname.value=doc.ar.name;        
    });    
}
if (value != null) {
    getInfo();
}
const randomNum = () => {
    return Math.random() * 100000;
};

teamForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const img = teamPhoto.files[0];
    let docRef;
    if(value != null){
        docRef = db.collection("team").doc(value);    
    }else{
        docRef = db.collection("team").doc();
    }
    const storageRef = storage
        .ref()
        .child("team/" + docRef.id + "/" + randomNum());

    storageRef.put(img);
    const teamData = {
        en: {
            name: name.value,
            position: position.value,
            desc: desc.value,
        },
        ar: {
            name: arname.value,
            position: arposition.value,
            desc: ardesc.value,
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