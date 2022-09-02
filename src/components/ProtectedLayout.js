import React, { useEffect, useRef } from 'react';
import { Navigate, Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { fetchCurrentUser } from "../store/slice/user";


const ProtectedLayout = () => {
	const fetchTimeRef = useRef(Date.now());

	const user = useSelector(state => {
		return state.user
	});
	const userPayload = user.payload
	const userIsLogin = user.isLogin

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchCurrentUser())
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])


	if (userPayload.updateTime <= fetchTimeRef.current) {
		return
	}

	if (!userIsLogin) {
		return <Navigate to="/login" />

	}

	return (
		<Outlet />
	)
};

export default ProtectedLayout;