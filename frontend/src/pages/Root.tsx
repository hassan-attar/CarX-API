import { NavLink, Outlet } from "react-router-dom";
import { Button, Layout, Modal, Image } from "antd";

import { motion } from "framer-motion";

import Login from "../components/Login";
import Signup from "../components/Signup";
import { openModal, closeModal } from "../store/modal-slice";
import { useModalDispatch, useModalSelector } from "../store/hooks";
import logoLinks from "../assets/logoLinks.json";

const { Content, Header, Footer } = Layout;

const Root = () => {
  const modalDispatch = useModalDispatch();
  const modal = useModalSelector((state) => state.modal);

  const handleShowModal = (content: string) => {
    modalDispatch(openModal(content));
  };

  const handleCancel = () => {
    modalDispatch(closeModal());
  };

  let modalContent;
  switch (modal.content) {
    case "login":
      modalContent = <Login />;
      break;
    case "signup":
      modalContent = <Signup />;
      break;
    default:
      modalContent = null;
  }

  return (
    <Layout className="min-h-screen flex flex-col w-full">
      <Header className="flex items-center bg-white border-b-2 border-blue-800">
        <div className="max-w-16 absolute left-5 top-1">
          <NavLink to={"/"}>
            <Image
              src={logoLinks["logo-black-no-background-png"]}
              style={{ maxHeight: "25px" }}
              preview={false}
            />
          </NavLink>
        </div>
        {/* <Menu
          mode="horizontal"
          selectable={false}
          items={[
            {
              key: "1",
              label: (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <NavLink to="/">Home</NavLink>
                </motion.div>
              ),
            },
            {
              key: "2",
              label: (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <NavLink to="/cars">Cars List</NavLink>
                </motion.div>
              ),
            },
          ]}
          className="flex-1 min-w-0 border-b-2 border-blue-800"
        /> */}
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ type: "spring", stiffness: 500 }}
          className="absolute right-5"
        >
          <Button onClick={() => handleShowModal("login")}>Login</Button>
        </motion.div>
      </Header>

      {modal.isOpen && (
        <Modal
          title={modal.content === "signup" ? "Signup" : "Login"}
          open={true}
          onCancel={handleCancel}
          footer={null}
        >
          {modalContent}
        </Modal>
      )}

      <Content className="bg-white">
        <Outlet />
      </Content>

      <Footer className="text-center w-full">
        CarX ©{new Date().getFullYear()} Created by Amir & Hassan
      </Footer>
    </Layout>
  );
};

export default Root;
