# discord-subwoofer
This is a oneside discord application. 
## Quicksetup
1) Install dependency

```bash
$ npm install
```

1) Create the `config.json` and `settings.json` file

2) The content of the config file should look like this:
```
{
    "token": "YOUR TOKEN GOES HERE",
    "secret":"YOUR SECRET GOES HERE",
    "access":"YOUR ACCESS TOKEN GOES HERE",
    "db":"YOUR DB PASSWORD GOES HERE",
}
```

3) The content of the settings file should look like this:
```
{
    "domain": "soundlink.io",
    "port": 8080
    "autostart": true
}
```

4) Setup database by editing the login credentials in `index.js`

5) Run setup
```bash
$ node .
```
