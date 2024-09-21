import React, { useState } from 'react'
import { MdClose } from 'react-icons/md'
import TagInput from '../components/TagInput'
import axios from 'axios'
import { toast } from 'react-toastify'
import {ENV} from '../config/env'

const AddEditNotes = ({ onClose, noteData, type, getAllNotes }) => {
  const [title, setTitle] = useState(noteData?.title || "")
  const [content, setContent] = useState(noteData?.content
     || "")
  const [tags, setTags] = useState(noteData?.tags || [])
  const [error, setError] = useState(null)

  const editNote = async () => {
    const noteId = noteData._id

    try {
      const res = await axios.post(`${ENV.BACKEND_URL}/api/note/edit/${noteId}`,{
        title,
        content,
        tags
      },{ withCredentials : true})
      if(!res.data.success){
        setError(res.data.message)
        toast.error(res.data.message)
        return
      }
      toast.success(res.data.message)
      getAllNotes()
      onClose()
    } catch (error) {
        toast.error(error.message)
        console.log(error.message);
        setError(error.message)
    }
  }
  const addNewNote = async () => {
    try {
      const res = await axios.post(`${ENV.BACKEND_URL}/api/note/add`,{
        title, content, tags
      },{ withCredentials : true})

      if(!res.data.success){
        setError(res.data.message)
        toast.error(res.data.message)
        return
      }

      toast.success(res.data.message)
      getAllNotes()
      onClose()
    } catch (error) {
      toast.error(error.message)
      console.log(error.message);
      setError(error.message)
    }
  }
  const handleAddNote = () => {
    if (!title) {
      setError("Please enter a title")
      return
    }
    if (!content) {
      setError("Please enter a content")
      return
    }
    setError("")
    if (type == "edit") {
      editNote()
    } else {
      addNewNote()
    }
  }
  return (
    <div className='relative'>
      <button className='w-10 h-10 rounded-full flex items-center justify-center absolute -top-3 -right-3 hover:bg-slate-50'
        onClick={onClose}>
        <MdClose className='text-xl text-slate-400' />
      </button>

      <div className='flex flex-col gap-2'>
        <label className='input-label text-red-400 uppercase'>title</label>
        <input type="text"
          className='text-2xl text-slate-950 outline-none'
          placeholder='wake up at 6 a.m.'
          value={title}
          onChange={({target}) => setTitle(target.value)}
        />
      </div>

      <div className='flex flex-col gap-2 mt-4'>
      <label className='input-label text-red-400 uppercase'>Content</label>
      <textarea
      type="text"
      className='text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded'
      placeholder='Content'
      rows={10}
      value={content}
      onChange={({target}) => setContent(target.value)}
      />
      </div>

      <div className="mt-3">
        <label className="input-label text-red-400 uppercase">tags</label>
        <TagInput tags={tags} setTags={setTags}/>
      </div>
      {error && <p className='text-red-500 mt-2 text-xs'>{error}</p>}
      <button className='btn-primary font-medium mt-2 p-3'
      onClick={handleAddNote}>
        {type === 'edit'? 'UPDATE' : 'ADD'}
      </button>
    </div>
  )
}

export default AddEditNotes