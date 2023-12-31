let userInfo;

(async () => {
    try {
        let response = await fetch("/userInfo");
        userInfo = await response.json();

        document.getElementById("userName").textContent = userInfo.name;
        document.getElementById("userPicture").src = userInfo.image;
    } catch (err) {
        console.log(err);
    }
    
})()

document.getElementById("theme").addEventListener("click", function(e){
    if(e.currentTarget.textContent.includes("Dark")){
        e.currentTarget.innerHTML = `<i class="fa-solid fa-sun"></i> Light Mode`;
        document.getElementsByTagName("html")[0].classList.add("dark");
        localStorage.setItem("theme", "dark");
    } else {
        e.currentTarget.innerHTML = `<i class="fa-solid fa-moon"></i> Dark Mode`;
        document.getElementsByTagName("html")[0].classList.remove("dark");
        localStorage.setItem("theme", "light");
    }
});

// check if theme localStorage is set
if (localStorage.getItem("theme") != null && localStorage.getItem("theme") == "dark") {
    document.getElementById("theme").innerHTML = `<i class="fa-solid fa-sun"></i> Light Mode`;
    document.getElementsByTagName("html")[0].classList.add("dark");
} else if(localStorage.getItem("theme") != null && localStorage.getItem("theme") == "light"){
    document.getElementById("theme").innerHTML = `<i class="fa-solid fa-moon"></i> Dark Mode`;
    document.getElementsByTagName("html")[0].classList.remove("dark");
} else if(localStorage.getItem("theme") == null){
    localStorage.setItem("theme", "light");
}

function getScores(){
    (async () => {
        try {
            let response = await fetch("/userInfo");
            userInfo = await response.json();
    
            fetch(`https://train-spotting.co.za:444/scores?email=${userInfo.email}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
        
                let highScores = document.getElementById("highScores");
        
                data.scores.forEach(score => {
                    let li = document.createElement("li");
                    li.textContent = score;
                    highScores.appendChild(li);
                });
            });
        } catch (err) {
            console.log(err);
        }
        
    })()
    
}

// function getScores(){
//     let scores = [
//         {
//             timestamp: new Date(),
//             score: 23
//         },
//         {
//             timestamp: new Date(),
//             score: 12
//         },
//         {
//             timestamp: new Date(),
//             score: 7
//         },
//     ];

//     let highScores = document.getElementById("highScores");

//     let li = document.createElement("li");
//     let left = document.createElement("p");
//     let right = document.createElement("p");
//     left.classList.add("left", "heading");
//     right.classList.add("right", "heading");
//     left.textContent = "Date / Time";
//     right.textContent = "Score";
//     li.appendChild(left);
//     li.appendChild(right);
        
//         highScores.appendChild(li);

//     scores.forEach(score => {
//         li = document.createElement("li");
//         left = document.createElement("p");
//         right = document.createElement("p");
//         left.classList.add("left");
//         right.classList.add("right");
//         left.textContent = score.timestamp;
//         right.textContent = score.score;
//         li.appendChild(left);
//         li.appendChild(right);
        
//         highScores.appendChild(li);
//     });
// }

function saveScore(email, score){
    fetch(`/saveScore?email=${email}&score=${score}`)
}

document.getElementById("home_logo").addEventListener("click", function(){
    window.location.href = "/home";
});