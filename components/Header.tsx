import styled from "@emotion/styled";
import { css, jsx } from "@emotion/react";

function Header() {
  const Button = styled.button`
    padding: 5px;
    font-size: 1em;
    border-radius: 4px;
    font-weight: lighter;
    &:hover {
      opacity: 0.5;
      cursor: pointer;
    }
  `;

  const Head = styled.div`
    display:flex;
    justify-content: space-between;
  `;

  return (
    <Head>
      <div>
        <img
          src="/assets/logo/anime_collections.png"
          alt=""
          width={60}
          height={60}
        />
      </div>
      <div>
        <ul>
          <li>
            <Button>Login</Button>
          </li>
          <li>
            <Button>Sign Up</Button>
          </li>
        </ul>
      </div>
    </Head>
  );
}

export default Header;