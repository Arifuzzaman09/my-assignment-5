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
const issueLoad = () => {
    const url = ("https://phi-lab-server.vercel.app/api/v1/lab/issues")
    fetch(url)
        .then(res => res.json())
        .then(data => displayIssue(data.data))
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

                        <p class="bg-green-700 px-2.5 rounded-full text-white">${detail.status}</p>
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
         <div onclick="loadCardDetails(${issue.id})" class=" cursor-pointer card-issue p-2 space-y-2 bg-white rounded-lg shadow-2xl h-full ">
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
                                <p class="text-red-500">Bug</p>
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