import { useState } from 'react';
import './FormularioCEP.scss';

function FormularioCEP() {
  const [cep, setCep] = useState('');
  const [adress, setAdress] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  const searchCep = async () => {
    setLoading(true);
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();
    
    if (data.erro && data.erro === true) {
      setError(true);
      setAdress(null);
    } else {
      setError(false);
      setAdress(data);
    }
    setTimeout(() => {
      setAdress(data);
      setLoading(false);
    }, 2000);
  }

  const clearAdress = () => {
    setAdress(null)
    setCep('')
  }

  return (
    <div className='form__wrapper'>
      <p>Consultar CEP</p>
      <form className='form__CepInput'>
        <input type="text" value={cep} onChange={(e) => setCep(e.target.value)} placeholder='Digite o CEP' />
        <button type="button" className='button__search' onClick={searchCep}>Buscar</button>
        <button type="button" className='button__clear' onClick={clearAdress}>Limpar</button>
      </form>
      {error && adress != null && <p className='error'>O CEP fornecido é inválido. Por favor, insira um CEP válido.</p>}
      {loading && adress != null &&  <p className='loading'>Buscando CEP...</p>}
      {loading === false && adress && (
        <form className='Form__CEP__Outputs'>
          <input type="text" value={adress.localidade || ''} placeholder='Cidade' />
          <input type="text" value={adress.logradouro || ''} placeholder='Logradouro' />
          <input type="text" value={adress.bairro || ''} placeholder='Bairro' />
          <input type="text" value={adress.uf || ''} placeholder='UF' />
          <input type="text" value={adress.localidade || ''} placeholder='Localidade' />
        </form>
      )}
    </div>
  )
}

export default FormularioCEP;
