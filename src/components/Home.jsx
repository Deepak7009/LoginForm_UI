import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

function Home({ onLogout }) {
    const [nameInput, setNameInput] = useState('');
    const [namesArray, setNamesArray] = useState([]);
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const [dbData, setDbData] = useState([]);

    const baseUrl = 'http://localhost:5000';

    // const saveName = () => {
    //     if (nameInput.trim() !== '') {
    //         setNamesArray([...namesArray, nameInput.trim()]);
    //         setNameInput('');
    //         console.log('Names Array:', namesArray);
    //     } else {
    //         setError('Please enter a name before saving.');
    //     }
    // };

    const saveName = async () => {
        if (nameInput.trim() !== '') {
            try {
                const response = await axios.post(baseUrl, { name: nameInput.trim() });
                console.log('Response:', response.data);
                setNamesArray([...namesArray, nameInput.trim()]);
                setNameInput('');
            } catch (error) {
                console.error('Error saving data:', error);
            }
        } else {
            setError('Please enter a name before saving.');
        }
    };

    const drawNames = () => {
        if (namesArray.length >= 3) {
            const shuffledNames = [...namesArray].sort(() => Math.random() - 0.5);
            const drawnNames = shuffledNames.slice(0, 3).join(', ');
            setResult(drawnNames);
            setError('');
        } else {
            setError('Please enter at least 3 names before drawing.');
        }
    };

    const getDbData = async () => {
        try {
            const response = await axios.get(`${baseUrl}/user`);
            setDbData(response.data["User Data =>"]);
        } catch (error) {
            console.error('Error fetching dbData:', error);
        }
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3">
                    <label htmlFor="nameInput" className="form-label">
                        Enter Name:
                    </label>
                    <div className="input-group mb-3">
                        <input
                            type="text"
                            className="form-control"
                            id="nameInput"
                            placeholder="Type a name"
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                        />
                    </div>
                    <div className='buttons text-center'>
                        <button className="btn btn-primary" onClick={saveName}>
                            Save
                        </button>

                        <button className="btn btn-success" onClick={drawNames}>
                            Draw
                        </button>
                        <button className="btn btn-success" onClick={getDbData}>
                            Get dbData
                        </button>
                    </div>

                    <h5 className="mt-3">DB Data:</h5>
                    <ul>
                        {dbData.map((userData, index) => (
                            <li key={index}>{userData.name}</li>
                        ))}
                    </ul>

                    <h1 className="mt-3">{result}</h1>
                    {error && <p className="text-danger">{error}</p>}
                    <div className='text-center'>
                        <button className="btn btn-primary" onClick={onLogout}>
                            Logout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
