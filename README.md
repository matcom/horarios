## HORARIOS MATCOM

##### Sistema de gestion de horarios de la facultad de matemática.

#### Autor:

- Jose Carlos Hernandez

Tutor: Pedro Quintero Rojas

#### Como ejecutar el proyecto:

>**Se asume que para la ejecucion del proyecto se deba tener instalado:**
>- docker
>- docker-compose
>- nodejs (superior a la version 16.0.0)
>  ```bash
>  Para actualizar la version de nodejs: (desde Windows quitar sudo)
>  
>  sudo npm cache clean -f
>  sudo npm install -g n 
>  sudo n stable
>   ```
>- npm (superior a la version 8.0.0)

Estar situado en la raiz de backend (src/backend)
Si ha ejecutado el proyecto antes, entonces hacer **docker volume rm backend_horarios_postgres -f**

```bash
yarn install
docker-compose up -d
npm run start
```

Para analizar la base de datos revisar `locahost:8080` en el navegador

Ejecutar la aplicacion visual (estar situado en la raiz del proyecto visual [dentro de la carpeta frontend])

```bash
yarn install
yarn serve
```

> Navegar a http://localhost:8001


**Para ingresar como administrador del sistema**

- email: admin@admin.com
- password: admin
