import { GET_POSTS_PENDING, GET_POSTS_SUCCESS, GET_POSTS_FAILURE } from '../actions/getPosts';

const initialState = {
  pending: false,
  success: [],
  failure: ''
};

const getPosts = (state = initialState, action) => {
  switch(action.payload) {
    case GET_POSTS_PENDING:
      return {
        ...state,
        pending: action.payload
      }

    case GET_POSTS_SUCCESS:
      return {
        ...state,
        success: action.payload
      }

    case GET_POSTS_FAILURE:
      return {
        ...state,
        failure: action.payload
      }

    default:
      return state
  }
};

export default getPosts;