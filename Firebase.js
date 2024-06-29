import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey:'AIzaSyAxhm8Zx9PfI-2NjxoMbvncKWL0bU6lJck',
  authDomain:`backup-security.firebaseapp.com`,
  projectId:`backup-security`,
  storageBucket:`backup-security.appspot.com`,
  messagingSenderId:`366145866557`,
  appId:`1:366145866557:web:72ee941d66f446a7bcd354`
};
const app = initializeApp(firebaseConfig);

export default app;