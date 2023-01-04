import React, { useState, useEffect } from "react";
import "./TweetBox.css";
import Avatar from "avataaars";
import { generateRandomAvatarOptions } from "./avatar";
import { Button } from "@material-ui/core";
import axios from "axios";
import { TwitterContractAddress } from "./config.js";
import { ethers } from "ethers";
import Twitter from "./utils/TwitterContract.json";

function TweetBox() {
  const [tweetMessage, setTweetMessage] = useState("");
  const [tweetHeader, setTweetHeader] = useState("");
  const [tweetImg, setTweetImg] = useState("");
  const [avatarOptions, setAvatarOptions] = useState("");

  const addTweet = async () => {
    const mHeading = "<h1>" + tweetHeader + "</h1>";
    const mImg = `<img src="${tweetImg}" width="400" height="400"/>`;
    const fin = mHeading + mImg + "<br>" + tweetMessage;
    let tweet = {
      tweetText: fin,
      isDeleted: false,
    };

    try {
      const { ethereum } = window;

      if (ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TwitterContractAddress,
          Twitter.abi,
          signer
        );

        let twitterTx = await TwitterContract.addTweet(
          tweet.tweetText,
          tweet.isDeleted
        );

        console.log(twitterTx);
      } else {
        console.log("Ethereum object doesn't exist!");
      }
    } catch (error) {
      console.log("Error submitting new Tweet", error);
    }
  };

  const sendTweet = (e) => {
    e.preventDefault();

    addTweet();

    setTweetMessage("");
    setTweetHeader("");
    setTweetImg("");
  };

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    let avatar = generateRandomAvatarOptions();
    setAvatarOptions(avatar);
  }, []);

  return (
    <div className="tweetBox">
      <form>
        <div className="tweetBox__input">
          <Avatar
            style={{ width: "100px", height: "100px" }}
            avatarStyle="Circle"
            {...avatarOptions}
          />
          <input
            onChange={(e) => setTweetHeader(e.target.value)}
            value={tweetHeader}
            placeholder="Heading"
            // className="headingInput"
            type="text"
          />

          <input
            onChange={(e) => setTweetImg(e.target.value)}
            value={tweetImg}
            placeholder="imgUrl"
            // className="imgInput"
            type="text"
          />

          <input
            onChange={(e) => setTweetMessage(e.target.value)}
            value={tweetMessage}
            placeholder="Content"
            type="text"
          />
        </div>

        <Button
          onClick={sendTweet}
          type="submit"
          className="tweetBox__tweetButton"
        >
          Post
        </Button>
      </form>
    </div>
  );
}

export default TweetBox;
