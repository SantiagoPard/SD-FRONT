const mensajeError = document.getElementsByClassName("error")[0];

document.getElementById("ver-form").addEventListener("submit",async (e)=>{
    e.preventDefault();
    console.log(e.target.children.code.value);
    const res = await fetch("http://localhost:4000/api/verificacion",
        {
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            code: e.target.children.code.value
        })
    })
    if(!res.ok)return mensajeError.classList.toggle("escondido",false);
    
    const resJson = await res.json();
    if(resJson.redirect){
        window.location.href = resJson.redirect
    }
    
})