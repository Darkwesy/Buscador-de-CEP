import './App.scss'
import FormularioCEP from './components/FormularioCEP/FormularioCEP';
import Navbar from './components/Navbar/NavBar';

function App() {
  return (
    <div className='container'>
      <div className="header">
        <Navbar/>
      </div>
      <div className="content">
        <FormularioCEP/>
      </div>
      <div className="footer">
        <p>Projeto desenvolvido por Thiago Vinicius</p>
      </div>
    </div>
  )
}

export default App
