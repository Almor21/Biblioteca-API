# Backend de Biblioteca

Este es un servidor montado con **Express.js** para administrar una biblioteca, con conexión a una base de datos **MongoDB**. El servidor ofrece rutas API para la gestión de usuarios, libros, reservas y permisos, además de autenticación mediante **JWT**. Este proyecto fue el **projecto-01** de dos proyectos de salida, desarrollado como parte de la asignatura de **Backend**, con el objetivo de aplicar los conocimientos adquiridos en la materia y crear un servidor funcional con un enfoque práctico.

## Características

- **Gestión de usuarios**: Registro, inicio de sesión y administración de usuarios.
- **Gestión de libros**: Crear, leer, actualizar y eliminar libros.
- **Gestión de reservas**: Realizar reservas de libros.
- **Sistema de permisos**: Control de acceso basado en permisos.
- **Autenticación JWT**: Implementación de autenticación segura para garantizar el acceso a las rutas protegidas.
- **Conexión con MongoDB**: Almacenamiento de datos de usuarios, libros y reservas.

## Instalación

1. Clona este repositorio en tu máquina local:
    ```bash
    git clone https://github.com/Almor21/proyecto-01.git
    ```

2. Instala las dependencias necesarias:
    ```bash
    npm install
    ```

3. Configura las variables de entorno. Crea un archivo `.env` en la raíz del proyecto y agrega los siguientes parámetros:
    ```
    MONGO_CONN_STRING=tu_uri_de_mongo
    JWT_SECRET=tu_clave_secreta
    ```

4. Inicia el servidor:
    ```bash
    npm run dev
    ```

El servidor estará corriendo en `http://localhost:3000`.

## Rutas API
### **Libros (Books)**

- **POST /api/v1/book/create**: Crea un nuevo libro.  
  Requiere autenticación (`AuthMiddleware`) y permiso para crear libros (`PermissionsMiddleware([PERMISSIONS.CREATE_BOOK])`).
  
- **GET /api/v1/book/**: Obtiene todos los libros disponibles.

- **GET /api/v1/book/:id**: Obtiene un libro específico por ID.

- **PUT /api/v1/book/update/:id**: Actualiza la información de un libro.  
  Requiere autenticación y permiso para modificar libros (`PermissionsMiddleware([PERMISSIONS.MODIFY_BOOK])`).

- **DELETE /api/v1/book/delete/:id**: Elimina un libro.  
  Requiere autenticación y permiso para eliminar libros (`PermissionsMiddleware([PERMISSIONS.DELETE_BOOK])`).

### **Usuarios (Users)**

- **POST /api/v1/user/create**: Crea un nuevo usuario.

- **POST /api/v1/user/login**: Inicia sesión y obtiene un JWT.

- **PUT /api/v1/user/update/:id**: Actualiza la información de un usuario.  
  Requiere autenticación.

- **DELETE /api/v1/user/delete/:id**: Elimina un usuario.  
  Requiere autenticación.

### **Reservas (Reserves)**

- **POST /api/v1/reserve/**: Crea una nueva reserva de libro.  
  Requiere autenticación.

## Tecnologías

- **Node.js**: Entorno de ejecución.
- **Express.js**: Framework para la construcción de rutas y servidores.
- **MongoDB**: Base de datos NoSQL para el almacenamiento de datos.
- **JWT (JSON Web Token)**: Para la autenticación y autorización.
- **Mongoose**: ODM para interactuar con MongoDB.
