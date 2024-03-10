const { username, password } = process.env;
export const connectionStr =
  "mongodb+srv://sushil3663:" +
  password +
  "@cluster0.r3dt36x.mongodb.net/restoDB?retryWrites=true&w=majority&appName=Cluster0";

export const connectionStrs = "mongodb://127.0.0.1:27017/restoDB";
