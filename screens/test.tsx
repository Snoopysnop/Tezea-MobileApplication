import {useSelector, useDispatch} from "react-redux"
import { RootState } from "../redux/rootReducer"
import { StyleSheet, Text, View } from 'react-native';


const Test: React.FC = () => {

    const testReduxData = useSelector((state: RootState) => state.test.data)

    return(
        <Text>TEST</Text>
    )
}

export default Test