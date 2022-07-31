function login(){
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    alert(email);
    alert(password);
    if(email == ''){
        document.getElementById('email').focus();
    }else if(password == ''){
        document.getElementById('password').focus();    
    }else{
        fetch('http://localhost/myapp/api/login.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({email: email, password: password})
        }).then(res => res.json())
          .then(res => {
            if(res.message == 'Successful login'){
                localStorage.setItem("jwt", res.jwt);
                window.location.href='profile.html'
            }else{
                document.getElementById("errormsg").textContent=res.message;
            }
          });
    }
}

function register(){
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    if(fname == ''){
        document.getElementById('fname').focus();
    }else if(lname == ''){
        document.getElementById('lname').focus();    
    }else if(email == ''){
        document.getElementById('email').focus();    
    }else if(password == ''){
        document.getElementById('password').focus();    
    }else{
        fetch('http://localhost/myapp/api/register.php', {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ fname:fname, lname:lname, email: email, password: password})
        }).then(res => res.json())
          .then(res => {
            if(res.message == 'User was successfully registered.'){
                window.location.href='login.html'
            }else{
                document.getElementById("errormsg").textContent=res.message;
            }
          });
    }
}

const jwt = localStorage.getItem("jwt");
fetch('http://localhost/myapp/api/auth.php', {
  method: 'POST',
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({toekn: jwt})
}).then(res => res.json())
  .then(res => {
    document.getElementById('id').value=res.id;
    document.getElementById('firstname').textContent=res.firstname;
    document.getElementById('lastname').textContent=res.firstname;
    document.getElementById('fname').value=res.firstname;
    document.getElementById('lname').value=res.lastname;
    document.getElementById('phone').value=res.phone;
    document.getElementById('dob').value=res.dob;
});

function update(){
    const id = document.getElementById('id').value;
    const fname = document.getElementById('fname').value;
    const lname = document.getElementById('lname').value;
    const dob = document.getElementById('dob').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;
    fetch('http://localhost/myapp/api/update.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({fname: fname , lname:lname , dob:dob , phone:phone , password:password , id:id })
    }).then(res => res.json())
      .then(res => {
        console.log(res);
        document.getElementById('successmsg').textContent=res.message;
    });
}

 document.onkeydown = function(e) {
    if(e.keyCode == 123) {
     return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'I'.charCodeAt(0)){
     return false;
    }
    if(e.ctrlKey && e.shiftKey && e.keyCode == 'J'.charCodeAt(0)){
     return false;
    }
    if(e.ctrlKey && e.keyCode == 'U'.charCodeAt(0)){
     return false;
    }

    if(e.ctrlKey && e.shiftKey && e.keyCode == 'C'.charCodeAt(0)){
     return false;
    }      
  }