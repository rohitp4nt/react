import { useState,useCallback,useEffect,useRef} from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(1)
  const [num, setNum] = useState(false)
  const[char, setChar]=useState(false)
  const[pass,setPass]=useState("")
  const passwordRef = useRef(null)

  const randomGenerator = useCallback(()=>{
    let pass =""
    let str ="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(num) str +="123456789"
    if(char) str =str+"!@#$%^&*(){}"

    for(let i=1;i<=length;i++){
    let char = Math.floor(Math.random() *str.length+1)
    pass = pass + str.charAt(char)

    }
    setPass(pass)

  },[num,char,length]);


  useEffect(()=>{
    randomGenerator()

  },[num,char,length,randomGenerator])

  const copyText = useCallback(()=>{
    passwordRef.current?.select()
    navigator.clipboard.writeText(pass)

},[pass])

  return (
    <>
    <h1>Password Generator</h1>
    <div className='main-div'>
      <div className='input-box'>
      <input className='checkbox'
        type='text'
        value={pass}
        readOnly
        ref={passwordRef}
        />
        <button id='button'
        onClick={copyText}
        >copy</button>
      </div>
        <br />
    <div>
        <input
        type='range'
        min={0}
        max={15}
        className='slider'
        value={length}
        onChange={(event)=>{setLength(event.target.value)}}
        >
        </input>

        <label> Length: {length}</label>
        <div >
          <input
              type="checkbox"
              defaultChecked={num}
              id="characterInput"
              onChange={() => {
                  setNum(!num )
              }}
          />
          <label>Numbers</label>
      </div>
          
          
          <div >
          <input
              type="checkbox"
              defaultChecked={char}
              id="characterInput"
              onChange={() => {
                  setChar(!char )
              }}
          />
          <label>Characters</label>
      </div>
        
          </div>
      </div>
    </>
  )
}

export default App
