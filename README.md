# GiftSplit Demo - Proyecto Final React Native

Aplicación móvil desarrollada como proyecto final del curso.

## Descripción

GiftSplit Demo es una aplicación móvil temática de lista de regalos para eventos.
En la App completa el "AGASAJADO" puede registarse como tal, generar la "Whislist" y pasar un código de Evento a sus invitados para que puedan coordinar los regalos.
En la DEMO se simula un evento: El casamiento de Juan & Juana, donde los usuarios pueden registrarse como REGALADORES y reservar regalos disponibles.

---

## Funcionalidades

- Registro de usuario (rol fijo: regalador)
- Login con Firebase Authentication
- Navegación condicional según autenticación
- Visualización de lista de regalos
- Reserva de regalos
- Registro de quién reservó
- Registro de ubicación al momento de reservar
- Persistencia offline con SQLite
- Sincronización en tiempo real con Firebase
- Logout funcional

---

## Tecnologías utilizadas

- React Native (Expo)
- Redux Toolkit
- React Navigation
- Firebase Authentication
- Firebase Realtime Database
- Expo Location (interfaz de dispositivo)
- Expo SQLite (persistencia local)

---

## Arquitectura

- Manejo de estado global con Redux Toolkit
- Base de datos en la nube con Firebase Realtime Database
- Persistencia offline con SQLite
- Uso de permisos del dispositivo (ubicación)
- Lista optimizada con FlatList

---

## Estructura del proyecto

- screens/
- navigation/
- redux/
- database/
- firebase/

---

## Notas

Proyecto desarrollado con fines académicos para el curso de CODERHOUSE: Desarrollos de Aplicaciones.
Solo se permite registro con rol "regalador" ya que es una demo funcional.

---

Martinez Elio Flavio.

## 👨‍💻 Autor

Proyecto Final - Desarrollo Mobile
