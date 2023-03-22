import { useState } from "react";



export default function WordsPerMinute() {

    const [ characterCount, setCharacterCount ] = useState(0);
    const [ buffer, setBuffer ] = useState('');
    //que palabra necesito adivinar
    const [ word, setWord ] = useState(() => WORDS[(Math.random() * WordsPerMinute.length) | 0 ]);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>)
    event?.preventDefault();

    if (buffer === word){

    }

    return <div style={{display: 'flex', flexDirection:'column', gap: 12, textAlign:'center'}}>
        <h1 style={{fontSize:48}}>{word}</h1>
        <h2>Character typed: {characterCount}</h2>
        <form onSubmit={handleSubmit}>
            <input type="text" 
            autoFocus
            value={buffer}
            onChange={(e) => setBuffer(e.target)}
            />
            <button type="submit">Submit</button>
        </form>
        </div>;
    
}