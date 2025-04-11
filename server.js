const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const app = express();

app.use(express.json());

// cors
const cors = require("cors");
// access for all origins
app.use(cors({ origin: "*" }));

app.get("/", (req, res) => {
    res.send("Hi Everyone");
});

// Create User
app.post("/users", async (req, res) => {
    const { name, email } = req.body;
    const user = await prisma.user.create({ data: { name, email } });
    res.json(user);
});

// Read all users
app.get("/users", async (req, res) => {
    const users = await prisma.user.findaMany();
    res.json(users);
});

// Read single user
app.get("/users/:id", async (req, res) => {
    const user = await prisma.user.findUnique({ where: { id: req.params.id } });
    res.json(user);
});

// Update user
app.put("/users/:id", async (req, res) => {
    const { name, email } = req.body;
    const updated = await prisma.user.update({
        where: { id: req.params.id },
        data: { name, email },
    });
    res.json(updated);
});

// Delete user
app.delete("/users/:id", async (req, res) => {
    await prisma.user.delete({ where: { id: req.params.id } });
    res.json({ message: "User deleted" });
});



const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));