# 🚪 Door-to-Door Doors

> A modern, responsive web application for browsing, searching, and managing door inventory. Built with React 18, React Router v6, custom data-fetching hooks, and fully covered with Vitest and React Testing Library.

---

## ✨ Features

- **Inventory Dashboard:** Browse doors with dynamic grid layouts, flexible pricing cards, and instant filtering.
- **Client-Side Search:** Real-time search filtering across door materials and manufacturers with automatic input focus via `useRef`.
- **Full CRUD Operations:**
  - **Read (GET):** Fetch inventory on load using `useDoors`.
  - **Create (POST):** Add new doors through the Admin Portal form using `useAddDoor`.
  - **Update (PATCH):** Edit door dimensions, material, or pricing in place using `usePatchDoor`.
  - **Delete (DELETE):** Remove items with a confirmation dialog and optimistic local state removal via `useDeleteDoor`.
- **Client-Side Routing:** Deep linking and nested route context (`/store`, `/store/:id/edit`, `/admin`, `*` 404 handler) built with React Router v6 `<Outlet/>`.
- **Custom React Hooks:** Encapsulated API side-effects, loading indicators, error tracking, and local state management.
- **Responsive Styling:** Polished, CSS Grid & Flexbox layout with synchronized button alignments and hover feedback.
- **Expansive Test Coverage:** Comprehensive unit and component testing powered by Vitest and React Testing Library.

---

## 🛠️ Tech Stack

* **Frontend:** React 18, JSX
* **Routing:** React Router v6 (`BrowserRouter`, `Routes`, `Route`, `Outlet`, `useOutletContext`, `useParams`, `useNavigate`)
* **Styling:** CSS3 (CSS Grid, Flexbox, Custom Variables)
* **Backend Mock:** JSON Server / RESTful API (`http://localhost:4000/doors`)
* **Testing:** Vitest, React Testing Library, JSDOM, `@vitest/coverage-v8`
* **Build Tool:** Vite

---

## 📁 Project Structure

```text
src/
├── components/
│   ├── NavBar.jsx        # Top navigation with NavLink active styling
│   ├── Search.jsx        # Controlled search bar with auto-focus ref
├── hooks/
│   ├── useAddDoor.js     # Custom hook for POST requests
│   ├── useDeleteDoor.js  # Custom hook for DELETE requests
│   ├── useDoors.js       # Primary hook for GET requests and local state updaters
│   └── usePatchDoor.js   # Custom hook for PATCH updates
├── pages/
│   ├── AdminPortal.jsx   # Layout wrapper for admin route
│   ├── DoorCard.jsx      # Individual item card with Edit & Delete controls
│   ├── DoorContainer.jsx # Parent container holding inventory & outlet context
│   ├── DoorEditForm.jsx  # Form for updating existing door details
│   ├── DoorForm.jsx      # Form for creating new doors
│   ├── DoorList.jsx      # Grid view of inventory cards
│   ├── ErrorPage.jsx     # 404 fallback page
│   └── Home.jsx          # Landing page
├── App.css               # Global application styles & layout rules
├── App.jsx               # Route definitions
├── main.jsx              # Application entry point
└── setupTests.js         # Vitest setup & DOM cleanup
```

---

## 🚀 Getting Started

### Prerequisites

* **Node.js** (v18 or higher)
* **npm**

### Installation

1. Clone the repository:
   git clone https://github.com/your-username/door-to-door-doors.git
   cd door-to-door-doors

2. Install dependencies:
   npm install

3. Start the mock backend API (`json-server`):
   npx json-server --watch db.json --port 4000

4. Start the Vite development server in a new terminal window:
   npm run dev

5. Open http://localhost:5173 in your browser.

---

## 🧪 Running Tests & Coverage

This project uses **Vitest** and **React Testing Library** for component and hook unit testing.

* Run the test suite in watch mode:
  npm test

* Generate a full line-by-line coverage report:
  npm run coverage

The coverage utility generates an interactive HTML report in the `/coverage` directory, which can be viewed directly in your browser.

---

## 🌐 API Routes

The backend API expects the following endpoints at http://localhost:4000:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| GET | /doors | Fetch all doors |
| POST | /doors | Create a new door |
| PATCH | /doors/:id | Update specific door fields |
| DELETE | /doors/:id | Remove a door by ID |

---

## 📄 License

This project is open-source and available under the MIT License.