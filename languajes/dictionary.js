/**
 * Created by Javier on 16/01/2017.
 */
'use-strict';
function getMessage (language, message ) {
    "use strict";
    if (language==='es' || language==='en') {
        var lan = {
            'es': {
                "USER_NOT_FOUND": "USARIO NO EXCONTRADO",
                "PRODUCT NOT FOUND": "PRODUCTO NO ENCONTRADO"
            },
            'en': {
                "USER_NOT_FOUND": "USER NOT FOUND",
                "PRODUCT NOT FOUND": "PRODUCT NOT FOUND"
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
