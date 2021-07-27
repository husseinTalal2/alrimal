const queryString = window.location.search;
const isEnglish = window.location.href.split("/").includes("en");
const parameters = new URLSearchParams(queryString);
const id = parameters.get("q");
const fetchImages = async (section, id) => {
    let result = await storage.ref(section + "/" + id).listAll();

    let urlPromises = result.items.map((imageRef) => imageRef.getDownloadURL());

    return Promise.all(urlPromises);
};

const getnewsItem = async (id) => {
    let item;

    await db
        .collection("news")
        .doc(id)
        .get()
        .then((doc) => {
            item = isEnglish ? doc.data().en : doc.data().ar;
        });

    return item;
};

(async function () {
    
    const item = await getnewsItem(id);
    document.title = item.title
    const imgs = await fetchImages("news", id);
    const container = document.getElementById("news-container");
    let imgsElements = "";
    for (let i = 0; i < imgs.length; i++) {
        if (i == 0) {
            imgsElements += `<div class="carousel-item active"><img src=${imgs[i]} class='img-fluid' alt='project img'></div>`;
        } else {
            imgsElements += `<div class="carousel-item"><img src=${imgs[i]} class='img-fluid' alt='project img'></div>`;
        }
    }
    container.insertAdjacentHTML(
        "afterbegin",
        `
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

    <h2 class="">${item.title}</h2>
    <p class="">
        ${item.paragraph}
    </p>
</div>
    `
    );
})();
