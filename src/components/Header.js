import "./Header.css"
import MenuIcon from '@material-ui/icons/Menu';
import { Avatar, Button, Switch } from "@material-ui/core";
import IconButton from '@material-ui/core/IconButton';
import { useStateValue } from "../Stateprovider";
import { actionTypes } from "../reducer";
import { auth } from "../firebase"


const Header = () => {
    const [{isopen, user, darkMode}, dispatch] = useStateValue();
    const signout =() => {
       auth.signOut().then((user)=>dispatch({
           type: actionTypes.SET_USER,
           user: null,
       }))
    }
   const toggleMenu = () => {
       dispatch({
           type: actionTypes.TOGGLE_MENU,
           isopen: !isopen,
       })
   }

    return (
        <div className="header">
           <div className="header__left">
               <IconButton onClick={toggleMenu}>
               <MenuIcon fontSize="large"/>
               </IconButton>
               <img
          src='
          https://static.wixstatic.com/media/1ea17e_a94560da4b8e43ada251e7afd8a85fea~mv2.png/v1/fill/w_221,h_81,al_c,q_85,usm_0.66_1.00_0.01/CUTT-LOGO-PORTRAIT-RGB-MAIN-NEGATIVE-400.webp'
          alt='logo'
        />
           </div>
           <div className="header__right">
                <Avatar src={user?.photoURL}/> 
                <Switch checked={darkMode} onChange={()=>{
                    dispatch({
                        type: actionTypes.SET_DARKMODE,
                        darkMode: !darkMode
                    })
                }}/> 
                {user && <Button onClick={signout} variant="contained">Sign out</Button> }
                
           </div>
        </div>
    )
}

export default Header
