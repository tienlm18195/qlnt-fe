import React from "react";

import Breadcrumbs, {BreadcrumbsItem} from "@atlaskit/breadcrumbs";
import __noop from "@atlaskit/ds-lib/noop";

import PageHeader from "@atlaskit/page-header";

const breadcrumbs = (
  <Breadcrumbs onExpand={__noop}>
    <BreadcrumbsItem text='Some project' key='Some project' />
    <BreadcrumbsItem text='Parent page' key='Parent page' />
  </Breadcrumbs>
);

const Header = () => {
  return <div id='app-header'></div>;
};

export default Header;
