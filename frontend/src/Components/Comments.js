import React, { useEffect } from 'react'
import { useRef, useState } from 'react';
const Comments = (props) => {
  let comments = props.Comments;
  let commentInput = useRef();
  let [state, setstate] = useState(false)
  let [loadComment, setloadComment] = useState([])
  let [isloading, setisloading] = useState(false)
  let [reload, setreload] = useState(true)

  let SubmitHandler = async (event) => {
    event.preventDefault();
    let commentInputValue = commentInput.current.value;

    try {

      let url = `http://localhost:4700/AddComment/${props.id}`;
      // console.log(url)

      let res = await fetch(url, {
        method: "POST",
        body: JSON.stringify({

          Comments: commentInputValue

        }),
        headers: {
          "Content-type": "application/json"
        }
      }
      )
      if (!res.ok) throw new Error("fetch failed");

      let data = await res.json();
      // console.log(data)

    } catch (err) {

      console.log(err);


    }

    setreload(!reload)

    setstate(true)
    commentInput.current.value = ''




  }

  // console.log(reload)

  useEffect(() => {
    // function loadCommentdHandler() {
    // props.onIdReceiver(props.id)
    // console.log(props.id)
    // console.log("useEffect");
    setstate(!state)
    // if (!state) {
    let loadComment = async function () {
      try {
        setisloading(true)

        let res = await fetch(`http://localhost:4700/LoadComments/${props.id}`);

        if (!res.ok) throw new Error('cooment are not found')
        let data = await res.json();

        setloadComment(data)
        
        // console.log(data.message)
        setisloading(false)


      } catch (err) {
        console.error(err);
        // renderError(`${err.message}`)
      }
    }
    loadComment();
    // }

    // }
  }, [reload])
 let comlength = loadComment?.data?.length
//  console.log(comlength)
  props.onCommentlength(comlength)

  return (
    <>
      {
        loadComment.data?.map((curr) => (

          <div key={Math.random()}>
            <p style={{ borderBottom: 'solid 1px gray' }}>{curr.Comments}</p>
          </div>
        ))
      }
      <form onSubmit={SubmitHandler}>
        <input type='text' placeholder='Comment' ref={commentInput}></input>
        <button type='submit' style={{ marginLeft: '10px', border: 'solid 1px gray', borderRadius: '5px', marginTop: '20px' }}>submit</button>
      </form>
    </>
  )
}

export default Comments