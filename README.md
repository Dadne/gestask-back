# Gestask API
Gestask API es una API REST diseñada para la gestión eficiente de tareas y usuarios. Permite realizar operaciones CRUD sobre tareas, así como crear usuarios y gestionar el inicio de sesión.

## Tecnologías utilizadas

- **Node.js**: Entorno de ejecución para JavaScript en el servidor.
- **Express**: Framework web para construir la API.
- **MongoDB**: Base de datos NoSQL para almacenar usuarios y tareas.
- **Mongoose**: ODM para interactuar con MongoDB desde Node.js.
- **JWT (JSON Web Tokens)**: Para autenticación y manejo de sesiones.
- **SwaggerDoc**: Generación documentación API.

## Características principales

- Crear, leer, actualizar y eliminar tareas (CRUD)
- Crear usuarios y autenticarse mediante login


## Instalación

Sigue estos pasos para poner en marcha el proyecto en tu máquina local:

1.  **Clona el repositorio**:
    ```bash
    git clone https://github.com/Dadne/gestask-back.git
    cd gestask-back
    ```

2.  **Instala las dependencias**:
    ```bash
    npm install
    ```

3.  **Configurar Entorno `.env`**:
Antes de iniciar el proyecto, asegúrate de configurar las siguientes variables de entorno en un archivo `.env` en la raíz del proyecto:
- `APP_PORT`: El puerto en el que la aplicación backend escuchará.
- `DATABASE_URL`: La URL de conexión a tu base de datos MongoDB.
- `JWT_SECRET`: Una cadena de caracteres secreta para firmar los JSON Web Tokens.
- `SWAGGER_USER`: Nombre de usuario para acceder a la documentación de Swagger.
- `SWAGGER_PASSWORD`: Contraseña para acceder a la documentación de Swagger.
- `ENV`: Define el entorno de la aplicación (`dev` para desarrollo, `prod` para producción).
- `EMAIL_SERVICE`: El servicio de correo electrónico utilizado para el envío de emails.
- `EMAIL_USER`: La dirección de correo electrónico utilizada como remitente.
- `EMAIL_PASSWORD`: La contraseña o token de aplicación para el correo electrónico remitente.


## Ejecución

- **Ambiente local (desarrollo):**
    ```bash
    npm run dev
    ```
    Esto iniciará el servidor en modo desarrollo, permitiendo recarga automática ante cambios en el código.

- **Ambiente productivo:**
    ```bash
    npm start
    ```
    Esto iniciará el servidor en modo producción.

## Endpoints principales

- `POST /users` - Crea un nuevo usuario
- `POST /login` - Inicia sesión y obtiene un token de autenticación
- `GET /tasks` - Lista todas las tareas
- `POST /tasks` - Crea una nueva tarea
- `GET /tasks/:id` - Obtiene una tarea por ID
- `PUT /tasks/:id` - Actualiza una tarea existente
- `DELETE /tasks/:id` - Elimina una tarea

## Contacto

Para dudas, sugerencias o reportar problemas, puedes contactar a:

- **Nombre:** Dadne Fernando Cruz Huerta
- **Correo:** dadnehuerta@gmail.com
- **LinkedIn:** [dadne](https://www.linkedin.com/in/dadne-cruz-6ab0071a0/)