//  Login

const signBtn = () => {

    const userInput = document.getElementById('user-input')
    const userValue = userInput.value;
    const passInput = document.getElementById('pass-input')
    const passValue = passInput.value;

    if (userValue === 'admin' && passValue === 'admin123') {
        alert('login seccesfull')
        window.location.assign("./home.html");
    } else {
        alert('failed')
    }
}

// Home page



let cruntTab = "all"
let active = ["btn-primary"]
const issueContainer = document.getElementById('issue-container')
const openContainer = document.getElementById('open-container')
const closeContainer = document.getElementById('close-container')
const count = document.getElementById("count")

const loadBtn = (tab) => {



    let tabs = ["all", "open", "close"]
    for (const t of tabs) {
        const tabName = document.getElementById("btn-" + t)
        if (t === tab) {
            tabName.classList.add(active)
        } else {
            tabName.classList.remove(active)
        }

        if (tab === "all") {
            issueContainer.classList.remove('none')
            openContainer.classList.add('none')

        }

        else if (tab === "open") {
            issueContainer.classList.add('none')
            openContainer.classList.remove('none')

        }

        else if (tab === "close") {
            openContainer.classList.add('none')
            issueContainer.classList.add('none')
            closeContainer.classList.remove('none')

        }

    }


}
loadBtn(cruntTab)



async function issueLoad() {
    const res = await fetch("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    const data = await res.json();
    let allData = data.data;


    displayIssue(allData)

    document.getElementById('btn-all').addEventListener('click',function(){
        const all = allData.length;
        const allCount = count.innerHTML= all;
        console.log(allCount)
    })

    document.getElementById('btn-open').addEventListener('click', function () {
        const openStatus = allData.filter((elem) => elem.status === "open")
        const openCount = count.innerText = openStatus.length
        console.log(openCount)
        const openContainer = document.getElementById('open-container')
        openContainer.innerHTML = ""
        openStatus.forEach(element => {
            const div = document.createElement('div')
            div.innerHTML = `
         <div onclick="loadCardDetails(${element.id})" class=" opentop cursor-pointer card-issue p-2 space-y-2 bg-white rounded-lg shadow-2xl h-full  ">
                    <div class="flex justify-between items-center">
                        <img src="./assets/Open-Status.png" alt="">
                        <p class="text-red-500 bg-red-200 px-3 rounded-full"> ${element.priority}</p>
                    </div>
                    <h4 class="text-1xl font-bold">${element.title}</h4>
                    <p class="text-gray-400 line-clamp-2">${element.description}</p>
                    <div>
                        <div class="flex gap-2.5 items-center">
                            <div class="flex justify-between items-center gap-1.5 bg-red-200 px-2.5 rounded-full">
                                <img src="./assets/BugDroid.png" alt="">
                                <p class="text-red-500">Bug</p>
                            </div>
                            <div
                                class="flex justify-between items-center gap-1.5 bg-yellow-200 px-2.5 rounded-full space-y-1.5">
                                <img src="./assets/Lifebuoy.png" alt="">
                                <p class="text-yellow-700">help wanted</p>
                            </div>
                        </div>
                        <hr class="text-gray-300 m-1.5">
                        <p class="text-gray-400 m-2.5">${element.createdAt}</p>
                        <p class="text-gray-400">${element.updatedAt}</p>
                    </div>
                </div>
       
       `

            openContainer.appendChild(div)

        })

    });

    document.getElementById('btn-close').addEventListener('click', function () {
        const closeStatus = allData.filter((elem) => elem.status === "closed")
        const closeCount = count.innerText = closeStatus.length
        console.log(closeCount)
        const closeContainer = document.getElementById('close-container')
        closeContainer.innerHTML = ""
        closeStatus.forEach(elem => {
            const div = document.createElement('div')
            div.innerHTML = `
         <div onclick="loadCardDetails(${elem.id})" class="closetop cursor-pointer card-issue p-2 space-y-2 bg-white rounded-lg shadow-2xl h-full  ">
                    <div class="flex justify-between items-center">
                        <img src="./assets/Open-Status.png" alt="">
                        <p class="text-red-500 bg-red-200 px-3 rounded-full"> ${elem.priority}</p>
                    </div>
                    <h4 class="text-1xl font-bold">${elem.title}</h4>
                    <p class="text-gray-400 line-clamp-2">${elem.description}</p>
                    <div>
                        <div class="flex gap-2.5 items-center">
                            <div class="flex justify-between items-center gap-1.5 bg-red-200 px-2.5 rounded-full">
                                <img src="./assets/BugDroid.png" alt="">
                                <p class="text-red-500">Bug</p>
                            </div>
                            <div
                                class="flex justify-between items-center gap-1.5 bg-yellow-200 px-2.5 rounded-full space-y-1.5">
                                <img src="./assets/Lifebuoy.png" alt="">
                                <p class="text-yellow-700">help wanted</p>
                            </div>
                        </div>
                        <hr class="text-gray-300 m-1.5">
                        <p class="text-gray-400 m-2.5">${elem.createdAt}</p>
                        <p class="text-gray-400">${elem.updatedAt}</p>
                    </div>
                </div>
       
       `

            closeContainer.appendChild(div)

        })
    })
}


const loadCardDetails = (id) => {
    fetch(`https://phi-lab-server.vercel.app/api/v1/lab/issue/${id}`)
        .then(res => res.json())
        .then(details => displayDetails(details.data))

}


const displayDetails = (detail) => {
    const detailContainer = document.getElementById("detail-container")
    detailContainer.innerHTML = ` 
               
                    <h3 class="text-2xl font-bold">${detail.title}</h3>
                    <div class="flex gap-2 items-center">

                        <p class="bg-green-700 px-2.5 rounded-full text-white">${detail.status === "open" ? "opened" : "colsed"} </p>
                        <p class="text-black"> . Opened by${detail.author}</p>
                        <p class="text-black"> . ${detail.createdAt}</p>

                    </div>
                    <div class="flex items-center gap-2">
                        <div class="flex justify-between items-center gap-1.5 bg-red-200 px-2.5 rounded-full">
                            <img src="./assets/BugDroid.png" alt="">
                            <p class="text-red-500">Bug</p>
                        </div>
                        <div
                            class="flex justify-between items-center gap-1.5 bg-yellow-200 px-2.5 rounded-full space-y-1.5">
                            <img src="./assets/Lifebuoy.png" alt="">
                            <p class="text-yellow-700">help wanted</p>
                        </div>
                    </div>

                    <p>${detail.description}</p>

                    <div class= "flex justify-between items-center">
                        <div>
                            <p>Assignee:</p>
                            <h4>${detail.assignee}</h4>
                        </div>
                        <div>
                            <p>Priority:</p>
                            <p class="text-red-500 bg-red-200 px-3  rounded-full">${detail.priority}</p>
                        </div>
                    </div>
                `
    document.getElementById("my_modal").showModal();

}

const displayIssue = (issues) => {
    const issueContainer = document.getElementById('issue-container')
    issueContainer.innerHTML = ""


    issues.forEach(issue => {
        const div = document.createElement("div")
        div.innerHTML = `
         <div onclick="loadCardDetails(${issue.id})" class=" cursor-pointer card-issue p-2 space-y-2 bg-white rounded-lg shadow-2xl h-full  ">
                    <div class="flex justify-between items-center">
                        <img src="./assets/Open-Status.png" alt="">
                        <p class="text-red-500 bg-red-200 px-3 rounded-full"> ${issue.priority}</p>
                    </div>
                    <h4 class="text-1xl font-bold">${issue.title}</h4>
                    <p class="text-gray-400 line-clamp-2">${issue.description}</p>
                    <div>
                        <div class="flex gap-2.5 items-center">
                            <div class="flex justify-between items-center gap-1.5 bg-red-200 px-2.5 rounded-full">
                                <img src="./assets/BugDroid.png" alt="">
                                <p class="text-red-500">${issue.labels}</p>
                            </div>
                            <div
                                class="flex justify-between items-center gap-1.5 bg-yellow-200 px-2.5 rounded-full space-y-1.5">
                                <img src="./assets/Lifebuoy.png" alt="">
                                <p class="text-yellow-700">help wanted</p>
                            </div>
                        </div>
                        <hr class="text-gray-300 m-1.5">
                        <p class="text-gray-400 m-2.5">${issue.createdAt}</p>
                        <p class="text-gray-400">${issue.updatedAt}</p>
                    </div>
                </div>
       
       `



        issueContainer.append(div)
    });


}


issueLoad()

