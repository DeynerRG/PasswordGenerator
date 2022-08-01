const txtPassword = document.querySelector("#txtPassword");
const btnCrearPassword = document.querySelector(".btnGenerarPassword");
const btnCopiarPassword = document.querySelector(".btnCopiarPassword");
const lblLongitudPassword = document.querySelector(".lblLon");
const rLongitud = document.querySelector("#longitud");
const checkBoxes = document.querySelectorAll(".checkItem");
const alerta = document.querySelector(".mensaje__copiado");
// variables
let longitud = 8;
const _letras =  ['A','a','B','b','C','c','D','d','E','e','F','f','G','g','H','h','I','i','J','j','K','k','L','l','M','m','N','n','O','o','P','p','Q','q','R','r','S','s','T','t','U','u','V','v','W','w','X','x','Y','y','Z','z'];
const _numeros = [ 0,1,2,3,4,5,6,7,8,9 ];
const _simbolos = ['!', '#', '&','$','*','+','-','/',':','<','>','=','?','@','[',']','{','}'];
const digitosPermitidos = {
    numeros: true,
    letras: true,
    simbolos: true
};
let password = "";
let arraySource = [..._letras, ..._numeros, ..._simbolos];

// Event listeners
document.addEventListener("DOMContentLoaded",()=>{

    // Globales
    lblLongitudPassword.textContent = rLongitud.value;
    
    generarPassword();

    checkBoxes.forEach((check)=>{
        check.parentNode.classList.add("checkActive");
        check.addEventListener("click",(e)=>{
            if(e.target.checked){
                digitosPermitidos[e.target.name] = true;
                e.target.parentNode.classList.add("checkActive");
            }else{
                digitosPermitidos[e.target.name] = false;
                e.target.parentNode.classList.remove("checkActive");
            }
            generarPassword();

        });
    });

    btnCrearPassword.addEventListener("click",(e)=>{
        e.preventDefault();
        generarPassword();
    });

    rLongitud.addEventListener("change",(e)=>{
        lblLongitudPassword.textContent = rLongitud.value;
        // Almacenar la longitud del password
        longitud = Number.parseInt(e.target.value);
        generarPassword();
        
    });

    btnCopiarPassword.addEventListener("click",(e)=>{
        e.preventDefault();
        // Selecciona el contenido del elemento
        txtPassword.select();
        // Almacena el contenido seleccionado en el clipboard
        navigator.clipboard.writeText(txtPassword.value);

        alerta.style.opacity = "100%";
        setTimeout(()=>{
            alerta.style.opacity = "0%";
        },3000);

    });


}); 

// Funciones

function generarPassword(){
    validarCheckboxes();
    if(arraySource.length){
        txtPassword.value = "";
        password = "";

        for(let i = 1; i <= longitud; i++){
            
            let numeroGenerado = numRandom(arraySource.length);
            password += arraySource[numeroGenerado];
           
        }
        txtPassword.value = password;  
        return;
    }
    
}

function numRandom( max ){
    return Math.floor(Math.random() * (max - 0) + 0);
} 

function validarCheckboxes(){
    // checkBoxes.forEach((check) => {
    //     check.checked ? digitosPermitidos[check.name ] = true : digitosPermitidos[check.name ] = false;
    // });
    const {letras, numeros, simbolos} = digitosPermitidos;
    
    if( letras && numeros && simbolos){
        arraySource = [ ..._letras, ..._numeros, ..._simbolos ];
    }else if(letras && !numeros && !simbolos){
        arraySource = [..._letras];
    }else if(numeros && !letras && !simbolos){
        arraySource = [..._numeros];
    }else if(simbolos && !numeros && !letras){
        arraySource = [..._simbolos];
    }else if(letras && numeros && !simbolos){
        arraySource = [..._letras, ..._numeros];
    }else if(letras && simbolos && !numeros){
        arraySource = [..._letras, ..._simbolos];
    }else if(numeros && simbolos && !letras){
        arraySource = [..._numeros,..._simbolos];
    }else if(!letras && !numeros && !simbolos){
        txtPassword.value = "";
        arraySource = [];
    }
    console.log(digitosPermitidos);
}