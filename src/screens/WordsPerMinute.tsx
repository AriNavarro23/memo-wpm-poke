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
    const [ characterCount, setCharacterCount ] = useState(0);
    //para 
    const [ buffer, setBuffer ] = useState('');
    //que palabra necesito adivinar
    const [ word, setWord ] = useState(() => WORDS[(Math.random() * WordsPerMinute.length) | 0 ]);
    //para usarlo con el contador de tiempo
    const [ time, setTime ] = useState(0);


    function handleSubmit(event: React.FormEvent<HTMLFormElement>){
            event.preventDefault();
    

            if (buffer === word){
                //para obtener una palabra random
                setWord(WORDS[(Math.random() * WORDS.length) | 0]);
                //para ir sumando las letras e ir contando
                setCharacterCount((characterCount) => characterCount + word.length);
            }
            //para limpiar
        setBuffer('');
    }
        //useEffect para escuchar el setTime, crear un timeOut, reduce de a 1" y lo reinicia
        //para que siga restando de a uno
        useEffect(() => {
            if ( time != 0 ) {
                const timeout = setTimeout(() => setTime( time -1 ), 1000);

                return () => clearTimeout(timeout);
            }
        }, [ time ]);

        //funcion para resetear el tiempo y el contador de letras
        function handlePlay () {
            setTime(60);
            setCharacterCount(0);
        }


    return ( 
    <div style={{display: 'flex', flexDirection:'column', gap: 12, textAlign:'center'}}>
        {Boolean(time) && <h1 style={{fontSize:48}}>{word}</h1>}
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
            //sino dame el boton play
            <button onClick={handlePlay}>Play</button>
        )}
        </div>
    );
}