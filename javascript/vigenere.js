const Mensaje = document.getElementById("mensaje")
const Clave = document.getElementById("clave")
const Resultado = document.getElementById("resultado")
const Cifrar = document.getElementById("cifrar")
const Descifrar = document.getElementById("descifrar")
const Limpiar = document.getElementById("limpiar")

Cifrar.addEventListener('click', () => cifrar())

Descifrar.addEventListener('click', () => descifrar())

Limpiar.addEventListener('click', () => limpiar())

const vigenere = (() => {
    const process = (text, key, encode) => {
        let result = "";
        let keyIndex = 0;
        
        for (let char of text) {
            const charCode = char.toLowerCase().charCodeAt(0);
            
            if (charCode >= 97 && charCode <= 122) { 
                const shift = key[keyIndex % key.length].toLowerCase().charCodeAt(0) - 97;
                const newCharCode = encode 
                    ? ((charCode - 97 + shift) % 26) + 97
                    : ((charCode - 97 - shift + 26) % 26) + 97;
                result += String.fromCharCode(newCharCode);
                keyIndex++;
            } else {
                result += char;
            }
        }
        return result;
    };

    return {
        encode: (text, key) => process(text, key, true),
        decode: (text, key) => process(text, key, false)
    };
})();

const cifrar = () => {
    const mensaje = Mensaje.value
    const clave = Clave.value
    if (!mensaje || !clave) return alert("Por favor, complete todos los campos.");
    Resultado.value = vigenere.encode(mensaje, clave);
};

const descifrar = () => {
    const mensaje = Mensaje.value
    const clave = Clave.value
    if (!mensaje || !clave) return alert("Por favor, complete todos los campos.");
    Resultado.value = vigenere.decode(mensaje, clave);
};

const limpiar = () => {
    [Mensaje, Clave, Resultado].forEach(constante => constante.value = "");
};