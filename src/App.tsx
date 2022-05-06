import { useEffect, useState } from 'react';
import './App.css';


function generateWeights(rows: number, cols: number): number[][] {
  return Array.from({ length: rows }).map(() =>
    Array.from({ length: cols }).map(() => Math.round(Math.random() * 100))
  );
}

function App() {
  const [inputAmount,setInputAmount] = useState<number>(0)
  const [resultMatrix, setResultMatrix] = useState<Array<Array<number>>>()
  const [flag, setFlag] = useState<boolean>(false)
  const [maxRow, setMaxRow] = useState<number>(0)
  
  
  useEffect(() => {
    setResultMatrix(generateWeights(inputAmount, inputAmount));
  }, [inputAmount])
  
  useEffect(() => {
    setFlag(false)
  }, [inputAmount])

  useEffect(() => {
    const keyHandler = (e: KeyboardEvent) => {
      if(e.key === 'Enter'){
        let maxValue = 0;
        resultMatrix?.map((i, index) => {
          const sum = i.reduce((pS, a) => { 
            if(a % 2 === 0)
              return (pS + a)
            else
              return (pS)
          },0)
          if(sum >= maxValue){
            maxValue = sum;
            setMaxRow(index)
          }
        })
        setFlag(true)
      }
    }
    document.addEventListener('keydown', keyHandler)
    return () => {
      document.removeEventListener('keydown', keyHandler)
    }
  })

  return (
    <div className="App">
      <div className='list-box'>
        <p>
         <input type={'radio'}
            name='amount'
            onClick={() => setInputAmount(9)}
            /> 
          9
        </p>
        <p>
          <input 
            type={'radio'}
            name='amount'
            onClick={() => setInputAmount(10)}
            />
          10
        </p>
        <p>
          <input 
            type={'radio'}
            name='amount'
            onClick={() => setInputAmount(11)}
            />
          11
        </p>
      </div>
      <table
      >
        <tbody>
          {resultMatrix?.map((i, index) => {
            let sum = 0;
            return(
              <tr key={index}
                style={{background: flag && index===maxRow ? 
                    'green'
                    :
                    'none'
                }}
              >
                {i.map((item, index2) => {
                  if(item % 2 === 0){
                    sum+=item;
                  }
                  return(
                    <td key={index2}
                      style={{padding:10, borderRight: '1px solid #fff', borderLeft: '1px solid #fff'}}
                    >{item}</td>
                  )
                })}
                <td key={index}
                  style={{padding: 10, background: '#fff', color: '#000',borderRight: '1px solid #fff', borderLeft: '1px solid #fff'}}
                >{sum}</td>
            </tr>)
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
