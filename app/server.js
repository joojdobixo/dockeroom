const express = require('express');
const session = require('express-session');
const cors = require('cors');
const usuariosRoutes = require('./routes/usuarios');
const authRoutes = require('./routes/auth');
const salasRoutes = require('./routes/salas');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'segredo-lab',
    resave: false,
    saveUninitialized: false
  })
);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/auth', authRoutes);
app.use('/usuarios', usuariosRoutes);
app.use('/salas', salasRoutes);

app.listen(3000, () => {
  console.log('API rodando na porta 3000');
});