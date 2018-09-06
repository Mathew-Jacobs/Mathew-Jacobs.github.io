var ctx = document.getElementById("myChart").getContext("2d");




const userStuff = {}

userStuff.languagesLinkArr = []
userStuff.languages = {}
userStuff.languageTotal = 0

fetch("http://api.github.com/users/Mathew-Jacobs/repos")
    .then(res => res.json())
    .then(data => {
        data.map(repo => {
            userStuff.languagesLinkArr.push(repo.languages_url)
        })
        getLangObj(userStuff.languagesLinkArr)
            .then(() => {
                console.log(userStuff.languages)
            })

    })

const getLangObj = (langArr) => {
    langArr.map((langUrl, i, arr) => {
        fetch(langUrl)
            .then(res => res.json())
            .then(data => {
                initProps(data)
                addToLanguageArray(data)

                userStuff.languageTotal = languageTotal(userStuff.languages)
                
                if (arr.length - 1 === i) {
                    chart(Object.keys(userStuff.languages), Object.values(userStuff.languages))
                }
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

    console.log(userStuff)
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