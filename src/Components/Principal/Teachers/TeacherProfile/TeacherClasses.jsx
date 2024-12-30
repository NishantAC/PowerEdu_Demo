import React, { useEffect, useState } from 'react'
import SubjectTeacherService from "../../../../services/subjectteacher.service"

export default function TeacherClasses({userId}) {
    const [classes, setClasses] = useState([])
// 
    useEffect(() => {
        const getClasses = async () => {
            try {
                const res = await SubjectTeacherService.getClassIds(userId)
                
                setClasses(res?.classes)
            } catch (error) {
                
            }
        }
        getClasses()
    }, [userId])
  return (
    <div style={{display: 'inline-flex', wordWrap: 'break-word', gap: '20px', maxWidth: '200px'}}>{classes?.map(c => <div>{c}</div>)}</div>
  )
}
