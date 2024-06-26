const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Assuming you have a User model in models/User.js

const app = express();
app.use(express.json());

app.get("/", function (req, res) {
    res.send("Olá Mundo!");
    });
        app.listen(4000, function () {
        console.log("Server running at http://localhost:4000");
    });

mongoose.connect('mongodb://localhost:27017/your-database', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
    seedAdminUser(); // Seed admin user when the server starts
}).catch(err => console.log(err));

const PORT = process.env.PORT || 8080; // Setting port to 8080

app.use('/api/auth', require('./routes/auth'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Function to seed the admin user
async function seedAdminUser() {
    const adminUsername = 'admin';
    const adminPassword = 'admin';

    try {
        let user = await User.findOne({ username: adminUsername });
        if (!user) {
            const hashedPassword = await bcrypt.hash(adminPassword, 10);
            user = new User({
                username: adminUsername,
                password: hashedPassword,
                role: 'admin'
            });
            await user.save();
            console.log('Admin user created');
        } else {
            console.log('Admin user already exists');
        }
    } catch (err) {
        console.error('Error seeding admin user:', err.message);
    }
}
