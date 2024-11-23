import React, { useEffect, useState } from 'react'
import SubjectTeacherService from "../../../../services/subjectteacher.service"

export default function TeacherClasses({userId}) {
    const [classes, setClasses] = useState([])
// console.log(userId)
    useEffect(() => {
        const getClasses = async () => {
            try {
                const res = await SubjectTeacherService.getClassIds(userId)
                console.log(res)
                setClasses(res?.classes)
            } catch (error) {
                console.log(error)
            }
        }
        getClasses()
    }, [userId])
  return (
    <div style={{display: 'inline-flex', wordWrap: 'break-word', gap: '20px', maxWidth: '200px'}}>{classes?.map(c => <div>{c}</div>)}</div>
  )
}
