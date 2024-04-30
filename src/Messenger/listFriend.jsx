import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useDispatch, useSelector } from 'react-redux';
import { getFollow } from '../store/actions/message';
import { useEffect } from 'react';
import avatar from '../asset/img/avatar.jpg'
import Avatar from '@mui/material/Avatar';
import { useNavigate } from 'react-router-dom';
import CreateMess from './createMess';
import { useState } from 'react';
import { memo } from 'react';

const Friend = ({ setAvatar, nameFr, setShowMess, setIdReceiver, setNameReceiver }) => {
  const handleChange = (e) => {
    setNameReceiver(e)
    const findReceiver = nameFr?.find(item => item?.name === e)
    const idReceiver = findReceiver?.id
    setIdReceiver(idReceiver)
    const avatarReceiver = findReceiver?.avatar
    setAvatar(avatarReceiver)
  }


  const showMess = () => setShowMess(true)
  const handleCreateChat = () => {
    showMess()
  }

  return (
    <div >
      <List sx={{ width: '100%', height: '87vh', position: 'relative', overflow: 'auto', }}
        onClick={handleCreateChat}
      >
        {nameFr?.map((item) => {
          return <ListItem
            onClick={() => { handleChange(item?.name) }}
            key={item?.id}
            className='px-3 text-center flex justify-between mt-5 hover:bg-[#ccc] cursor-pointer'
          >
            <Avatar />
            <ListItemText className='!ms-8 !font-medium' primary={item?.name} />
          </ListItem>
        })}
      </List >
    </div >
  );
}

export default memo(Friend)