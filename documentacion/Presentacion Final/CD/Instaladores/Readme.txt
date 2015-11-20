
		~~~~~~~~~~~~~~~~~ INSTALACION DEL SISTEMA DE NOTIFICACIONES EN TIEMPO REAL JARVIS ~~~~~~~~~~~~~~~~~

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 Instalacion Servicio Web
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Para llevar a cabo la instalacion de la aplicacion servicio es necesario realizar la verificación de los siguientes requerimientos:

  Requerimientos de Hardware y Software. 
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Los requerimientos mínimos de Hardware para llevar a cabo la instalación de la aplicación de servicio:

Hardware
  * Sistema Operativo:		GNU/Linux Debian o Ubuntu.
  * Procesador:			Pentium 4 CPU 2.4GHz en adelante.
  * Memoria RAM:		512MB RAM en adelante.
  * Disco:			40GB en adelante.
  * Espacio libre en disco:	250MB mínimo.

Software

  * Nodejs
  * MongoDB		

Otros
  * Conexion a Internet

Antes de comenzar con la instalación verifique que cuenta con conexion a internet para instalar el software 
necesario desde los repositorios de su distribución Debian o Ubuntu. A continuacion desde linea de comandos
ejecute el siguiente comando:

 sudo apt-get install nodejs
 sudo apt-get install -y mongodb-org

Si los repositorios de su distribución no cuenta mongodb ejecute los siguientes comandos:

 sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CE10
 echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
 sudo apt-get update
 sudo apt-get install -y mongodb-org

Una vez que la instalación de nodejs y mongodb han sido completadas, proceda a realizar la instalación de la aplicación 
servicio web, el instalador de dicha aplicación se encuentra en la carpeta Instaladores/server, desde linea de comandos
dirijase a dicha carpeta y ejecute la siguiente instrucción:

 sudo dpkg -i jarvis-service_0.1.0_all.deb

Una vez que el proceso de instalación es completado satisfactoriamente, podrá verificar que dentro del directorio /opt/jarvis, 
fueron copiados todos los archivos necesarios para iniciar la aplicación servicio web. desde línea de comandos dirijase al
directorio /opt/jarvis y ejecute el siguiente comando:

 sudo node app.js

Una vez iniciada la aplicación del servicio web ningun error debe ser mostrado, en caso de que la ejecución de la aplicación falle
verifique que se tengan instaladas las ultimas versiones de nodejs y mongodb.


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 Instalacion Aplicación Sensor
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Para llevar a cabo la instalacion de la aplicacion sensor es necesario realizar la verificación de los siguientes requerimientos:

  Requerimientos de Hardware y Software. 
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Hardware
  * Sistema Operativo:		GNU/Linux Debian o Ubuntu.
  * Procesador:			Pentium 4 CPU 2.4GHz en adelante.
  * Memoria RAM:		512MB RAM en adelante.
  * Disco:			40GB en adelante.
  * Espacio libre en disco:	100MB mínimo.

Software

  * java

Otros
  * Conexion Internet

Antes de comenzar con la instalación verifique si tiene instalada la aplicación Java, dado que dicho
entorno es necesario para ejecutar la aplicación sensor es muy importante que tenga instalada una versión
reciente de dicho entorno de programación. A continuacion desde linea de comandos ejecute
los siguientes comandos:

 sudo apt-get install python-software-properties
 sudo add-apt-repository ppa:webupd8team/java
 sudo apt-get update

 sudo apt-get oracle-java8-installer

Una vez que la instalación de java ha sido completada, proceda a realizar la instalación de la aplicación Sensor, 
el instalador de dicha aplicación se encuentra en la carpeta Instaladores/sensor, desde linea de comandos
dirijase a dicha carpeta y ejecute la siguiente instrucción:

 sudo dpkg -i jarvissensor_0.1.1_amd64.deb

Una vez que el proceso de instalación es completado satisfactoriamente, podrá verificar que dentro del directorio /opt/sensor, 
fueron copiados archivos necesarios para iniciar la aplicación sensor. desde línea de comandos ejecute el siguiente comando:

 /usr/bin/sensor -i

Una ventana de configuración sera mostrada en la cual es necesario que ingrese información relacionada a la configuración de servicio.


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 Instalacion Aplicacion Web
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Para llevar a cabo la instalacion de la aplicacion servicio es necesario realizar la verificación de los siguientes requerimientos:

  Requerimientos de Hardware y Software. 
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Los requerimientos mínimos de Hardware para llevar a cabo la instalación de la aplicación de servicio:

Hardware
  * Sistema Operativo:		GNU/Linux Debian o Ubuntu.
  * Procesador:			Pentium 4 CPU 2.4GHz en adelante.
  * Memoria RAM:		512MB RAM en adelante.
  * Disco:			40GB en adelante.
  * Espacio libre en disco:	250MB mínimo.

Software

  * Apache

Antes de comenzar con la instalación verifique que cuenta con conexion a internet para instalar el software 
necesario desde los repositorios de su distribución Debian o Ubuntu. A continuacion desde linea de comandos
ejecute el siguiente comando:

 sudo apt-get install apache2

Una vez que la instalación de apache ha sido completada, proceda a realizar la instalación de la aplicación web, 
el instalador de dicha aplicación se encuentra en la carpeta Instaladores/web, desde linea de comandos
dirijase a dicha carpeta y ejecute las siguientes instrucciones:

 sudo chmod +x install.sh
 sudo ./install.sh ruta_host

Donde ruta_host representa el directorio donde son almacenadas las páginas web en su servidor. Una vez completada 
la instalación de la aplicación web, podra verificar desde su navegador el correcto funcionamiento de la aplicación
ingresando a la URL:

 http://localhost/jarvis/

Como resultado la página de bienvenida de la aplicación web es desplegada.


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 Instalacion Aplicacion Móvil
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Para llevar a cabo la instalacion de la aplicacion móvil es necesario realizar la verificación de los siguientes requerimientos:

  Requerimientos de Hardware y Software. 
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Los requerimientos mínimos de Hardware para llevar a cabo la instalación de la aplicación de servicio:

Hardware
  * Sistema Operativo  :	Android Jelly Bean o superior.
  * Espacio libre en SD:	5MB mínimo.

A continuación los siguientes pasos describen como copiar e instalar el archivo instalador de la aplicación móvil a su dispositivo móvil.

 1. Habilitar la opcion "Fuentes desconocidas"
En gran parte de los sistemas operativos iguales o superiores a Jelly Bean, la opción "Fuentes desconocidas" se encuentra
en: 
 Configuración/Seguridad/Fuentes desconocidas
Proceda a habilitar dicha opción para permitir la instalación de la aplicación.

 2. Conecte el dispositivo al ordenador y desde la carpeta Instaladores/movil/ copie el archivo "jarvis.apk" y pegue dicho
archivo en el directorio Downloads que se encuentra en su dispositivo movil.

 3. Ejecute el archivo "jarvis.apk" desde el dispositivo móvil, una ventana de confirmación será mostrada, en la cual debe seleccionar
el boton "Instalar"

 4. Una vez completada la instalación, podra verificar que la aplicación se encuentra en uno de los paneles de su dispositivo móvil, 
al ejecutar dicha aplicación una pantalla de autenticación sera mostrada en la cual debe ingresar información relacionada a la configuración
de la aplicación servicio.


        	                   =-=-=-=-=-=-=-=-=-=-=-=-=-=
                	           	Fin del contenido  
                        	  -=-=-=-=-=-=-=-=-=-=-=-=-=-  
