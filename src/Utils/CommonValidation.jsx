export const whiteSpaceValidation = (setValue, setError, body) => {
    const { id, value } = body;
    //string is empty
    if (!value.trim()) {
      setValue(id, '');
      setError(id);
    }
  };
  