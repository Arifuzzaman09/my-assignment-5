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

const displayIssue = (issues) => {
    const issueContainer = document.getElementById('issue-container')
    issueContainer.innerHTML = ""
    issues.forEach(issue => {
       const div = document.createElement("div")
       div.innerHTML=`
       <p>Akash</p>
       
       `
       issueContainer.append(div)
       console.log(div)
    });
}
issueLoad()