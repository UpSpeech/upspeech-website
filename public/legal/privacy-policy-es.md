# Política de Privacidad

**Última Actualización:** 8 de abril de 2026

## Introducción

Bienvenido a UpSpeech ("nosotros" o "nuestro/a"). Estamos comprometidos con la protección de su privacidad y el tratamiento de su información personal con cuidado y transparencia. Esta Política de Privacidad explica cómo recopilamos, utilizamos, divulgamos y protegemos su información cuando utiliza nuestra plataforma de logopedia.

UpSpeech es una plataforma multi-tenant de software como servicio (SaaS) diseñada para logopedas y sus pacientes, centrada en la terapia de la tartamudez y la automatización de informes clínicos.

Al utilizar UpSpeech, acepta la recopilación y el uso de información de acuerdo con esta política. Si no está de acuerdo con nuestras políticas y prácticas, por favor no utilice nuestra plataforma.

## Información que Recopilamos

### 1. Información de la Cuenta

Cuando crea una cuenta, recopilamos:

- **Dirección de correo electrónico** - Utilizada para autenticación y comunicaciones de la cuenta
- **Contraseña** - Protegida con cifrado Argon2id (nunca almacenamos contraseñas en texto plano)
- **Nombre completo** (nombre y apellidos) - Utilizado para identificación y generación de informes
- **Rol del usuario** - Determina su nivel de acceso (propietario, administrador, logopeda, cliente/paciente, miembro)
- **Preferencia de idioma** - Para la presentación localizada de la interfaz (inglés, portugués, español)
- **Afiliación organizativa** - La organización/tenant a la que pertenece

### 2. Grabaciones de Audio y Vídeo

UpSpeech permite a los usuarios cargar grabaciones de habla para su análisis:

- **Ficheros de audio/vídeo** - Grabaciones de sesiones de habla, que pueden contener datos de voz y otra información identificable
- **Metadatos de la grabación** - Nombre original del fichero, tipo de fichero, tamaño, duración, fecha y hora de carga
- **Tipo de grabación** - Si la grabación es solo audio o vídeo y audio
- **Tipo de informe** - Clasificación como evaluación o grabación de sesión
- **Confirmación de consentimiento** - Confirmación de que ha obtenido el consentimiento necesario antes de cargar grabaciones
- **Hash del fichero** - Un hash criptográfico utilizado para detectar cargas duplicadas dentro de su organización

**Importante:** Las grabaciones de audio y vídeo pueden contener información sanitaria sensible. Almacenamos estos ficheros de forma segura en Google Cloud Storage con cifrado en reposo y en tránsito.

### 3. Transcripciones y Contenido Generado por IA

Utilizamos servicios de inteligencia artificial de terceros para procesar sus grabaciones de audio:

- **Transcripciones** - Transcripciones de texto generadas a partir de sus grabaciones de audio mediante reconocimiento de habla por IA (ElevenLabs Scribe v2)
- **Informes generados por IA** - Informes clínicos generados automáticamente mediante modelos de lenguaje de gran escala (Google Gemini)
- **Anotaciones de disfluencias** - Detección y clasificación automatizadas de disfluencias del habla (repeticiones, prolongaciones, bloqueos)
- **Datos de análisis del habla** - Análisis estadístico de patrones del habla y gravedad de la tartamudez

### 4. Informes Clínicos y Notas

Los logopedas crean y gestionan documentación clínica:

- **Contenido de los informes** - Observaciones clínicas, evaluaciones, recomendaciones de tratamiento (formateados en HTML, saneados por seguridad)
- **Metadatos de los informes** - Título, estado (borrador/listo), tipo de informe (evaluación, sesión, informe para seguro), fecha de creación
- **Notas de los informes** - Notas y observaciones clínicas adicionales
- **Selecciones de ejercicios** - Ejercicios de consulta asociados a los informes

### 5. Relaciones Logopeda-Paciente

Registramos relaciones profesionales dentro de la plataforma:

- **Asignaciones de logopedas** - Vínculos formales entre logopedas y sus pacientes
- **Estado de la asignación** - Si la relación está activa o inactiva
- **Códigos de invitación** - Códigos utilizados por los logopedas para invitar a pacientes a la plataforma
- **Asignaciones de ejercicios** - Minijuegos y ejercicios de consulta asignados por los logopedas a los pacientes
- **Estado de finalización** - Estado de finalización, clasificaciones de dificultad, grabaciones de los pacientes

### 6. Datos de Progreso y Análisis

Registramos el progreso de los usuarios y el uso de la plataforma:

- **Datos de finalización de ejercicios** - Qué ejercicios se completaron, cuándo, y grabaciones asociadas
- **Estadísticas de disfluencias** - Mediciones cuantitativas de comportamientos de tartamudez a lo largo del tiempo
- **Anotaciones de técnicas** - Uso de técnicas terapéuticas (tartamudeo voluntario, pull-outs, cancelaciones, etc.)
- **Métricas de progreso** - Resúmenes estadísticos de la evolución del paciente
- **Uso de la plataforma** - Horarios de inicio de sesión, uso de funcionalidades, duración de las sesiones

### 7. Comentarios y Comunicaciones

Los usuarios pueden proporcionar comentarios dentro de la plataforma:

- **Comentarios sobre informes** - Comentarios y valoraciones sobre informes generados
- **Comentarios generales** - Informes de errores, solicitudes de funcionalidades, comentarios sobre la experiencia de uso
- **Comunicaciones de soporte** - Correspondencia por correo electrónico con nuestro equipo de soporte
- **Notificaciones del sistema** - Actividad relacionada con su cuenta y pacientes asignados

### 8. Datos Técnicos y de Uso

Recopilamos automáticamente determinada información técnica:

- **Tokens de autenticación** - Tokens JWT almacenados en el localStorage de su navegador durante 24 horas
- **Información del navegador** - Tipo de navegador, versión y tipo de dispositivo (para compatibilidad y resolución de problemas)
- **Dirección IP** - Para monitorización de seguridad y análisis geográfico
- **Registros de acceso** - Marcas de tiempo y acciones realizadas dentro de la plataforma (para auditoría de seguridad)

### 9. Datos de la Organización/Tenant

Para cuentas organizativas (clínicas de logopedia, centros sanitarios):

- **Nombre e identificador de la organización**
- **Marca personalizada** - Logotipo, esquema de colores, URL del sitio web, información de contacto
- **Preferencias de idioma y zona horaria**
- **Configuraciones de feature flags** - Qué funcionalidades de la plataforma están activadas para su organización

## Cómo Utilizamos Su Información

Utilizamos la información que recopilamos para los siguientes fines:

### 1. Proporcionar y Mejorar los Servicios

- **Gestión de cuentas** - Crear y gestionar cuentas de usuarios, autenticar usuarios
- **Análisis del habla** - Procesar grabaciones de audio para generar transcripciones e informes clínicos
- **Flujos de trabajo clínicos** - Permitir a los logopedas crear informes, asignar ejercicios y realizar el seguimiento del progreso de los pacientes
- **Participación del paciente** - Permitir a los pacientes completar ejercicios, cargar grabaciones y ver su progreso
- **Funcionalidad de la plataforma** - Ofrecer funcionalidades esenciales incluyendo aislamiento multi-tenant, control de acceso basado en roles y actualizaciones en tiempo real

### 2. Procesamiento por IA y Generación de Informes

- **Transcripción** - Enviar sus grabaciones de audio a ElevenLabs para conversión de habla a texto
- **Automatización de informes** - Generar informes clínicos mediante modelos de lenguaje Google Gemini basándose en la transcripción y su contexto clínico
- **Detección de disfluencias** - Identificar y clasificar automáticamente comportamientos de tartamudez en las grabaciones
- **Información clínica** - Proporcionar análisis estadísticos y tendencias para apoyar la planificación del tratamiento

### 3. Comunicación

- **Notificaciones del servicio** - Enviar actualizaciones importantes sobre su cuenta, asignaciones o cambios en la plataforma
- **Invitaciones de logopedas** - Enviar códigos de invitación por correo electrónico a potenciales pacientes en nombre de los logopedas
- **Respuestas de soporte** - Responder a sus preguntas, comentarios y solicitudes de soporte
- **Comunicaciones administrativas** - Enviar información relacionada con la cuenta, alertas de seguridad o actualizaciones de políticas

### 4. Seguridad y Cumplimiento

- **Autenticación y autorización** - Verificar la identidad del usuario y aplicar permisos basados en roles
- **Prevención de fraude** - Detectar y prevenir accesos no autorizados, abusos o amenazas de seguridad
- **Aislamiento multi-tenant** - Garantizar la separación estricta de datos entre organizaciones
- **Registro de auditoría** - Mantener registros de accesos y modificaciones para cumplimiento de seguridad
- **Integridad de los datos** - Prevenir cargas duplicadas y garantizar la coherencia de los datos

### 5. Análisis y Mejora

- **Análisis de uso** - Comprender cómo los usuarios interactúan con la plataforma para mejorar la experiencia de uso
- **Desarrollo de funcionalidades** - Identificar qué funcionalidades son más valiosas y dónde concentrar los esfuerzos de desarrollo
- **Optimización del rendimiento** - Monitorizar el rendimiento del sistema e identificar cuellos de botella
- **Garantía de calidad** - Probar y mejorar la precisión de la transcripción por IA y la generación de informes

## Cómo Compartimos Su Información

No vendemos su información personal a terceros. Compartimos su información únicamente en las siguientes circunstancias limitadas:

### 1. Proveedores de Servicios Externos

Utilizamos servicios de terceros de confianza para operar nuestra plataforma:

- **ElevenLabs** - Proporciona transcripción de habla a texto mediante IA (Scribe v2). Las grabaciones de audio se envían a ElevenLabs para su procesamiento. Consulte la política de privacidad de ElevenLabs en [https://elevenlabs.io/privacy](https://elevenlabs.io/privacy)
- **Google AI (Gemini)** - Proporciona modelos de lenguaje de gran escala para generación de informes clínicos y funcionalidades asistidas por IA. Consulte la política de privacidad de Google en [https://policies.google.com/privacy](https://policies.google.com/privacy)
- **Google Cloud Platform** - Almacena ficheros de audio/vídeo y logotipos en Google Cloud Storage con cifrado. Consulte la política de privacidad de Google en [https://policies.google.com/privacy](https://policies.google.com/privacy)
- **Railway** - Aloja nuestra infraestructura de aplicaciones. Consulte la política de privacidad de Railway en [https://railway.app/legal/privacy](https://railway.app/legal/privacy)
- **PostHog** - Proporciona análisis de producto para comprender cómo los usuarios interactúan con nuestra plataforma. Los datos se procesan y almacenan en la Unión Europea. Consulte la política de privacidad de PostHog en [https://posthog.com/privacy](https://posthog.com/privacy)
- **Sentry** - Proporciona seguimiento de errores y monitorización de rendimiento para ayudarnos a identificar y corregir bugs. Recopila información técnica de errores (mensajes de error, stack traces, información del navegador/dispositivo) pero no datos personales. Consulte la política de privacidad de Sentry en [https://sentry.io/privacy/](https://sentry.io/privacy/)
- **Proveedores de servicios de correo electrónico** - Entregan correos electrónicos transaccionales (invitaciones, recuperación de contraseñas, notificaciones)

Estos proveedores están contractualmente obligados a proteger su información y a utilizarla únicamente para los fines que especificamos.

### 2. Dentro de Su Organización

En nuestro sistema multi-tenant:

- **Los logopedas** de su organización pueden ver todos los informes y datos de pacientes dentro de la organización (sujetos a los permisos de su rol)
- **Los administradores** de su organización pueden gestionar usuarios, ver análisis y acceder a datos de toda la organización
- **Los pacientes** solo pueden ver sus propios datos e informes
- **Los propietarios de la plataforma** (administradores de UpSpeech) tienen acceso entre tenants únicamente para fines de administración del sistema y soporte

### 3. Requisitos Legales

Podemos divulgar su información si así lo exige la ley o en respuesta a:

- **Órdenes judiciales o procesos legales** - Citaciones, mandamientos u otras solicitudes legales
- **Solicitudes de las fuerzas del orden** - Solicitudes válidas de autoridades gubernamentales
- **Protección legal** - Para proteger nuestros derechos, propiedad o seguridad, o los de nuestros usuarios o del público
- **Cumplimiento normativo** - Para cumplir requisitos normativos aplicables de sanidad, protección de datos u otros

### 4. Transferencias Empresariales

Si UpSpeech participa en una fusión, adquisición o venta de activos, su información puede ser transferida a la entidad adquirente. Le notificaremos por correo electrónico y/o aviso destacado en nuestra plataforma de cualquier cambio en la propiedad o el control.

### 5. Con Su Consentimiento

Podemos compartir su información para otros fines con su consentimiento explícito, tales como:

- Compartir datos de investigación anonimizados con instituciones académicas
- Participar en estudios de caso o testimonios (con su aprobación previa)
- Integrar con herramientas de terceros que autorice

## Almacenamiento de Datos y Seguridad

### Dónde Almacenamos Sus Datos

- **Base de datos** - Base de datos PostgreSQL alojada en Railway (servidores de la Unión Europea)
- **Almacenamiento de ficheros** - Google Cloud Storage (región de la Unión Europea)
- **Servidores de aplicaciones** - Infraestructura Railway (servidores de la Unión Europea)

### Medidas de Seguridad

Implementamos prácticas de seguridad estándar de la industria:

- **Cifrado en tránsito** - Todos los datos transmitidos entre su navegador y nuestros servidores utilizan cifrado TLS/SSL (HTTPS)
- **Cifrado en reposo** - Los ficheros de audio y las bases de datos están cifrados cuando se almacenan
- **Seguridad de contraseñas** - Las contraseñas se protegen con Argon2id, un algoritmo criptográfico seguro
- **Autenticación JWT** - Autenticación stateless basada en tokens con expiración de 24 horas
- **Control de acceso basado en roles** - Aplicación estricta de permisos de usuario según los roles
- **Aislamiento multi-tenant** - El aislamiento a nivel de filas de la base de datos garantiza que las organizaciones no accedan a los datos de otras
- **Saneamiento de entradas** - Todas las entradas de los usuarios se sanean para prevenir XSS, inyección SQL y otros ataques
- **Limitación de tasa** - Protección contra ataques de fuerza bruta en los endpoints de autenticación
- **Monitorización de seguridad** - Monitorización continua de actividades sospechosas y accesos no autorizados
- **Actualizaciones regulares** - Aplicación oportuna de correcciones y actualizaciones de seguridad

### Retención de Datos

- **Cuentas activas** - Retenemos sus datos mientras su cuenta esté activa
- **Cuentas inactivas** - Si su cuenta está inactiva durante 2 años, podemos eliminar sus datos previo aviso
- **Retención legal** - Podemos retener determinados datos durante más tiempo si lo exige la ley o para fines comerciales legítimos (p. ej.: prevención de fraude, litigios)
- **Solicitudes de eliminación** - Puede solicitar la eliminación de sus datos en cualquier momento (consulte la sección Sus Derechos)
- **Copias de seguridad** - Los datos eliminados pueden persistir en copias de seguridad hasta 90 días antes de su eliminación permanente

## Sus Derechos

En virtud del Reglamento General de Protección de Datos (RGPD), tiene los siguientes derechos respecto a su información personal:

### 1. Acceso y Portabilidad

- **Acceso** - Solicitar una copia de la información personal que tenemos sobre usted
- **Portabilidad de datos** - Recibir sus datos en un formato estructurado y legible por máquina (JSON)
- **Panel de la cuenta** - Ver y descargar sus informes, grabaciones e historial de ejercicios directamente en la plataforma

### 2. Rectificación y Actualización

- **Actualizaciones de perfil** - Actualizar su nombre, correo electrónico, contraseña y preferencia de idioma en los Ajustes de la Cuenta
- **Rectificación de datos** - Solicitar la corrección de información inexacta o incompleta
- **Edición de informes** - Los logopedas pueden editar informes en borrador antes de finalizarlos

### 3. Supresión y Limitación

- **Eliminación de la cuenta** - Solicitar la eliminación de su cuenta y datos asociados
- **Eliminación de grabaciones** - Eliminar grabaciones individuales de audio/vídeo (también las elimina de Google Cloud Storage)
- **Eliminación de informes** - Eliminar informes específicos (solo logopedas)
- **Limitación del tratamiento** - Solicitar que dejemos de tratar sus datos (con algunas excepciones por requisitos legales)

### 4. Oposición y Retirada

- **Oponerse al tratamiento** - Oponerse a determinados usos de sus datos (p. ej.: comunicaciones de marketing, aunque actualmente no enviamos correos electrónicos de marketing)
- **Retirar el consentimiento** - Retirar el consentimiento para el tratamiento cuando el consentimiento sea la base legal
- **Baja** - Darse de baja de correos electrónicos no esenciales utilizando el enlace de cancelación de suscripción

### 5. Reclamación

- **Autoridad de control** - Presentar una reclamación ante la Comissão Nacional de Proteção de Dados (CNPD) de Portugal o ante la autoridad de protección de datos de su país
- **Contáctenos** - Póngase en contacto con nosotros directamente con cuestiones de privacidad en help@upspeech.app

**Para ejercer estos derechos**, envíenos un correo electrónico a **help@upspeech.app** con su solicitud. Responderemos en un plazo de 30 días.

## Privacidad de Menores

UpSpeech no está destinado a menores de 13 años. No recopilamos intencionadamente información personal de menores de 13 años.

Los usuarios de entre 13 y 17 años pueden utilizar la plataforma únicamente con el consentimiento y la supervisión de un progenitor, tutor legal o logopeda colegiado. El adulto supervisor es responsable del uso de la plataforma por parte del menor, incluida la obtención de cualquier consentimiento necesario antes de cargar grabaciones de habla.

Los usuarios de 18 años o más son los únicos responsables de su propio uso de la plataforma y del contenido que cargan.

Si tenemos conocimiento de que hemos recopilado información personal de un menor de 13 años sin el debido consentimiento parental, tomaremos medidas para eliminar dicha información con prontitud.

## Transferencias Internacionales de Datos

UpSpeech tiene su sede en Portugal, en la Unión Europea. Nuestros servidores e infraestructura principal están ubicados en la Unión Europea. Algunos proveedores de servicios externos que utilizamos pueden tratar datos fuera de la UE.

Cuando los datos se transfieren fuera del Espacio Económico Europeo (EEE), garantizamos que existen salvaguardas adecuadas, tales como Cláusulas Contractuales Tipo o decisiones de adecuación aprobadas por la Comisión Europea.

Si accede a nuestra plataforma desde fuera de la UE, tenga en cuenta que su información se almacena y trata en la Unión Europea, que cuenta con normas estrictas de protección de datos en virtud del Reglamento General de Protección de Datos (RGPD).

## Base Legal para el Tratamiento (RGPD)

UpSpeech tiene su sede en Portugal y está sujeta al Reglamento General de Protección de Datos (RGPD). Tratamos sus datos personales sobre las siguientes bases legales:

- **Contrato** - Tratamiento necesario para prestar nuestros servicios en virtud de nuestros Términos de Servicio
- **Intereses legítimos** - Para prevención de fraude, seguridad, análisis y mejora del servicio
- **Consentimiento** - Para actividades de tratamiento específicas en las que solicitamos su consentimiento (p. ej.: carga de grabaciones)
- **Obligación legal** - Para cumplir leyes y normativas aplicables

Sus derechos en virtud del RGPD se describen en la sección "Sus Derechos" anterior.

### Contacto de Protección de Datos

Para consultas relacionadas con el RGPD, contáctenos en **help@upspeech.app**.

Nuestra autoridad de control es la Comissão Nacional de Proteção de Dados (CNPD), Portugal.

## Cookies y Tecnologías de Seguimiento

UpSpeech utiliza tecnologías de seguimiento mínimas:

### Almacenamiento Local

Almacenamos lo siguiente en el localStorage de su navegador:

- **Token de autenticación** - Token JWT para mantener su sesión (expira a las 24 horas)
- **Datos del perfil del usuario** - Copia en caché de su información de usuario para cargas de página más rápidas
- **Preferencia de idioma** - El idioma de interfaz seleccionado

### Cookies de Análisis

Utilizamos cookies de análisis (Google Analytics, Microsoft Clarity, PostHog) para comprender cómo los usuarios interactúan con nuestra plataforma. Estas cookies solo se establecen con su consentimiento explícito. No utilizamos cookies con fines publicitarios o de seguimiento, y no participamos en redes de publicidad comportamental. Para más detalles, consulte nuestra [Política de Cookies](/cookies).

### Ajustes del Navegador

Puede borrar el localStorage en cualquier momento a través de los ajustes de su navegador. Tenga en cuenta que borrar el localStorage cerrará su sesión en la plataforma.

Para más detalles, consulte nuestra [Política de Cookies](/cookies).

## Cambios en Esta Política de Privacidad

Podemos actualizar esta Política de Privacidad periódicamente para reflejar cambios en nuestras prácticas, tecnología, requisitos legales u otros factores. Le notificaremos de cualquier cambio material mediante:

- **Notificación por correo electrónico** - Enviando un correo electrónico a la dirección asociada a su cuenta
- **Aviso en la plataforma** - Mostrando un aviso destacado dentro de la plataforma
- **Fecha de Última Actualización** - Actualizando la fecha de "Última Actualización" en la parte superior de esta política

Su uso continuado de UpSpeech tras la fecha de entrada en vigor de los cambios constituye su aceptación de la Política de Privacidad actualizada. Si no está de acuerdo con los cambios, por favor deje de utilizar la plataforma.

## Contáctenos

Si tiene preguntas, inquietudes o solicitudes relativas a esta Política de Privacidad o a nuestras prácticas de datos, por favor contáctenos:

**Correo electrónico:** hello@upspeech.app
**LinkedIn:** [https://www.linkedin.com/company/upspeech/](https://www.linkedin.com/company/upspeech/)
**Plataforma:** Utilice el enlace "Soporte" en el pie de página de la plataforma para enviar una solicitud de soporte

Responderemos a su consulta en un plazo de 30 días.

---

**Gracias por confiar en UpSpeech con sus datos. Estamos comprometidos con la protección de su privacidad y con proporcionar una plataforma segura y eficaz para la logopedia.**
