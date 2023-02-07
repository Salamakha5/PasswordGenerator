import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.rtl.min.css'
import OnePassword from './onePassword.component';
import { useEffect, useState } from 'react';

function App() {
  const [data1,setData] = useState(["1 #$*@&*&@*^&^(@&$(*&*_)!)#(&!@*&#)","2 ASKDJKHASD(@*U","3 124339289178333-210","4 adaljsdhaskdhjvdm-pol","5 ..."])
  const [button,setButton] = useState("disabled")
  const [levelimg,setLevelImg] = useState("Level4.webp")
  const [levelText,setLevelText] = useState("Нормальний")
  const [PassComplexity,setPassComplexity] = useState("Normal")
  const [PassLenght,setPasslength] = useState(6)
  const [PassCount,setPassCount] = useState(4)
  const [PassToLowerCase,setPassToLowerCase] = useState(false)
  const [PassToUpperCase,setPassToUpperCase] = useState(false)
  const [PassNumber,setPassNumber] = useState(false)
  const [PassSymbols,setPassSymbols] = useState(false)
  const [PassRepeatSymbols,setPassRepeatSymbols] = useState(false)

  useEffect(()=>{

  },[])  

  function ChangePassLength(e){
    if(+e.target.value <= 100){setPasslength(+e.target.value)}
  }
  function ChangePassCount(e){
    if(+e.target.value <= 100){setPassCount(+e.target.value)}
  }
  function PasswordComplexity(e){
    setPassComplexity(e.target.id)
    switch (e.target.id) {
      case "Simple":
        setPassToLowerCase(true)
        setPassToUpperCase(true)
        setPassNumber(false)
        setPassSymbols(false)
        setPassRepeatSymbols(false)
        break;
        case "Normal":
          setPassToLowerCase(true)
          setPassToUpperCase(true)
          setPassNumber(true)
          setPassSymbols(false)
          setPassRepeatSymbols(false)
          break;
          case "Hard":
          setPassToLowerCase(true)
          setPassToUpperCase(true)
          setPassNumber(true)
          setPassSymbols(true)
          setPassRepeatSymbols(true)
        break;
    }
  }
  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  function Checkinput(){
    if(PassToLowerCase || PassToUpperCase || PassNumber || PassSymbols){
      setButton("")
    }
    else{
      setButton("disabled")
    }
    
  }

  function passwordLevel(password){
    password = password.split(" ")[1]
    let passL = password.length
    let level = 0
    if((PassToLowerCase || PassToUpperCase) && passL <= 6){level++}
    if((PassToLowerCase || PassToUpperCase) && passL > 6){level += 2}
    if(PassNumber && passL > 6){level++}
    if(PassSymbols && passL > 6){level++}
    if(PassRepeatSymbols && passL > 6){level++}
    if(PassToLowerCase && PassToUpperCase && PassNumber && PassSymbols && PassRepeatSymbols && passL == 100){level=6}
    switch (level) {
      case 1:
        setLevelImg("Level1.webp")
        setLevelText("Дуже простий")
        break;
      case 2:
        setLevelImg("Level2.webp")
        setLevelText("Простий")
        break;
      case 3:
        setLevelImg("Level3.webp")
        setLevelText("Нормальний")
        break;
      case 4:
        setLevelImg("Level4.webp")
        setLevelText("Складний")
        break;
      case 5:
        setLevelImg("Level5.webp")
        setLevelText("Дуже складний")
        break;
      case 6:
        setLevelImg("Level6.webp")
        setLevelText("Шедевр!")
        break;
    }
  }

  function GenerateButton(){
    const ArrA_Z = ['a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z']
    const Arr0_9 = [0,1,2,3,4,5,6,7,8,9]
    const ArrSymbols = ["!","@","#","$","%","^","&","*","<","(",")","_","+","=","`","|"]
    let password = ""
    let data = []

      for (let i = 0; i < PassCount; i++) {
        password = ""
        for (let j = 0; j < PassLenght; j++) {
          let a = getRandomInt(3)
          if(a == 0){
            if(PassToLowerCase){
                if(PassToUpperCase){
                  let TF = getRandomInt(2)
                  if(TF == 0){password += ArrA_Z[getRandomInt(ArrA_Z.length)].toUpperCase()}
                  if(TF == 1){password += ArrA_Z[getRandomInt(ArrA_Z.length)]}
                }
                else{password += ArrA_Z[getRandomInt(ArrA_Z.length)]}
            }else{
              if(PassToUpperCase){
                password += ArrA_Z[getRandomInt(ArrA_Z.length)].toUpperCase()
              }
              else{j--}
            }
          }
          if(a == 1){
            if(PassNumber){
              password += Arr0_9[getRandomInt(Arr0_9.length)]
            }
            else{j--}
          }
          if(a == 2){
            if(PassSymbols){
              password += ArrSymbols[getRandomInt(ArrSymbols.length)]
            }else{j--}
          }
          if(PassRepeatSymbols){
            for (let o = 0; o < password.length; o++){
                if(password[o-1] == password[o]){
                  password = password.slice(0, -1)
                  j--
                }              
              }
            }
          }
        data.push(i+1 +" "+password)
      }
      passwordLevel(data[0])
      setData(data)
  }

  return (
    <div className="app ">
            <div className='password_container'>
            <div className="block_tools">
              <h2 className='text-center'>Генератор паролів</h2>
              <div className='row pb-2 border-bottom border-3 m-0 d-flex justify-content-around'>
                <div className='col'>
                  <p className='pt-3 textInfo'>Складність паролю:</p>
                  <div className='mt-2 d-flex align-items-center'>
                    <input  onInput={Checkinput} onClick={PasswordComplexity} id="Simple" className="m-0 p-0  fs-5 form-check-input" name='selectHard' type="radio"/>
                    <span className='m-o p-0 span-text me-2'> - Простий</span>
                  </div>
                  <div className='mt-2 d-flex align-items-center'>
                    <input onInput={Checkinput} onClick={PasswordComplexity} id="Normal" className="m-0 p-0  fs-5 form-check-input" name='selectHard' type="radio"/>
                    <span className='m-o p-0 span-text me-2'> - Нормальний</span>
                  </div>
                  <div className='mt-2 d-flex align-items-center'>
                    <input onInput={Checkinput} onClick={PasswordComplexity} id="Hard" className="m-0 p-0  fs-5 form-check-input" name='selectHard' type="radio"/>
                    <span className='m-o p-0 span-text me-2'> - Складний</span>
                  </div>
                </div>
                <div className='col'>
                  <p className='pt-3 textInfo'>Довжина паролю:</p>
                  <div className='d-flex justify-content-center align-items-center'>
                    <input type="number" className='ms-3 form-control p-1' value={PassLenght} onChange={ChangePassLength} min="4" max="100" />
                    <input type="range" className='h-100 form-control p-1' value={PassLenght} onChange={ChangePassLength} min="4" max="100" />
                  </div>
                  <p className='pt-3 textInfo'>Кількість паролів:</p>
                  <div className='d-flex justify-content-center align-items-center'>
                    <input type="number" className='ms-3 form-control p-1' onChange={ChangePassCount} value={PassCount}  min="1" max="100" />
                    <input type="range" className='h-100 form-control p-1' onChange={ChangePassCount} value={PassCount}  min="1" max="100" />
                  </div>
                </div>
              </div>

              <div className="row m-0">
                  <p className='pt-3 textInfo text-center'>Які символи використовувати?:</p>
                  <div className="col">
                    
                    <div className='d-flex align-items-center '>
                      <input type="checkbox" onInput={Checkinput} checked={PassToLowerCase} onChange={()=>setPassToLowerCase(!PassToLowerCase)}  className=' m-0 me-2 p-0 fs-4 form-check-input'/>
                      <p className='textInfo2 m-0 p-0 me-2'> - Враховувати нижній регістер (a-z)</p>
                    </div>
                    <div className='d-flex align-items-center pt-2'>
                      <input type="checkbox" onInput={Checkinput}  checked={PassToUpperCase} onChange={()=> setPassToUpperCase(!PassToUpperCase)}  className=' m-0 me-2 p-0 fs-4 form-check-input'/>
                      <p className='textInfo2 m-0 p-0 me-2'> - Враховувати верхній регістер (A-Z)</p>
                    </div>
                    <div className='d-flex align-items-center pt-2'>
                      <input type="checkbox" onInput={Checkinput}  checked={PassNumber} onChange={()=> setPassNumber(!PassNumber)} className=' m-0 me-2 p-0 fs-4 form-check-input'/>
                      <p className='textInfo2 m-0 p-0 me-2'> - Використовувати цифри (0-9)</p>
                    </div>
                    <div className='d-flex align-items-center pt-2'>
                      <input type="checkbox" onInput={Checkinput}  checked={PassSymbols} onChange={()=> setPassSymbols(!PassSymbols)}  className=' m-0 me-2 p-0 fs-4 form-check-input'/>
                      <p className='textInfo2 m-0 p-0 me-2'> - Використовувати символи (%&@^$@&$+)</p>
                    </div>
                    <div className='d-flex align-items-center pt-2'>
                      <input type="checkbox"  checked={PassRepeatSymbols} onChange={()=> setPassRepeatSymbols(!PassRepeatSymbols)}  className=' m-0 me-2 p-0 fs-4 form-check-input'/>
                      <p className='textInfo2 m-0 p-0 me-2'> - Не повторювати символи (AA,PP)</p>
                    </div>
                    <div className='d-flex justify-content-center pt-4'>
                      <a href="#" onClick={GenerateButton} class={"btn  btn-success "+button}>Згенерувати</a>
                    </div>

                  </div>
              </div>
            </div>
            <div className="block_info">
              
              <div className='text-center img_container w-100'>
                <img className='image_lavel' src={require(`./img/`+levelimg)} alt="" />
                <br />
                <div className='p-1 bg-gray d-flex justify-content-center align-items-center'>
                  <span className='textLevel'>Рівень: {levelText}</span>
                </div>
              </div>
              <div className='text_password_container pe-2'>
                 {
                  data1.map((i)=>{
                    return <OnePassword key={i} data={i}></OnePassword>
                    })
                 }
               
              </div>
            </div>
      </div>
    </div>
  );
}

export default App;
