"use client"
import { tokenProvider } from "@/actions/stream.actions";
import Loader from "@/components/Loader";
import { useUser } from "@clerk/nextjs";
import {
    StreamVideo,
    StreamVideoClient
  } from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";
  
const API_KEY = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamVideoProvider = ({ children }: {children:ReactNode}) => {
    const [videoClient, setVideoClient] = useState<StreamVideoClient>();
    const {user, isLoaded} = useUser(); //getting user info from clerk 
    useEffect(()=>{
        if(!isLoaded || !user) return; //if no use is present
        if(!API_KEY) throw new Error('Stream API key missing'); // basics error handling
        
        const client = new StreamVideoClient({
          apiKey:API_KEY,
          user:{
            id: user?.id,
            name: user.fullName || user.username || user.id,
            image: user?.imageUrl,
          }, 
          tokenProvider,
        });
        
        setVideoClient(client);
    }, [user,isLoaded]);

  if(!videoClient) return <Loader/>;
    return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

export default StreamVideoProvider; 