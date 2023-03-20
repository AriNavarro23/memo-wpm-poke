import { useEffect, useState } from "react";

const IMAGES = [
    'https://icongr.am/devicon/angularjs-original.svg?size=128&color=currentColor',
    'https://icongr.am/devicon/babel-original.svg?size=128&color=currentColor',
    'https://icongr.am/devicon/c-original.svg?size=128&color=currentColor',
    'https://icongr.am/devicon/chrome-original.svg?size=128&color=currentColor',
    'https://icongr.am/devicon/cplusplus-original.svg?size=128&color=currentColor',
    'https://icongr.am/devicon/css3-original.svg?size=128&color=currentColor',
    'https://icongr.am/devicon/docker-original.svg?size=128&color=currentColor',
    'https://icongr.am/devicon/java-original.svg?size=128&color=currentColor',
    'https://icongr.am/devicon/javascript-original.svg?size=128&color=currentColor',
    'https://icongr.am/devicon/python-original.svg?size=128&color=currentColor'
]
.flatMap((image) => [`a|${image}`, `b|${image}`])
.sort(() => Math.random() - 0.5);

export default function Memotest() {

    //para guardar los ya adivinados 
    const [ guessed, setGuessed] = useState<string[]>([]);
    // para guardar los seleccionados temporales
    const [ selected, setSelected] = useState<string[]>([])

    useEffect(() => { 
    if(setSelected.length === 2) {
        if (selected[0].split('|')[1] === selected[1].split('|')[1]) {
            setGuessed((guessed) => guessed.concat(selected));
        }
        setTimeout(() => setSelected ([]), 1000);
        }
    }, [selected]);

    useEffect(() => {

    })

    return (
        <ul
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(128px, 1fr)',
                gap: 24,
            }}
        >
            {IMAGES.map((image) => {
                const [, url] = image.split('|');

                return (
                <li key={url}
                    style={{ cursor: 'pointer', padding: 12, border: '1px solid #666', borderRadius: 12 }}
                    >
                        {selected.includes(image) || guessed.includes(image) ? (
                    <img 
                    src={url} 
                    alt="icon" 
                    />
                    ) : (
                        <img 
                        alt="icon"
                        src="https://icongr.am/fontawesome/bitcoin.svg?size=128&color=currentColor" 
                        />
                    )}
                </li>
            );
            })}
        </ul>
    );
} 