import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";


function Loaderring(){
    return(
        <Loader type="ThreeDots" color="#0055B3" margin={30} height={100} width={100}/>        
    )
}

export default Loaderring;