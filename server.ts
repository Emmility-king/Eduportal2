// server.ts
import express from "express";

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// In-memory users
const users = [
  { id: '1', username: 'student1', password: '000', email: 'student@demo.com', name: 'Student One', role: 'student' },
  { id: '2', username: 'parent1', password: 'demo123', email: 'parent@demo.com', name: 'Parent One', role: 'parent' },
  { id: '3', username: 'teacher1', password: 'demo123', email: 'teacher@demo.com', name: 'Teacher One', role: 'teacher' },
  { id: '4', username: 'admin1', password: 'demo123', email: 'admin@demo.com', name: 'Admin One', role: 'admin' },
  { id: '5', username: 'officer1', password: 'demo123', email: 'officer@demo.com', name: 'Admission Officer', role: 'admission_officer' }
];

// In-memory applications
const applications: any[] = [];

// Routes
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the EduPortal API!" });
});

app.get("/enrollments", (req, res) => {
  res.json([
    { id: 1, studentName: "John Doe", class: "9th Grade" },
    { id: 2, studentName: "Jane Smith", class: "10th Grade" },
  ]);
});

app.post("/enrollments", (req, res) => {
  const { studentName, class: className } = req.body;
  if (!studentName || !className) {
    return res.status(400).json({ error: "studentName and class are required" });
  }
  res.json({ message: `Enrollment created for ${studentName} in ${className}` });
});

app.post("/login", (req, res) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return res.status(400).json({ error: "Email, password, and role are required" });
  }
  const user = users.find(u => u.email === email && u.password === password && u.role === role);
  if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const { password: _, ...userData } = user;
  res.json({ user: userData });
});

app.post("/applications", (req, res) => {
  const application = req.body;
  if (!application.firstName || !application.lastName || !application.email || !application.grade) {
    return res.status(400).json({ error: "Missing required application fields" });
  }
  application.id = `APP${Date.now()}`;
  application.status = "submitted";
  application.submittedAt = new Date();
  applications.push(application);
  res.json({ message: "Application submitted successfully", applicationId: application.id });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
