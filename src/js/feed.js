function createCards() {
  const container = $("#activity");
  const workouts = JSON.parse(localStorage.getItem("workouts"));

  Object.entries(workouts).forEach(([key, value]) => {
    const cardWrapper = $("<div>").addClass("cardd");
    cardWrapper.css({
      width: "24rem",
      marginRight: "30px",
      border: "0px solid transparent",
    });

    const cardBody = $("<div>").addClass("card-body").css({
      display: "flex",
      flexDirection: "column",
    });

    const cardTitle = $("<h5>").addClass("card-title").text(value.nama);
    cardTitle.css({
      padding: "5px",
      backgroundColor: "#b8f468",
      textAlign: "center",
      fontWeight: "bold",
      color: "black",
    });

    const cardImageWrapper = $("<div>").css({ position: "relative" });
    const cardImage = $("<img>").addClass("card-img-top").attr({
      src: value.foto,
      alt: "Card image cap",
    });
    cardImageWrapper.append(cardImage);

    const capsule = $("<div>").addClass("transparent-capsule");
    capsule.html('<i class="fa-solid fa-dumbbell"></i> ' + value.level);
    capsule.css({
      position: "absolute",
      bottom: "5px",
      right: "5px",
      padding: "5px",
      backgroundColor: "rgba(0, 0, 0, 0.7)",
      color: "white",
      borderRadius: "10px",
    });
    cardImageWrapper.append(capsule);

    const cardButton = $("<a>").addClass("btn").text("See Detail");
    cardButton.css({
      backgroundColor: "rgb(18, 4, 30)",
      color: "white",
    });
    cardButton.click(() => go_detail_page(value.id));

    cardBody.append(cardTitle, cardImageWrapper, cardButton);
    cardWrapper.append(cardBody);
    container.append(cardWrapper);
  });
}

function go_detail_page(id) {
  var url = `https://tes1-ambw-c14210065-c114e-default-rtdb.asia-southeast1.firebasedatabase.app/posts/${id}.json`;
  sessionStorage['page'] = id;

  fetch(url)
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      if (JSON.stringify(data) !== sessionStorage.getItem(id)) {
        sessionStorage.setItem(id, JSON.stringify(data));
      }
      window.location.href = 'detail_page.html';
    })
    .catch(function (error) {
      if (sessionStorage.getItem(id)) {
        window.location.href = 'detail_page.html';
      } else {
        window.location.href = 'offline.html';
      }
    });
}


var url =
  "https://tes1-ambw-c14210065-c114e-default-rtdb.asia-southeast1.firebasedatabase.app/posts.json";
let networkDataReceived = false;

if ("indexedDB" in window) {
  readAllData("workouts").then(function (data) {
    console.log("data in indexedDB");
    console.log(data);
  });
}

fetch(url)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    networkDataReceived = true;
    localStorage.setItem("workouts", JSON.stringify(data));
  })
  .catch(function (error) {
    if (!localStorage.getItem("workouts")) {
      window.location.href = "offline.html";
    }
  });
