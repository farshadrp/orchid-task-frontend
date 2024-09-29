import Navabr from "../UI/navbar";
import Footer from "../UI/footer";
import Sidebar from "../UI/sidebar";

import classes from "./MainLayout.module.scss";

const MainLayout = ({ children }) => (
  <main>
    <Navabr />
    <div className={classes.mainWrapper}>
      <Sidebar />
      <div className={classes.childrenWrapper}>{children}</div>
    </div>
    <Footer />
  </main>
);

export default MainLayout;
