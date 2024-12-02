const mensajeError = document.getElementsByClassName("error")[0];

document.getElementById("login-form").addEventListener("submit",async (e)=>{
    e.preventDefault();
    console.log(e.target.children.user.value);
   

    const res = await fetch("https://sd-back.onrender.com/api/login",
        {
        method:"POST",
        headers:{
            "Content-Type" : "application/json"
        },
        body: JSON.stringify({
            user: e.target.children.user.value
        })
    })

    if(!res.ok)return mensajeError.classList.toggle("escondido",false);
    const resJson = await res.json();
    if(resJson.redirect){
        window.location.href = resJson.redirect
    }
    
})