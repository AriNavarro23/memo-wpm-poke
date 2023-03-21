import { useEffect, useState } from "react";
import Swal from "sweetalert2";

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
//pongo al mismo nivel de array y le agrego un caracter individual para diferencia el duplicado con template string
.flatMap((image) => [`a|${image}`, `b|${image}`])
.sort(() => Math.random() - 0.5);

export default function Memotest() {

    //para guardar los ya adivinados 
    const [ guessed, setGuessed] = useState<string[]>([]);
    // para guardar los seleccionados temporales
    const [ selected, setSelected] = useState<string[]>([]);

    const sweetAlert = () => {
        Swal.fire(
            'You Win!',
            'You clicked the button!',
            'success'
            )
    }


    // uso el useEffect para decirle que si es = 2 el setSelected, y si el 0 es igual a 1
    useEffect(() => { 
    if(selected.length === 2) {
        //lo que hace es de los seleccionados, agarra el primero, separa con el split en cadena y agarra la img
        // luego hace lo mismo con el segundo seleccionado, usa el split para diferencia la cadena y agarra la img
        if (selected[0].split('|')[1] === selected[1].split('|')[1]) {
            //agarro el adivinado y lo concateno al seleccionado
            setGuessed((guessed) => guessed.concat(selected));
        }
        //agrego un timOut para que tarde en ocultarse, y asi se limpia el array 
        setTimeout(() => setSelected ([]), 1000);
        }
        //en el array vacio digo que se tiene que ejecutar cuando el selected cambie
    }, [selected]);

    useEffect(() => {
        if (guessed.length === IMAGES.length){
            sweetAlert()
            location.reload();
        }
    }, [guessed])

    return (
        <ul 
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(128px, 1fr))',
                gap: 24,
            }}
        >
            {IMAGES.map((image) => {
                const [, url] = image.split('|');

                // comienzo diciendo si la img esta seleccionada, entonces mostrame la img, sino mostrame BTC

                return (
                //el onclick usa el setSelected, agarra a los seleccionados y concatena la img a cada uno
                <li 
                    onClick={() => selected.length < 2 && setSelected((selected) => selected.concat(image))}
                    key={image}
                    style={{ cursor: 'pointer', padding: 12, border: '1px solid #666', borderRadius: 12 }}
                    >
                        {selected.includes(image) || guessed.includes(image) ? (
                    <img src={url} alt="icon" />
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