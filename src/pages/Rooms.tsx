import { Button } from '../components/Button';
import { Roomcode } from '../components/Roomcode';
import { useParams } from 'react-router-dom';


import { FormEvent, useEffect, useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

import logoImg from '../assets/images/logo.svg';

import '../styles/room.scss';

type FirebaseQuestions = Record<string, {
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}>

type RoomParams = {
    id: string;
}

type Question = {
    id: string;
    author: {
        name: string;
        avatar: string;
    }
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
}

export function Rooms() {

    const { user } = useAuth();

    const params = useParams<RoomParams>();

    const [newQuestion, setnewQuestion] = useState('');

    const [questions, setQuestions] = useState<Question[]>([]);

    const [title, setTitle] = useState('');

    const roomId = params.id;

    //Consumindo as perguntas
    useEffect(() => {
        const RoomRef = database.ref(`rooms/${roomId}`);
        // Buscando os dados das perguntas
        RoomRef.on('value', rooms => { //Once para somente retornar uma vez ou On para varias
            //Firebase questions
            const databaseRoom = rooms.val()
            const roomQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
            //Criando um novo vetor ao invés de vir como Object
            const parsedQuestions = Object.entries(roomQuestions).map(([key, value]) => {
                return {
                    id: key,
                    content: value.content,
                    author: value.author,
                    isHighlighted: value.isHighlighted,
                    isAnswered: value.isAnswered,
                }
            })
            setTitle(databaseRoom.title);
            setQuestions(parsedQuestions);
        })
    }, [roomId]);

    async function SendQuestion(event: FormEvent) {

        event.preventDefault();

        if (newQuestion.trim() === '') {
            return;
        }
        if (!user) {
            throw new Error('You must be logged in');
        }
        //Informações da pergunta
        const question = {
            content: newQuestion,
            author: {
                name: user.name,
                avatar: user.avatar
            },
            isHighlighted: false,
            isAnswers: false
        };
        //Guardando a pergunta
        await database.ref(`rooms/${roomId}/questions`).push(question);
        //Ao enviar deixar a caixa de pergunta como vazia
        setnewQuestion('');
    }

    return (
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <Roomcode code={roomId} />
                </div>
            </header>
            <main>
                <div className="room-title">
                    <h1>Sala {title}</h1>
                    {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
                </div>
                <form onSubmit={SendQuestion}>
                    <textarea
                        placeholder="O que deseja perguntar?"
                        onChange={event => setnewQuestion(event.target.value)}
                        value={newQuestion}
                    ></textarea>
                    <div className="form-footer">
                        {user ? (
                            <div className="userInfo">
                                <img src={user.avatar} alt={user.name} />
                                <span>{user.name}</span>
                            </div>
                        ) : (
                            <span>Para enviar uma pergunta, <button>faça seu login</button></span>
                        )}
                        <Button type="submit" disabled={!user}>Enviar pergunta</Button>
                    </div>
                </form>
                {JSON.stringify(questions)}
            </main>
        </div>
    )
}