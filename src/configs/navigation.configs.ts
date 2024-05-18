import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { colors } from "theme/colors";
import { normalize } from 'theme/metrics'

export const defaultScreenOptions: NativeStackNavigationOptions = {
    headerShown: false,
    orientation: 'portrait',
    contentStyle: {
        backgroundColor: colors.white
    }
}

export const authStackScreenOption: NativeStackNavigationOptions = {
    ...defaultScreenOptions,
    contentStyle: {
        backgroundColor: colors.white,
        paddingHorizontal: normalize('horizontal', 24)
    }
}
export const modalScreenOptions: NativeStackNavigationOptions ={
...defaultScreenOptions,
presentation:'transparentModal',
animation:'fade_from_bottom',
contentStyle:{
    backgroundColor:'transparent'
}
}