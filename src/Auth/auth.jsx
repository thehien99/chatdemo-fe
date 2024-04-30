import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { LoginActions, registerActions } from "../store/actions/auth"
import { useNavigate } from "react-router-dom"
import Rectangle from '../asset/img/Rectangle.jpg'
import { useRef } from "react"

const Auth = () => {

  const dispatch = useDispatch()
  const isFlag = useSelector(state => state.auth.isLogin)
  const msg = useSelector(state => state.auth.msg)
  const [flag, setFlag] = useState(isFlag)
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [facebook, setFacebook] = useState('')
  const [nameErr, setNameErr] = useState('')
  const [passwordErr, setPasswordErr] = useState('')
  const navigate = useNavigate()
  const buttonRef = useRef()
  useEffect(() => {
    isFlag && navigate('mess')
  }, [isFlag])
  const handleClick = async (e) => {
    if (name === "") {
      setNameErr('Không thể bỏ trống ô này')
    } else
      if (password === "") {
        setPasswordErr('Không thể bỏ trống ô này')
      } else {
        isFlag ? dispatch(registerActions({ name, password, facebook })) : dispatch(LoginActions({ name, password }))
      }
  }

  const onHandleEnter = (e) => {
    if (e.key === 'Enter') {
      buttonRef.current.click()
    }
  }


  return (
    <div className="relative auth">
      <div>
        <img src={Rectangle} alt="" className="w-full h-[100vh]" />
      </div>
      <div className="absolute w-full h-[100vh] top-0" style={{ backgroundColor: 'rgba(17, 17, 17, 0.35)' }}></div>
      <div className={`w-[50%] absolute top-0 left-0 bg-white p-4 rounded-lg ${flag ? "translate-x-2/4 translate-y-[29%]" : 'translate-x-2/4 translate-y-2/4'}`} >
        <div>
          <h1>{flag ? "SignUp" : "Login"}</h1>
        </div>
        <div className="mb-3 mt-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control w-[50%]" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)} />
          {nameErr &&
            <label className="text-red-500">{nameErr}</label>
          }
        </div>
        <div className="mb-3" onKeyDown={onHandleEnter}>
          <label className="form-label">Password</label>
          <input type="password" className="form-control  w-[50%]" id="pwd" placeholder="Enter password" name="pswd" value={password} onChange={e => setPassword(e.target.value)} />
          {passwordErr &&
            <label className="text-red-500">{passwordErr}</label>
          }
        </div>
        {
          flag &&
          <div className="mb-3">
            <label className="form-label">Facebook</label>
            <input type="text" className="form-control w-[50%]" id="fb" placeholder="URL Facebook" name="fb" value={facebook} onChange={e => setFacebook(e.target.value)} />
          </div>

        }
        <div className="mb-3">
          {
            flag ?
              <span className="text-primary cursor-pointer" onClick={() => { setFlag(false); setName(''); setPassword(''), setNameErr(''), setPasswordErr('') }}>Đăng nhập ngay</span>
              :
              <span className="text-primary cursor-pointer" onClick={() => { setFlag(true); setName(''); setPassword(''), setNameErr(''), setPasswordErr('') }}>Tạo tài khoản</span>
          }
        </div>
        <button ref={buttonRef} type="submit" className="btn btn-primary" onClick={handleClick}>{flag ? 'SignUp' : 'Login'}</button>
      </div>
    </div >

  )
}

export default Auth