/** @jsx jsx */
import { jsx } from '@emotion/react';

import {useNavigate} from "react-router-dom";
import Box, { BoxProps } from '@atlaskit/ds-explorations/box';
import Icon from '@atlaskit/icon';
import Avatar from "@atlaskit/avatar";
import { CustomItemComponentProps } from '@atlaskit/menu';
import { Header } from '@atlaskit/side-navigation';
import SampleIcon from './s-logo';

const Container = ({ children, ...props }: CustomItemComponentProps) => {
  return (
    <Box
      {...props}
      as="div"
    >
      {children as BoxProps['children']}
    </Box>
  );
};

const SHeader = () => {
  const username = localStorage.getItem("userName");
  const avatarUrl = "";
  const navigate = useNavigate();
  return (
    <Header
      component={Container}
      description="IMSystem"
      iconBefore={<Avatar src={avatarUrl} size='large' />}
      onClick={() => navigate("/profile")}
    >
      {username}
    </Header>
  );
};

export default SHeader;
