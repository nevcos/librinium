import { memo } from "react";
import styled from "styled-components";
import { useUserSelector } from "../../hook/useUserSelector";

const Styled_Link = styled.a`
  display: flex;
  align-items: center;
  padding: 40px var(--sidebar-padding) 10px;
  text-decoration: none;
  font-size: 1.2rem;
`;

const Styled_Image = styled.img`
  width: 45px;
  margin-right: 1rem;
  border: 1px solid white;
  border-radius: 50%;
`;

export const User = memo(function () {
  const user = useUserSelector((state) => state);
  return (
    user && (
      <Styled_Link href={user.url} target="_blank">
        <Styled_Image src={user.avatar} />
        {user.name}
      </Styled_Link>
    )
  );
});
