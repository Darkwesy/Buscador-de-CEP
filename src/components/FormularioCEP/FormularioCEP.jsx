import { useState } from 'react';
import './FormularioCEP.scss';
import { IoClose } from "react-icons/io5";


function FormularioCEP() {
  const [cep, setCep] = useState('');
  const [name, setName] = useState('');
  const [tel, setTel] = useState('');
  const [adress, setAdress] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

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
      openModal();
    }
    setTimeout(() => {
      setAdress(data);
      setLoading(false);
    }, 2000);
  }

  const clearAdress = () => {
    setAdress(null)
    setCep('')
    setName('')
    setTel('')
  }

  const openModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  return (
    <div className="wrapper">
      <div className='form__wrapper'>
        <form className='form__CepInput'>
          <div className="Inputs__Contatos">
            <label htmlFor="input__Nome">Nome</label>
            <input type="text" id='input__Nome' value={name} onChange={(e) => setName(e.target.value)} placeholder='Ex: Nome Sobrenome'/>
            <label htmlFor="input__Telefone">Telefone</label>
            <input type="text" id='input__Telefone' value={tel} onChange={(e) => setTel(e.target.value)} placeholder='EX: 99999999999'/>
            <label htmlFor="input__CEP">CEP</label>
            <input type="text" id='input__CEP' value={cep} onChange={(e) => setCep(e.target.value)} placeholder='EX: 00000000' />
          </div>
          <div className="inputs__Buttons">
            <button type="button" className='button__search' onClick={searchCep}>Buscar</button>
            <button type="button" className='button__clear' onClick={clearAdress}>Limpar</button>
          </div>
        </form>
      </div>

      {modalOpen && (
        <div className="modal__wrapper">
          <div className="modal__content">
            {error && adress != null && <p className='error'>O CEP fornecido é inválido. Por favor, insira um CEP válido.</p>}
            {loading && adress != null && <p className='loading'>Buscando CEP...</p>}
            {loading === false && adress && (
              <form className='Form__CEP__Outputs'>
                <input type="text" defaultValue={name || ''} placeholder='Nome' />
                <input type="text" defaultValue={tel|| ''} placeholder='Telefone' />
                <input type="text" defaultValue={adress.localidade || ''} placeholder='Cidade' />
                <input type="text" defaultValue={adress.logradouro || ''} placeholder='Logradouro' />
                <input type="text" defaultValue={adress.bairro || ''} placeholder='Bairro' />
                <input type="text" defaultValue={adress.uf || ''} placeholder='UF' />
                <input type="text" defaultValue={adress.localidade || ''} placeholder='Localidade' />
                <button type="button">Enviar para o Whatsapp</button>
              </form>
            )}
            <button onClick={closeModal} className='input__fechar'><IoClose /></button>
          </div>
        </div>
      )}
    </div>
  )
}

export default FormularioCEP;
