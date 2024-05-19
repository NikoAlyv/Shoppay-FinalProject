import {StyleSheet, View, Keyboard, ScrollView} from 'react-native';
import React from 'react';
import {Navbar} from 'components/Navbar';
import {colors} from 'theme/colors';
import {OtpCodeField} from 'components/OtpCodeField';
import {TextLink} from 'components/TextLinks';
import {Buttons} from 'components/Buttons';
import {CommonStyles} from 'theme/common.styles';
import {NavigationParamList} from 'types/navigation.types';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {Routes} from 'router/routes';

console.warn = (message: string) => {
  if (message.includes('Non-serializable')) {
    return;
  }
};
export const VerificationScreen: React.FC<
  NativeStackScreenProps<NavigationParamList, Routes.verification>
> = ({navigation}) => {
  const [code, setCode] = React.useState<string>('');
  const verify = () => {
    navigation.navigate(Routes.modalScreen, {
      title: 'What’s your team name',
      wrapperStyle: {gap: 24},
      buttons: [
        {
          text: 'Agree and continue',
          types: 'primary',
          onPress: () => navigation.navigate(Routes.paymentMethod),
        },
        {
          text: 'Disagree and close',
          types: 'transparent',
          onPress: navigation.goBack,
        },
      ],
      subTitle: (
        <TextLink
          content={modalContent}
          center
          highlighted={modalHighlighted}
        />
      ),
      onClose: () => {},
      closeable: true,
    });
  };

  return (
    <ScrollView scrollEnabled={false} contentContainerStyle={CommonStyles.flex}>
      <Navbar
        onLeftPress={navigation.goBack}
        type="standard"
        leftActionType="icon"
        left={vectors.arrowLeft}
      />
      <Navbar type="large" title="Enter SMS Code" />
      <OtpCodeField
        setCode={setCode}
        code={code}
        style={styles.otp}
        triggerOnFinish={Keyboard.dismiss}
        length={4}
      />
      <View style={styles.footer}>
        <TextLink
          content="Didn’t receive code? Resend Code"
          center
          highlighted={highlighted}
        />
        <Buttons
          onPress={verify}
          text="Continue"
          disabled={code.length !== 4}
        />
      </View>
    </ScrollView>
  );
};

const modalContent =
  'I agree to the Terms of Service and Conditions of Use including consent to electronic communications and I affirm that the information provided is my own.';

const modalHighlighted = [
  {
    text: 'Terms of Service and Conditions',
    callback: () => console.log('Terms of Service and Conditions'),
  },
];

const highlighted = [
  {
    text: 'Resend Code',
    callback: () => console.log('Resend Code'),
  },
];

const vectors = {
  arrowLeft: {
    icon: require('../../assets/vectors/arrow-left.svg'),
    color: colors.ink.darkest,
  },
};

const styles = StyleSheet.create({
  otp: {
    paddingHorizontal: 32,
    marginTop: 16,
    marginBottom: 32,
  },
  footer: {
    gap: 32,
  },
  buttons: {
    gap: 12,
  },
});
