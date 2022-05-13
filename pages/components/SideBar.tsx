import styled from "@emotion/styled";
import "@emotion/react";

const SideBar = () => {
    let items = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];
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
            }}
        >
            <div css={{

                display: "flex",
                justifyContent: "space-between",
                alignContent: "center",
                alignItems: "center",
                width: "100%",
            }}>
                <div css={{
                    fontWeight: "bold",
                    fontSize: "1em",
                }}>
                    My Favourite
                </div>
                <a
                    href="#"
                    css={{
                        fontSize: "0.8em",
                        color: "grey",
                    }}>
                    View All
                </a>

            </div>
            {items.map((item, index) => {
                return <div css={{

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
            })}





        </div >
    )
}

export default SideBar