/**
 * Created by Javier on 16/01/2017.
 */
'use-strict';
function getMessage (headers , message ) {
    "use strict";

    var language = '';

    if (headers) {
        language = headers['accept-language'].split(',')[0].trim().substr(0,2).toLowerCase();
    }
    else {
        language = 'en';
    }

    if (language==='es' || language==='en') {
        var lan = {
            'es': {
                "USER_NOT_FOUND": "USARIO NO EXCONTRADO",
                "PRODUCT NOT FOUND": "PRODUCTO NO ENCONTRADO",
                "INVALID CREDENTIALS": "CREDENCIALES INVALIDAS",
                "USER ALREADY EXISTS": "USUARIO YA EXISTE",
                "TOKEN NOT PROVIDED": "FALTA TOKEN",
                "INVALID TOKEN": "TOKEN NO VALIDO",
                "CONNECTION ERROR": "ERROR DE CONEXION",
                "NOT FOUND": "NO ENCONTRADO"
            },
            'en': {
                "USER_NOT_FOUND": "USER NOT FOUND",
                "PRODUCT NOT FOUND": "PRODUCT NOT FOUND",
                "INVALID CREDENTIALS": "INVALID CREDENTIALS",
                "USER ALREADY EXISTS": "USER ALREADY EXISTS",
                "TOKEN NOT PROVIDED": "TOKEN NOT PROVIDED",
                "INVALID TOKEN": "INVALID TOKEN",
                "CONNECTION ERROR": "CONNECTION ERROR",
                "NOT FOUND": "NOT FOUND"
            }
        };
        try {
            var mess = lan[language][message];
        } catch (err) {
            // Handle the error here.
            return ("MESSAGE UNDEFINED");
        }
        if (mess == undefined) {
            return ("MESSAGE UNDEFINED");
        }
        return mess;
    }
    else {
        return ("LANGUAGE NOT AVAILABLE");
    }
}

module.exports = getMessage;
