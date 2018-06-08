function echo(message, numEchos) {
    if(numEchos > 0) {
        for(var echo = 0; echo < Math.round(numEchos); echo++) {
            console.log(message);
        }      
    }
}

echo("Echo!!!", 4.6);
echo("message from echo.js", 8);
echo("this message shouldn't be shown", 0);