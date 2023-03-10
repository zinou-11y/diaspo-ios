import {StyleSheet} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import {ScrollView} from 'react-native';
import PrimaryHead from '../../../components/Headers/root/PrimaryHead';
import MainTypes from './Components/main';
import RectanglePrice from '../../../components/views/Rectangle-Price';
import Recent from './Components/Recent';
import Events from './Components/Events';
import HomeLayout from '../../../components/views/Layouts/AppLayout/HomeLayout';
import Space from '../../../components/Space';
import BottomSheetTopUpAccount from './Components/BottomSheetTopUpAccount';
import {useRef} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import BottomSheetCashIn from './Components/BottomSheetCashIn';
import BottomSheetSelect from './Components/BottomSheetSelect';
import {walletAccounts} from '../../../redux/Features/WalletAccount/Slice';
import {updateNotify} from '../../../redux/Features/Tontine/Participants/updateUserNotify/slice';
import {getUserInformations} from '../../../redux/Features/authentification/User_informations/slice';
import Spiner from '../../../components/spiner';
import BottomSheetKyc from './Components/BottomSheetKYC';
import {useIsFocused} from '@react-navigation/native';
import {UseHome} from './Hooks/useHooks';

const Home = ({navigation}) => {
  const dispatch = useDispatch();
  const bottomSheetModalRef = useRef(null);
  const bottomSheetModalRef2 = useRef(null);
  const bottomSheetModalRef3 = useRef(null);
  const KycRef = useRef(null);
  const {object, objectUpdate,objectWallet} = UseHome();

  const [Change, setChange] = useState();
  const [price, setPrice] = useState();

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handlePresentModalCashIn = useCallback(() => {
    bottomSheetModalRef2.current?.present();
  }, []);
  const handlePresentModalSelect = useCallback(() => {
    // bottomSheetModalRef3.current?.present();
  }, []);
  const closeBottomUp2 = useCallback(() => {
    bottomSheetModalRef2.current.close();
  }, []);

  const closeBottomUp3 = useCallback(() => {
    bottomSheetModalRef3.current.close();
  }, []);

  const closeBottomKyc = useCallback(() => {
    KycRef.current.close();
  }, []);

  const closeBottomUp1 = useCallback(() => {
    bottomSheetModalRef.current.close();
  }, []);

  const ChangeAccount = Item => {
    setChange(Item.name);
    setPrice(Item.balance);
    closeBottomUp3();
  };

  useEffect(() => {
    dispatch(walletAccounts(objectWallet));
  }, []);

  useEffect(() => {
    dispatch(updateNotify(objectUpdate));
  }, [objectUpdate.data.deviceToken, objectUpdate.data.deviceOs]);

  const isFocused = useIsFocused();

  useEffect(() => {
    dispatch(getUserInformations(object.userId));
  }, [isFocused]);

  const {isLoading} = useSelector(state => state.walletAccounts);



  return (
    <>
      {isLoading ? (
        <Spiner />
      ) : (
        <HomeLayout>
          <PrimaryHead
            title={'Diaspo'}
            openDrawer={() => navigation.toggleDrawer()}
            navigation={() => navigation.navigate('Notifications')}
          />
          <ScrollView contentContainerStyle={{}}>
            <MainTypes
              navigation={navigation}
              onPress={handlePresentModalCashIn}
            />

            <RectanglePrice
              onPress={handlePresentModalSelect}
              Change={Change}
              price={price}
            />

            <Recent
              onPress={() => {
                navigation.navigate('Categories');
              }}
            />
            <Space />
            <Events
              onPress={() => {
                // navigation.navigate("Categories");
              }}
            />

            <Space space={140} />
          </ScrollView>

          {/* Account */}
          <BottomSheetTopUpAccount
            bottomSheetModalRef={bottomSheetModalRef}
            bottomSheetModalRef2={bottomSheetModalRef2}
            onPress={handlePresentModalPress}
            navigation={navigation}
            closeBottomUp1={closeBottomUp1}
            closeBottomUp2={closeBottomUp2}
          />

          {/* Select Type */}
          <BottomSheetCashIn
            bottomSheetModalRef={bottomSheetModalRef2}
            onPress={handlePresentModalCashIn}
            onPress2={handlePresentModalPress}
            closeBottomUp2={closeBottomUp2}
            closeBottomUp1={closeBottomUp1}
            navigation={navigation}
          />

          {/* Select Diaspo Account */}
          {/* ! TO DELETE */}
          <BottomSheetSelect
            bottomSheetModalRef={bottomSheetModalRef3}
            onPress={handlePresentModalSelect}
            onPress2={handlePresentModalPress}
            closeBottomUp2={closeBottomUp3}
            navigation={navigation}
            ChangeAccount={ChangeAccount}
          />

          {/* CREATE BOTTOM SHEET FOR KYC */}

          <BottomSheetKyc
            bottomSheetModalRef={KycRef}
            navigation={navigation}
            close={closeBottomKyc}
          />
        </HomeLayout>
      )}
    </>
  );
};

export default Home;

const styles = StyleSheet.create({});

// const send = async () => {
//   let data = {
//     data: {
//       id: 5,
//       type: "profile",
//       name: "mee",
//     },
//     title: "meeme",
//     body: "check me",
//     token:
//       "cpnyiO-7TACkg1aXmI5rlN:APA91bEbfXAwS_vuQJehNybltRP9mP-qtWtnXDjTtxTpaYV_jgCSlJmOUKVloGbCCJ5ZfnrEVZWRIpQj8OuJlQkApRPq50KFs8PlgMyLvysNOjvyLOw2-kr6M4sJLgAAUNaRZ0OS8Dja",
//   };
//   let res = await Notifications.sendNotification(data);
//   console.log("res", res);
// };


  // const clearAsyncStorage = async () => {
  //   dispatch(Logout());
  //   AsyncStorage.clear();
  //   dispatch(resetwalletAccount());
  // };

  // console.log('message', message)

  // useEffect(() => {
  //   if (message) {
  //     Alert.alert(
  //       message?.status,
  //       message?.statusDescription
  //         ? message?.statusDescription
  //         : 'Error getting information',
  //       [
  //         {
  //           text: 'Cancel',
  //           onPress: () => {
  //             if (
  //               message?.statusDescription == 'Expired token' ||
  //               message?.statusDescription == 'Wrong number of segments'
  //             ) {
  //               clearAsyncStorage();
  //             } else {
  //               dispatch(resetwalletAccount());
  //             }
  //           },

  //           style: 'cancel',
  //         },
  //         {
  //           text: 'OK',
  //           onPress: () => {
  //             if (message?.statusDescription == 'Expired token') {
  //               clearAsyncStorage();
  //             } else {
  //               dispatch(resetwalletAccount());
  //             }
  //           },
  //         },
  //       ],
  //     );
  //   }
  // }, [message]);
  // const route = useRoute();
  // console.log('route.name', route.name);

  // useEffect(() => {
  //   if (route.name === 'Home') {
  //     setTimeout(() => {
  //       // KycRef.current?.present();
  //     }, 5000);
  //   }
  // }, [isFocused]);