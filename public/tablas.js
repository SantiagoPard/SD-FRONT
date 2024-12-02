const tbody = document.getElementById("tablaInfo")

document.addEventListener('DOMContentLoaded', async () => {
    const res = await fetch("http://localhost:4000/api/tabla", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        }
    });
    let correo = ""

    if (res.ok) {
        const data = await res.json()
        
        document.getElementById("correo").innerHTML = data.correoTabla
        correo=data.correoTabla
    }
    
    const resMongo = await fetch("http://localhost:4000/api/tablasTodo",
        {
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            correo:correo
        })
    })      
    const resMongoJson = await resMongo.json()
    console.log(window.navigator.onLine) 


    resMongoJson.forEach((item, index) => {
        const tr = document.createElement("tr");
        const th = document.createElement("th");
        const td1 = document.createElement("td");
        const td2 = document.createElement("td");
        const td3 = document.createElement("td");
        const td4 = document.createElement("td");
        const td5 = document.createElement("td");
        const btn = document.createElement("input");
        const label = document.createElement("label");

        console.log(item._id);
        th.innerText = index + 1;

        td1.innerText = item.asunto;
        td2.innerText = item.fechaini;
        td3.innerText = item.fechaEvi;
        td4.innerText = item.estado;


        btn.setAttribute("class", "fileInput");
        btn.setAttribute("type", "file");
        btn.setAttribute("id", `fileInput${index}`);
        btn.style.display = "none"; // Hide the default file input

        label.setAttribute("for", `fileInput${index}`);
        label.className = "file-input-label";
        label.innerText = item.filename === "" ? "Sin evidencia" : item.filename;

        td5.appendChild(btn);
        td5.appendChild(label);

        tr.appendChild(th);
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);

        btn.setAttribute("accept",".pdf")

        tbody.appendChild(tr);

        if (item.filename === "") {
            btn.addEventListener("change", async (e)  => {
                const selectedFile = e.target.files[0];
                label.innerText = selectedFile.name;
                td4.innerText = "con Evidencia";
                console.log(selectedFile)
                console.log(item._id)
                 label.className = "nohover"
                btn.disabled = true;
                
                let fecha =  new Date();
                let UpDateIni = fecha.toLocaleString()
                td3.innerText = UpDateIni

           await fetch("http://localhost:4000/api/updatesTabla",
            {
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                id:item._id,
                fechaEvi: UpDateIni,
                filename:selectedFile.name
            })
        })      
            });
        } else {
            // Display existing filename
            label.className = "nohover"
         
          
            // Disable the file input
            btn.disabled = true;
        }
    });

})

function addRow() {


    document.getElementById("tarea-form").addEventListener("submit", async (e) => {
       
       console.log(window.navigator.onLine) 
       console.log(e.target.asunto.value);
        let fecha =  new Date();
        let UpDateIni = fecha.toLocaleString()
        console.log(UpDateIni)
        let correo = document.getElementById("correo").innerText
        console.log(correo)
        await fetch("http://localhost:4000/api/addTabla",
            {
            method:"POST",
            headers:{
                "Content-Type" : "application/json"
            },
            body: JSON.stringify({
                asunto: e.target.asunto.value,
                fechaini: UpDateIni,
                correo:correo
            })
        })      
        
   

     
    })
}

