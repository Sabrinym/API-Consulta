const express = require('express');
const axios = require('axios');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

app.use(express.static(path.join(__dirname, 'build')));

app.get('/api/address/:cep', async (req, res) => {
  try {
    const response = await axios.get(`https://viacep.com.br/ws/${req.params.cep}/json/`);
    const { logradouro, bairro, localidade, cep, complemento } = response.data;

    const addressData = { logradouro, bairro, localidade, cep, complemento };

    // Convertendo logradouro para lowercase
    addressData.logradouro = addressData.logradouro.toLowerCase();

    res.json(addressData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
