#!/bin/bash
cat << 'EOF'
                       .-`
                     -hMMs
                    hMMMo`
                    yMMMd-     ..
                     .yMMo   -yNNs
                       ``  -yNMMh- .ymd+`
                          yNMMh:`  :NMMMm+`
                          yhh:`     .sMMMMm.
                                    -hMMMMm.      ````
                                   -NMMMNs.      -::::----...`
                                   .hdho.        ---:::::::::::--.``
                                     `              ``````..--::::::-.`
                          ``      `..........                 ``.--::::-.`
                        `-::-`    `:::::::::-`                     `.-::::-`
                      .-::::.      .::::::::                          `.::::-.
                    .-:::-``       .::::::::                            `.-:::-.
                  `-:::-.          .::::::::                               .-:::-`
                 .::::.            .::::::::                                 .::::.
                -:::-`             .::::::::                                  `-:::.
               -:::-               .::::::::...........................`        -:::-
              -:::.                .::::::::::::::::::::::::::::::::::::`        .:::-
             -:::.                 .::::::::/++++++++++++++++++++++:::.`          .:::-
            .:::-                  .::::::::/++++////+++++////+++++:::.            -:::.
           `:::-                   .::::::::/+++/:::::+++::::::::--:::.             ::::
           .:::.                   .::::::::-----:::::`` -:::::`  `:::.             .:::.
           :::-                    .::::::::.    `..`     `..`  `.-:::-.```.....`    -:::
          `:::.                    .::::::::.       ````....----:::::::::::::::::-   .:::`
          .:::.                  `.::::::::::---::::::::::::::::::::/::::::-..-:::   .:::.
          .:::`    `...------:::::::::::::::::::::----....```-::::/++++:::::  .:::   `:::.
          .:::    -::::::::::::-::::::++++:::::`           ``:::::/+++/:::::  .:::    :::.
          .:::`   :::-..````    -::::/++++::::::-........--:::::::::::::::::---:::   `:::.
          `:::.   -:::..``````..:::::::/::::::::::::::::::::--+/::::::::://:::::::   .:::`
          `:::-   .:::::::::::::::/:::::::::///``....-...``   ./++//////++-``-:::.   -:::`
           -:::.``.::::-------..``/++//////++:`                 .::////:.`  `::::.``.:::-
           `:::::::::::-           .-/////:-`                               -:::::::::::`
            `.......-:::-` `````....-------------....````````            ``.:::-.......`
                     .::::-::::::::::::::::::::::::::::::::::------------:::::.
                      `-:::----...`````````````````....---------::::::-------.
                        ```` `````....------------....``````````````````````
                          ---:::::::::::::::::::::::::::::::::--------::::::`
                         `::::---.......````````........----::::::::::::----`
                          ```
            ````````````````  ````   ``````   ````````     ``````    ```````  ```````````
            .::::::::::..:::  .::: `-:::::::. .:::::::-. `-:::::::` .:::::::-`:::::::::::`
            -::::::::::-.:::  .::: -:::/:::::`.::::::::: -:::/::::: :::::/:::./::::::::::`
                -:::    .:::  .::: -::- `://: .:::``:::: -::-  -:::`:::- `:::.   .:::`
                .:::    .:::  .::: -::-.:::::`.::::::::: -::-  -:::`::::--:::.   .:::`
                .:::    .:::` -::: -:::.-::::`.:::::/:::.-::-  -:::`:::::::::.   .:::`
                .:::    -::::::::/ :::::::::: .:::--::::.:::::::::: ::::-::::.   .:::`
                -///     :///////.  ://////:` -////////:  ://////:` ///-  ///-   .///`
                           ````       ````                  ````
EOF

# Make sure previews work when tugboat_url is set to subpath
if [ "$TUGBOAT_URL" == "http://$TUGBOAT_DOMAIN/$TUGBOAT_TAG-$TUGBOAT_TOKEN" ] || [ "$TUGBOAT_URL" == "https://$TUGBOAT_DOMAIN/$TUGBOAT_TAG-$TUGBOAT_TOKEN" ]; then
    set +x
    if [[ $TUGBOAT_IMAGE == apache* ]]; then
        rm /var/www/html
        mkdir /var/www/html
        ln -s `readlink -e ../docroot` /var/www/html/$TUGBOAT_TAG-$TUGBOAT_TOKEN
    fi
    if [[ $TUGBOAT_IMAGE == nginx* ]]; then
        rm /usr/share/nginx/html
        mkdir /usr/share/nginx/html
        ln -s `readlink -e ../docroot` /usr/share/nginx/html/$TUGBOAT_TAG-$TUGBOAT_TOKEN
    fi
fi
