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
    margin-top: 10px;
    background-color: skyblue;

    display: flex;
    justify-content: center;
    align-content: center;
    align-items: center;
    font-weight: lighter;
    &:hover {
      opacity: 0.5;
      cursor: pointer;
    }
  `;

  const addToCollectionHandle = async (album_id, currentSavedAnime) => {
    if (album_id != "" && currentSavedAnime.includes(props.animeid) == false) {
      try {
        currentSavedAnime.push(props.animeid);
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
                  >
                    <ButtonAddAlbum>+ Add New Album</ButtonAddAlbum>
                  </span>
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
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
