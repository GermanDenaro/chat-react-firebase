import {useState, useEffect} from "react"
import "./Main.css"
import Post from "./Post"
import TextField from '@material-ui/core/TextField';
import {db} from "../firebase"
import firebase from "firebase"
import FlipMove from "react-flip-move"
import { useStateValue } from "../Stateprovider"

const Main = () => {
    const [{user}, dispatch] = useStateValue()
    const [posts, setPosts] = useState([])
    const [input, setInput] = useState({
        title: "",
        text: ""
    });

    useEffect(()=>{
        db.collection("posts").orderBy("timestamp", "desc").onSnapshot(snapshot=>setPosts(snapshot.docs.map(doc=>({
            id: doc.id,
            data: doc.data(),
        }))))
    }, [])

    const handleSubmit = (e)=> {
       e.preventDefault();
       if(input.text){
        db.collection("posts").add({
            title: input.title,
            text: input.text,
            username: user?.displayName,
            avatar: user?.photoURL,
            timestamp : firebase.firestore.FieldValue.serverTimestamp(),
            isBlue: false,
        })
        setInput({
            title: "",
            text: ""
        })
       } else {
           alert("Add your post")
       }
      
       console.log(posts);
    }
    return (
        <div className="main">
            <div className="main__input">
            <form  noValidate autoComplete="off">
                <div className="main__inputForm">
                <TextField id="standard-basic" label="Title" value={input.title} onChange={e => setInput({...input, title: e.target.value})}/>
                <TextField className="main__inputFormText" id="outlined-basic" label="Enter your post here ..." variant="outlined" value={input.text} onChange={e => setInput({...input, text: e.target.value})}/>
                </div>
        <button className="button" type="submit" onClick={handleSubmit}></button>
    </form>
            </div>
            <div className="main__posts">
           
                <FlipMove>
                {posts.map(({id, data: {title, text, isBlue, username, avatar}}) => <Post key={id} id={id} title={title} text={text} isBlue={isBlue} username={username} avatar={avatar}/>) }
                </FlipMove>
            </div>
        </div>
    )
}

export default Main
