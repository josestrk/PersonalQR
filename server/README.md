#Add to server

#Create service

```
description "service to up node server.js"
author "personalqr developers"

env LOG_FILE=/var/www/vhosts/makeonweb.com/personalqr.makeonweb.com/log/server.log
env APP_DIR=/var/www/vhosts/makeonweb.com/personalqr.makeonweb.com/server/
env APP=app.js
env PID_NAME=personalqr.pid
env USER=www-data
env GROUP=www-data
env POST_START_MESSAGE_TO_LOG="Service node start."
env NODE_BIN=/usr/local/bin/node
env PID_PATH=/var/opt/node/run
env SERVER_ENV="production"

#start to load system
start on runlevel [2345]
#stop daemon if system off
stop on runlevel [016]

#autostart if daemon´s down:
respawn
#"respawn" 99 events try, timeout to 5s try up daemon infinity.
respawn limit 99 5

pre-start script
mkdir -p $PID_PATH
mkdir -p /var/log/node
end script

script
#set NODE_ENV for new app run under production, development, test mode.
export NODE_ENV=$SERVER_ENV

#Start daemon:
#user & group: www-data (--chuid)
#pid asigned (--make-pidfile y --pidfile)
#run directory go to app directory node (--chdir)
#execute app (--exec)
#send output and app log to log_file (>> $LOG_FILE 2>&1)

exec start-stop-daemon --start --chuid $USER:$GROUP --make-pidfile --pidfile $PID_PATH/$PID_NAME --chdir $APP_DIR --exec $NODE_BIN -- $APP >> $LOG_FILE 2>&1

end script

post-start script
echo $POST_START_MESSAGE_TO_LOG >> $LOG_FILE
end script
```
#Uso:
Por cada aplicación en nodejs que quieras montar tenes que crear un archivo en /etc/init/. El nombre del archivo tiene que terminar en .conf. por ejemplo miapp-service.conf. Una cosa importante es que el servicio que estas creando se llama como el archivo (sin el .conf), por lo que en nuestro ejemplo se va a llamar miapp-service.

Dentro de **/etc/init/miapp-service.conf** pegas el script y personalizas todo lo que haya hasta la linea divisoria.

Un par de aclaraciones:

- *env APP=app.js* define el nombre del “index” de tu aplicación, y por lo general se usan o *app.js* o *server.js.* Pon el nombre de tu app sin el path hasta ella. Si tu aplicación lleva parámetros podes encerrar en comillas dobles algo asi como *“env APP=app.js –extrasettings ../settrings.json”*
- *env APP_DIR=/var/node/miapp* el path hasta tu aplicación
- env PID_NAME=miapp.pid pon el nombre que quieras, pero que sea único. por ejemplo, si tu app es una pagina web pon el nombre de tu pagina “mipaginaweb_com.pid” o algo así.
- *env USER=www-data y env GROUP=www-data* no sería muy responsable usar **root** para ejecutar tu aplicación salvo que esta si que necesite estar en root, pero en el caso de que sea una pagina web, usa el usuario y grupo www-data así podes unificar criterios. Es solo una sugerencia, yo para mi app uso www-data aunque podes usar el grupo y usuario que te parezca mejor.

*POST_START_MESSAGE_TO_LOG* es solo un mensaje que se envía al log de la app cuando esta arranca.
*NODE_BIN* indica donde esta ubicado node, por lo general está en /usr/local/bin/node aunque si no estuviera allí podes cambiar este parámetro.
*env SERVER_ENV=”production”* Posiblemente tu aplicación web utilice entornos de *“development“, “test” y “production“*.

Save and finish. You've created daemon, you can use to:
- start server
- stop server
- restart server
- status server

--------------

#Open PORT for Node.js in servers Apache
*My server is Centos 7, this guide is in this platform, in others platforms is probably changed*

>
>
>

