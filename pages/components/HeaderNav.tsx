import styled from "@emotion/styled";
import "@emotion/react";
import { Search } from "@mui/icons-material";
import { useState, useEffect } from "react";
import { withTheme } from "@emotion/react";

function HeaderNav() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const scrollCheck = window.scrollY > 0;
      if (scrollCheck) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // setting the event handler from web API
    window.addEventListener("scroll", onScroll);

    // cleaning up from the web API
    return () => {
      document.removeEventListener("scroll", onScroll);
    };
  }, []);

  const Head = styled.div`
    height: 200vh;
    overflow-y: auto;
    overflow-x: hidden;
  `;
  const Container = styled.div`
    height: 40vh;
    display: flex;
    width: 100vw;
    justify-content: space-between;
    -webkit-box-shadow: 2px 2px 10px #d2d2d2;
    -moz-box-shadow: 2px 2px 10px #d2d2d2;
    box-shadow: 2px 2px 10px #d2d2d2;
    background-color: skyblue;
  `;

  const FixedHeader = styled.div`
    height: 8vh;
    display: flex;
    width: 100vw;
    justify-content: space-between;
    background-color: ${isScrolled ? "skyblue" : "transparent"};
    position: fixed;
  `;

  const Button = styled.button`
    font-size: 1em;
    border-radius: 4px;
    border: 0px;
    background-color: transparent;
    color: "black";
    font-weight: lighter;
    &:hover {
      opacity: 0.5;
      cursor: pointer;
    }
  `;

  const hoverBanner = () => {
    alert();
  };

  return (
    <Head>
      <div>
        <Container>
          <div
            css={{
              position: "",
              maxWidth: "100vw",
              height: "40vh",
              overflowX: "auto",
              overflowY: "hidden",
              display: "flex",
            }}
            onMouseOver={() => hoverBanner}
          >
            <img
              src="/assets/img/cat_banner.jpg"
              alt=""
              css={{
                height: "40vh",
                width: "100%",
                marginRight: "10px",
              }}
            />
            <img
              src="/assets/img/cat_banner.jpg"
              alt=""
              css={{
                height: "40vh",
                width: "100%",
                marginRight: "10px",
              }}
            />
            <img
              src="/assets/img/cat_banner.jpg"
              alt=""
              css={{
                height: "40vh",
                width: "100%",
                marginRight: "10px",
              }}
            />
            <img
              src="/assets/img/cat_banner.jpg"
              alt=""
              css={{
                height: "40vh",
                width: "100%",
                marginRight: "10px",
              }}
            />

            <div
              css={{
                position: "absolute",
                alignItems: "center",
                display: "flex",
                top: "35vh",
                right: "45%",
              }}
            >
              <input type="radio" name="banner"></input>
              <input type="radio" name="banner"></input>
              <input type="radio" name="banner"></input>
            </div>

            <div
              css={{
                position: "absolute",
                display: "flex",
                top: "15vh",
                justifyContent: "space-between",
                width: "100vw",
                listStyle: "none",
                margin: "0px !important",
              }}
            >
              <Button
                css={{
                  backgroundColor: "red",
                  width: "100px",
                  height: "100px",
                  opacity: "0.5",
                  color: "black !important",
                }}
              >
                Left
              </Button>
              <Button
                css={{
                  backgroundColor: "red",
                  width: "100px",
                  height: "100px",
                  color: "black !important",
                }}
              >
                Right
              </Button>
            </div>
          </div>

          <FixedHeader>
            <div
              css={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <img
                src="/assets/logo/anime_collections.png"
                alt=""
                css={{
                  margin: "5px 10px 5px 10px",
                  width: "6vh",
                  height: "6vh",
                }}
              />
            </div>
            <div>
              <ul
                css={{
                  listStyle: "none",
                  display: "flex",
                }}
              >
                <li
                  css={{
                    marginRight: "5px",
                  }}
                >
                  <Button>
                    <Search
                      css={{
                        fontSize: "20px",
                      }}
                    />
                  </Button>
                </li>
                <li
                  css={{
                    marginRight: "5px",
                  }}
                >
                  <Button>Login</Button>
                </li>
                <li
                  css={{
                    marginRight: "5px",
                  }}
                >
                  <Button>Sign Up</Button>
                </li>
              </ul>
            </div>
          </FixedHeader>
        </Container>
      </div>
    </Head>
  );
}

export default HeaderNav;
