
		~~~~~~~~~~~~~~~~~ INSTALACION DEL SISTEMA DE NOTIFICACIONES EN TIEMPO REAL JARVIS ~~~~~~~~~~~~~~~~~

~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 Instalacion Servicio Web
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Para llevar a cabo la instalacion de la aplicacion servicio es necesario realizar la verificaci�n de los siguientes requerimientos:

  Requerimientos de Hardware y Software. 
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Los requerimientos m�nimos de Hardware para llevar a cabo la instalaci�n de la aplicaci�n de servicio:

Hardware
  * Sistema Operativo:		GNU/Linux Debian o Ubuntu.
  * Procesador:			Pentium 4 CPU 2.4GHz en adelante.
  * Memoria RAM:		512MB RAM en adelante.
  * Disco:			40GB en adelante.
  * Espacio libre en disco:	250MB m�nimo.

Software

  * Nodejs
  * MongoDB		

Otros
  * Conexion a Internet

Antes de comenzar con la instalaci�n verifique que cuenta con conexion a internet para instalar el software 
necesario desde los repositorios de su distribuci�n Debian o Ubuntu. A continuacion desde linea de comandos
ejecute el siguiente comando:

 sudo apt-get install nodejs
 sudo apt-get install -y mongodb-org

Si los repositorios de su distribuci�n no cuenta mongodb ejecute los siguientes comandos:

 sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CE10
 echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | sudo tee /etc/apt/sources.list.d/mongodb.list
 sudo apt-get update
 sudo apt-get install -y mongodb-org

Una vez que la instalaci�n de nodejs y mongodb han sido completadas, proceda a realizar la instalaci�n de la aplicaci�n 
servicio web, el instalador de dicha aplicaci�n se encuentra en la carpeta Instaladores/server, desde linea de comandos
dirijase a dicha carpeta y ejecute la siguiente instrucci�n:

 sudo dpkg -i jarvis-service_0.1.0_all.deb

Una vez que el proceso de instalaci�n es completado satisfactoriamente, podr� verificar que dentro del directorio /opt/jarvis, 
fueron copiados todos los archivos necesarios para iniciar la aplicaci�n servicio web. desde l�nea de comandos dirijase al
directorio /opt/jarvis y ejecute el siguiente comando:

 sudo node app.js

Una vez iniciada la aplicaci�n del servicio web ningun error debe ser mostrado, en caso de que la ejecuci�n de la aplicaci�n falle
verifique que se tengan instaladas las ultimas versiones de nodejs y mongodb.


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 Instalacion Aplicaci�n Sensor
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Para llevar a cabo la instalacion de la aplicacion sensor es necesario realizar la verificaci�n de los siguientes requerimientos:

  Requerimientos de Hardware y Software. 
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Hardware
  * Sistema Operativo:		GNU/Linux Debian o Ubuntu.
  * Procesador:			Pentium 4 CPU 2.4GHz en adelante.
  * Memoria RAM:		512MB RAM en adelante.
  * Disco:			40GB en adelante.
  * Espacio libre en disco:	100MB m�nimo.

Software

  * java

Otros
  * Conexion Internet

Antes de comenzar con la instalaci�n verifique si tiene instalada la aplicaci�n Java, dado que dicho
entorno es necesario para ejecutar la aplicaci�n sensor es muy importante que tenga instalada una versi�n
reciente de dicho entorno de programaci�n. A continuacion desde linea de comandos ejecute
los siguientes comandos:

 sudo apt-get install python-software-properties
 sudo add-apt-repository ppa:webupd8team/java
 sudo apt-get update

 sudo apt-get oracle-java8-installer

Una vez que la instalaci�n de java ha sido completada, proceda a realizar la instalaci�n de la aplicaci�n Sensor, 
el instalador de dicha aplicaci�n se encuentra en la carpeta Instaladores/sensor, desde linea de comandos
dirijase a dicha carpeta y ejecute la siguiente instrucci�n:

 sudo dpkg -i jarvissensor_0.1.1_amd64.deb

Una vez que el proceso de instalaci�n es completado satisfactoriamente, podr� verificar que dentro del directorio /opt/sensor, 
fueron copiados archivos necesarios para iniciar la aplicaci�n sensor. desde l�nea de comandos ejecute el siguiente comando:

 /usr/bin/sensor -i

Una ventana de configuraci�n sera mostrada en la cual es necesario que ingrese informaci�n relacionada a la configuraci�n de servicio.


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 Instalacion Aplicacion Web
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Para llevar a cabo la instalacion de la aplicacion servicio es necesario realizar la verificaci�n de los siguientes requerimientos:

  Requerimientos de Hardware y Software. 
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Los requerimientos m�nimos de Hardware para llevar a cabo la instalaci�n de la aplicaci�n de servicio:

Hardware
  * Sistema Operativo:		GNU/Linux Debian o Ubuntu.
  * Procesador:			Pentium 4 CPU 2.4GHz en adelante.
  * Memoria RAM:		512MB RAM en adelante.
  * Disco:			40GB en adelante.
  * Espacio libre en disco:	250MB m�nimo.

Software

  * Apache

Antes de comenzar con la instalaci�n verifique que cuenta con conexion a internet para instalar el software 
necesario desde los repositorios de su distribuci�n Debian o Ubuntu. A continuacion desde linea de comandos
ejecute el siguiente comando:

 sudo apt-get install apache2

Una vez que la instalaci�n de apache ha sido completada, proceda a realizar la instalaci�n de la aplicaci�n web, 
el instalador de dicha aplicaci�n se encuentra en la carpeta Instaladores/web, desde linea de comandos
dirijase a dicha carpeta y ejecute las siguientes instrucciones:

 sudo chmod +x install.sh
 sudo ./install.sh ruta_host

Donde ruta_host representa el directorio donde son almacenadas las p�ginas web en su servidor. Una vez completada 
la instalaci�n de la aplicaci�n web, podra verificar desde su navegador el correcto funcionamiento de la aplicaci�n
ingresando a la URL:

 http://localhost/jarvis/

Como resultado la p�gina de bienvenida de la aplicaci�n web es desplegada.


~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 Instalacion Aplicacion M�vil
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Para llevar a cabo la instalacion de la aplicacion m�vil es necesario realizar la verificaci�n de los siguientes requerimientos:

  Requerimientos de Hardware y Software. 
  ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
Los requerimientos m�nimos de Hardware para llevar a cabo la instalaci�n de la aplicaci�n de servicio:

Hardware
  * Sistema Operativo  :	Android Jelly Bean o superior.
  * Espacio libre en SD:	5MB m�nimo.

A continuaci�n los siguientes pasos describen como copiar e instalar el archivo instalador de la aplicaci�n m�vil a su dispositivo m�vil.

 1. Habilitar la opcion "Fuentes desconocidas"
En gran parte de los sistemas operativos iguales o superiores a Jelly Bean, la opci�n "Fuentes desconocidas" se encuentra
en: 
 Configuraci�n/Seguridad/Fuentes desconocidas
Proceda a habilitar dicha opci�n para permitir la instalaci�n de la aplicaci�n.

 2. Conecte el dispositivo al ordenador y desde la carpeta Instaladores/movil/ copie el archivo "jarvis.apk" y pegue dicho
archivo en el directorio Downloads que se encuentra en su dispositivo movil.

 3. Ejecute el archivo "jarvis.apk" desde el dispositivo m�vil, una ventana de confirmaci�n ser� mostrada, en la cual debe seleccionar
el boton "Instalar"

 4. Una vez completada la instalaci�n, podra verificar que la aplicaci�n se encuentra en uno de los paneles de su dispositivo m�vil, 
al ejecutar dicha aplicaci�n una pantalla de autenticaci�n sera mostrada en la cual debe ingresar informaci�n relacionada a la configuraci�n
de la aplicaci�n servicio.


        	                   =-=-=-=-=-=-=-=-=-=-=-=-=-=
                	           	Fin del contenido  
                        	  -=-=-=-=-=-=-=-=-=-=-=-=-=-  
