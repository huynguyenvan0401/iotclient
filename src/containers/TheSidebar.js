import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { SET_SIDEBAR_SHOW } from "actions/types";
import {
  CCreateElement,
  CSidebar,
  CSidebarBrand,
  CSidebarNav,
  CSidebarNavDivider,
  CSidebarNavTitle,
  CSidebarMinimizer,
  CSidebarNavDropdown,
  CSidebarNavItem,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

// sidebar nav config
import navigation from "./_nav";

const TheSidebar = () => {
  const dispatch = useDispatch();
  const show = useSelector((state) => state.sidebarShow);

  return (
    <CSidebar
      show={show}
      onShowChange={(val) =>
        dispatch({ type: SET_SIDEBAR_SHOW, sidebarShow: val })
      }
    >
      <CSidebarBrand className="d-md-down-none" to="/">
        <CIcon
          height={35}
          name={"cilLaptop"}
          className="c-sidebar-brand-full"
        />
        <div className="c-sidebar-brand-full h5 pt-2 pl-2">SmartHome</div>
        <CIcon
          className="c-sidebar-brand-minimized"
          name={"cilLaptop"}
          height={28}
        />
      </CSidebarBrand>
      <CSidebarNav>
        <CCreateElement
          items={navigation}
          components={{
            CSidebarNavDivider,
            CSidebarNavDropdown,
            CSidebarNavItem,
            CSidebarNavTitle,
          }}
        />
      </CSidebarNav>
      <CSidebarMinimizer className="c-d-md-down-none" />
    </CSidebar>
  );
};

export default React.memo(TheSidebar);
