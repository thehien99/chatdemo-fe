import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getFollow } from '../store/actions/message';
import { useEffect } from 'react';
import { memo } from 'react';
import avatar from '../asset/img/avatar.jpg'
import Avatar from '@mui/material/Avatar';



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 365,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  height: 500,
};

const Follows = () => {

  const dispatch = useDispatch()
  const [open, setOpen] = React.useState(false);
  const name = useSelector(state => state.getConvId.getFollows)
  const follower = useSelector(state => state.getConvId.getResponseUserId?.follower)

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    handleOpen()
    follower?.map((item) => {
      return dispatch(getFollow({ id: item }))
    })
  }, [follower])
  return (
    <div >
      <Button className='text-black flex flex-col items-center h-[50px] w-[70px] ' onClick={handleOpen}>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="overflow-y-scroll rounded-md">
          <Typography id="modal-modal-title" variant="h6" component="h2" className='text-center'>
            {follower && 'Bạn bè'}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }} className='list-none'>
            {name && name.map((item) => {
              return <li key={item?.id} className='mt-5'>
                <span className='ms-10 text-center flex justify-between'>
                  <div className='flex justify-center items-center'>
                    <Avatar alt="Remy Sharp" src={avatar}
                      sx={{ width: 44, height: 44 }}
                    />
                    <span className='ms-3'>
                      {item?.name}
                    </span>
                  </div>
                  <div className=' border p-2 bg-slate-300 font-bold h-[40px] mt-3'>
                    Xóa
                  </div>
                </span>
              </li>
            })}
          </Typography>
        </Box>
      </Modal>
    </div >
  );
}

export default Follows