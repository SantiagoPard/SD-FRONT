const tbody = document.getElementById("tablaInfo")
let correo = ""
let urlNode = "https://sd-back.onrender.com"
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
    console.log(window.navigator.onLine)

    const encodeFileToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = (error) => reject(error);
        });
    };


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
        const label = document.createElement("label");

        console.log(item._id);
        th.innerText = "SD_"+index + 1;

        td1.innerText = item.asunto;
        td2.innerText = item.fechaini;
        td3.innerText = item.fechaEvi;
        td4.innerText = item.estado;


        if (item.urlDrive != "") {
            aTd6.innerText = "Link"

            aTd6.href = item.urlDrive
            aTd6.target = "_blank"
        }else{
            aTd6.innerText = "N/A"
        }

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
        tr.appendChild(td6);
        td6.appendChild(aTd6)
        btn.setAttribute("accept", ".pdf")

        tbody.appendChild(tr);

        if (item.filename === "") {
            btn.addEventListener("change", async (e) => {
                const selectedFile = e.target.files[0];
                label.innerText = selectedFile.name;
                td4.innerText = "con Evidencia";
                label.className = "nohover";
                btn.disabled = true;

                const fileBase64 = await encodeFileToBase64(selectedFile);
                const mimeType = selectedFile.type;

                let fecha = new Date();
                let UpDateIni = fecha.toLocaleString();
                td3.innerText = UpDateIni;

                const upload = await fetch('https://sd-back.onrender.com/upload', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        file: fileBase64,
                        fileName: selectedFile.name,
                        mimeType: mimeType,
                        correo : correo
                    }),
                });

                const uploadData = await upload.json()
                const link = uploadData.webViewLink
                console.log(link)
                
                aTd6.innerText = "Link"
                aTd6.href = link
                aTd6.target = "_blank"
                await fetch("https://sd-back.onrender.com/api/updatesTabla",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({
                            id: item._id,
                            fechaEvi: UpDateIni,
                            filename: selectedFile.name,
                            urlDrive: link
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
        let fecha = new Date();
        let UpDateIni = fecha.toLocaleString()
        console.log(UpDateIni)
        console.log(correo)
        await fetch("https://sd-back.onrender.com/api/addTabla",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    asunto: e.target.asunto.value,
                    fechaini: UpDateIni,
                    correo: correo
                })
            })




    })
}

