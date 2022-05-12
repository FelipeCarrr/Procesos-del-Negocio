//funciones propias de la app
async function login(){
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    var settings={
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    }
    const request = await fetch("api/auth/login",settings);
    console.log(await request.text());
    if(request.ok){        
        location.href= "dashboard.html";
    }
}

function listar(){
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }
    fetch("api/users",settings)
    .then(response => response.json())
    .then(function(data){
        
        var usuarios ='';
        for(const usuario of data){
          console.log(usuario.email)
          usuarios += '<tr>'+
          '<th scope="row">'+usuario.id+'</th>'+
          '<td>'+usuario.firstName+'</td>'+
          '<td>'+usuario.lastName+'</td>'+
          '<td>'+usuario.email+'</td>'+
          '<td>'+
            '<button type="button" class="btn btn-outline-danger"><i class="fa-solid fa-user-minus"></i></button>'+
            '<a href="modificar.html" class="btn btn-outline-warning"><i class="fa-solid fa-user-pen"></i></a>'+
            '<a href="visualizar.html" class="btn btn-outline-info"><i class="fa-solid fa-eye"></i></a>'+
          '</td>'+
        '</tr>';
         }
         document.getElementById("listar").innerHTML=usuarios;
        
    })
}



async function sendData(path){
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch(path, {
        method: 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonData)
    });
    myForm.reset();
    console.log(await request.text())
}