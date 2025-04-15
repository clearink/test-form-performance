import { NavLink,  useOutlet } from "react-router-dom";

import styles from "./style.module.scss";
import FPSMonitor from "../fps-monitor";

export default function HomeLayout() {
  const outlet = useOutlet();

  return (
    <div className={styles.home_layout}>
      <div className={styles.home_header}>
        <div className={styles.content}>
          <div className={styles.left}>
            <FPSMonitor/>
          </div>
          <div className={styles.right}>
            <NavLink className={styles["link-item"]} to="/mink-ui">
              mink
            </NavLink>
            <NavLink className={styles["link-item"]} to="/antd">
              antd
            </NavLink>
            <NavLink className={styles["link-item"]} to="/mink-ui-reset">
              mink-reset
            </NavLink>
            <NavLink className={styles["link-item"]} to="/antd-reset">
              antd-reset
            </NavLink>
            <NavLink className={styles["link-item"]} to="/mink-ui-preserve">
              mink-preserve
            </NavLink>
            <NavLink className={styles["link-item"]} to="/antd-preserve">
              antd-preserve
            </NavLink>
          </div>
        </div>
      </div>
      <div className={styles.home_layout__main}>{outlet}</div>
    </div>
  );
}
