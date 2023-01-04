import React, { forwardRef } from "react";
import "./Post.css";
import Avatar from "avataaars";
import { generateRandomAvatarOptions } from "./avatar";
import { red } from "@material-ui/core/colors";
import DeleteIcon from "@material-ui/icons/Delete";

const Post = forwardRef(({ displayName, text, personal, onClick }, ref) => {
  const mText = text.substr(0, 480);
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
            <p dangerouslySetInnerHTML={{ __html: mText }} />
            <p style={{ fontSize: "20px", color: "orange" }}>
              {text.length > 480 ? <p>... more</p> : ""}
            </p>
          </div>
        </div>
        {/* <div className="post__footer">
          {personal ? (
            <DeleteIcon
              fontSize="small"
              onClick={onClick}
              style={{ color: red[500] }}
            />
          ) : (
            ""
          )}
        </div> */}
      </div>
    </div>
  );
});

export default Post;
