# Plan de Implementación - SteamStorm

## 1. Objetivo
Este documento describe el plan de implementación del sistema **SteamStorm**, una aplicación que utiliza la API de Steam para mostrar rankings de videojuegos, reseñas de usuarios y recomendaciones personalizadas mediante un asistente inteligente.

---

## 2. Equipo y Roles
- **Líder/Coordinador**: Carlos Sepúlveda 
  - Gestiona plazos, organización y entregas.  
- **Analista de Requisitos**: Luis Cerda  
  - Documenta casos de uso y requisitos.  
- **Diseñador UML**: Braulio Palma  
  - Crea y mantiene los diagramas de clases y casos de uso.  
- **Planificador / Dev Lead**: Luis Cerda y Braulio Palma 
  - Asigna tareas y coordina el desarrollo.  
- **Presentador / QA**: Carlos Sepúlveda
  - Prepara las slides, la demo y asegura la calidad del sistema.  

---

## 3. Tecnologías
- **Lenguaje principal**: JavaScript (Node.js + Express)  
- **Frontend**: HTML, CSS, JavaScript  
- **API**: Steam Web API  
- **Gestión de dependencias**: npm  
- **Control de versiones**: Git + GitHub  
- **Diagramas UML**: PlantUML / Draw.io  
- **Documentación**: Markdown (.md)  

---

## 4. Mapeo Casos de Uso → Clases

| Caso de Uso               | Clases Principales Involucradas |
|---------------------------|----------------------------------|
| Registrar usuario          | Usuario                        |
| Iniciar sesión             | Usuario                        |
| Buscar videojuegos         | Juego, SteamAPI                |
| Comprar videojuegos        | Usuario, Carrito, Juego, Oferta|
| Dejar reseña               | Usuario, Reseña, Juego         |
| Ver perfil                 | Usuario                        |
| Gestionar lista de deseos  | Usuario, Juego                 |
| Recibir recomendaciones    | AsistenteIA, Usuario, Juego    |
| Reportar problema          | Usuario, Administrador         |
| Gestionar usuarios         | Administrador, Usuario         |
| Gestionar videojuegos      | Administrador, Juego           |
| Gestionar reseñas          | Administrador, Reseña          |
| Generar reportes           | Administrador, Ranking, Reseña |
| Configurar sistema         | Administrador                  |

---

## 5. Tareas de Implementación

### 5.1. Fase 1 - Preparación (Oct 2025)
- Crear repositorio en GitHub.  
- Definir roles del equipo y alcance.  
- Elaborar **requisitos iniciales** (requirements.md).  
- Crear **diagramas de casos de uso** (usecases.puml, .png).  

### 5.2. Fase 2 - Diseño (Oct 2025)
- Elaborar **diagrama de clases** (classes.puml, .png).  
- Definir estructura de base de datos (derivada de clases).  
- Establecer convenciones de codificación.  

### 5.3. Fase 3 - Implementación Inicial (Nov 2025)
- Implementar módulo de **usuarios** (registro, login).  
- Integración básica con la **API de Steam**.  
- Implementar **visualización de juegos y rankings**.  
- Subir **primer prototipo funcional**.  

### 5.4. Fase 4 - Funcionalidades Avanzadas (Nov 2025)
- Implementar **reseñas y puntuaciones**.  
- Implementar **carrito de compras simulado**.  
- Implementar **ofertas y descuentos**.  
- Implementar **asistente IA básico** para sugerencias.  

### 5.5. Fase 5 - Administración y QA (Nov 2025)
- Implementar panel de **administración** (usuarios, reseñas, juegos).  
- Generación de reportes.  
- Pruebas unitarias y de integración.  
- Documentar criterios de aceptación.  

### 5.6. Fase 6 - Presentación Final (Nov 2025)
- Preparar **slides de la presentación** (slides/presentation.pdf).  
- Ensayo de presentación en clase.  
- Entrega final del proyecto (26/11/2025).  

---

## 6. Cronograma (Fechas Reales)
- **8 oct 2025** → Confirmación de equipo y proyecto (README).  
- **15 oct 2025** → Documento de requisitos inicial (requirements.md).  
- **22 oct 2025** → Borrador diagrama de casos de uso.  
- **29 oct 2025** → Borrador diagrama de clases.  
- **5 nov 2025** → Mapping casos de uso → clases + plan de implementación.  
- **12 nov 2025** → Revisión por pares.  
- **19 nov 2025** → Versión final de diagramas y plan.  
- **25 nov 2025** → Subida de slides.  
- **26 nov 2025** → Presentación final.  

---

## 7. Criterios de Aceptación
- Los diagramas (clases y casos de uso) están completos y legibles.  
- Todos los requisitos funcionales principales (registro, reseñas, ranking) están implementados.  
- El sistema puede consultar juegos desde la API de Steam.  
- Existe documentación clara (README, requirements.md, implementation_plan.md).  
- La presentación explica el diseño y plan de implementación en máximo 12 minutos.  

---

## 8. Riesgos y Mitigaciones
- **API de Steam no disponible** → Preparar dataset local de respaldo.  
- **Falta de tiempo en el equipo** → Priorizar funciones críticas (registro, ranking, reseñas).  
- **Problemas de integración** → Pruebas incrementales y commits frecuentes.  

---

## 9. Próximos Pasos
- Completar diagramas UML.  
- Avanzar en implementación inicial.  
- Preparar presentación.  
- Documentar feedback recibido en revisión por pares.  

---


