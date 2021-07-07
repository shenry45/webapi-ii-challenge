import axios from 'axios';

export const GET_POSTS_PENDING = 'GET_POSTS_PENDING';
export const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
export const GET_POSTS_FAILURE = 'GET_POSTS_FAILURE';

export const getPosts = () => dispatch => {
  dispatch({ action: GET_POSTS_PENDING, payload: true });
  
  axios
    .get('http://localhost:4000/api/posts')
    .then(res => {
      dispatch({ 
        action: GET_POSTS_PENDING,
        payload: false
      })
      dispatch({ 
        action: GET_POSTS_SUCCESS,
        payload: res.data
      })
      
    })
    .catch(err => {
      dispatch({ 
        action: GET_POSTS_PENDING,
        payload: false
      })
      dispatch({ 
        action: GET_POSTS_FAILURE,
        payload: err.message
      })
    }
}