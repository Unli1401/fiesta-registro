const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// 👉 Reemplaza esta URI con tu propia URI de MongoDB Atlas
mongoose.connect('mongodb+srv://Admin:Unli.9308@clusterfiesta.gc04zcj.mongodb.net/?retryWrites=true&w=majority&appName=ClusterFiesta', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Error al conectar MongoDB:', err));

const InvitadoSchema = new mongoose.Schema({
  nombre: String,
  apellido: String,
  confirma: String,
  mensaje: String,
  fecha: { type: Date, default: Date.now }
});

const Invitado = mongoose.model('Invitado', InvitadoSchema);

app.post('/api/invitados', async (req, res) => {
  try {
    const nuevo = new Invitado(req.body);
    const guardado = await nuevo.save();
    res.status(201).json(guardado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al guardar' });
  }
});

app.get('/api/invitados', async (req, res) => {
  try {
    const invitados = await Invitado.find().sort({ fecha: -1 });
    res.json(invitados);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener datos' });
  }
});

app.listen(3000, () => {
  console.log('Servidor en puerto 3000');
});
