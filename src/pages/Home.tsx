import { useHistory } from 'react-router-dom';
import ilustracao from '../assets/images/illustration.svg';
import logo from '../assets/images/logo.svg';
import googleicon from '../assets/images/google-icon.svg';
import { Button } from '../components/Button';
import '../styles/auth.scss';

export function Home() {
    const history = useHistory();
    function navigateToNewRoom(){
        history.push('/rooms/new')
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
                    <form>
                        <input
                            type="text"
                            placeholder="Digite o código da sala"
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

