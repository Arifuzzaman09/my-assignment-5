const signBtn = () => {

    const userInput = document.getElementById('user-input')
    const userValue = userInput.value;
    const passInput = document.getElementById('pass-input')
    const passValue = passInput.value;
    
    if (userValue === 'admin' && passValue === 'admin123') {
   alert('login seccesfull')
      window.location.assign("./home.html");
    }else{
        alert('failed')
    }
}