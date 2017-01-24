##URL BASE:
http://locahost:3000
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
- `/apiv1/users/logout` : log out de usuarios logados

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
- Montado en cluster para aprovechar el multi-core de CPU


