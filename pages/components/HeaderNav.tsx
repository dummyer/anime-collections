import styled from "@emotion/styled";
import "@emotion/react";
import { Search, ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import React, { useState, useEffect, useRef } from "react";
import { withTheme } from "@emotion/react";

const HeaderNav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isBannerHovered, setIsBannerHovered] = useState(false);

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
    overflow: hidden;
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
    overflow: hidden;
    &:hover {
      opacity: 0.5;
      cursor: pointer;
    }
  `;

  const hoverBanner = (isHover: boolean) => {
    setIsBannerHovered(isHover);
  };

  const bannerRef = useRef<HTMLDivElement>(null);
  const scrollBanner = (scrollDirection: string) => {
    const { scrollLeft, clientWidth } = bannerRef.current;
    const scrollTo =
      scrollDirection === "left"
        ? scrollLeft - clientWidth
        : scrollLeft + clientWidth;

    bannerRef.current.scrollTo({ left: scrollTo, behavior: "smooth" });
  };

  return (
    <Head>
      <div>
        <Container>
          <div
            css={{
              maxWidth: "100vw",
              height: "40vh",
              overflowX: "auto",
              overflowY: "hidden",
              display: "flex",
            }}
            ref={bannerRef}
            onMouseOver={hoverBanner.bind(this, true)}
            onMouseOut={hoverBanner.bind(this, false)}
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

            {isBannerHovered && (
              <div
                css={{
                  position: "absolute",
                  display: "flex",
                  top: "15vh",
                  justifyContent: "space-between",
                  width: "100vw",
                  listStyle: "none",
                  margin: "0px !important",
                  overflow: "hidden",
                }}
              >
                <Button
                  css={{
                    backgroundColor: "skyblue",
                    width: "100px",
                    height: "100px",
                    opacity: "0.5",
                    color: "white",
                  }}
                  onClick={scrollBanner.bind(this, "left")}
                >
                  <ArrowBackIos />
                </Button>
                <Button
                  css={{
                    backgroundColor: "skyblue",
                    width: "100px",
                    height: "100px",
                    opacity: "0.5",
                    color: "white",
                  }}
                  onClick={scrollBanner.bind(this, "right")}
                >
                  <ArrowForwardIos />
                </Button>
              </div>
            )}
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
};

export default HeaderNav;
