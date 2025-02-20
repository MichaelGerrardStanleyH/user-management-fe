import React from "react";
import axios from "axios";
import config from "../config/config";

const signin = async (payload) => {
  try {
    const result = await axios.post(`${config.host}/auth/signin`, payload);
    return result.data;
  } catch (error) {
    console.log(error);
    return await error.message;
  }
};

const signUp = async (payload) => {
  const form = new FormData();
  form.append("name", payload["dto"]["name"]);
  form.append("position", payload["dto"]["position"]);
  form.append("organizationId", payload["dto"]["organizationId"]);
  form.append("image", payload["image"]);
  form.append("email", payload["dto"]["email"]);
  form.append("password", payload["dto"]["password"]);
  
  
  if(!payload["dto"]["reportsToId"] == 0){
      form.append("reportsToId", payload["dto"]["reportsToId"]);
  }
  


  try {
    const result = await axios.post(`${config.host}/auth/signup`, form);
    return result.data;
  } catch (error) {
    console.log(error);
    return await error.message;
  }
};

export default {
  signUp,
  signin,
};
