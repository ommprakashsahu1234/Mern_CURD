const express = require('express');
const cors = require('cors');
const User = require('./models/User');
const conn = require('./conn/conn');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const authenticateToken = require('./middleware/auth');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = 5000;


app.post('/register', async (req, res) => {
    const { name, username, email, mobno, password } = req.body;

    if (!name || !username || !email || !mobno || !password) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    try {
        const emailExists = await User.findOne({ email });
        if (emailExists) {
            return res.status(400).json({ error: 'Email already exists.' });
        }
        const usernameExists = await User.findOne({ username });
        if (usernameExists) {
            return res.status(400).json({ error: 'Username already exists.' });
        }
        const mobnoExists = await User.findOne({ mobno });
        if (mobnoExists) {
            return res.status(400).json({ error: 'Mobile number already exists.' });
        }
        const newUser = new User({
            name,
            username,
            email,
            mobno,
            password: password,
        });

        await newUser.save();

        res.status(201).json({ message: 'User registered successfully. Try Logging in. ' });
    } catch (err) {
        console.error('Error in registration:', err);
        res.status(500).json({ error: 'Internal server error. Please try again later.' });
    }
});

app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    try {
        const user = await User.findOne({ username, password });

        if (!user) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }
        const token = jwt.sign(
            { userId: user._id, username: user.username, name: user.name, mobno: user.mobno, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: 'Login successful',
            username: user.username,
            name: user.name,
            token
        });
    } catch (err) {
        console.error('Login error:', err);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
});

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Access denied. Token missing or invalid.' });
    }

    const token = authHeader.split(' ')[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(401).json({ error: 'Invalid token' });
    }
};

app.get('/home', verifyToken, (req, res) => {
    res.status(200).json({
        username: req.user.username,
        name: req.user.name,
        email: req.user.email,
        mobno: req.user.mobno
    });

});

app.put('/update', (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
  
    if (!token) return res.status(401).json({ message: 'No token provided' });
  
    jwt.verify(token, 'Omm', async (err, decoded) => {
      if (err) return res.status(403).json({ message: 'Invalid token' });
  
      const { email, mobno, password } = req.body;
  
      try {
        await User.findByIdAndUpdate(decoded.userId, { email, mobno, password });
        res.json({ message: 'User updated successfully' });
      } catch (err) {
        res.status(500).json({ message: 'Server error' });
      }
    });
  });
  
  app.delete('/delete-account', authenticateToken, async (req, res) => {
    try {
      const userId = req.user.userId;
      const deletedUser = await User.findByIdAndDelete(userId);
  
      if (!deletedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.json({ message: 'Account deleted successfully' });
    } catch (error) {
      console.error('Delete error:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  




app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
});
