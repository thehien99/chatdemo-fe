import Avatar from '@mui/material/Avatar';
import { createMessage, getMessOfConvs, getUserId, sendMess } from '../store/actions/message';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMessOfConv, sentMess } from '../services/message';
import { useRef } from 'react';
import InputEmoji from "react-input-emoji";


const CreateMess = ({ receiverId, userId, avatar, setSendMessage, receivedMessage }) => {
  const buttonRef = useRef(null);
  const messagesEnd = useRef();
  const imgref = useRef()

  const idConv = useSelector(state => state?.getConvId?.messageCreate[0]?.id)
  const [messageText, setMessageText] = useState([])
  const [newMess, setNewMess] = useState("")
  const dispatch = useDispatch()

  const messageOwn = ' bg-primary mt-3 text-white p-[0.7rem] rounded-md max-w-[28rem] flex flex-col gap-[0.5rem] self-end'
  const message = ' bg-[#ccc] mt-3 text-white p-[0.7rem] rounded-md max-w-[28rem] flex flex-col gap-[0.5rem] self-start'


  useEffect(() => {
    receiverId && dispatch(createMessage({ senderId: userId, receiverId: receiverId }))
  }, [receiverId])

  useEffect(() => {
    scrollToBottom()
  }, [messageText])

  useEffect(() => {
    const fetchMess = async () => {
      try {
        const data = await getMessOfConv({ conversationId: idConv })
        setMessageText(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchMess()
  }, [idConv, receiverId])


  const onEnterPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      buttonRef.current.click();
    }
  }
  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (newMess === "") {
      alert('CHAT MÀ KHÔNG NHẬP CHỮ SAO CHAT MẸ ... :v')
    } else if (messageText !== null) {

      const msg = {
        senderId: userId,
        messageText: newMess,
        conversationId: idConv
      }

      //send message to socket
      setSendMessage({ ...msg, receiverId })

      //send message to db
      try {
        await sentMess(msg)
        setNewMess("")
      } catch (error) {
        console.log(error)
      }
    }

  }



  useEffect(() => {
    setMessageText([...messageText, receivedMessage])
    scrollToBottom()
  }, [receivedMessage])



  const mergedObject = messageText && messageText?.reduce((acc, obj) => {
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        if (!acc[key]) {
          acc[key] = [];
        }
        if (Array.isArray(obj[key])) {
          acc[key] = acc[key].concat(obj[key]);
        } else {
          acc[key].push(obj[key]);
        }
      }
    }
    return acc;
  }, {});


  const messageTextLength = messageText && mergedObject?.messageText
  const senderIdLength = messageText && mergedObject?.senderId

  const mergedArray = [];
  for (let i = 0; i < Math.min(messageTextLength?.length, senderIdLength?.length); i++) {
    if (messageText[i] !== null) {
      mergedArray.push({ messageText: messageTextLength[i], senderId: senderIdLength[i] });
    }
  }

  const scrollToBottom = () => {
    messagesEnd.current.scrollIntoView({ behavior: "smooth" });
  }


  return (
    <div className='flex flex-col gap-[0.5rem] overflow-y-auto overscroll-auto h-[79vh]  p-[2.5rem] ' >
      {mergedArray?.map((item) => (
        <>
          <div key={item.messageText} className={item?.senderId === userId ? messageOwn : message}>
            <Avatar src={avatar} sx={{ width: 20, height: 20 }} />
            <span>{item?.messageText}</span>
          </div>
        </>
      ))}
      <div ref={messagesEnd}></div>


      <div>
        {/* <textarea
          className='border-4 border-black resize-none focus:outline-none p-1 w-[94%]  bottom-0 left-0 absolute'
          onChange={handleChange}
          onKeyDown={onEnterPress}
          autoFocus
          value={newMess}
          placeholder='nhập tin nhắn đêy nèh....'
        /> */}
        <div className='absolute w-full bottom-0 left-0'>
          <InputEmoji borderColor='#ccc' borderRadius={100} onKeyDown={onEnterPress} cleanOnEnter onChange={setNewMess} value={newMess} placeholder='Nhập tin nhắn ở đây nè má...' />
        </div>

        <button className='float-right absolute bottom-0 right-0 p-1' ref={buttonRef} onClick={handleSendMessage}>
        </button>
      </div>
    </div >

  )
}

export default CreateMess