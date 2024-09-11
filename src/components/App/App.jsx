import forest from "../../assets/audio/forest.mp3";

import Enter from "../Enter/Enter";
import HomeContainer from "../Home/HomeContainer";
import { useState } from "react";

const App = (props) => {
    const [isShow, setIsShow] = useState(true);
    const forestAudio = new Audio(forest);
    forestAudio.loop = true;

    const forestFun = () => {
        forestAudio.play();
        setIsShow(false);
    }
    return(
        <>
            <HomeContainer />
            {isShow && <Enter forestFun={forestFun}/>}
        </>
    )
}

export default App;