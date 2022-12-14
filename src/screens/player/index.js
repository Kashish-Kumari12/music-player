import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import './player.css'
import apiClient from '../../spotify'
import SongCard from '../../components/songCard';
import Queue from '../../components/Queue';
import '../../shared/globalStyles.css'
import AudioPlayer from '../../components/audioPlayer';
export default function Player(){
    const location = useLocation();
    const [tracks, setTracks] = useState([])
    const [currentTrack, setCurrentTrack] = useState({})
    const [currentIndex, setCurrentIndex] = useState(0)    
    // console.log(location().state)
    useEffect(()=>{
        if(location.state)
        {
            apiClient.get("playlists/"+location.state?.id+"/tracks").then(res=>{
                setTracks(res.data.items)
                setCurrentTrack(res.data.items[0]?.track)
            })
        }
    },[location.state])
    
    useEffect(()=>{
        setCurrentTrack(tracks[currentIndex]?.track)
    },[currentIndex,tracks  ])
    return(
        <div className='screens-container flex'>
            <div className='left-player-body'>
                <AudioPlayer currentTrack={currentTrack} total={tracks} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex}/>
            </div>
            <div className='right-player-body'>
                <SongCard album={currentTrack?.album}/>
                <Queue tracks={tracks} setCurrentIndex={setCurrentIndex}/>
            </div>
        </div>

    )
}