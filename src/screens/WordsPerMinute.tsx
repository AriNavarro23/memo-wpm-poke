import { useEffect, useState } from "react";


const WORDS = [
    'programmer',
    'reactJS',
    'docker',
    'notebook',
    'visualSC',
    'develop',
    'useState',
    'useEffect',
    'component',
    'renderizar'
];

export default function WordsPerMinute() {
    //para ir guardando las palabras escritas
    const [characterCount, setCharacterCount] = useState(0);
    //para 
    const [buffer, setBuffer] = useState('');
    //que palabra necesito adivinar
    const [word, setWord] = useState(() => WORDS[(Math.random() * WORDS.length) | 0]);
    //para usarlo con el contador de tiempo
    const [time, setTime] = useState(0);
    //para guardar las palabras mal escritas
    const [wrongWords, setWrongWords] = useState<string[]>([]);
    //para saber si el juego comenzo y que no me alerte de que perdi 
    const [gameStarted, setGameStarted] = useState(false);



    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (buffer.toLocaleLowerCase() === word.toLocaleLowerCase()) {
            //para obtener una palabra random
            setWord(WORDS[(Math.random() * WORDS.length) | 0]);
            //para ir sumando las letras e ir contando
            setCharacterCount((characterCount) => characterCount + word.length);
        } else {
            setWrongWords([...wrongWords, buffer]); // Agregar la palabra mal escrita al array
        }
        //para limpiar
        setBuffer('');
    }


    //funcion para resetear el tiempo, el contador de letras y las palabras incorrectas
    function handlePlay() {

        setTime(60);
        setCharacterCount(0);
        setWrongWords([]);
        setGameStarted(true);
    }

    //useEffect para escuchar el setTime, crear un timeOut, reduce de a 1" y lo reinicia
    //para que me diga si perdi al no llegar a 200 y si es = a 0 el tiempo
    //si no se dan las condiciones gane
    useEffect(() => {
        if ( time != 0 && gameStarted) {
            const timeout = setTimeout(() => setTime(time - 1), 1000);
            return () => clearTimeout(timeout);
        } else if ( characterCount < 200 && time === 0 && gameStarted) {
            alert('¡Perdiste! No alcanzaste los 200 puntos en el tiempo límite.');

        } else if ( time === 0 && gameStarted) {
            alert('¡Ganaste!');
        }
    }, [ characterCount, time]);



    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'center' }}>
            {Boolean(time) && <h1 style={{ fontSize: 48 }}>{word}</h1>}
            <h2>Character typed: {characterCount}</h2>
            <h3>Remaining time: {time}</h3>
            {time ? (
                //le digo que me renderice el formulario con el input y el boton de submit
                <form onSubmit={handleSubmit}>
                    <input type="text"
                        autoFocus
                        value={buffer}
                        onChange={(e) => setBuffer(e.target.value)}
                    />
                    <button type="submit">Submit</button>
                </form>

            ) : (
                //sino dame el boton play y me da cuantas palabras equivocadas
                <button onClick={handlePlay}>Play</button>
            )}
            {wrongWords.length > 0 && (
                <div>
                    <h4>Wrong words:</h4>
                    <ul>
                        {wrongWords.map((word) => (
                            <li key={word}>{word}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
