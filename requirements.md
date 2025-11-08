# Requerimientos del Proyecto SteamStorm

## 1. Introducción
SteamStorm es una aplicación que permite a los usuarios explorar videojuegos obtenidos desde la **API de Steam**, visualizar rankings de los juegos mejor valorados, dejar reseñas, simular compras en un carrito, y recibir recomendaciones personalizadas a través de un asistente inteligente.  
El sistema también cuenta con funcionalidades de administración para gestionar usuarios, reseñas y juegos.

---

## 2. Requerimientos Funcionales

### 2.1. Gestión de Usuarios
- RF1: El sistema debe permitir el **registro de nuevos usuarios** mediante correo electrónico y contraseña.  
- RF2: El sistema debe permitir a los usuarios **iniciar sesión**.  
- RF3: El usuario debe poder **ver y editar su perfil**.  
- RF4: El usuario debe poder **gestionar su lista de deseos**.  

### 2.2. Gestión de Videojuegos
- RF5: El sistema debe obtener información de los juegos desde la **API de Steam**.  
- RF6: El sistema debe mostrar detalles de cada juego (nombre, género, precio, puntuación global).  
- RF7: El sistema debe permitir buscar videojuegos por nombre, género o popularidad.  

### 2.3. Reseñas y Puntuaciones
- RF8: El usuario debe poder **dejar una reseña** y asignar una puntuación a un juego.  
- RF9: El sistema debe **almacenar y mostrar reseñas** asociadas a cada juego.  

### 2.4. Ranking de Videojuegos
- RF10: El sistema debe **calcular un ranking global** de videojuegos basado en puntuaciones.  
- RF11: El sistema debe mostrar el **Top 10 de juegos más valorados**.  

### 2.5. Carrito de Compras (simulado)
- RF12: El usuario debe poder **agregar juegos al carrito de compras**.  
- RF13: El sistema debe calcular el **total de la compra**.  

### 2.6. Ofertas y Descuentos
- RF14: El sistema debe aplicar **descuentos** a ciertos juegos.  
- RF15: El sistema debe permitir **ver las ofertas vigentes** con sus fechas de inicio y fin.  

### 2.7. Asistente Inteligente
- RF16: El sistema debe **sugerir juegos** a los usuarios según sus preferencias.  
- RF17: El asistente debe **responder preguntas básicas** sobre los juegos y la plataforma.  
- RF18: El asistente debe permitir **analizar las preferencias** del usuario para mejorar recomendaciones.  

### 2.8. Administración
- RF19: El administrador debe poder **gestionar usuarios** (crear, editar, eliminar).  
- RF20: El administrador debe poder **gestionar videojuegos** (agregar, actualizar, eliminar).  
- RF21: El administrador debe poder **gestionar reseñas** (aprobar, eliminar reportadas).  
- RF22: El administrador debe poder **generar reportes** de actividad en la plataforma.  
- RF23: El administrador debe poder **configurar parámetros del sistema**.  

---

## 3. Requerimientos No Funcionales

### 3.1. Usabilidad
- RNF1: La interfaz debe ser **intuitiva y fácil de usar** para cualquier usuario.  
- RNF2: El sistema debe estar disponible en **idioma español**.  

### 3.2. Rendimiento
- RNF3: El sistema debe responder a consultas de videojuegos en un **tiempo menor a 2 segundos**.  
- RNF4: El sistema debe soportar al menos **100 usuarios concurrentes**.  

### 3.3. Seguridad
- RNF5: Las contraseñas deben almacenarse **encriptadas**.  
- RNF6: Solo usuarios autenticados pueden dejar reseñas o realizar compras simuladas.  
- RNF7: Las sesiones deben expirar después de **30 minutos de inactividad**.  

### 3.4. Compatibilidad
- RNF8: El sistema debe ser accesible desde un **navegador web** en PC.  
- RNF9: El sistema debe ser compatible con **Google Chrome y Mozilla Firefox**.  

### 3.5. Mantenibilidad
- RNF10: El código debe estar documentado con comentarios y seguir buenas prácticas.  
- RNF11: El sistema debe estar diseñado en **arquitectura modular** para facilitar su expansión.  

---

## 4. Restricciones
- El sistema depende de la disponibilidad de la **API de Steam** para obtener la información de los juegos.  
- El carrito de compras es una **simulación**: no se realizan transacciones reales.  
- El Asistente IA será una versión inicial basada en reglas, no un modelo avanzado de machine learning.  

---

## 5. Priorización
- **Alta prioridad:** Registro, inicio de sesión, ranking, reseñas, integración con Steam API.  
- **Media prioridad:** Carrito, ofertas, recomendaciones básicas.  
- **Baja prioridad:** Configuraciones avanzadas de administrador, reportes automáticos.  

---

## 6. Futuras Mejoras
- Implementación de **compra real** con medios de pago.  
- Versión **móvil** de la aplicación.  
- Asistente IA con **machine learning** para recomendaciones más precisas.  

---

