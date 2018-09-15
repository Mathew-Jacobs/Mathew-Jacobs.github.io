var ctx = document.getElementById("myChart").getContext("2d");

const userStuff = {}

userStuff.languagesLinkArr = []
userStuff.languages = {}
userStuff.languageTotal = 0

fetch("https://api.github.com/users/Mathew-Jacobs/repos", {
    method: 'GET',
    headers: new Headers({
        'Authorization' : " Bearer 20ce74c3bfb3723acf28caefc98bde3b96172a21",
        'Content-type' : 'application-json'
    })
})

    
    .then(res => res.json())
    .then(data => {
        data.map(repo => {
            userStuff.languagesLinkArr.push(repo.languages_url)
        })
        getLangObj(userStuff.languagesLinkArr)
        
    })

    
const getLangObj = (langArr) => {
    var iteration = 0;
    langArr.map((langUrl, i, arr) => {
        var repoCount = arr.length - 1;
        fetch(langUrl)
            .then(res => res.json())
            .then(data => {
                
                initProps(data)
                addToLanguageArray(data)

                userStuff.languageTotal = languageTotal(userStuff.languages)

                console.log(iteration)
                console.log(Object.keys(userStuff.languages))
                console.log(Object.values(userStuff.languages))
                console.log('\n')
                if (iteration === repoCount) {
                    chart(Object.keys(userStuff.languages), Object.values(userStuff.languages))
                }
                iteration++;
            })
    })

}

const initProps = (obj) => {
    Object.keys(obj).map(key => {
        !userStuff.languages[key] ? userStuff.languages[key] = 0 : '';
    })
}

const addToLanguageArray = (obj) => {
    Object.keys(obj).map((lang) => {
        userStuff.languages[lang] = obj[lang] + userStuff.languages[lang]
    })
}

const languageTotal = (obj) => {
    let objValsArr = Object.values(obj)
    return objValsArr.reduce((total, num) => {
        return total + num
    })
}


const chart = (labels, data) => {
    var myChart = new Chart(ctx, {
        type: 'horizontalBar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Code written',
                data: data,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            maintainAspectRatio: false,
            responsive: true,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}