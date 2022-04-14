import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getGenres } from "../actions";

export default function CreateGames(){
    const allGenres = useSelector((state) => state.genres)
    console.log(allGenres)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getGenres()) 
    }, [dispatch])                
}