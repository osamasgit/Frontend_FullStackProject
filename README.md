# Frontend - ALMACEN ESCA FULLSTACK

Este es el frontend de una aplicación fullstack diseñada para facilitar la planificación de eventos como bodas, comuniones o cumpleaños. A través de una interfaz intuitiva, los usuarios pueden gestionar eventos, introducir parámetros y visualizar el cálculo automático de materiales necesarios.

## 📌 Propósito

Este frontend proporciona la interfaz visual de la plataforma de planificación de eventos, permitiendo a los administradores acceder al panel de control, crear y editar eventos, introducir parámetros como número de invitados y tipo de servicios, y visualizar automáticamente la lista de materiales requeridos para cada ocasión.

Está diseñado para ser intuitivo, eficiente y adaptable a distintos tipos de eventos — bodas, comuniones, cumpleaños, etc. Su propósito es agilizar la comunicación entre responsables de organización y personal logístico, eliminando cálculos manuales y reduciendo errores en la planificación.

## 🖥️ Tecnologías utilizadas

- **React** con **Vite** para desarrollo rápido y moderno
- **JavaScript** (ES6+)
- **CSS** para estilos personalizados
- **React Router** para navegación entre vistas
- **Axios** para comunicación con el backend
- **Express-session** para mantener la sesión del usuario

## ⚙️ Instalación

Sigue estos pasos para ejecutar el proyecto localmente:

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/osamasgit/Frontend_FullStackProject.git
   cd Frontend_FullStackProject
   ```
2. **Instala las dependencias:**
   ```bash
   npm install -E
   ```
3. **Iniciar servidor:**
  ```bash
  npm run dev
  ```
La aplicación se ejecutará por defecto en http://localhost:5173

## 🚀 Funcionalidades principales

🔐 Login de administrador para acceder al panel de gestión
📋 Creación y edición de eventos
📦 Visualización del cálculo de materiales
📊 Interfaz dinámica y responsiva

## 🧱 Arquitectura del proyecto
<pre><code>```text
├── public/             # Archivos estáticos
├── src/
│   ├── components/     # Componentes reutilizables (Navbar, Formulario, etc.
│   ├── pages/          # Vistas principales (Login, Dashboard, Eventos)
│   ├── App.jsx         # Componente raíz
│   ├── main.jsx        # Punto de entrada
├── index.html          # HTML base
├── package.json        # Dependencias y scripts
├── vite.config.js      # Configuración de Vite

## 🧪 Modo de uso
Ahora mismo se encuentran unos productos y materiales guardados, para usar de ejemplo, que accediendo al panel de administración se pueden editar, borrar y crear nuevos.

En la página de inicio se puede simular un evento, introduciendo primero el número de invitados, seleccionando las partes que componen el evento se abren ventanas para añadir los prodductos de cada parte mediante un buscador. Una vez añadidos todos los productos a la lista, clicamos en calcular materiales y se genera una lista de materiales que podemos visualizar en la propia página o descargar un pdf imprible para la comodidad de los empleados del almacén.

## 👨‍💻 Autor
Proyecto desarrollado por Oussama GitHub: @osamasgit
