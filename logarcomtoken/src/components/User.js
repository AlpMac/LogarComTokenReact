import React from 'react' ;
import { useState,useEffect } from 'react';
import axios from '../api/axios';

const Users =() => {

    const [users,setUsers] = useState();

            //Este é o hook useEffect que é executado após a renderização do componente. 
        //Ele recebe uma função de callback como primeiro argumento e um array de dependências como segundo argumento.
        //O array vazio [] indica que o efeito será executado apenas uma vez, após a montagem inicial do componente.
        useEffect(() => {
            /*
            Esta variável isMounted é usada para rastrear se o componente ainda está montado.
            Isso é importante para evitar a atualização do estado de um componente que foi desmontado
            */ 
            let isMounted = true;
            const controller = new AbortController();
            /*
            Define uma função assíncrona getUsers que será responsável por fazer a solicitação
            à API para obter os usuários
            */ 
            const getUsers = async () => {
                try {
                    /*
                    Faz uma solicitação GET para o endpoint /users usando a biblioteca Axios.
                    O sinal controller.signal é passado como parte das opções de solicitação,
                    o que permite cancelar a solicitação se necessário.
                    */
                    const response = await axios.get('/users', {signal: controller.signal});
                    console.log(response.data);
                    /*
                    Atualiza o estado do componente apenas se isMounted for verdadeiro,
                    garantindo que não ocorram atualizações de estado em um componente desmontado.
                    setUsers é uma função para atualizar o estado dos usuários
                    */
                    isMounted && setUsers(response.data);
                } catch (err) {
                    console.log(err);
                }
            };
        
            // Chama a função getUsers quando o componente monta
            getUsers();
        
            // Retorna uma função de limpeza para cancelar a solicitação
            return () => {
                isMounted = false;
                controller.abort();
            };
        }, []);

    return (
        <article>
            <h2>Lista de usuários</h2>
            {
            // verifica se users é definido e se tem um comprimento maior que zero.-->
            }
            {
             users?.length
             ? (
                <ul>
                    {
                    //Se a lista de usuários existir e tiver um comprimento maior que zero, ele mapeará cada usuário para um elemento <li> com a chave i.
                    }
                    {users.map((user,i) => <li key={i}>{user?.username}</li>)}
                </ul>
                
              ) : <p>Sem usuario para mostrar</p>
            }
        </article>

    );
      
};

export default Users;