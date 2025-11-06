import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { NotificationScheduler } from "./utils/notificationScheduler";

// Initialize notification scheduler
NotificationScheduler.initialize();

createRoot(document.getElementById("root")!).render(<App />);
