import styled from "@emotion/styled";
import "@emotion/react";
import { Search } from '@mui/icons-material';
import { useState, useEffect } from "react"

function HeaderNav() {

  const useScrollHandler = () => {
    // setting initial value to true
    const [scroll, setScroll] = useState(0)

    // running on mount
    useEffect(() => {
      const onScroll = () => {
        const scrollCheck = window.scrollY == 0
        setScroll(window.scrollY)

      }

      // setting the event handler from web API
      document.addEventListener("scroll", onScroll)

      // cleaning up from the web API
      return () => {
        document.removeEventListener("scroll", onScroll)
      }
    }, [scroll, setScroll])

    return scroll

  }

  useScrollHandler()

  const Head = styled.div`
    height: 200vh;
    overflow-y: auto;
  `;
  const Container = styled.div`
    height: 40vh;
    display:flex;
    width: 100vw;
    justify-content: space-between;
    -webkit-box-shadow:2px 2px 10px #D2D2D2;
    -moz-box-shadow:2px 2px 10px #D2D2D2;
    box-shadow:2px 2px 10px #D2D2D2;
    background-color: skyblue;
    background-
  `;

  const FixedHeader = styled.div`
    height: 8vh;
    display:flex;
    width: 100vw;
    justify-content: space-between;
    background-color: transparent;
    position: fixed;
  `;

  const Button = styled.button`
    font-size: 1em;
    border-radius: 4px;
    border: 0px;
    background-color: transparent;
    color:${props => (props.scroll < 10 ? "white" : "black")};
    font-weight: lighter;
    &:hover {
      opacity: 0.5;
      cursor: pointer;
    }
  `;


  return (
    <Head>
      <div>
        <Container>
          <FixedHeader>
            <div css={{
              display: 'flex',
              justifyContent: 'center',
            }}>
              <img
                src="/assets/logo/anime_collections.png"
                alt=""
                css={{
                  margin: '5px 10px 5px 10px',
                  width: '6vh',
                  height: '6vh',
                }}
              />
            </div>
            <div>
              <ul css={{
                listStyle: 'none',
                display: 'flex',
              }}>
                <li css={{
                  marginRight: '5px',
                }}>
                  <Button><Search css={{
                    fontSize: '20px',
                  }} /></Button>
                </li>
                <li css={{
                  marginRight: '5px',
                }}>
                  <Button>Login</Button>
                </li>
                <li css={{
                  marginRight: '5px',
                }}>
                  <Button>Sign Up</Button>
                </li>
              </ul>
            </div>

          </FixedHeader>

        </Container>

      </div>

    </Head >
  );
}

export default HeaderNav;
