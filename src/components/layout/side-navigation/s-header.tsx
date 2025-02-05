/** @jsx jsx */
import { jsx } from '@emotion/react';

import Box, { BoxProps } from '@atlaskit/ds-explorations/box';
import Icon from '@atlaskit/icon';
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
  return (
    <Header
      component={Container}
      description="Next-gen service desk"
      iconBefore={<Icon label="" glyph={SampleIcon} size="large" />}
    >
      NXTGen Industries
    </Header>
  );
};

export default SHeader;
