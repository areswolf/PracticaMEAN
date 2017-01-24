##URL BASE:
http://locahost
El puerto depende del fichero `config.js`
##SCRIPT DE INICIO DE DB:
- Está en la carpeta `scripts`.
- Se utiliza directamente el mongodb driver.
- Tiene su propio package.json de dependencias.
- Es lo más sencillo posible.
- El campo `name` está indexado como texto, para poder buscar por palabras. 
- Se ejecuta así: `node install_db.js`.

##ENDPOINTS:
###GET:
- `/apiv1/productos`: lista total de anuncios. OJO, sólo PRE; en PRO, siempre limitar a la primera página
Acepta los siguientes parámetros:
    - `name`: busca palabras dentro del campo name. Ej: http://localhost:3000/apiv1/productos?name=roja
    - `saleOrSeek`: acepta 2 valores: `SALE` y `SEEK`. Ej: http://localhost:3000/apiv1/productos?saleOrSeek=SALE
    - `max_price` y `min_price`: precios máximo y mínimo. Acepta uno o ambos, como intervalo. Ej: http://localhost:3000/apiv1/productos?max_price=90
    - `tags`: filta por tag. Acepta tags válidos. Ej: http://localhost:3000/apiv1/productos?tags=lifestyle
    - `page`: devuelve la página indicada, en bloques de 10 elementos.
    - `sort`: ordena ascendente según el campo específicado. Los campos pueden ser `_id`, `name`, `saleOrSeek`, `picture`, `tags`, `price`.
    
- `/apiv1/tags`: lista total de tags. No se limita en PRO, pues siempre será un número pequeño.
###POST:
- `/apiv1/users/register`: sign-in, creación de usuarios
- `/apiv1/users/login` : log in de usuarios creados


##MÓDULOS RESEÑABLES:
- `languajes/dictionary.js`: módulo de idiomas.

##TESTING:
- Carpeta `test`.
- Herramienta: `mocha`, según recomendación en foros:
    - Instalación: `npm mocha -g`
    - Crear una modúlo js para la prueba: `test_1.js`
    - Ejecutar el test: `mocha test_1.js`
    - En esta práctica sólo he experimentado un poco con esto.

##NOTAS:
- Montado en cluster para aprovechar el multi-core de CPU. Sin embargo, no se han añadido funciones de auto-lanzado, por las dificultades que esto añadía en la fase de desarrollo.
- En el fichero `config.js` están los siguientes parámetros de trabajo:
    - `port`: puerto de escucha
    - `db`: base de datos a la que se conecta
    - `jwt`: parámetros para JWT (secret y expiration)
    - `loginUrl`: login url que se responde en endpoint `users/register`
    
##PUESTA EN FUNCIONAMIENTO:
- Instalar DB de pruebas con productos y usuario de pruebas (con password sin encriptar):
    - Ir a la carpeta `scripts`.
    - Ejecutar `npm istall`, ya que tiene su propio `package.json`
    - Ejecutar `node install_db.js` para destruir toda la base de datos y crearla con datos de prueba.
- Instalar el proyecto:
    - Ir a la carpeta raiz del proyecto.
    - Ejecutar `npm istall`.
    - Revisar el fichero `package.json`.
    - Ejecutar `npm start` para lanzar *nodemon* en el módulo principal.
    - Si se desea modificar la configuración, ver el módulo `config.js`
- Se incluye la carpeta `public/images` con dos imágenes de prueba en el repositorio, por facilidad.


