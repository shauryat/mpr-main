import React, { useState, useEffect } from "react";

import { useParams, Link } from "react-router-dom";
import Sidebar from "../Sidebar";
import "./PostExpand.css";

import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

import FileCopyIcon from "@material-ui/icons/FileCopy";

import { TwitterContractAddress } from "../config.js";
import { ethers } from "ethers";
import Twitter from "../utils/TwitterContract.json";

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(1),
  },
}));

const PostExpand = () => {
  const [open, setOpen] = React.useState(false);
  const params = useParams();

  const classes = useStyles();

  const copyFn = (event) => {
    navigator.clipboard.writeText(`${window.location.href}`);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  // const mContent = linkify(params.content);

  const action = (
    <React.Fragment>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  const [posts, setPosts] = useState([]);

  const getUpdatedTweets = (allTweets, address) => {
    let updatedTweets = [];
    // Here we set a personal flag around the tweets
    for (let i = 0; i < allTweets.length; i++) {
      if (allTweets[i].username.toLowerCase() == address.toLowerCase()) {
        let tweet = {
          id: allTweets[i].id,
          tweetText: allTweets[i].tweetText,
          isDeleted: allTweets[i].isDeleted,
          username: allTweets[i].username,
          personal: true,
        };
        updatedTweets.push(tweet);
      } else {
        let tweet = {
          id: allTweets[i].id,
          tweetText: allTweets[i].tweetText,
          isDeleted: allTweets[i].isDeleted,
          username: allTweets[i].username,
          personal: false,
        };
        updatedTweets.push(tweet);
      }
    }
    return updatedTweets;
  };

  const getAllTweets = async () => {
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

        let allTweets = await TwitterContract.getAllTweets();
        setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
      } else {
        console.log("Ethereum object doesn't exist");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAllTweets();
  }, []);

  const [mText, setText] = useState("LOADING ...");

  const fetchPostContent = async () => {
    const ID = params.postId - 12;
    const postContent = posts[ID];
    // console.log(postContent);
    const hmmm = await postContent.tweetText;
    setText(hmmm);

    console.log(hmmm);
  };

  fetchPostContent();

  const linkify = (text) => {
    var urlRegex =
      /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gi;

    return text.replace(urlRegex, function (url) {
      return '<a href="' + url + '">' + url + "</a>";
    });
  };

  const m = linkify(mText);

  return (
    <div className="container">
      <Sidebar />

      <div className="marger">
        <h4 dangerouslySetInnerHTML={{ __html: m }} />
        <br />
        <h4 className="author">
          <i>Author : {params.user}</i>
        </h4>
        <br />

        <Button
          variant="outlined"
          onClick={copyFn}
          startIcon={<FileCopyIcon />}
        >
          Copy Link
        </Button>
        <Snackbar
          open={open}
          autoHideDuration={6000}
          onClose={handleClose}
          message="Copied Text"
          action={action}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        />
        {/* <div className="post__avatar">
        <Avatar
          style={{ width: "100px", height: "100px" }}
          avatarStyle="Circle"
          {...generateRandomAvatarOptions()}
        />
      </div> */}
      </div>
    </div>
  );
};

export default PostExpand;
