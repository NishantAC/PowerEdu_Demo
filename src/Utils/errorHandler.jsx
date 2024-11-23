export function handleErrors(error, thunkAPI) {
    if (error.response) {
      thunkAPI.dispatch(setMessage(error.response.data.message));
    } else {
      thunkAPI.dispatch(setMessage("An unexpected error occurred."));
    }
  }
  