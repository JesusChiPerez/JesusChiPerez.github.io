/*Start(): Se llama a la función Start().
StartUpdate(): Se llama a la función StartUpdate().
StartUpdateBajo(): Se llama a la función StartUpdateBajo().
setInterval(StartUpdate, 1000 / FPS): Establece un intervalo para llamar a la función StartUpdate() cada 1 segundo dividido por el número de frames por segundo (FPS).
setInterval(StartUpdateBajo, 1000 / 10): Establece un intervalo para llamar a la función StartUpdateBajo() cada 1 segundo dividido por 10. Esto probablemente se usa para actualizaciones menos frecuentes. */
Start()
StartUpdate()
StartUpdateBajo()
setInterval(StartUpdate, 1000 / FPS);
setInterval(StartUpdateBajo, 1000 / 10);