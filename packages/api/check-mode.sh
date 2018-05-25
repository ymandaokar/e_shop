#!/bin/sh
echo "
     check-mode.sh script checks whether debugging is ON or not, while initiating a container.
     It accepts two environment variables :
         a. DEBUG_MODE  (mandatory for debugging)
         b. DEBUG_FILE (optional file path for debugging)
     Example :   docker run -it -e DEBUG_MODE=debug -e DEBUG_FILE=app.js 'imagename/id' /bin/ash
     Example :   kubectl --namespace=app-survey port-forward baasdesigner-0 9229:9229"
APP_SCRIPT="./src/startup.js" 
if [ -z "$DEBUG_MODE" ]
then     
    echo "DEBUG_MODE is not defined, initiating without debugging.." 
    pm2 start $APP_SCRIPT  --no-daemon
else 
    echo 
    echo "---- 1. Environemt Variable DEBUG_MODE is Defined -----"
    echo "---- 2. Checking Environment Variable DEBUG_FILE is defined or not, 
          and also does the file exist at that path ?  ----"

        if [ ! -z "$DEBUG_FILE" ] && [ -f "$DEBUG_FILE" ] 
        then
                echo "---- 3. Environment Variable DEBUG_FILE is defined and also File Exist ----"
                echo
                pm2 start $DEBUG_FILE --node-args="--debug-brk --inspect" --no-daemon
        else
                echo "----- 3. DEBUG_FILE or File Path doesn't exist ----"
                echo "----- 4. Debugging the default entry point app.js ----"
                echo 
                    pm2 start $APP_SCRIPT --node-args=" --debug-brk --inspect" --no-daemon
        fi
fi