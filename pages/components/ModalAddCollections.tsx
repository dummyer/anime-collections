import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ReactPlayer from "react-player";
import { Close } from "@mui/icons-material";
import "@emotion/react";
import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import styled from "@emotion/styled";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "50vw",
  height: "70vh",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function CollectionModal(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [newAlbum, setNewAlbum] = useState("");
  const [myCollectionAlbums, setMyCollectionAlbums] = useState([]);
  useEffect(() => {
    const messagesRef = query(
      collection(db, "myCollectionAlbums"),
      orderBy("created_at", "desc")
    );
    onSnapshot(messagesRef, (snapshot) => {
      // Maps the documents and sets them to the `msgs` state.
      setMyCollectionAlbums(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  const ButtonAddAlbum = styled.button`
    font-size: 0.8em;
    border-radius: 4px;
    border: 0px;
    padding: 5px;
    color: white;
    margin-left: 10px;
    background-color: skyblue;
    font-weight: lighter;
    &:hover {
      opacity: 0.5;
      cursor: pointer;
    }
  `;

  const addToCollectionHandle = async (album_id, currentSavedAnime) => {
    if (album_id != "") {
      try {
        if (currentSavedAnime.includes(props.animeid) == false) {
          currentSavedAnime.push(props.animeid);
        } else {
          var index = currentSavedAnime.indexOf(props.animeid);
          if (index !== -1) {
            currentSavedAnime.splice(index, 1);
          }
        }

        const taskDocRef = doc(db, "myCollectionAlbums", album_id);
        await updateDoc(taskDocRef, {
          added_anime_id: currentSavedAnime,
          update_at: Timestamp.now(),
        });
      } catch (err) {
        alert(err);
      }
    }
  };

  const addNewAlbum = async () => {
    var format = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (newAlbum != "") {
      if (!format.test(newAlbum)) {
        try {
          var tmpPrevAlbumName = [];
          myCollectionAlbums.map((item) => {
            tmpPrevAlbumName.push(item.data.album_name);
          });
          if (tmpPrevAlbumName.includes(newAlbum) == false) {
            await addDoc(collection(db, "myCollectionAlbums"), {
              added_anime_id: [],
              album_name: newAlbum,
              created_at: Timestamp.now(),
              update_at: Timestamp.now(),
            });
          } else {
            alert("Name already exists!");
          }
          setNewAlbum("");
        } catch (err) {
          alert(err);
        }
      } else {
        alert("Name should not contain any special character");
      }
    } else {
      alert("Please input album name");
    }
  };

  return (
    <div>
      <div onClick={handleOpen}>{props.children}</div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              <div
                css={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div
                  css={{
                    display: "flex",
                    justifyContent: "center",
                    alignContent: "center",
                    alignItems: "center",
                  }}
                >
                  <span>Choose Albums</span>
                  <span
                    css={{
                      marginLeft: "10px",
                    }}
                  ></span>
                </div>
                <div>
                  <Close
                    onClick={handleClose}
                    css={{
                      ":hover": {
                        opacity: "0.5",
                        cursor: "pointer",
                      },
                    }}
                  />
                </div>
              </div>
            </Typography>
            <Typography
              id="transition-modal-description"
              sx={{ mt: 2 }}
              css={{
                overflowY: "auto",
                height: "58vh",
                width: "100%",
              }}
            >
              {myCollectionAlbums.map((item) => {
                return (
                  <div
                    css={{
                      paddingBottom: "10px",
                    }}
                  >
                    <button
                      onClick={addToCollectionHandle.bind(
                        this,
                        item.id,
                        item.data.added_anime_id
                      )}
                      css={{
                        marginRight: "10px",
                        backgroundColor: "orange",
                        border: "0px",
                        padding: "5px",
                        color: "white",
                        borderRadius: "5px",
                        opacity: `${
                          item.data.added_anime_id.includes(props.animeid)
                            ? "0.5"
                            : "1"
                        }`,
                        ":hover": {
                          opacity: "0.5",
                          cursor: "pointer",
                        },
                      }}
                    >
                      Save
                    </button>
                    <label>
                      {item.data.album_name} ({item.data.added_anime_id.length})
                    </label>
                  </div>
                );
              })}
              <div css={{ display: "flex" }}>
                <span>
                  <input
                    type="text"
                    value={newAlbum}
                    onChange={(e) => setNewAlbum(e.target.value)}
                  />
                </span>
                <span>
                  <ButtonAddAlbum onClick={addNewAlbum.bind(this)}>
                    + Add New Album
                  </ButtonAddAlbum>
                </span>
              </div>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
