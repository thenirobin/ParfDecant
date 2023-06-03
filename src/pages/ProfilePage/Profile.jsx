import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../storage/slices/userSlice";

export const ProfilePage = () => {
    const dispatch = useDispatch();
    const {data} = useSelector(s => s.user)
    
    useEffect(()=>{
        dispatch(getUser());
    },[dispatch])

    return ( 
        <> 
        <div>
            <img src={data?.avatar} alt="" />
        </div>
        </>
    )
}