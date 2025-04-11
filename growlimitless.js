// app.js
const express = require('express');
// const prisma = require('@prisma/client').PrismaClient;
const app = express();
const port = 8000;
const cors = require('cors');


const { PrismaClient } = require('@prisma/client');
const prismaClient = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
    global.prisma = prismaClient;
}


app.use(cors({
    origin: "*"
}))


// Initialize Prisma Client
// const prismaClient = new prisma();
// console.log('souvik')

// Middleware to parse JSON request body
app.use(express.json());
// console.log('souvik1')


// Default Route
app.get("/", (req, res) => {
    res.send("Hi Folks");
});

// Route to save user and business data
app.post("/register", async (req, res) => {
    try {
        const {
            name,
            designation,
            email,
            password,
            phone,
            accountName,
            accountNumber,
            ifscCode,
            gstNumber,
            companyAddress,
            companyType,
            international,
            terms
        } = req.body;
        // console.log('souvik2')

        const newUser = await prismaClient.user.create({
            data: {
                name,
                designation,
                email,
                password,
                phone,
                accountName,
                accountNumber,
                ifscCode,
                gstNumber,
                companyAddress,
                companyType,
                international,
                terms
            }
        });
        // console.log('souvik3')

        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ error: "Something went wrong." });
    }
});

// Start the Express server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});


// const { MongoClient } = require('mongodb');
// const uri = process.env.DATABASE_URL

// async function testConnection() {
//     const client = new MongoClient(uri);
//     try {
//         await client.connect();
//         console.log("✅ MongoDB Connected!");
//     } catch (err) {
//         console.error("❌ Connection failed:", err);
//     } finally {
//         await client.close();
//     }
// }

// testConnection();
