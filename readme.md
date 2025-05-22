# 📚 CMCP - Sistema de Gestión de Libros (Mono Repo)

Este proyecto es una aplicación completa de gestión de libros, que incluye backend en NestJS + Sequelize y frontend en React + Vite, con integración Dockerizada lista para desarrollo local o despliegue.

---

## 🧰 Tecnologías

* **Backend**: NestJS, Sequelize, PostgreSQL, JWT, Zod, Multer
* **Frontend**: React 19, Vite, TypeScript, Axios, React Hook Form, React Query, Zustand, Mantine UI
* **DevOps**: Docker + Docker Compose

---

## 📁 Estructura del Monorepo

```
cmcp-books/
├── docker-compose.yml
├── cmcp-server/         # Backend NestJS
├── cmcp-client/         # Frontend React
└── README.md
```

---

## 🚀 Instalación Rápida (Docker Compose)

1. **Clona el repositorio**

```bash
git clone https://github.com/anderjs/cmcp-books.git
cd cmcp-books
```

2. **Levanta los servicios**

```bash
docker-compose up --build
```

3. **Accede a la app**

* Frontend: [http://localhost:5173](http://localhost:5173)
* Backend: [http://localhost:3000](http://localhost:3000)
* Base de datos PostgreSQL: puerto 5432

4. **Credenciales por defecto**

```json
{
  "email": "admin@cmcp.com",
  "password": "admin1admin"
}
```

---

## 🖥️ Desarrollo Manual (sin Docker)

### Backend (NestJS)

```bash
cd cmcp-server
npm install
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
npm run start:dev
```

### Frontend (Vite + React)

```bash
cd cmcp-client
npm install
npm run dev
```

Crea el archivo `.env` en `cmcp-client`:

```
VITE_API_URL=http://localhost:3000
```

---

## 🔧 Railway Deployment (opcional)

* Cliente: [https://cmcp-client-production.up.railway.app](https://cmcp-client-production.up.railway.app)
* Servidor: [https://cmcp-server-production.up.railway.app](https://cmcp-server-production.up.railway.app)
* DB: [https://postgres-production-c6c4.up.railway.app](https://postgres-production-c6c4.up.railway.app)

---

## 🗂️ Frontend - Estructura de carpetas

```
cmcp-client/
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── hooks/          # Custom hooks (ej: useBooks, useAudit)
│   ├── pages/          # Páginas principales
│   ├── store/          # Zustand store
│   ├── schema/         # Validaciones con Zod
│   └── utils/          # Funciones y constantes
```

---

## ✅ Funcionalidades destacadas

* 📚 CRUD completo de libros con soft delete
* 👤 Gestión de autores, géneros y editoriales
* 🔍 Filtros y búsqueda avanzada
* 🧾 Auditoría completa por usuario y acción
* 📦 Exportación de logs a CSV
* 🔐 Login JWT seguro y persistente

---

## 💡 Contribución

Pull requests y sugerencias son bienvenidas. Para cambios mayores, por favor abre un issue primero para discutir lo que deseas modificar.

---

## 📝 Licencia

Este proyecto está bajo la Licencia MIT.
