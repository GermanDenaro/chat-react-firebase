import { Avatar, IconButton } from "@material-ui/core"
import "./Post.css"
import { useStateValue } from "../Stateprovider"
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpAltOutlinedIcon from '@material-ui/icons/ThumbUpAltOutlined';
import {db} from "../firebase"
import {forwardRef} from "react"

const Post = forwardRef(({id, title, text, isBlue, username, avatar}, ref) => {
    const [{user}, dispatch] = useStateValue()

    const removePost = ()=> {
        db.collection("posts").doc(id).delete()
    }

    const likePost = () =>{
       const likedPost = db.collection("posts").doc(id)
       likedPost.get().then(doc=>likedPost.update({
           isBlue: !doc.data().isBlue
       }))
    }

    return (
        <div className="post" ref={ref}>
            <div className="post__body">
                <div className="post__bodyLeft">
                    <Avatar className="avatar" src={avatar}/> 
                   <h3>{title}</h3>
                   <h4>{text}</h4>
                </div>
                <IconButton onClick={removePost}>
                   <DeleteIcon/>
                </IconButton>
            </div>
            <div className="post__icons">
            <IconButton onClick={likePost}>
               <ThumbUpAltOutlinedIcon color={isBlue ? "primary" : ""}/>
            </IconButton>
            {username}
            </div>
        </div>
    )
})

export default Post
