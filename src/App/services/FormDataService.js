import React from 'react'
import { Config } from "../constants/index";

export default class FormDataService {
    static async fetch(
      url = "",
      
        http_verb = "get",
        data = null,
        contentType = "application/json",
        token = true
      ) {
    
        const storedToken = localStorage.getItem(Config.adminApiTokenName)
        
    
        var requestOptions = {
          method: http_verb,
          // mode: 'no-cors',
          headers: {
            Authorization: "Bearer " + storedToken,
            Accept: "application/json",
            // "Content-Type": contentType,
          },
        //   body: JSON.stringify(data)
        };
    
        console.log("storedToken:", storedToken);
    
        if (http_verb.toLowerCase() !== "get") {
          requestOptions["body"] = data;
        }
    
        try
        {
            
          console.log("Config.serverApiUrl + url", Config.serverApiUrl + url);
          const response = await fetch(Config.serverApiUrl + url, requestOptions);
    
          const responseJson = await response.json();
          console.log('responseJson:', responseJson)
    
          return responseJson;
        } catch (err) {
          console.log("Some error", err);
    
    
          return false;
        }
      }

    }