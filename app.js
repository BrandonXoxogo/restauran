var comida = JSON.parse(localStorage.getItem("comida")) || [];
var orden = JSON.parse(localStorage.getItem("orden")) || [];
var descripcion = document.getElementById("descripcion");
    var costo =document.getElementById("costo");

// Guardar menú
const guardarComida = () => {
    var descripcion = document.getElementById("descripcion").value;
    var costo = parseInt(document.getElementById("costo").value);
    comida = JSON.parse(localStorage.getItem("comida")) || [];
    
    if (descripcion.trim() == "" || document.getElementById("costo").value.trim() === "" || costo == 0) {
        Swal.fire({ icon: "error", title: "ERROR", text: "Datos incorrectos" });
        return;
    }

    if (costo <= 0) {
        Swal.fire({ icon: "error", title: "ERROR", text: "Mayor a 0" });
        return;
    }

    const restaurante = { descripcion, costo };
    comida.push(restaurante);
    localStorage.setItem("comida", JSON.stringify(comida));
    bootstrap.Modal.getInstance(document.getElementById("comidaRes")).hide();
    mostrarGastos();
    limpiarFormulario();
}



const limpiarFormulario=()=>{
    descripcion.value="";
    costo.value=""
}

// Imprimir los datos guardados
const mostrarGastos = () => {
    comida = JSON.parse(localStorage.getItem("comida")) || [];
    let gastosHTML = ``;
    comida.forEach((gasto, index) => {
        gastosHTML += `
         <table class="table w-100 m-auto">
            <tr>
                <td>${gasto.descripcion.toUpperCase()}</td>
                <td><button class="btn btn-outline-success" onclick="agregarAOrden(${index})">$${gasto.costo}</button></td>
            </tr>
        </table>
        `;
    });
    document.getElementById('menu').innerHTML = gastosHTML;
}

// Agregar comida a la orden
const agregarAOrden = (index) => {
    const selectedItem = comida[index];
    let found = false;

    // Buscar si la comida ya está en la orden
    orden.forEach(item => {
        if (item.descripcion === selectedItem.descripcion) {
            item.cantidad += 1;
            found = true;
        }
    });

    // Si no está, agregarla a la orden con cantidad 1
    if (!found) {
        orden.push({ descripcion: selectedItem.descripcion, costo: selectedItem.costo, cantidad: 1 });
    }

    localStorage.setItem("orden", JSON.stringify(orden));
    mostrarOrden();
}

// Mostrar los datos de la orden
const mostrarOrden = () => {
    orden = JSON.parse(localStorage.getItem("orden")) || [];
    var propina=document.getElementById("propina")
    
    let ordenHTML = `<table class="table w-100 m-auto">
            <tr>
                <td>Platillo</td>
                <td>Costo</td>
                <td>Cantidad</td>
                <td>Eliminar</td>
            </tr>`;
            let Vindex=0;
            let total=0

    orden.forEach(item => {
        ordenHTML += `
        
        <tr>
            <td>${item.descripcion.toUpperCase()}</td>
            <td>$${item.costo * item.cantidad}</td>
            <td>${item.cantidad}</td>
            <td><button class="btn btn-outline-danger" onclick="eliminar(${Vindex})"><i class="bi bi-trash-fill"></i></button></td>
        </tr>
        `;
        Vindex++;
        total+=(item.costo * item.cantidad);
    });
    document.getElementById('subtotal').innerHTML=`Subtotal:$ ${total}.00`

    propina.onchange = () => {

        let valorPropina = parseInt(propina.value);
    
        let pro = 0; 
    
        switch(valorPropina) {
            case 10:
                pro = total * 0.10;
                document.getElementById('propina1').innerHTML = `Propina: $${pro.toFixed(2)}`;
                console.log(pro);
                var to=pro+total;
                document.getElementById('total').innerHTML=`Total:$ ${to.toFixed(2)}`

                break;
            case 20:
                pro = total * 0.20;
                document.getElementById('propina1').innerHTML = `Propina: $${pro.toFixed(2)}`;
                console.log(pro);
                var to=pro+total;
                document.getElementById('total').innerHTML=`Total:$ ${to.toFixed(2)}`

                break;
            case 30:
                pro = total * 0.30;
                document.getElementById('propina1').innerHTML = `Propina: $${pro.toFixed(2)}`;
                console.log(pro);
                var to=pro+total;
                document.getElementById('total').innerHTML=`Total:$ ${to.toFixed(2)}`
                
                break;
            default:
                pro = 0;
                break;
        }

    mostrarGastos();
    mostrarOrden();
   }

   
    document.getElementById('orden').innerHTML = ordenHTML;
    
}


const eliminar=(vindex)=>{
   
          orden.splice(vindex,1)
          localStorage.setItem("orden" , JSON.stringify(orden))

          mostrarOrden();
          mostrarGastos();
}

const aceptar = () => {
    localStorage.removeItem('orden');
    document.getElementById('total').innerHTML="Total:$ 0.00"
    document.getElementById('propina1').innerHTML="Propina:$ 0.00"
    document.getElementById("propina").selectedIndex = 0;

    mostrarGastos();
    mostrarOrden();
}


mostrarGastos();
mostrarOrden();
