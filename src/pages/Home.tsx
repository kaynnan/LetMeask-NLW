import { useHistory } from 'react-router-dom';
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';
import ilustracao from '../assets/images/illustration.svg';
import logo from '../assets/images/logo.svg';
import googleicon from '../assets/images/google-icon.svg';
import '../styles/auth.scss';

export function Home() {
    const history = useHistory();
    const { user, signInWithGoogle } = useAuth();
    //Armazenando o código da Sala
    const [roomCode, setroomCode] = useState('');

    async function navigateToNewRoom() {
        if (!user) {
            await signInWithGoogle();
        }

        history.push('/rooms/new')

    }
    //Entrando na Room
    async function JoinRoom(event: FormEvent) {
        event.preventDefault();
        if (roomCode.trim() === '') {
            return;
        }
        // Passando a referencia
        const roomRef = await database.ref(`rooms/${roomCode}`).get();

        if (!roomRef.exists()) {
            alert('A sala não existe');
            return;
        }

        history.push(`rooms/${roomCode}`);
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
                    <button onClick={navigateToNewRoom} className="create-room">
                        <img src={googleicon} alt="GoogleIcon" />
                        Crie sua sala com o Google
                    </button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={JoinRoom}>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
                            onChange={event => setroomCode(event.target.value)}
                            value={roomCode}
                        />
                        <Button type="submit">
                            Entrar na sala
                        </Button>
                    </form>
                </div>
            </main>
        </div>
    )
}

