import React, { useState } from 'react';
import './App.css';
import logo from './imagem.png';  

function App() {
  const [cep, setCep] = useState('');
  const [addressData, setAddressData] = useState(null);

  const searchAddress = async () => {
    try {
      const response = await fetch(`/api/address/${cep}`);
      const data = await response.json();
      setAddressData(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <div className="navbar">
        <img src={logo} alt="Logo" className="logo" />
        <h1>Consulta de Endereço</h1>
      </div>
      <div className="content">
        <label htmlFor="cepInput">CEP:</label>
        <input
          id="cepInput"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
          placeholder="Digite o CEP"
        />
        <button onClick={searchAddress}>Pesquisar</button>
      </div>
      {addressData && (
        <div className="result">
          <h2>Informações do Endereço</h2>
          <p>
            <strong>CEP:</strong> {addressData.cep}
          </p>
          <p>
            <strong>Logradouro:</strong> {addressData.logradouro}
          </p>
          <p>
            <strong>Bairro:</strong> {addressData.bairro}
          </p>
          <p>
            <strong>Localidade:</strong> {addressData.localidade}
          </p>
        </div>
      )}
      <div className="footer">
        <p>&copy; 2023 Consulta de Endereço</p>
      </div>
    </div>
  );
}

export default App;
