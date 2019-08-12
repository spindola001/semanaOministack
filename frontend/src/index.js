import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';


//assim que o react startar ele vai inserir o elemento que estiver como parametro da função render dentro da div com o id root
//executado uma unica vez pra definir o primeiro componente da aplicação
ReactDOM.render(<App />, document.getElementById('root'));


