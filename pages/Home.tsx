import styled from "@emotion/styled";
import "@emotion/react";
import {
  GridView,
  Splitscreen,
  StarBorder,
  ArrowBackIos,
  PlayCircle,
} from "@mui/icons-material";
import React, { useState, useEffect, useRef } from "react";
import { useQuery } from "@apollo/client";
import { GetOneAnimeDocument, MostFavAnimeDocument } from "../generated";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useRecoilState } from "recoil";
import { modalState } from "./atoms/modalAtom";
import TransitionsModal from "./components/ModalVideo";
import CollectionModal from "./components/ModalCollections";

const Home = () => {
  //const { data, error, loading } = useQuery(MostFavAnimeDocument);
  const modalRef = ({ handleShow }) => {
    showModal = handleShow;
  };

  const onTrailerClick = () => {
    showModal();
  };

  const [showModal, setShowModal] = useRecoilState(modalState);
  const queryMultiple = () => {
    const res1 = useQuery(MostFavAnimeDocument);
    const res2 = useQuery(GetOneAnimeDocument);
    return [res1, res2];
  };

  const [
    {
      loading: loadMostFavAnime,
      data: dataMostFavAnime,
      error: errorMostFavAnime,
    },
    {
      loading: loadGetOneAnime,
      data: dataGetOneAnime,
      error: errorGetOneAnime,
    },
  ] = queryMultiple();

  const [mostPopularAnime, setMostPopularAnime] = useState([]);
  const [isViewDetailAnime, setIsViewDetailAnime] = useState(false);
  const [detailAnime_title, setDetailAnime_title] = useState("");
  const [detailAnime_cover, setDetailAnime_cover] = useState("");
  const [detailAnime_trailer, setDetailAnime_trailer] = useState("");
  const [detailAnime_desc, setDetailAnime_desc] = useState("");
  const [detailAnime_genre, setDetailAnime_genre] = useState("");
  const [detailAnime_status, setDetailAnime_status] = useState("");
  const [detailAnime_releaseYear, setDetailAnime_releaseYear] = useState("");
  const [detailAnime_duration, setDetailAnime_duration] = useState("");
  const [detailAnime_episode, setDetailAnime_episode] = useState("");
  const [detailAnime_score, setDetailAnime_score] = useState("");

  const [isSelectedGrid, setIsSelectedGrid] = useState(true);
  const HomeContainer = styled.div`
    background-color: white;
    overflow: hidden;
    border: 3px skyblue solid;
    border-radius: 10px;
    margin-top: 10px;
    margin-left: 10px;
    margin-right: 10px;
    height: 85vh;
    padding: 10px;
  `;

  const GridContainer = styled.div`
    display: ${isSelectedGrid ? "grid" : "block"};
    grid-template-columns: auto auto auto;
    padding: 10px;
    overflow-y: auto;
    height: 82vh;
    align-content: start;
  `;

  const GridItem = styled.div`
    background-color: rgba(255, 255, 255, 0.8);
    //border: 1px solid rgba(0, 0, 0, 0.8);
    padding: 10px;
    text-align: left;
    border-radius: 10px;
    margin: 10px;
    box-shadow: 0 3px 10px rgb(0 0 0 / 0.2);
    // &:hover {
    //   opacity: 0.5;
    //   cursor: pointer;
    // }
  `;

  const ButtonTrailer = styled.button`
    font-size: 1em;
    border-radius: 4px;
    border: 0px;
    padding: 10px;
    color: white;
    width: 200px;
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

  const ButtonAddCollection = styled.button`
    font-size: 1em;
    border-radius: 4px;
    border: 0px;
    padding: 10px;
    color: white;
    width: 200px;
    margin-top: 10px;
    background-color: pink;

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

  function selectGrid(isSelectGrid) {
    setIsSelectedGrid(isSelectGrid);
  }

  function viewDetailAnime(isView) {
    setIsViewDetailAnime(isView);
    if (dataGetOneAnime) {
      setDetailAnime_title(dataGetOneAnime.Media.title.english);
      setDetailAnime_cover(dataGetOneAnime.Media.coverImage.large);
      setDetailAnime_trailer(
        "https://www.youtube.com/watch?v=" + dataGetOneAnime.Media.trailer.id
      );
      setDetailAnime_genre(dataGetOneAnime.Media.genres.join(", "));
      setDetailAnime_desc(dataGetOneAnime.Media.description);
      setDetailAnime_status(dataGetOneAnime.Media.status);
      setDetailAnime_releaseYear(dataGetOneAnime.Media.seasonYear);
      setDetailAnime_episode(dataGetOneAnime.Media.episodes);
      setDetailAnime_duration(dataGetOneAnime.Media.duration);
      setDetailAnime_score(dataGetOneAnime.Media.averageScore);
    }
  }

  useEffect(() => {
    if (dataMostFavAnime) {
      setMostPopularAnime(dataMostFavAnime.Page.media);
    }
  }, [dataMostFavAnime]);

  if (loadMostFavAnime) {
    return (
      <HomeContainer>
        <GridContainer>
          {[...Array(10)].map((x, i) => (
            <GridItem>
              {" "}
              <Skeleton height="150px" />
            </GridItem>
          ))}
        </GridContainer>
      </HomeContainer>
    );
  }
  if (errorMostFavAnime) return <div>{errorMostFavAnime.message}</div>;

  if (dataMostFavAnime)
    return (
      <div>
        <main>
          {/* <ApolloClient client={client}></ApolloClient> */}
          <HomeContainer>
            {!isViewDetailAnime ? (
              <div>
                <div
                  css={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignContent: "center",
                    alignItems: "center",
                    width: "100%",
                    height: "5vh",
                  }}
                >
                  <div
                    css={{
                      fontWeight: "bold",
                      fontSize: "1em",
                    }}
                  >
                    Most Favourite
                  </div>
                  <ul
                    css={{
                      display: "flex",
                      listStyle: "none",
                      alignContent: "center",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <li
                      css={{
                        backgroundColor: `${isSelectedGrid ? "orange" : ""}`,
                        ":hover": {
                          opacity: "0.5",
                          cursor: "pointer",
                        },
                      }}
                      onClick={selectGrid.bind(this, true)}
                    >
                      <GridView />
                    </li>

                    <li
                      css={{
                        backgroundColor: `${!isSelectedGrid ? "orange" : ""}`,
                        ":hover": {
                          opacity: "0.5",
                          cursor: "pointer",
                        },
                      }}
                      onClick={selectGrid.bind(this, false)}
                    >
                      <Splitscreen />
                    </li>
                  </ul>
                </div>

                <div>
                  <GridContainer>
                    {mostPopularAnime.map((item, index) => {
                      return (
                        <GridItem>
                          <div
                            css={{
                              display: "flex",
                              justifyContent: "",
                              alignContent: "flex-start",
                              alignItems: "flex-start",
                              marginTop: "10px",
                              width: "100%",
                            }}
                          >
                            <div
                              css={{
                                position: "relative",
                                color: "black",
                                backgroundColor: "white",
                                borderRadius: "100px",
                                fontSize: "1px",

                                ":hover": {
                                  backgroundColor: "orange",
                                  cursor: "pointer",
                                },
                              }}
                            >
                              <StarBorder />
                            </div>
                            <div
                              css={{
                                marginRight: "10px",
                              }}
                            >
                              <img
                                src={item.coverImage.medium}
                                width="80vw"
                                css={{
                                  display: "flex",
                                  alignContent: "center",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              ></img>
                            </div>
                            <div
                              css={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "10px",
                              }}
                            >
                              <div>
                                <div
                                  css={{
                                    fontSize: "0.6em",
                                    color: "grey",
                                  }}
                                >
                                  {item.genres.join(", ")}
                                </div>

                                <div
                                  css={{
                                    fontSize: "1em",
                                    fontWeight: "bold",
                                    marginBottom: "10px",
                                    color: "blue",
                                    ":hover": {
                                      opacity: "0.5",
                                      cursor: "pointer",
                                    },
                                  }}
                                  onClick={viewDetailAnime.bind(this, true)}
                                >
                                  {item.title.english}
                                </div>

                                <div
                                  css={{
                                    fontSize: "0.7em",
                                  }}
                                >
                                  <b>Status:</b> {item.status}
                                </div>
                                <div
                                  css={{
                                    fontSize: "0.7em",
                                  }}
                                >
                                  <b>Release year:</b> {item.seasonYear}
                                </div>

                                <div
                                  css={{
                                    fontSize: "0.7em",
                                  }}
                                >
                                  <b>Duration:</b> {item.duration}min, per
                                  episode
                                </div>
                              </div>
                            </div>
                          </div>
                        </GridItem>
                      );
                    })}
                  </GridContainer>
                </div>
              </div>
            ) : (
              <div>
                <div
                  css={{
                    width: "100%",
                    height: "5vh",
                  }}
                >
                  <div
                    css={{
                      fontWeight: "bold",
                      fontSize: "1em",
                      display: "flex",
                      alignContent: "center",
                      alignItems: "center",
                      marginBottom: "10px",
                      ":hover": {
                        opacity: "0.5",
                        cursor: "pointer",
                      },
                    }}
                    onClick={viewDetailAnime.bind(this, false)}
                  >
                    <ArrowBackIos /> <span>Back</span>
                  </div>
                  <div
                    css={{
                      display: "flex",
                    }}
                  >
                    <div
                      css={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <img
                        css={{
                          marginRight: "10px",
                        }}
                        src={detailAnime_cover}
                        width="200px"
                      ></img>
                      <TransitionsModal
                        ref={modalRef}
                        videoFilePath={detailAnime_trailer}
                      >
                        <div>
                          <ButtonTrailer>
                            <PlayCircle /> Watch Trailer
                          </ButtonTrailer>
                        </div>
                      </TransitionsModal>
                      <CollectionModal ref={modalRef}>
                        <div>
                          <ButtonAddCollection>
                            <PlayCircle /> Add to Collection
                          </ButtonAddCollection>
                        </div>
                      </CollectionModal>
                    </div>
                    <div>
                      <div>
                        <h3>{detailAnime_title}</h3>
                      </div>
                      <div
                        css={{
                          fontSize: "0.8em",
                          color: "grey",
                        }}
                      >
                        {detailAnime_genre}
                      </div>
                      <hr
                        css={{
                          border: "2px skyblue solid",
                        }}
                      ></hr>
                      <div>
                        <div>
                          <b
                            css={{
                              fontSize: "2em",
                              color: "orange",
                            }}
                          >
                            {detailAnime_score}
                          </b>
                          <span
                            css={{
                              fontSize: "1em",
                            }}
                          >
                            /100
                          </span>
                        </div>
                        <div
                          css={{
                            fontSize: "0.7em",
                          }}
                        >
                          <b>Status:</b> {detailAnime_status}
                        </div>
                        <div
                          css={{
                            fontSize: "0.7em",
                          }}
                        >
                          <b>Release year:</b> {detailAnime_releaseYear}
                        </div>
                        <div
                          css={{
                            fontSize: "0.7em",
                          }}
                        >
                          <b>Episode:</b> {detailAnime_episode}
                        </div>

                        <div
                          css={{
                            fontSize: "0.7em",
                          }}
                        >
                          <b>Duration:</b> {detailAnime_duration}min, per
                          episode
                        </div>

                        <div
                          css={{
                            fontSize: "0.7em",
                          }}
                        >
                          <b>Description:</b>{" "}
                          <div
                            dangerouslySetInnerHTML={{
                              __html: detailAnime_desc,
                            }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </HomeContainer>
        </main>
      </div>
    );
};

export default Home;
