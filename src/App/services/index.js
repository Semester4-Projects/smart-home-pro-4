// Config file
import { Config } from "../constants/index";

export default class PP2Service {
  /**
   *
   * @param {string} url
   * @param {string} http_verb
   */

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
      headers: {
        Authorization: "Bearer " + storedToken,
        Accept: "application/json",
        "Content-Type": contentType,
      },
    //   body: JSON.stringify(data)
    };

    console.log("storedToken:", storedToken);

    if (http_verb.toLowerCase() !== "get") {
      requestOptions["body"] = JSON.stringify(data);
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

      //Sentry.captureException(err)
      // Sentry.captureMessage(
      // 	'Wrong url request' + url + ' httpverbs' + http_verb,
      // )

      return false;
    }
  }
}
