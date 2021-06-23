// import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
/* Links e Componentes*/

import { Link, useHistory } from 'react-router-dom';
import { Button } from '../components/Button';

/* Imagens */

import ilustracao from '../assets/images/illustration.svg';
import logo from '../assets/images/logo.svg';
import '../styles/auth.scss';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

export function Newroom() {
    const { user } = useAuth();

    // Criando Variavel
    const [newRoom, setNewRoom] = useState('');
    const history = useHistory();
    async function createRoom(event: FormEvent) {
        event.preventDefault();

        //Verificando se existe algum conteudo
        if (newRoom.trim() === '') {
            return;
        }
        //Criando a Referencia
        const roomRef = database.ref('rooms');
        // Jogando informações dentro de Rooms
        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
        })
        //Redirecionando
        history.push(`/rooms/${firebaseRoom.key}`);
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={ilustracao} alt="" />
                <strong>Crie salas de Q&amp;A ao vivo</strong>
                <p>Tire as dúvidas da sua audiencia em tempo real</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logo} alt="Letmeask" />
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={createRoom}>
                        <input
                            type="text"
                            placeholder="Nome da sala"
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type="submit">
                            Criar a sala
                        </Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}

