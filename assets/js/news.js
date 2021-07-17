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

newsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const imgs = Object.values(newsPhotos.files);
    const docRef = db.collection("news").doc();

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
