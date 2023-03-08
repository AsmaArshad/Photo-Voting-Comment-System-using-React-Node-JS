import React from 'react'
import { Link } from 'react-router-dom';
import Dropzone from "./Dropzone";

const AddPhoto = () => {
  return (
    <>
      <Link to={'/'}>go back</Link>
      <Dropzone /></>
  )
}

export default AddPhoto