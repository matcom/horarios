## HORARIOS MATCOM

##### Sistema de gestion de horarios de la facultad de matemática.

#### Autor:

- Jose Carlos Hernandez

Tutor: Pedro Quintero Rojas

#### Como ejecutar el proyecto:

> Estar situado en la raiz de backend (src/backend)
```bash
1. Si ha ejecutado el proyecto antes, entonces hacer **docker volume rm backend_horarios_postgres**
2. yarn install
2. docker-compose up -d
3. npm run start
```

Para analizar la base de datos revisar `locahost:8080` en el navegador

> Ejecutar la aplicacion visual (estar situado en la raiz del proyecto visual [dentro de la carpeta frontend])
```bash
1. yarn install
2. yarn serve
3. navegar a http://localhost:8001
```
