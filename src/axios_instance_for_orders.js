import axios from 'axios';

//an instance of axios 
const instance=axios.create({//an axios object to have http request
    baseURL: 'https://burger-app-react-gangesh.firebaseio.com/'
});

export default instance;