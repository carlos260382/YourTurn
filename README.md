    Proyecto Grupal - Your Turn.


Objetivos del Proyecto
Construir una App utlizando React, Redux, Node y Sequelize.
Afirmar y conectar los conceptos aprendidos en la carrera.
Aprender mejores prácticas.
Aprender y practicar el workflow de GIT.
Usar y practicar testing.
Horarios y Fechas
El proyecto tendrá una duración máxima de tres semanas.
El proyecto será en grupos de 7 integrantes.

Comenzando
Crear un repositorio.
clonar el repositorio cada integrante, para tener una copia del mismo en sus cuentas.
crear una nueva rama del repositorio (develop) en sus computadoras para comenzar a trabajar.
Trabajaremos sobre la rama develop, creando ramas (feature) con el respectivo id de cada tarea.
Tendremos una estructura general del proyecto, dividida en carpetas, sub-carpetas y archivos.
Usaremos jira para crear las epic y a tráves de ellas poder dividir las tareas y sub-tareas.

IMPORTANTE: Es necesario contar minimamente con la última versión estable de Node y NPM. Asegurarse de contar con ella para poder instalar correctamente las dependecias necesarias para correr el proyecto.

Actualmente las versiónes necesarias son:

Node: 12.18.3 o mayor
NPM: 6.14.16 o mayor
Para verificar que versión tienen instalada:

node -v

npm -v

BoilerPlate
El boilerplate cuenta con varias carpetas, en las cuales estará el código del back-end y el front-end respectivamente.

Tendremos un archivo llamado: .env que tenga la siguiente forma:

DB_USER=usuariodepostgres
DB_PASSWORD=passwordDePostgres
DB_HOST=localhost
Reemplazar usuariodepostgres y passwordDePostgres con tus propias credenciales para conectarte a postgres. Este archivo va ser ignorado en la subida a github, ya que contiene información sensible (las credenciales).

Adicionalmente crearemos desde psql una base de datos llamada turn.

El contenido del front-end fue creado usando: Create React App.

Enunciado
La idea general es crear una aplicación en la cual se puedan ver distintas  disponibilidades de turnos junto con información relevante de los mismos utilizando la api externa calendar api y a partir de ella poder, entre otras cosas:

Buscar fechas disponibles
Filtrarlas / Ordenarlas
Agregar nuevas fechas
Recibir notificación en el correo del turno obtenido
Recibir notificación en el correo cuando me suscriba a noticias
IMPORTANTE: Para poder utilizar esta API externa es necesario crearse una cuenta para obtener una API Key que luego debera ser incluida en todos los request que hagamos a rawg simplemente agregando ?api_key={YOUR_API_KEY} al final de cada endpoint. Agregar la clave en el archivo .env para que la misma no se suba al repositorio por cuestiones de seguridad y utilizarla desde allí.

IMPORTANTE: Para las funcionalidades de filtrado y ordenamiento NO utilizaremos los endpoints de la API externa que ya devuelven los resultados filtrados u ordenados sino que los haremos nosotros. Realizaremos algunos de los ordenamientos o filtrados en el frontend y otros en el back-end.

Únicos Endpoints/Flags que pueden utilizar
https://www.googleapis.com/auth/calendar	read/write access to Calendars
https://www.googleapis.com/auth/calendar.readonly	read-only access to Calendars
https://www.googleapis.com/auth/calendar.events	read/write access to Events
https://www.googleapis.com/auth/calendar.events.readonly	read-only access to Events
https://www.googleapis.com/auth/calendar.settings.readonly	read-only access to Settings
https://www.googleapis.com/auth/calendar.addons.execute   run as a Calendar add-on

Requerimientos mínimos:
A continuación detallaramos los requerimientos de nuestro Proyecto Grupal.


Tecnologías necesarias:
 React
 Redux
 Express
 Sequelize - Postgres
Frontend
Se debe desarrollar una aplicación de React/Redux que contenga las siguientes pantallas/rutas.

Pagina inicial: armaremos una landing page con

Alguna imagen de fondo representativa al proyecto (logo)
Login
Logout
Botón para ingresar al home (Ruta principal)
Ruta principal: debe contener

 Input de búsqueda para encontrar fechas disponibles por dia,
 Área donde se verá el listado de fechas disponibles. Deberá mostrar su:
Imagen
Fecha
Día
Hora
 Botones/Opciones para filtrar por:
Dia
Horario(es decir las que vienen de la API) o agregada por nosotros (creadas mediante el form)
 Botones/Opciones para ordenar tanto ascendentemente como descendentemente fechas por:
Dias disponibles
Horas disponibles
Fechas Disponibles
Paginado para ir buscando y mostrando las siguientes turnos, mostrando 8 turnos por página.
IMPORTANTE: Dentro de la Ruta Principal se deben mostrar los turnos disponibles traidas desde la base de datos: almacenar la información necesaria para el funcionamiento de la app.

Ruta de detalle de turno: debe contener

 Los campos mostrados en la ruta principal para cada turno (imagen,dia, fecha y hora)
estado de solicitud de el turno.
Ruta de creación del turno: debe contener

 Un formulario controlado con los siguientes campos
Nombre
Edad(sólo mayores de 18 años)
correo (Diferenciar entre letras y números)
contraseña(que contenga letras ,números y caracteres)
 Posibilidad de seleccionar/agregar uno o más turnos
 Botón/Opción para crear una nuevo turno
Base de datos
El modelo de la base de datos deberá tener las siguientes entidades (Aquellas propiedades marcadas con asterísco deben ser obligatorias):

Turno con las siguientes propiedades:
ID *
Nombre *
Hora *
Día *
Mes
Usuario con las siguientes propiedades:
ID
Nombre

Administrador con las siquientes propiedades:
ID
Nombre
La relación entre ambas entidades debe ser de muchos a muchos.

Backend
Se debe desarrollar un servidor en Node/Express con las siguientes rutas:

ENDPOINT:

GET endpoint /turnos:
Obtener un listado de fechas de turnos
Debe devolver solo los datos necesarios para la ruta principal
GET endpoint /turnos/ generar:
Obtener un listado de las fechas de turnos que contengan la palabra ingresada como query parameter
Si no existe ninguna fecha,mostrar un mensaje adecuado
 GET /turns/{idTurn}:
Obtener el detalle de un turno en particular
Debe traer solo los datos pedidos en la ruta de detalle de fecha de turno
Incluir los turnos asociados.
POST endpoint / turnos:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de turno por body
Crea un nuevo turno en la base de datos.
POST endpoint /suscripcion.
Recibe los datos recolectados desde el formulario controlado de la ruta de creación de turno por body
Crea un nueva suscripción en la base de datos.
DELETE endpoint /suscripcion.

Proceso para enviar notificación recordando turno solicitado.
Proceso para enviar noticias y novedades.
Evento socket para actualizar turnos en tiempo real.

