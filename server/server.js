const express = require('express');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// Configuration de l'environnement
dotenv.config();  // Cela charge les variables d'environnement du fichier .env
app.use(express.json());

const dataRoutes = require('./routes/formRoutes');
const messageRoute = require('./routes/MessageRoute');
const ResponceRoute = require('./routes/valueRoutes');
const RegisterRoute = require('./routes/RegisterRoute');
const LoginRoute = require('./routes/LoginRoute');
const GoogleRoute = require('./routes/AuthGoogle')

// Middleware CORS
if (process.env.NODE_ENV === 'local') {
    app.use(cors({
        origin: 'http://localhost:3000',
        credentials: true
    }));
} else {
    app.use(cors({
        credentials: true
    }));
}

// Connexion à la base de données
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log('Database connected successfully');
    } catch (error) {
        console.error('Database connection failed:', error.message);
    }
};
dbConnect();

// Routes de l'API
app.use('/', dataRoutes);
app.use('/', messageRoute);
app.use('/', ResponceRoute);
app.use('/', RegisterRoute);
app.use('/', LoginRoute);
app.use('/', GoogleRoute);

// Routes statiques (uniquement en production)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'client', 'dist')));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'dist', 'index.html'));
    });
}

// Configuration du port
const PORT = process.env.PORT || 3000;

// Démarrage du serveur
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
