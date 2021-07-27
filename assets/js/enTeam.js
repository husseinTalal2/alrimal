const getTeam = async () => {
    let team;
    await db
        .collection("team")
        .get()
        .then((querySnapshot) => {
            team = querySnapshot.docs.map((doc) => doc);
        });
    return team;
};


(async function(){

  const team = await getTeam()
  
  team.forEach(async (doc) => {
    const imgs = await fetchImages("team", doc.id)
    const member = doc.data().en
    const container = document.getElementsByClassName("team-container")[0];
    container.insertAdjacentHTML('afterbegin',`
        <div class=" col-md-4 col-xs-12" style="min-height: 400px;">
            <div class="member d-flex flex-column justify-content-center align-items-center h-100" >
                <img src=${imgs[0]} alt="">
                <h4>${member.name}</h4>
                <span>${member.position}</span>
                <p>
                    ${member.desc}
                </p>
            </div>
        </div>
    `)
  })
  
})()