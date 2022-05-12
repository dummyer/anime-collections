import styled from "@emotion/styled";
import "@emotion/react";
import { GridView, Splitscreen } from "@mui/icons-material";
import React, { useState, useEffect, useRef } from "react";

function Home() {
    let items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 2', 'Item 3', 'Item 4', 'Item 5', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
    const [isSelectedGrid, setIsSelectedGrid] = useState(true);
    const HomeContainer = styled.div`
        background-color:white;
        overflow: hidden;
        border: 3px skyblue solid;
        border-radius: 10px;
        margin-top: 10px;
        margin-left: 10px;
        margin-right: 10px;
        height: 87vh;
        padding:10px;
    `;

    const GridContainer = styled.div`
        display: ${isSelectedGrid ? 'grid' : 'block'};
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
        &:hover {
            opacity:0.5;
            cursor:pointer;
          }

    `;

    function selectGrid(isSelectGrid) {
        setIsSelectedGrid(isSelectGrid);
    };
    return (
        <div>
            <main>
                {/* <ApolloClient client={client}></ApolloClient> */}
                <HomeContainer>
                    <div css={{

                        display: "flex",
                        justifyContent: "space-between",
                        alignContent: "center",
                        alignItems: "center",
                        width: "100%",
                        height: "5vh",
                    }}>
                        <div css={{
                            fontWeight: "bold",
                            fontSize: "1em",
                        }}>
                            Most Popular
                        </div>
                        <ul css={{
                            display: "flex",
                            listStyle: "none",
                            alignContent: "center",
                            alignItems: "center",
                            justifyContent: "center",

                        }}>
                            <li css={{
                                backgroundColor: `${isSelectedGrid ? "orange" : ""}`,
                                ":hover": {
                                    opacity: '0.5',
                                    cursor: 'pointer',
                                }

                            }}
                                onClick={selectGrid.bind(this, true)}
                            ><GridView /></li>

                            <li css={{
                                backgroundColor: `${!isSelectedGrid ? "orange" : ""}`,
                                ":hover": {
                                    opacity: '0.5',
                                    cursor: 'pointer',
                                }

                            }}
                                onClick={selectGrid.bind(this, false)}
                            ><Splitscreen /></li>

                        </ul>

                    </div>

                    <div>

                        <GridContainer>
                            {items.map((item, index) => {
                                return <GridItem>
                                    <div css={{

                                        display: "flex",
                                        alignContent: "flex-start",
                                        alignItems: "flex-start",
                                        marginTop: "10px",
                                    }}>

                                        <div css={{
                                            marginRight: "10px",
                                        }}>
                                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg"
                                                width="80vw"
                                            ></img>
                                        </div>
                                        <div>
                                            <div css={{
                                                fontSize: "0.6em",
                                                color: "grey",
                                            }}>Action, Adventure</div>

                                            <div css={{
                                                fontSize: "1em",
                                                fontWeight: "bold",
                                                marginBottom: "10px",
                                            }}>Captain Earth</div>

                                            <div css={{
                                                fontSize: "0.7em",
                                            }}><b>Status:</b> On Going</div>
                                            <div css={{
                                                fontSize: "0.7em",
                                            }}><b>Release year:</b> 2014</div>
                                            <div css={{
                                                fontSize: "0.7em",
                                            }}><b>Producer:</b> Toei Animation</div>
                                            <div css={{
                                                fontSize: "0.7em",
                                            }}><b>Duration:</b> 24min, per episode</div>
                                        </div>
                                    </div>
                                </GridItem>
                            })}


                        </GridContainer>
                    </div>
                </HomeContainer>
            </main>
        </div >
    );
}

export default Home;