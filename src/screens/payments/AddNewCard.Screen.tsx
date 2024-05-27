import { StyleSheet, ScrollView, View } from 'react-native'
import React, { useState } from 'react'
import { Navbar } from 'components/Navbar'
import { FormRules } from 'constants/formRules';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigationParamList } from 'types/navigation.types';
import { InputControlled } from 'components/InputControlled'
import { Routes } from 'router/routes';
import { colors } from 'theme/colors';
import { useForm } from 'react-hook-form';
import { Buttons } from 'components/Buttons';
import { CommonStyles } from 'theme/common.styles';
import { ICardInputFrom } from 'types/card.types'
import { useUserStoreActions } from 'store/user';
import DatePicker from 'react-native-date-picker';

// import { CommonStyles } from 'theme/common.styles';
// import {SceneRendererProps} from 'react-native-tab-view'

export const AddNewCardScreen: React.FC<
    NativeStackScreenProps<NavigationParamList, Routes.addnewcard>
> = ({ navigation }) => {
    const [picker, setPicker] = useState<boolean>(false)
    const { addCard } = useUserStoreActions()
    const {
        control,
        handleSubmit,
        setValue,
        reset,
        formState: { errors },
    } = useForm<ICardInputFrom>();
    const onSubmit = (data: ICardInputFrom) => {
        console.log(data);
        data.id = String(Math.random() * 10000).slice(0, 4)
        addCard(data)
        navigation.navigate(Routes.paymentMethod) //check it 
        reset()
    };
    const onDateConfirm = (date: Date) => {
        const month =
            date.getMonth() + 1 < 10
                ? `0${date.getMonth() + 1}`
                : date.getMonth() + 1;
        const year = String(date.getFullYear()).slice(2)

        setValue('date', `${month} / ${year}`);
        setPicker(false);
    }
    return (
        <View style={CommonStyles.flex}>
            <Navbar
                type="standard"
                leftActionType="icon"
                left={vectors.leftVector}
                onLeftPress={navigation.goBack}
                rightActionType="text"
                right={'Skip'}
            />
            <ScrollView>
                <Navbar type="large" title="Add New Card" />
                <View style={styles.inputs}>
                    <InputControlled
                        name="cardNumber"
                        control={control}
                        manipulator={'cardNumber'}
                        maxLength={19}
                        label="Card Number"
                        errorMessage={errors.cardNumber?.message}
                        rules={FormRules.cardNumber}
                        type="text"
                        keyboardType='numeric'
                        placeholder="Enter your card number"
                    />
                    <InputControlled
                        name="cardHolder"
                        control={control}
                        label="Cardholder Name"
                        errorMessage={errors.cardHolder?.message}
                        rules={FormRules.cardHolder}
                        type="text"
                        placeholder="Enter your holder name"
                    />
                    <InputControlled
                        name="cvv"
                        label='CVV'
                        control={control}
                        maxLength={3}
                        errorMessage={errors.cvv?.message}
                        rules={FormRules.cvv}
                        keyboardType='number-pad'
                        placeholder="Enter your CVV"
                    />
                    <InputControlled
                        name="date"
                        control={control}
                        errorMessage={errors.date?.message}
                        label='Expiration Date'
                        onInputPress={() => setPicker(true)}
                        placeholder="MM/ YY"
                    />
                </View>
                <Buttons text='Add Card'
                    onPress={handleSubmit(onSubmit)} />
                <DatePicker
                    modal={true}
                    open={picker}
                    date={new Date()}
                    mode='date'
                    theme='light'
                    onCancel={() => setPicker(false)}
                    title={'Select Expiration Date'}
                    onConfirm={onDateConfirm}
                />
            </ScrollView>
        </View>
    )
}

const vectors = {
    leftVector: {
        icon: require('../../assets/vectors/chevron-left.svg'),
        color: colors.ink.base,
    },
};

const styles = StyleSheet.create({
    inputs: {
        gap: 24,
        marginTop: 24,
        marginBottom: 32
    },
})