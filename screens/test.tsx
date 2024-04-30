import {useSelector, useDispatch} from "react-redux"
import { RootState } from "../redux/rootReducer"

const Test: React.FC = () => {

    const testReduxData = useSelector((state: RootState) => state.test.data)

    return(
        <div>TEST</div>
    )
}

export default Test