DIGIPET API BLUEPRINT
CONFIDENTIAL, EYES ONLY
===

# Autenticación

## Header
Bearer: Authorization (token JWT)


# Login

## Request

Nota: El campo user puede ser nombre de usuario (admin), email (admin), email (petowner),
email (caregiver), carnet (caregiver). El back-end debe poder detectarlo automaticamente
--> POST /login/
{
    "user": "",
    "password": "" 
}

## En éxito:
<--
{
    "status": "ok",
    "token": "(token acá)"
}
Detalles de los contenidos del token por definir

## En fallo:
<--
{
    "status": "error",
    "message": "Usuario no encontrado"
}

# Registro

## Request

tipo = {student, client}
--> POST /signup/(tipo)/
{
    "username": ""
    ... todos los demás parámetros
}

## En éxito:
<--
{
    "status": "ok",
    "token": "(token acá)"
}

## En fallo:
<--
{
    "status": "error",
    "message": "Email ya existente"
}


# Todos los servicios del sistema
date usa el formato YYYY-MM-DD
--> GET /services/
{
    "start_date": "(date)"
    "finish_date": "(date)"
}

<-- 

# Todos los clientes de un sistema
--> GET /services/
{
    "start_date": "(date)"
    "finish_date": "(date)"
}