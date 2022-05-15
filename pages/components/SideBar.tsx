import styled from "@emotion/styled";
import "@emotion/react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";

const SideBar = () => {
  const [myAnimeCollections, setMyAnimeCollections] = useState([]);
  useEffect(() => {
    const messagesRef = query(collection(db, "myAnimeCollections"));
    onSnapshot(messagesRef, (snapshot) => {
      // Maps the documents and sets them to the `msgs` state.
      setMyAnimeCollections(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);
  //   useEffect(() => {
  //     const collectionRef = collection(db, "myAnimeCollections");
  //     const q = query(collectionRef, orderBy("timestamp", "desc"));
  //     const getData = onSnapshot(q, (querySnapshot) => {
  //       setMyAnimeCollections(
  //         querySnapshot.docs.map((doc) => ({
  //           //...doc.data(),
  //           id: doc.id,
  //           data: doc.data(),
  //           //timestamp: doc.data().timestamp?.toDate().getTime(),
  //         }))
  //       );
  //     });
  //     return getData;
  //   }, []);

  return (
    <div
      css={{
        backgroundColor: "white",
        padding: "10px",
        marginTop: "10px",
        marginRight: "10px",
        width: "20vw",
        border: "3px skyblue solid",
        borderRadius: "10px",
        overflow: "hidden",
      }}
    >
      <div
        css={{
          display: "flex",
          justifyContent: "space-between",
          alignContent: "start",
          alignItems: "start",
          width: "100%",
        }}
      >
        <div
          css={{
            fontWeight: "bold",
            fontSize: "1em",
          }}
        >
          My Favourite
        </div>
        <a
          href="#"
          css={{
            fontSize: "0.8em",
            color: "grey",
          }}
        >
          View All
        </a>
      </div>
      {myAnimeCollections.map((item) => {
        return (
          <div
            css={{
              display: "flex",
              alignContent: "flex-start",
              alignItems: "flex-start",
              marginTop: "10px",
            }}
          >
            <div
              css={{
                marginRight: "10px",
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg"
                width="80vw"
              ></img>
            </div>
            <div>
              <div
                css={{
                  fontSize: "0.6em",
                  color: "grey",
                }}
              >
                Action, Adventure
              </div>

              <div
                css={{
                  fontSize: "1em",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                {item.data.anime_id}
              </div>

              <div
                css={{
                  fontSize: "0.7em",
                }}
              >
                <b>Status:</b> On Going
              </div>
              <div
                css={{
                  fontSize: "0.7em",
                }}
              >
                <b>Release year:</b> 2014
              </div>
              <div
                css={{
                  fontSize: "0.7em",
                }}
              >
                <b>Duration:</b> 24min, per episode
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SideBar;
