import React,{useState, useEffect} from 'react'
import {ScrollView, View, Text,StyleSheet,Alert,Dimensions,KeyboardAvoidingView} from 'react-native'
import { TextInput,Button} from 'react-native-paper'
import {launchCamera, launchImageLibrary} from 'react-native-image-picker'
import { Camera, CameraType } from 'expo-camera';
// import * as ImagePicker from "expo-image-picker"
import * as ImagePicker from 'expo-image-picker'
import { store,auth,storage,firebaseConfig} from '../firebase';
import MapView, {Marker} from "react-native-maps";
import MapInput, { MapInputVariant } from 'react-native-map-input';
import * as Location from 'expo-location';
import Map from './Map';
import { Context } from '../Context';
import AsyncStorage from "@react-native-async-storage/async-storage";



const storageRef = storage.ref();



const CreateAd = ({navigation}) => {

    const {pin,setPin} = React.useContext(Context);
    const [uploading,setUploading] = useState(false);
    // useEffect((e)=>{
    //     e.preventDefault();
    //   },[])
      
    const [LandMrk,setLandMrk] = useState('')
    const [desc,setDesc] = useState('')
    const [size,setSize] = useState('')
    const [price,setPrice] = useState('')
    const [phone,setPhone] = useState('')
    const [maxCap,setMaxcap] = useState('')
    const [address,setAddress] = useState('')
    const [image1,setImage1] = useState("");
    const [image2,setImage2] = useState("");
    const [image3,setImage3] = useState("");
    const [image4,setImage4] = useState("");
    const [image5,setImage5] = useState("");
    const [tempImage1,setTempImage1] = useState("");
    const [tempImage2,setTempImage2] = useState("");
    const [tempImage3,setTempImage3] = useState("");
    const [tempImage4,setTempImage4] = useState("");
    const [tempImage5,setTempImage5] = useState("");
    const [images,setImages] = useState([]);

   

    const postData = async ()=>{
    
        try{
              await store.collection('ads')
          .add({
            LandMrk,
              desc,
              size,
              price,
              phone,
              maxCap,
              address,
              tempImage1,
              tempImage2,
              tempImage3,
              tempImage4,
              tempImage5,
              pin,
              uid:auth.currentUser.uid
          })
          
          Alert.alert("posted your Ad!");

          setLandMrk('');
          setDesc('');
          setSize('');
          setPrice('');
          setPhone('');
          setMaxcap('');
          setAddress('');
          setImage1('');
          setImage2('');
          setImage3('');
          setImage4('');
          setImage5('');
        }catch(err){
            console.log(err);
          Alert.alert("something went wrong.try again")
        }       
    }


// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------
// image ka kaam shuru
const uploadAllImages = async () =>{
    await pickImage1();
}
    const pickImage1 = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsMultipleSelection:true,
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            // allowsEditing:true,
            selectionLimit: 5,
            aspect: [4,3],
            quality:1,
        });

        // console.log(result);
        if(!result.cancelled){
            setImages(result.uri ? [result.uri]:result.selected);
        }
        // const source = {uri: result.uri};
        // console.log(source);
        // setImage(source);
        // setTempImage1(source.uri);
        // console.log(source);
        
        console.log(images[0].uri); // source hia image[i].uri
        console.log(images[1].uri);
        console.log(images[2].uri);
        console.log(images[3].uri);
        console.log(images[4].uri);

        const source = {uri: images[0].uri};
        console.log(source);
        setImage1(source);
        setTempImage1(source.uri);
        console.log(tempImage1);

        uploadImage1();
    };
    const uploadImage1 = async () => {
        setUploading(true);
        const response = await fetch(image1.uri)
        const blob = await response.blob();
        const filename = Date.now();
        var ref = storageRef.child(`${filename}`).put(blob);
        ref.then((snapshot)=>{
            ref.snapshot.ref.getDownloadURL().then((downloadURL) => {
                setTempImage1(downloadURL)
            });
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if(progress==100){alert("uploaded 1"); console.log("uploaded 1")}
        }
        )

        try{
            await ref;
        }catch(e){
            console.log(e);
        }
        setUploading(false);
        // Alert.alert('image uploaded..!!');
        console.log(tempImage1);
        setImage1("");
        setTempImage1("");
        pickImage2();
    };


    const pickImage2 = async () => {

        const source = {uri: images[1].uri};
        console.log(source);
        setImage2(source);
        setTempImage2(source.uri);
        uploadImage2();
    };
    const uploadImage2 = async () => {
        setUploading(true);
        const response = await fetch(image2.uri)
        const blob = await response.blob();
        const filename = Date.now();
        var ref = storageRef.child(`${filename}`).put(blob);
        ref.then((snapshot)=>{
            ref.snapshot.ref.getDownloadURL().then((downloadURL) => {
                setTempImage2(downloadURL)
            });
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if(progress==100){alert("uploaded 2"); console.log("uploaded 2")}
        }
        )

        try{
            await ref;
        }catch(e){
            console.log(e);
        }
        setUploading(false);
        // Alert.alert('image uploaded..!!');
        console.log(tempImage2);
        setImage2("");
        setTempImage2("");
        pickImage3();
    };


    const pickImage3 = async () => {

        const source = {uri: images[2].uri};
        console.log(source);
        setImage3(source);
        setTempImage3(source.uri);
        console.log(source);
        
        uploadImage3();
    };
    const uploadImage3 = async () => {
        setUploading(true);
        const response = await fetch(image3.uri)
        const blob = await response.blob();
        const filename = Date.now();
        var ref = storageRef.child(`${filename}`).put(blob);
        ref.then((snapshot)=>{
            ref.snapshot.ref.getDownloadURL().then((downloadURL) => {
                setTempImage3(downloadURL)
            });
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if(progress==100){alert("uploaded 3"); console.log("uploaded 3")}
        }
        )

        try{
            await ref;
        }catch(e){
            console.log(e);
        }
        setUploading(false);
        // Alert.alert('image uploaded..!!');
        console.log(tempImage3);
        setImage3("");
        setTempImage3("");
        pickImage4();
    };


    const pickImage4 = async () => {

        const source = {uri: images[3].uri};
        console.log(source);
        setImage4(source);
        setTempImage4(source.uri);
        console.log(source);
        
        uploadImage4();
    };
    const uploadImage4 = async () => {
        setUploading(true);
        const response = await fetch(image4.uri)
        const blob = await response.blob();
        const filename = Date.now();
        var ref = storageRef.child(`${filename}`).put(blob);
        ref.then((snapshot)=>{
            ref.snapshot.ref.getDownloadURL().then((downloadURL) => {
                setTempImage4(downloadURL)
            });
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if(progress==100){alert("uploaded 4"); console.log("uploaded 4")}
        }
        )

        try{
            await ref;
        }catch(e){
            console.log(e);
        }
        setUploading(false);
        // Alert.alert('image uploaded..!!');
        console.log(tempImage4);
        setImage4("");
        setTempImage4("");
        pickImage5();
    };


    const pickImage5 = async () => {

        const source = {uri: images[4].uri};
        console.log(source);
        setImage5(source);
        setTempImage5(source.uri);
        console.log(source);
        
        uploadImage5();
    };
    const uploadImage5 = async () => {
        setUploading(true);
        const response = await fetch(image5.uri)
        const blob = await response.blob();
        const filename = Date.now();
        var ref = storageRef.child(`${filename}`).put(blob);
        ref.then((snapshot)=>{
            ref.snapshot.ref.getDownloadURL().then((downloadURL) => {
                setTempImage5(downloadURL)
            });
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            if(progress==100){alert("uploaded 5"); console.log("uploaded 5")}
        }
        )

        try{
            await ref;
        }catch(e){
            console.log(e);
        }
        setUploading(false);
        // Alert.alert('image uploaded..!!');
        console.log(tempImage5);
        setImage5("");
        setTempImage5("");
    };


// image ka kaam khatam
// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------------


    // const echoo=()=>{
    //     console.log(tempImage);
    // };


    
    // const selectPhoto = async ()=>{
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         mediaTypes: ImagePicker.MediaTypeOptions.All,
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //         quality: 1,
    //       });
      
    //       console.log(result.uri);
      
    //       if (!result.cancelled) {
    //         setImage(result.uri);
    //         console.log(result.uri)
            
    //       }

    //       const uploadTask = storageRef.child(`${Date.now()}`).putFile(result.uri)

    //       uploadTask.on('state_changed', 
    //         (snapshot) => {
               
    //             var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //              if(progress==100){alert("uploaded")}
    //         }, 
    //         (error) => {
    //            alert("something went wrong")
    //         }, 
    //         () => {
    //             uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {

    //                 setImage(downloadURL)
    //             });
    //         }
    //         );
    //    }


    //    --------------------------------------------
    
    // const openCamera = ()=>{
    //     launchImageLibrary({quality:0.5},(fileobj)=>{
    //         const uploadTask =  storage().ref().child(`/items/${Date.now()}`).putFile(fileobj.uri)
    //         uploadTask.on('state_changed', 
    //         (snapshot) => {
               
    //             var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    //              if(progress==100){alert("uploaded")}
    //         }, 
    //         (error) => {
    //            alert("something went wrong")
    //         }, 
    //         () => {
    //             // Handle successful uploads on complete
    //             // For instance, get the download URL: https://firebasestorage.googleapis.com/...
    //             uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                   
    //                 setImage(downloadURL)
    //             });
    //         }
    //         );
    //        })
    //    }
    
    //    --------------------------------------------
    
       
  return (

    

    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}
  showsHorizontalScrollIndicator={false}>
            <TextInput style={styles.inputBox}
                label="Land Mark"
                value={LandMrk}
                mode="outlined"
                onChangeText={text => setLandMrk(text)}
                />
            
            <TextInput style={styles.inputBox}
                label="Full address"
                value={address}
                numberOfLines={3}
                multiline={true}
                mode="outlined"
                onChangeText={text => setAddress(text)}
                />
            <TextInput style={styles.inputBox}
                label="Describe room/place"
                value={desc}
                mode="outlined"
                numberOfLines={5}
                multiline={true}
                onChangeText={text => setDesc(text)}
                />
            <TextInput style={styles.inputBox}
                label="size of Room"
                value={size}
                mode="outlined"
                // keyboardType="numeric"
                onChangeText={text => setSize(text)}
                />
            <TextInput style={styles.inputBox}
                label="maximum capacity of room"
                value={maxCap}
                mode="outlined"
                keyboardType="numeric"
                onChangeText={text => setMaxcap(text)}
                />
            <TextInput style={styles.inputBox}
                label="price in INR"
                value={price}
                mode="outlined"
                // keyboardType="numeric"
                onChangeText={text => setPrice(text)}
                />
            <TextInput style={styles.inputBox}
                label="Your contact Number"
                value={phone}
                mode="outlined"
                keyboardType="numeric"
                onChangeText={text => setPhone(text)}
                />

                <Button style={styles.button}
                    onPress = {()=> {navigation.navigate('map');
                    }} title='Map' mode="contained"
                >
                    Set Location
                </Button>

                <Button style={styles.button} icon="camera"  mode="contained" onPress={() => uploadAllImages()}>
                     Upload 5 images
                 </Button>
                {/* <Button style={styles.button} icon="camera"  mode="contained" onPress={() => pickImage2()}>
                     pick Image 2
                 </Button>
                <Button style={styles.button} icon="camera"  mode="contained" onPress={() => pickImage3()}>
                     pick Image 3 
                 </Button>
                <Button style={styles.button} icon="camera"  mode="contained" onPress={() => pickImage4()}>
                     pick Image 4
                 </Button>
                <Button style={styles.button} icon="camera"  mode="contained" onPress={() => pickImage5()}>
                     pick Image 5
                 </Button> */}
                 
                {/* <Button style={styles.button} icon="camera"  mode="contained" onPress={() => uploadImage()}>
                     upload Image
                 </Button> */}

                <Button style={styles.button} mode="contained" onPress={() => postData()}>
                     Post
                 </Button>
        </ScrollView>

  );
};

const styles = StyleSheet.create({
    inputBox:{
        margin:2,

    },
    button:{
        margin:4,
        
    },
    container:{
        flex:1,
        marginHorizontal:30,
        // justifyContent:"space-evenly",
        marginTop: 60,
    },
    text:{
        fontSize:24,
        textAlign:"center"
    },
    map: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height,
      },
     });
     
     
export default CreateAd;