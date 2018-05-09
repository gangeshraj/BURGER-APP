import axios from 'axios';

//an instance of axios 
const instance=axios.create({//an axios object to have http request
    baseURL: 'https://burger-app-react-gangesh.firebaseio.com/' //base url used whenever axios instance used
    //instead of import axios from 'axios'
});

export default instance;