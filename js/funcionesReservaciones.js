/////////////GET, POST,PUT Y DELETE

function getReservation(){
    $.ajax({
        url:"http://140.84.165.44:8080/api/Reservation/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintarReservation(respuesta);
            console.log(respuesta);
        }
    });
}

/////////////////////////////////////////////////
function pintarReservation(respuesta){
    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].startDate+"</td>";
        myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
        myTable+="<td>"+respuesta[i].status+"</td>";
        myTable+="<td>"+respuesta[i].client.name+"</td>";
        myTable+="<td>"+respuesta[i].Quadbike.name+"</td>";
        myTable+="<td> <button onclick='putCategoria("+respuesta[i].idReservation+")'>Actualizar</button>";
        myTable+="<td> <button onclick='deleteCategoria("+respuesta[i].idReservation+")'>Borrar</button>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}

function postReservation(){
    if($("#startDate").val().length==0 || $("#devolutionDate").val().length==0){
        alert("Todos los campos son obligatorios");
    }else{
        let cajas = {
            startDate:$("#startDate").val(),
            devolutionDate:$("#devolutionDate").val(),
            status:$("#status").val(),
            Quadbike:{id:+$("#select-Quadbike").val()},
            client:{idClient:+$("#select-client").val()}
        };
        //console.log(cajas);
        $.ajax({
            url:"http://140.84.165.44:8080/api/Reservation/save",
            type:"POST",
            datatype:"JSON",
            contentType:"application/json; charset=utf-8",
            data: JSON.stringify(cajas),
            success:function(respuesta){
                alert("se creo correctamente la reservacion");
                window.location.reload();
            }
        });
    }
    

}

function putReservation(){

}

function deleteReservation(){

}

function getCliente_Reservation(){
    $.ajax({
        url:"http://140.84.165.44:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
           console.log(respuesta);
            let $select = $("#select-client");
           $.each(respuesta, function(id, name){
            $select.append('<option value='+name.idClient+'>'+name.name+'</option>')
           })
        }
    });
}

function getQuadbike_Reservation(){
    $.ajax({
        url:"http://140.84.165.44:8080/api/Quadbike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
           console.log(respuesta);
            let $select = $("#select-Quadbike");
           $.each(respuesta, function(id, name){
            $select.append('<option value='+name.id+'>'+name.name+'</option>')
           })
        }
    });
}