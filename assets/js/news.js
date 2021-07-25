const queryString = window.location.search;
const parameters = new URLSearchParams(queryString);
const value = parameters.get("q")

const randomNum = () => {
    return Math.random() * 100000;
};


const newsForm = document.getElementById("news-form");
const newsTitle = document.getElementById("title");
const subtitle = document.getElementById("subtitle");
const paragraph = document.getElementById("paragraph");
const newsarTitle = document.getElementById("artitle");
const arsubtitle = document.getElementById("arsubtitle");
const arparagraph = document.getElementById("arparagraph");
const newsPhotos = document.getElementById("news-photos");

const getInfo = async () => {
    console.log("from getInfo");
    await db
    .collection("news").doc(value)
    .get()
    .then(doc => {
        doc = doc.data()
        newsTitle.value = doc.en.title;
        subtitle.value = doc.en.subtitle;
        paragraph.value = doc.en.paragraph;
        newsarTitle.value = doc.ar.title;
        arsubtitle.value = doc.ar.subtitle;
        arparagraph.value = doc.ar.paragraph;
    });    
}
if (value != null) {
    getInfo();
}

newsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const imgs = Object.values(newsPhotos.files);
    let docRef;
    if(value != null){
        docRef = db.collection("news").doc(value);    
    }else{
        docRef = db.collection("news").doc();
    }

    imgs.forEach((img) => {
        const storageRef = storage
            .ref()
            .child("news/" + docRef.id + "/" + randomNum());
        storageRef.put(img);
    });

    const newsData = {
        en: {
            title: newsTitle.value,
            subtitle: subtitle.value,
            paragraph: paragraph.value,
        },
        ar: {
            title: newsarTitle.value,
            subtitle: arsubtitle.value,
            paragraph: arparagraph.value,
        },
    };

    console.log(newsData);
    docRef
        .set(newsData, { merge: true })
        .then(() => {
            alert("Post added successfully");
            newsForm.reset();
        });
});
