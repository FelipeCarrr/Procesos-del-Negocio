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
    //console.log(await request.text());
    if(request.ok){      
        const respuesta = await request.json();
        
        localStorage.token = respuesta.detail;

        localStorage.email = jsonData.email;  
        location.href= "dashboard.html";
    }
}

function listar(){
    validaToken()
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':localStorage.token
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
          '<td>'+usuario.fechaNacimiento+'</td>'+
          '<td>'+usuario.estadoCivil+'</td>'+
          '<td>'+usuario.tienHermano+'</td>'+
          '<td>'+usuario.estado+'</td>'+
          '<td>'+usuario.roles+'</td>'+

          '<td>'+
            '<button type="button" class="btn btn-outline-danger" onclick="eliminarUsuario(\''+usuario.id+'\')"><i class="fa-solid fa-user-minus"></i></button>'+
            '<a href="#" onclick="traerModificarUsuario(\''+usuario.id+'\')" class="btn btn-outline-warning"><i class="fa-solid fa-user-pen"></i></a>'+
            '<a href="#" onclick="verUsuario(\''+usuario.id+'\')"class="btn btn-outline-info"><i class="fa-solid fa-eye"></i></a>'+
          '</td>'+
        '</tr>';
         }
         document.getElementById("listar").innerHTML=usuarios;
        
    })
}



async function sendData(path){
    validaToken()
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
            'Content-Type': 'application/json',
            'Authorization':localStorage.token
        },
        body: JSON.stringify(jsonData)
    });
    myForm.reset();
    console.log(await request.text())
}
function eliminarUsuario(id){
    validaToken()
    var settings={
        method: 'DELETE',
        headers:{
            'Accept': 'application/json',
            'Authorization':localStorage.token
        },
    }
    fetch("api/users/"+id,settings)
    .then(response => response.json())
    .then(function(data){
        listar()
        alertas("Se ha Eliminado el usuario Exitosamente!", 2)
    })
}

function traerModificarUsuario(id){
    validaToken()
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':localStorage.token
        },
    }
    fetch("api/users/"+id,settings)
    .then(response => response.json())
    .then(function(usuario){
        
        var cadena='';
        
        if(usuario){
            cadena = '<div class="p-3 mb-2 bg-secondary text-white"><h1 class="display-5"><i class="fa-solid fa-user-pen"></i>Modificar Usuarios</h1></div>'+
            '<form action="" method="post" id="myForm">'+
                '<input type="hidden" name="id" id="id" value="'+usuario.id+'">'+
                '<label for="firstName" class="form-label">First Name</label>'+
                '<input type="text" name="firstName" class="form-control" id="firstName" required value="'+usuario.firstName+'"> <br>'+
                '<label for="lastName" class="form-label">Last Name</label>'+
                '<input type="text" name="lastName" class="form-control" id="lastName" required value="'+usuario.lastName+'"> <br>'+
                '<label for="email" class="form-label">Email</label>'+
                '<input type="email" name="email" class="form-control" id="email" required value="'+usuario.email+'"> <br>'+
                '<label for="fechaNacimiento" class="form-label">Fecha de Nacimiento</label>'+
                '<input type="text" name="fechaNacimiento" class="form-control" id="fechaNacimiento" required value="'+usuario.fechaNacimiento+'"> <br>'+
                '<label for="estadoCivil" class="form-label">Estado Civil</label>'+
                '<input type="text" name="estadoCivil" class="form-control" id="estadoCivil" required value="'+usuario.estadoCivil+'"> <br>'+
                '<label for="tienHermano" class="form-label">¿Tiene Hermanos?</label>'+
                '<input type="text" name="tienHermano" class="form-control" id="tienHermano" required value="'+usuario.tienHermano+'"> <br>'+
                '<label for="estado" class="form-label">Estado</label>'+
                '<input type="text" name="estado" class="form-control" id="estado" required value="'+usuario.estado+'"> <br>'+
                '<label for="roles" class="form-label">Roles</label>'+
                '<input type="text" name="roles" class="form-control" id="roles" required value="'+usuario.roles+'"> <br>'+
                '<label for="password" class="form-label">Password</label>'+
                '<input type="password" id="password" class="form-control" name="password" required> <br>'+
                '<button type="button" class="btn btn-outline-warning" onclick="modificarUsuario(\''+usuario.id+'\')">Modificar</button>'+
            '</form>';
         }
         document.getElementById("contentModal").innerHTML=cadena;
         var myModal = new bootstrap.Modal(document.getElementById('modalUsurio'))
         myModal.toggle();
        
    })
}
async function modificarUsuario(id){
    validaToken()
    var myForm = document.getElementById("myForm");
    var formData = new FormData(myForm);
    var jsonData = {};
    for(var [k, v] of formData){//convertimos los datos a json
        jsonData[k] = v;
    }
    const request = await fetch("api/users/"+id, {
        method: 'PUT',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':localStorage.token
        },
        body: JSON.stringify(jsonData)
    });
    listar();
    alertas("Se ha modificado el usuario Exitosamente!", 1)
    document.getElementById("contentModal").innerHTML = '';
    var myModalEl = document.getElementById('modalUsurio')
    var modal = bootstrap.Modal.getInstance(myModalEl) // Returns a Bootstrap modal instance
    modal.hide();
}

function verUsuario(id){
    validaToken()
    var settings={
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization':localStorage.token
        },
    }
    fetch("api/users/"+id,settings)
    .then(response => response.json())
    .then(function(usuario){
        
        var cadena='';
        
        if(usuario){
            cadena = '<div class="p-3 mb-2 bg-secondary text-white"><h1 class="display-5"><i class="fa-solid fa-user-pen"></i> Visualizar Usuario Usuarios</h1></div>'+
            '<ul class="list-group">'+
            '<li class="list-group-item">Nombre:'+usuario.firstName+'</li>'+
            '<li class="list-group-item">Apellido: '+usuario.lastName+'</li>'+
            '<li class="list-group-item">Email: '+usuario.email+'</li>'+
            '<li class="list-group-item">Fecha de Nacimiento: '+usuario.fechaNacimiento+'</li>'+
            '<li class="list-group-item">Estado Civil: '+usuario.estadoCivil+'</li>'+
            '<li class="list-group-item">¿Tiene Hermanos?: '+usuario.tienHermano+'</li>'+
            '<li class="list-group-item">Estado: '+usuario.estado+'</li>'+
            '<li class="list-group-item">Roles: '+usuario.roles+'</li>'+
            '</ul>'+
            '<br>'
         }
         document.getElementById("contentModal").innerHTML=cadena;
         var myModal = new bootstrap.Modal(document.getElementById('modalUsurio'))
         myModal.toggle();
        
    })
}

function alertas(mensaje,tipo){
    var color=""; 
    if(tipo == 1 ){//success verde
        color = "success"

    }
    else{//danger rojo
        color = "danger"

    }
    var alerta = '<div class="alert alert-'+color+' alert-dismissible fade show" role="alert">'+
                   '<strong><i class="fa-solid fa-triangle-exclamation"></i></strong>'+ 
                   mensaje+
                   '<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>'+
                 '</div>';
    document.getElementById("datos").innerHTML=alerta;


}
function salir(){
    localStorage.clear();
    location.href = "index.html"
}
function validaToken(){
    if(localStorage.token == undefined){
        salir();
    }
}