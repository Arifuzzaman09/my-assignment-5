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

// "data": [
// {
// "id": 1,
// "title": "Fix navigation menu on mobile devices",
// "description": "The navigation menu doesn't collapse properly on mobile devices. Need to fix the responsive behavior.",
// "status": "open",
// "labels": [
// "bug",
// "help wanted"
// ],
// "priority": "high",
// "author": "john_doe",
// "assignee": "jane_smith",
// "createdAt": "2024-01-15T10:30:00Z",
// "updatedAt": "2024-01-15T10:30:00Z"
// },

const displayIssue = (issues) => {
    const issueContainer = document.getElementById('issue-container')
    issueContainer.innerHTML = ""

    
    issues.forEach(issue => {
        const div = document.createElement("div")
        div.innerHTML = `
         <div class="card-issue p-2 space-y-2 bg-white rounded-lg shadow-2xl h-full ">
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

        console.log(div)
    });
}
issueLoad()