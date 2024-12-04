const tbody = document.getElementById("tablaInfo")
const select = document.getElementById("correos")
let correo = ""
document.addEventListener('DOMContentLoaded', async () => {
    const res = await fetch("https://sd-back.onrender.com/api/tabla", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });


    if (res.ok) {
        const data = await res.json()
        correo = data.correoTabla
        document.getElementById("correo").innerHTML = "Hola:\n" + data.correoTabla + "<br> rol:" + data.cargo
    }

    console.log(correo)
    console.log(correo)
    const resMongo = await fetch("https://sd-back.onrender.com/api/tablasTodo",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                correo: correo
            })
        })

    const resMongoJson = await resMongo.json()
    // console.log(window.navigator.onLine)


    const option  = document.createElement("option") 

    option.value = "santiagopardo32@gmail.com"
    option.textContent = "todos"

    select.appendChild(option)

    let responseUsers = await fetch('https://raw.githubusercontent.com/SantiagoPard/users-bd/refs/heads/main/users.json')  
     
    if(!responseUsers.ok){
        response = await fetch("https://raw.githubusercontent.com/Hozu08/users.json/refs/heads/main/users.json")
    }
    
    const users = await responseUsers.json();

    for (let i = 0; i < users.length; i++) { // Revisar todos los usuarios en la lista
        if (users[i].cargo != "Adminsistrador") {
            const option2 = document.createElement("option")
            
            option2.value = users[i].correo
            option2.textContent = users[i].correo

            select.appendChild(option2)
            console.log(users[i].cargo)
        }
    }


    resMongoJson.forEach((item, index) => {
        const tr = document.createElement("tr");
        const th = document.createElement("th");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const td4 = document.createElement("td");
        const td5 = document.createElement("td");
        const td6 = document.createElement("td");
        const btn = document.createElement("input");
        const aTd6 = document.createElement("a")

        console.log(item._id);
        th.innerText = "SD_" + (index + 1);

        td1.innerText = item.asunto;
        td2.innerText = item.fechaini;
        td3.innerText = item.fechaEvi;
        td4.innerText = item.estado;
        td5.innerText = item.correo

        if (item.urlDrive != "") {
            aTd6.innerText = "Link"

            aTd6.href = item.urlDrive
            aTd6.target = "_blank"
        } else {
            aTd6.innerText = "N/A"
        }

        tr.appendChild(th);
        tr.appendChild(td5);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td6);
        td6.appendChild(aTd6)
        btn.setAttribute("accept", ".pdf")

        tbody.appendChild(tr);


    });

})