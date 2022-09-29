var username = new URL(location.href).searchParams.get("username");
var user;

$(document).ready(function () {

    $(function () {
        $('[data-toggle="tooltip"]').tooltip();
    });

    getUsuario().then(function () {
        
        $("#mi-perfil-btn").attr("href","profile.html?username=" + username);
        
        $("#user-saldo").html(user.saldo.toFixed() + "$");

        getCuartos(false, "ASC");

        $("#ordenar-clasificacion").click(ordenarCuartos);
    });



async function getUsuario() {

    await $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletUsuarioPedir",
        data: $.param({
            username: username
        }),
        success: function (result) {
            let parsedResult = JSON.parse(result);

            if (parsedResult != false) {
                user = parsedResult;
            } else {
                console.log("Error recuperando los datos del usuario");
            }
        }
    });

}
function getCuartos(ordenar, orden) {

    $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletCuartoListar",
        data: $.param({
            ordenar: ordenar,
            orden: orden
        }),
        success: function (result) {
            let parsedResult = JSON.parse(result);

            if (parsedResult != false) {
                mostrarCuartos(parsedResult);
            } else {
                console.log("Error recuperando los datos de los cuartos");
            }
        }
    });
}
function mostrarCuartos(cuartos) {

    let contenido = "";

    $.each(cuartos, function (index, cuarto) {

        cuarto = JSON.parse(cuarto);
        let precio;

        if (cuarto.disponibilidad > 0) {

            if (user.premium) {

                if (cuarto.clasificacion == "Suite") {
                    precio = (30000 - (30000 * 0.1));
                } 
                else if (cuarto.clasificacion == "Junior Suite")
                {
                    precio = (50000 - (50000 * 0.1));
                } else {
                    precio = (80000 - (80000 * 0.1));
                }
            } else {
                if (cuarto.clasificacion == "Suite") {
                    precio = 30000;
                } else if (cuarto.clasificacion == "Junior Suite"){
                    precio = 50000;
                } else{
                    precio = 80000;
                }
            }

            contenido += '<tr><th scope="row">' + cuarto.id + '</th>' +
                    '<td>' + cuarto.clasificacion + '</td>' +
                    '<td>' + cuarto.disponibilidad + '</td>';
                    
            
            contenido += '></td>' +
                    '<td>' + precio + '</td>' +
                    '<td><button onclick="alquilarCuarto(' + cuarto.id + ',' + precio + ');" class="btn btn-success" ';
            if (user.saldo < precio) {
                contenido += ' disabled ';
            }

            contenido += '>Reservar</button></td></tr>'

        }
    });
    $("#cuartos-tbody").html(contenido);
}

 function ordenarCuartos() {
        if ($("#icono-ordenar").hasClass("fa-sort")) {
            getCuartos(true, "ASC");
            $("#icono-ordenar").removeClass("fa-sort");
            $("#icono-ordenar").addClass("fa-sort-down");
        } else if ($("#icono-ordenar").hasClass("fa-sort-down")) {
            getCuartos(true, "DESC");
            $("#icono-ordenar").removeClass("fa-sort-down");
            $("#icono-ordenar").addClass("fa-sort-up");
        } else if ($("#icono-ordenar").hasClass("fa-sort-up")) {
            getCuartos(false, "ASC");
            $("#icono-ordenar").removeClass("fa-sort-up");
            $("#icono-ordenar").addClass("fa-sort");
        }
    }
    
});


function alquilarCuarto(id, precio) {

    $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletCuartoAlquilar",
        data: $.param({
            id: id,
            username: username
        }),
        success: function (result) {
            let parsedResult = JSON.parse(result);
            if (parsedResult != false) {
                restarDinero(precio).then(function () {
                    location.reload();
                });

            } else {
                console.log("Error en la reserva del cuarto");
            }
        }
    });

}

async function restarDinero(precio) {

    await $.ajax({
        type: "GET",
        dataType: "html",
        url: "./ServletUsuarioRestarDinero",
        data: $.param({
            username: username,
            saldo: parseFloat(user.saldo - precio)
        }),
        success: function (result) {
            let parsedResult = JSON.parse(result);
            if (parsedResult != false) {
                console.log("Saldo actualizado")
            } else {
                console.log("Error en el proceso de pago");
            }
        }
    });
}

