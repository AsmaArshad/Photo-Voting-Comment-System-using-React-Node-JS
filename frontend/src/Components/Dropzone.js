import React, { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useRef } from "react";
import { useNavigate } from 'react-router-dom';
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};


function Dropzone(props) {
  let navigate = useNavigate();

  const [image, setImage] = useState({ preview: '', data: '' })
  // const [status, setStatus] = useState('')
 

  // const FileChangeHandle = (e) => {
  //   const img = {
  //     preview: URL.createObjectURL(e.target.files[0]),
  //     data: e.target.files[0],
  //   }
  //   setImage(img)
  // }


  
  const handleSubmit = async (e) => {
    // e.preventDefault()
    let formData = new FormData()
    formData.append('file', image)
    console.log(image)
    if(!image) {
      alert('Plz select image ')
       return}
    try {
    const res = await fetch('http://localhost:4700/AddPhoto', {
      method: 'POST',
      body: formData,
    })
    if (!res.ok) throw new Error("fetch failed");

    let data = await res.json();
    alert(data.message)
    if(data.message_type == 'success'){
      
      navigate('/',{replace:true});
    }
    console.log(data)

  } catch (err) {

    console.log(err);


  }
  }
// console.log(status)
// let uploadHandler = async () =>{
//   let formData = new FormData();
//   formData.append('image',image)
//   console.log(formData)
//   console.log(image)
//   try {

    

//     let res = await fetch("http://localhost:4700/image", {
//       method: "POST",
//       body: formData,
      
//     }
//     )
//     if (!res.ok) throw new Error("fetch failed");

//     let data = await res.json();
//     console.log(data)

//   } catch (err) {

//     console.log(err);


//   }
// }

  // let uploadimgHandler = async () => {
  //   let formData =new FormData()
  //   formData.append('image',image)
  //   console.log(image)

    // let imageurlValue = imageurl.current.value;
    // console.log(imageurlValue)
    //   try {

    //     let url = "http://localhost:4700/AddPhoto";
    //     // console.log(url)

    //     let res = await fetch(url, {
    //         method: "POST",
    //         body: JSON.stringify({

    //           Photo_Path: image

    //         }),
    //         headers: {
    //             "Content-type": "application/json"
    //         }
    //     }
    //     )
    //     if (!res.ok) throw new Error("fetch failed");

    //     let data = await res.json();
    //     console.log(data)

    // } catch (err) {

    //     console.log(err);


    // }
  // }

  const [files, setFiles] = useState([]);
  useEffect(()=>{
    setImage(files[0])
  },)
  
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': []
    },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }
  });

  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, []);

  return (
    <section className="container" style={{width:'50%',marginTop:'10%'}}>

      <div {...getRootProps({ className: 'dropzone' })}>
        <input  {...getInputProps()}  />
        <p style={{ height: '200px', borderStyle: 'dashed', borderColor: 'gray', top: '50%', paddingTop: '12%', paddingLeft: '170px' }}>Drag 'n' drop some files here, or click to select files</p>
      </div>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
     
        {/* <input type='file' name='file' onChange={FileChangeHandle}></input> */}
        <button style={{marginLeft:'90%',padding:'3px 10px'}} type='submit' onClick={handleSubmit}>Upload</button>
     

    </section>

  );
}

export default Dropzone