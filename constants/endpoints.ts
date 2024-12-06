import Constants from "expo-constants";

// TODO: development code
const hostname = Constants.manifest!.debuggerHost!.split(":").shift();
export const SERVER_ENDPOINT = `http://${hostname}:3000`;
