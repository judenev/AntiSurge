// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsqpq7hpLM_IyvZaXmD6jcruFCcVC7mrM",
  authDomain: "otp-antisurge.firebaseapp.com",
  projectId: "otp-antisurge",
  storageBucket: "otp-antisurge.appspot.com",
  messagingSenderId: "453863694492",
  appId: "1:453863694492:web:e7415dcd8f36b79d194d59",
  measurementId: "G-55GTP68DR8"
};
   
// const [products, setProducts] = useState([]);
// const [sum1, setSum1] = useState(0);
// let v =props.jobstatus
// let h =[]
// for(const [key,value]of Object.entries(v)){
// h.push({[key]:value})
// }
// console.log("hooi hooi",h);
// useEffect(() => {
//  setProducts(h)

// }, []);
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth =getAuth(app)
