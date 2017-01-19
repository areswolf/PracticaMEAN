/**
 * Created by Javier on 16/01/2017.
 */
'use-strict';

var myDictionary = require('../languajes/dictionary');
var assert   = require('assert');

describe('dictionary', function() {
    it('Retorna el mensaje 1 en el idioma 1', function () {
        assert.equal('USARIO NO EXCONTRADO', myDictionary('es', 'USER_NOT_FOUND'));
    });
    it('Retorna el mensaje 1 en el idioma 2', function () {
        assert.equal('USER NOT FOUND', myDictionary('en', 'USER_NOT_FOUND'));
    });
    it('Retorna el mensaje 2 en el idioma 1', function () {
        assert.equal('PRODUCTO NO ENCONTRADO', myDictionary('es', 'PRODUCT NOT FOUND'));
    });
    it('Retorna el mensaje 2 en el idioma 2', function () {
        assert.equal('PRODUCT NOT FOUND', myDictionary('en', 'PRODUCT NOT FOUND'));
    });
    it('Error de idioma no soportado', function () {
        assert.equal('LANGUAGE NOT AVAILABLE', myDictionary('it', 'USER_NOT_FOUND'));
    });
    it('Error de mensaje no existente', function () {
        assert.equal('MESSAGE UNDEFINED', myDictionary('es', 'HOLA'));
    });
});