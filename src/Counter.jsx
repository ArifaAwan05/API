import { useState } from "react";
export default function Counter (){
    let[counter, setCounter] = useState(15);


    const addValue= (()=>{
        setCounter(counter+1);

    });

  const removeValue =(()=>{
        setCounter(counter-1);
    })

   


    return(<div>

        <button value={counter}
        onClick={addValue}>
            Add Counter: {}
            </button>
        <button value={counter}
        onClick={removeValue}>
            delte Counter: {}</button>
    </div>)
}