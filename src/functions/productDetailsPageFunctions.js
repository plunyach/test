import { toast } from "react-toastify";
import { pagePaths } from "../utils/constant";
import { useNavigate } from "react-router-dom";



export const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (e) {
      return false;
    }
  };



export  const imageExists = (url) => {
    const img = new Image();
    img.src = url;
    return img.complete || img.height !== 0;
  };
  


