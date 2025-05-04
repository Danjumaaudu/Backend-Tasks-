import dotenv from "dotenv";
dotenv.config();

export default {
  port: process.env.PORT || 5000,
  dbURI:
    process.env.NODE_ENV === "development"
      ? process.env.LOCAL_DB
      : process.env.NODE_ENV === "test"
      ? process.env.TEST_DB
      : process.env.DB,
  jwtSecret: process.env.JWT_SECRET as string,
  accessTokenPrivateKey: process.env.ACCESS_TOKEN_PRIVATE_KEY,
  refreshTokenPrivateKey: process.env.REFRESH_TOKEN_PRIVATE_KEY,
};
