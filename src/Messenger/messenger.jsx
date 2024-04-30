import socketIOClient from "socket.io-client";
import { useEffect, useState, useRef } from "react"
import { useSelector, useDispatch } from "react-redux"
import { Navigate } from "react-router-dom"
import { getConvActions, getFollow, getMoreUserOfConvs, getUserId } from '../store/actions/message'
import Friend from "./listFriend"
import CreateMess from "./createMess"
import ConvMess from "./convMess"

const Messenger = () => {
  const [id, setId] = useState();
  const [sendMessage, setSendMessage] = useState(null);
  const [receivedMessage, setReceivedMessage] = useState(null);

  const [showCreateMess, setShowMess] = useState(false)
  const [receiverId, setReceiverId] = useState()
  const [nameReceiver, setNameReceiver] = useState()
  const [avatar, setAvatar] = useState()
  const [changeShowFr, setChangeShowFr] = useState(false)
  const [changeColor, setChangeColor] = useState(true)

  const isLogin = useSelector(state => state.auth.isLogin)
  const userId = useSelector(state => state.auth.id)
  const friend = useSelector(state => state.getConvId.getResponseUserId?.follower)
  const nameAndId = useSelector(state => state.getConvId.getFollows)
  const nameUserOfConv = useSelector(state => state.getConvId.getMoreUserConv)
  const listArrConv = useSelector(state => state.getConvId.response)
  const dispacth = useDispatch()



  if (!isLogin) {
    return <Navigate to='/' replace={true} />
  }

  //socketio
  const [socket, setSocket] = useState(null)
  const socketRef = useRef();
  const host = "ws://chatdemo-5p57.onrender.com";

  useEffect(() => {
    socketRef.current = socketIOClient.connect(host)

    socketRef.current.on('getId', data => {
      setId(data)
    })
    return () => {
      socketRef.current.disconnect()
    }
  }, [userId])

  //send message to server
  useEffect(() => {
    if (sendMessage !== null) {
      socketRef.current.emit('sendMessage', sendMessage)
    }
  }, [sendMessage])

  //get the message from socket server
  useEffect(() => {
    socketRef.current.on('recieveMessage', (data) => {
      setReceivedMessage(data.data);
    })
  }, [])

  useEffect(() => {
    let timer = setTimeout(() => {
      userId && dispacth(getUserId({ id: userId }))
      dispacth(getConvActions({ userId }))
    }, 100);
    return () => {
      clearTimeout(timer)
    }
  }, [userId])

  useEffect(() => {
    friend?.forEach(e => {
      dispacth(getFollow({ id: e }))
    });
  }, [friend])

  useEffect(() => {
    listArrConv?.map((item) => {
      const arr = item?.members
      const findUser = arr?.find((item) => userId !== item)
      if (findUser) {
        return dispacth(getMoreUserOfConvs({ id: findUser }))
      }
    })
  }, [listArrConv])

  const handleChangeShowMess = () => {
    setChangeShowFr(true)
    setChangeColor(false)
  }
  const handleChangeShowFr = () => {
    setChangeShowFr(false)
    setChangeColor(true)
  }




  return (
    <div className="container">
      <div class="row">
        <div class="col-lg-5 border-4 border-black p-0">
          <div className="h-[72px] border-b-4 border-black flex justify-around items-center cursor-pointer">
            <button className={`w-[70px] h-full ${changeColor === false && "border-4 bg-primary rounded-xls"}`} onClick={handleChangeShowMess}>
              <i class="fa-solid fa-comment fa-2xl"></i>

            </button>
            <button className={`w-[70px] h-full ${changeColor === true && "border-4 bg-primary rounded-xls"}`} onClick={handleChangeShowFr}>
              <i class="fa-solid fa-user-group fa-2xl"></i>
            </button>
          </div>
          <div>
            {changeShowFr ?
              <ConvMess nameUserOfConv={nameUserOfConv} />
              :
              <Friend
                nameFr={nameAndId}
                setShowMess={setShowMess}
                setIdReceiver={setReceiverId}
                setNameReceiver={setNameReceiver}
                setAvatar={setAvatar}
              />
            }
          </div>
        </div>

        <div class="relative col-lg-7 border-4 border-black p-0">
          <div className="h-[72px] border-b-4 border-black flex items-center justify-center">
            <h5>{nameReceiver}</h5>
          </div>

          <div>
            {showCreateMess && <CreateMess
              receiverId={receiverId}
              userId={userId}
              avatar={avatar}
              setSendMessage={setSendMessage}
              receivedMessage={receivedMessage}
            />
            }
          </div>

        </div>
      </div>
    </div >
  )
}

export default Messenger