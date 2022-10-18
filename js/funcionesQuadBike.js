/////////// GET, POST , PUT Y DELETE

function getQuadbike(){
    $.ajax({
        url:"http://localhost:8080/api/getQuadbike/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            pintargetQuadbike(respuesta);
        }
    });
}

function postgetQuadbike(){
    if($("#name").val().length==0 || 
       $("#year").val().length==0 || 
       $("#brand").val().length==0 || 
       $("#description").val().length==0 
       ){
        alert("Todos los campos son obligatorios para crear la reserva de la cuatrimoto");
    }else{
    
    let cajas = {
        name:$("#name").val(),
        year:$("#year").val(),
        brand:$("#brand").val(),
        description:$("#description").val(),
        category:{id: + $("#select-category").val()}
    };
    console.log(cajas);
    $.ajax({
        url:"http://localhost:8080/api/QuadBike/save",
        type:"POST",
        datatype:"JSON",
        contentType:"application/json; charset=utf-8",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("se creo correctamente la cuatrimoto");
            window.location.reload();
            }
        });
    }
}

function putgetQuadbike(idBotonActualizar){
    if($("#name").val().length==0 || 
    $("#year").val().length==0 || 
    $("#brand").val().length==0 || 
    $("#description").val().length==0 
    ){
     alert("Todos los campos son obligatorios para actualizar la cuatrimoto");
    }else{
   
    let cajas = {
        id:idBotonActualizar,
        name:$("#name").val(),
        year:$("#year").val(),
        brand:$("#brand").val(),
        description:$("#description").val(),
        category:{id: + $("#select-category").val()}
    };
    console.log(cajas);
    $.ajax({
        url:"http://localhost:8080/api/getQuadbike/update",
        type:"PUT",
        datatype:"JSON",
        contentType:"application/json",
        data: JSON.stringify(cajas),
        success:function(respuesta){
            alert("Se actualizo correctamente la cuatrimoto");
            window.location.reload();
            }
        });
    }
}

function deletegetQuadbike(idBotonBorrar){
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: 'btn btn-success',
          cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
      })
      
      swalWithBootstrapButtons.fire({
        title: 'Esta seguro de borrar la cuatrimoto?',
        text: "Tu no podras revertir dicha operación!",
        icon: 'Peligro',
        showCancelButton: true,
        confirmButtonText: 'Si, borre esto!',
        cancelButtonText: 'No, cancelar!',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
         
          let myData={
            id:idBotonBorrar
        };
        $.ajax({
            url:"http://localhost:8080/api/QuadBike/"+idBotonBorrar,
            type:"DELETE",
            datatype:"JSON",
            contentType:"application/JSON",
            data:JSON.stringify(myData),
            success:function(respuesta){
          
                window.location.reload();
            }
        });
        swalWithBootstrapButtons.fire(
            'Eliminado!',
            '¡Su archivo ha sido eliminado.',
            'Exitoso'
          )

        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            'Cancelado',
            'Tu información esta guardada :)',
            'error'
          )
        }
      })  
} 


/////////////////////////////////////////////////
function pintargetQuadbike(respuesta){
    let myTable="<table>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].id+"</td>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].year+"</td>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].category.name+"</td>";
        myTable+="<td> <button onclick='putgetQuadbike("+respuesta[i].id+")'>Actualizar</button>";
        myTable+="<td> <button onclick='deletegetQuadbike("+respuesta[i].id+")'>Borrar</button>";
       
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#resultado1").html(myTable);
}


//////////////////Get Category /////////////////////////////
function getgetQuadbike_Category(){
    $.ajax({
        url:"http://localhost:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
           let $select = $("#select-category");
           $.each(respuesta, function(id, name){
            $select.append('<option value='+name.id+'>'+name.name+'</option>')
           })
        }
    });

}