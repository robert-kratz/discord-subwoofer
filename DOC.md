# discord-speaker
This is the documentation for the speaker 

## Default request format
```bash
{
    ...
}
```

## Default response format
```bash
{
    "message": "if loop isn't a thing",
    "status": 200,
    "timestamp": "2020-12-15T00:28:56-01:00",
    "request":"r-l4n44fckkip3ypbf",
    "data": {
        ...
    }
}
```

## Default error response format
```bash
{
    "message": "if loop isn't a thing",
    "status": 401,
    "timestamp": "2020-12-15T00:28:56-01:00",
    "request":"r-l4n44fckkip3ypbf",
    "data": {
        "error": true,
        "type": "syntax error",
        "hint": "Arguments: gramma, intelegence",
        "info": {
            ...
        }
    }
}
```

# API Routing
These are routing endpoints from the rest api of the application

## Start the bot:
```bash
$ GET /api/start
```

## Stop the bot:
```bash
$ GET /api/stop
```

## Gives back the status of the bot:
```bash
$ GET /api/status
```

## Requesting new jwt Token with Access Token
```bash
$ POST /api/auth/authorize
```

## Requesting new jwt Token with Request Token
```bash
$ POST /api/auth/refresh
```
