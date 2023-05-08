import React, { useEffect } from 'react'
import { useContext } from 'react'
import NoteContext from '../Contexts/Notes/NoteContext'

const About = () => {
    const a = useContext(NoteContext)
    useEffect(() => {
     a.update();
    }, [])
    
    
  return (
    <div>
        <h1>
            this is about {a.state.name}
        </h1>
    </div>
  )
}

export default About