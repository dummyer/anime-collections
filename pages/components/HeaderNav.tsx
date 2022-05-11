import styled from "@emotion/styled";
import "@emotion/react";
import { Search } from '@mui/icons-material';

function HeaderNav() {
  const Head = styled.div`
    height: 8vh;
  `;
  const Container = styled.div`
    height: 100%;
    display:flex;
    background-color: skyblue;
    justify-content: space-between;
    -webkit-box-shadow:2px 2px 10px #D2D2D2;
     -moz-box-shadow:2px 2px 10px #D2D2D2;
     box-shadow:2px 2px 10px #D2D2D2;
  `;


  const Button = styled.button`
    font-size: 1em;
    border-radius: 4px;
    border: 0px;
    background-color: transparent;
    color:white;
    font-weight: lighter;
    &:hover {
      opacity: 0.5;
      cursor: pointer;
    }
  `;



  return (
    <Head>
      <Container>
        <div css={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
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
      </Container>

    </Head >
  );
}

export default HeaderNav;
