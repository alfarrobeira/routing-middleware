// middleware function needs to have the "next" variable to pass on to the next function
const secure = (req, res, next) => {
  // check if there is a token parameter with value and more than 3 chars
  const { token } = req.params;
  if (token && token.length > 3) 
    next();
  else 
    res.status(403).send("No valid token found");
};

export default secure;
