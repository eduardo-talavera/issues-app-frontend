# Issues App Guia de Ejecucion

<br />

## Requerimientos minimos
- Node >= 22.20.0

## Pasos para ejecución de proyecto frontend

<br />

#### Paso 1 ya habiendo configurado el backend lo que sigue es configurar nuestro frontend, empezando por configurar las variables de entorno. Entra al proyecto y renombra el archivo .env.example a .env deberia quedar como a continuación se muestra.

```shell
VITE_API_URL=http://localhost:4000
#CORS_STRATEGY=whitelist #descomentaremos esta variable en un paso posterior
```
<br />

#### Nota! Si aún no haz configurado el backend puedes acceder a la guia de configuración haciendo clic en el siguiente enlace. [Guia de configuración proyecto backend](https://github.com/eduardo-talavera/issues-app-backend)

<br />

#### Paso 2 una vez tenemos nuestras variables listas el siguiente paso es abrir el proyecto en una terminal o cmd y ejecutar el siguiente comando para instalar las dependencias.

```shell
npm install
```

<br />

#### Paso 3 ejecutar el comando a continuacion para arrancar nuestro proyecto en modo de desarrollo esto arrancara el proyecto en localhost en el puerto 5173 👉 http://localhost:5173

```shell
npm run dev
```

#### Sabremos que todo esta correcto si vemos los siguientes mensajes en consola...
```shell
  VITE v6.2.0  ready in 462 ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help
```

<br />

#### Paso 4 ingresar a  http://localhost:5173/ para loguearnos con un usuario de prueba, a continuacion se muestran un conjunto de usuarios con los cuales puede probar
```shell

  usuario de prueba 1
    correo: usuario.prueba_a@mail.com
    contraseña: password123

  usuario de prueba 2
    correo: usuario.prueba_b@mail.com
    contraseña: password_abc

  usuario de prueba 3
    correo: usuario.prueba_c@mail.com
    contraseña: password.$&
```

<br />

#### Una vez logueados la aplicación nos dirigira a la pantalla de issues donde podremos probar todas las funcionalidades.

<br />

### Scripts para pruebas unitarias

<br />

#### Para ejecutar los test ejecute el siguiente comando.
```shell
npm run test
```

<br />

#### Para ejecutar los test con umbral de cobertura ejecute.
```shell
npm run coverage
```

<br />

#### Para ejecutar los test en un entorno con ui escriba.
```shell
npm run test:ui



