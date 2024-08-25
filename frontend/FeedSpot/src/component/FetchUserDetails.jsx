import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';
import { UserAtom } from '@/store/atoms/UserAtom';

export default function FetchUserDetails(){
    const setDetials = useSetRecoilState(UserAtom);
    useEffect(()=>{
      axios.get('http://localhost:3000/api/v1/user_details',{
        headers:{
          'Authorization': "Bearer " + localStorage.getItem('token')
        }
      }).then((res)=>setDetials(res.data.details))
      },[setDetials])

  return null;
};

