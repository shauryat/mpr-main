import React, { forwardRef } from "react";
import "./Post.css";
import Avatar from "avataaars";
import { generateRandomAvatarOptions } from "./avatar";
import { red } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";

const Post = forwardRef(({ displayName, text, personal, onClick }, ref) => {
  return (
    <div className="post" ref={ref}>
      <div className="post__avatar">
        <Avatar
          style={{ width: "100px", height: "100px" }}
          avatarStyle="Circle"
          {...generateRandomAvatarOptions()}
        />
      </div>
      <div className="post__body">
        <div className="post__header">
          <div className="post__headerText">
            <h3>{displayName} </h3>
          </div>
          <div className="post__headerDescription">
            <p>{text.substr(0, 250)}</p>
            <p style={{ fontSize: "30px", color: "orange" }}>
              {text.length > 250 ? <p>...</p> : ""}
            </p>
          </div>
        </div>
        <div className="post__footer">
          {personal ? (
            <DeleteIcon
              fontSize="small"
              onClick={onClick}
              style={{ color: red[500] }}
            />
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
});

export default Post;
