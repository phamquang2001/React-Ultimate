import "react-pro-sidebar/dist/css/styles.css";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SubMenu,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from "react-pro-sidebar";

import {
  FaTachometerAlt,
  FaGem,
  FaList,
  FaGithub,
  FaRegLaughWink,
  FaHeart,
} from "react-icons/fa";
import sidebarBg from "../../assets/bg2.jpg";
import { DiReact } from "react-icons/di";
import { AiOutlineMenu } from "react-icons/ai";
import { NavLink , Link} from "react-router-dom";

const SideBar = (props) => {
  const { image, collapsed, toggled, handleToggleSidebar } = props;
  return (
    <>
      <ProSidebar
        image={sidebarBg}
        collapsed={collapsed}
        toggled={toggled}
        breakPoint="md"
        onToggle={handleToggleSidebar}
      >
        <SidebarHeader>
          <div
            style={{
              padding: "24px",
              textTransform: "uppercase",
              fontWeight: "bold",
              fontSize: 14,
              letterSpacing: "1px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            <NavLink  to='/'  style={{textDecoration: 'none' , color:'white'}}>
              <DiReact size="3em" color="#005cc5" />
              <span>Quizz Test</span>
            </NavLink>
            
          </div>
        </SidebarHeader>

        <SidebarContent>
          <Menu iconShape="circle">
            <MenuItem
              icon={<FaTachometerAlt />}
              // suffix={<span className="badge red">New</span>}
            >
              Dashboard
              <Link to='/admin'/>
            </MenuItem>
            {/* <MenuItem icon={<FaGem />}> components </MenuItem> */}
          </Menu>
          <Menu className="menu-manager" iconShape="circle">
            <SubMenu
              //   suffix={<span className="badge yellow"></span>}
              icon={<AiOutlineMenu />}
              title="Features"
            >
              <MenuItem> 
              Quản lý Users
              <Link to='/admin/admin-user'></Link>
              </MenuItem>
              <MenuItem> Quản lý bài Quiz</MenuItem>
              <MenuItem> Quản lý Câu Hỏi</MenuItem>
            </SubMenu>
          </Menu>
        </SidebarContent>

        <SidebarFooter style={{ textAlign: "center" }}>
          <div
            className="sidebar-btn-wrapper"
            style={{
              padding: "20px 24px",
            }}
          >
            <a
              href="https://github.com/phamquang2001/React-Ultimate"
              target="_blank"
              className="sidebar-btn"
              rel="noopener noreferrer"
            >
              <FaGithub />
              <span
                style={{
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  overflow: "hidden",
                }}
              >
                Quang
              </span>
            </a>
          </div>
        </SidebarFooter>
      </ProSidebar>
    </>
  );
};

export default SideBar;
