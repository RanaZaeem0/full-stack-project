
import { useDispatch  } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
export default function LogoutBtn() {
  

    const dispatch = useDispatch()
const logoutHandler =()=>{
    authService.logout()
    .then(()=>{
        dispatch(logout())
    })
}

  
    return (
  <button  className='px-6 hover:text-white '
  >Logout</button>
  )
}
