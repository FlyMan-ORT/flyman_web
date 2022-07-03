# FlyMan - Aplicación Web

FlyMan se trata de una solución para la empresa de car sharing MyKeego en su proceso de mantenimiento de los autos, donde se ofrecerá un webadmin para el administrador y jefe de los operarios que realizan las tareas a los vehículos de la empresa. Dicho administrador podrá asignar reservas de mantenimiento a cada uno de los operarios, para quienes además se desarrolló una aplicación móvil. En esta aplicación, los operarios podrán visualizar el total de servicios que deben realizar durante su jornada laboral, su órden y los detalles de cada uno, así como también
información de los vehículos. Además podrán abrir y cerrar los autos desde la misma app y generar reportes del servicio realizado informando posibles daños.


## Prerequisitos
- [Git](https://git-scm.com/downloads)
- [Node.js y npm](https://nodejs.org/en/download/)

## Instalación paso a paso
1) Abrir una terminal y ejecutar el comando “git clone” para clonar el repositorio en el
entorno local: 
```git clone https://github.com/FlyMan-ORT/flyman_web.git```
2) En la misma terminal, ingresar mediante el comando “cd” a la carpeta creada al clonar el repositorio. 
Ejemplo: ```cd C:\Users\desktop\flyMan_web```
3) En la misma terminal, ejecutar el comando “npm install” para instalar todas las
dependencias y paquetes necesarios para el correcto funcionamiento: 
```npm install```
4) Ingresar a la IDE de desarrollo, abrir el repositorio clonado previamente y en la
carpeta principal crear un archivo sin nombre con la extensión .env para poner ahí
dentro las variables de entorno necesarias. Solicitar dichas variables al equipo de
desarrollo ya que no pueden ser de dominio público.
.env example:
```REACT_APP_BASE_URL=```
5) Finalmente para ejecutar el software, abrir una terminal en la IDE de desarrollo e
ingresar el comando “npm start” para correr la aplicacion web de manera local en modo desarrollo:
```npm start```


## Dependencias principales
- [axios](https://github.com/axios/axios#readme) para la solicitud de request a la base de datos.
- [react-moment](https://github.com/headzoo/react-moment#readme) para el manejo de fechas.
- [material-ui](https://github.com/mui/material-ui#readme) libreria de componentes.
- [react-bootstrap](https://react-bootstrap.github.io/) libreria de componentes.
- [redux-toolkit](https://github.com/reduxjs/redux-toolkit#readme) para el manejo de estados.
- [react-router](https://github.com/remix-run/react-router#readme) para la navegación.
- [dotenv-expand](https://github.com/motdotla/dotenv-expand#readme) para utilizar las variables de entorno.