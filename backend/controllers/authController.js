import fs from "fs";
import path from "path";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "..", "data");
const usersFile = path.join(dataDir, "users.json");
if (!fs.existsSync(usersFile)) fs.writeFileSync(usersFile, "[]");

const JWT_SECRET = "supersecret_local_only_change_me";

export const register = (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) return res.status(400).json({ error: "Missing fields" });
  const users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
  if (users.find(u => u.email === email)) return res.status(400).json({ error: "Email already registered" });
  const id = Date.now().toString();
  const hash = bcrypt.hashSync(password, 10);
  const user = { id, name, email, password: hash, createdAt: new Date().toISOString() };
  users.push(user);
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
  const token = jwt.sign({ id, email }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user: { id, name, email } });
};

export const login = (req, res) => {
  const { email, password } = req.body;
  const users = JSON.parse(fs.readFileSync(usersFile, "utf-8"));
  const user = users.find(u => u.email === email);
  if (!user) return res.status(400).json({ error: "User not found" });
  const ok = bcrypt.compareSync(password, user.password);
  if (!ok) return res.status(401).json({ error: "Invalid credentials" });
  const token = jwt.sign({ id: user.id, email }, JWT_SECRET, { expiresIn: "7d" });
  res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
};

export const me = (req, res) => {
  res.json({ status: "ok" });
};
