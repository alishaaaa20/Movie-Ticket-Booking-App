import React from 'react';
import AuthForm from '../Auth/AuthForm';
import { sendAdminAuthRequest } from '../../api-helpers/api-helpers';
import { adminActions } from '../../store';
import { useDispatch } from 'react-redux';

const Admin = () => {
  const dispatch = useDispatch();
  const onResReceived = (data) => {
    console.log(data);
    dispatch(adminActions.login());
    localStorage.setItem('adminId', data.id);
    localStorage.setItem('adminToken', data.token);
  }
  const getData = (data) => {
    console.log("Admin",data);
    sendAdminAuthRequest(data.inputs)
    .then(onResReceived)
    .catch((err) => console.log(err));
};
  return (
    <div><AuthForm onSubmit={getData} isAdmin={true}/></div>
  )
}

export default Admin;