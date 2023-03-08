import React, { useState} from 'react'
import Comments from './Comments'
const ImageContainer = (props) => {
    let [state, setstate] = useState(false)
    let showComments = () => {
        setstate(!state)
    }
    let [comlength, setcomlength] = useState(0)

    let CommentlengthHandler = (l) => {
        // console.log(l)
        setcomlength(l)
    }
    let [voteCount,setvoteCount] =useState(props.VoteCount)
    let voteHandler = async()=>{
        try {

          
            let res = await fetch(`http://localhost:4700/AddVote/${props.id}`, {
              method: "POST",
             
            }
            )
            if (!res.ok) throw new Error("fetch failed");
      
            let data = await res.json();
            console.log(data)
            setvoteCount(++voteCount)
      
          } catch (err) {
      
            console.log(err);
      
      
          }
    }

    return (
        <>
            <div className="main-container">
            {/* <img style={{ height: '400px', width: '100%', borderRadius: '20px' }} src="http://localhost:4700/images/pexels-pixabay-270640.eeee.jpg"></img> */}
            <p>user :{props.userName}</p>
                <img style={{ height: '400px', width: '100%', borderRadius: '20px' }} src={props.img}></img>
                <div className="btn-container">
                    <button onClick={showComments}>Show Comments :{(comlength === 0 ? props.totalComment :comlength) || 0} </button>
                    <h6 onClick={voteHandler}><i style={{fontSize:'22px',marginRight:'5px'}} className="bi bi-hand-thumbs-up-fill"></i>{voteCount}</h6>
                </div>

                {state && <Comments id={props.id} onCommentlength={CommentlengthHandler} />}


                {/* {isloading && <div className="spinner-border" role="status"> <span className="sr-only">Loading...</span></div>} */}
            </div>
        </>
    )
}

export default ImageContainer