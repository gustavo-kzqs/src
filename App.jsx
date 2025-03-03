import { useState } from 'react';
import './App.css';
import InputMask from 'react-input-mask';


function App() {
    const [form, setForm] = useState({ altura: '', peso: '' });
    const [imc, setImc] = useState(null);
    const [classification, setClassification] = useState('');

    function handleChange(e) {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    }

    function handleSubmit(e) {
        e.preventDefault();
        
        const alturaNum = parseFloat(form.altura);
        const pesoNum = parseFloat(form.peso);
        
        if (!alturaNum || !pesoNum) {
            alert("Digite os valores corretamente");
            return;
        }

        const calculatedImc = pesoNum / (alturaNum * alturaNum);
        setImc(calculatedImc);
        determineClassification(calculatedImc);
    }

    function determineClassification(imc) {
        let classification = '';

        if (imc < 18.5) {
            classification = 'Abaixo do peso';
        } else if (imc >= 18.5 && imc < 24.9) {
            classification = 'Peso normal';
        } else if (imc >= 25 && imc < 29.9) {
            classification = 'Sobrepeso';
        } else {
            classification = 'Obesidade';
        }

        setClassification(classification);
    }

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form">
                    <div className="container-input-label">
                        <div className="children-container-input-label">
                            <label>Qual a sua altura (em metros)?</label>
                            <InputMask 
                                mask="9.99" 
                                onChange={handleChange} 
                                name='altura' 
                                placeholder='Digite sua altura' 
                                className='input-label' 
                            />
                            <label>Qual o seu peso (em kg)?</label>
                            <InputMask 
                                mask="999.99" 
                                onChange={handleChange} 
                                name='peso' 
                                className='peso' 
                                placeholder='Digite seu peso' 
                            />
                        </div>
                    </div>
                    <div className="button">
                        <button type="submit">Calcular IMC</button>
                    </div>
                </div>
            </form>

            {imc !== null && (
                <div className="result">
                    <h3>Seu IMC é: {imc.toFixed(2)}</h3>
                    <h4>Classificação: {classification}</h4>
                    <IMCTable />
                </div>
            )}
        </div>
    );
}

const IMCTable = () => {
    return (
        <table className="imc-table">
            <thead>
                <tr>
                    <th>Classificação</th>
                    <th>IMC</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Abaixo do peso</td>
                    <td>Menos de 18.5</td>
                </tr>
                <tr>
                    <td>Peso normal</td>
                    <td>18.5 - 24.9</td>
                </tr>
                <tr>
                    <td>Sobrepeso</td>
                    <td>25 - 29.9</td>
                </tr>
                <tr>
                    <td>Obesidade</td>
                    <td>30 ou mais</td>
                </tr>
            </tbody>
        </table>
        
        
    );
}

export default App;

