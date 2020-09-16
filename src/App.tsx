import React from 'react';
import { MyForm } from "./MyForm";

const App: React.FC = () => {
    return (
        <div className="App">
            <div className='container'>
                <h1>Sign in</h1>
                <MyForm onSubmit={({ email, password }) => {

                }} />
            </div>
        </div>
    );
}

export default App;
