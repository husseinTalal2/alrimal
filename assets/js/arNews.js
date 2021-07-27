const getNews = async () => {
    let news;
    await db
        .collection("news")
        .get()
        .then((querySnapshot) => {
            news = querySnapshot.docs.map((doc) => doc);
        });
    return news;
};


(async function(){

  const news = await getNews()

  news.forEach(async (doc) => {
    const imgs = await fetchImages("news", doc.id)
    const member = doc.data().ar
    const container = document.getElementsByClassName("news-container")[0];

    container.insertAdjacentHTML('afterbegin',`
    <div class="col-md-4">
    <div class="card ">
      <img class="card-img-top" src=${imgs[0]} alt="Card image cap">
      <div class="card-body">
        <h4 class="card-title text-right">${member.title}</h4>
        <p class="card-text text-right">${member.subtitle}</p>
        <a href="./ar/news/?q=${doc.id}" class="btn-read animate__animated animate__fadeInUp scrollto float-right">اقرأ المزيد</a>
      </div>
    </div>
  </div>
    `)
  })
  
})()