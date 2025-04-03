import { NavLink, useLocation, useOutlet } from "react-router-dom";

import styles from "./style.module.scss";

export default function HomeLayout() {
  const outlet = useOutlet();

  return (
    <div className={styles.home_layout}>
      <div className={styles.home_header}>
        <div className={styles.content}>
          <div className={styles.left}>
            <span>组件库 Form 性能测试</span>
          </div>
          <div className={styles.right}>
            <NavLink className={styles["link-item"]} to="/mink-ui">
              mink-ui
            </NavLink>
            <NavLink className={styles["link-item"]} to="/antd">
              antd
            </NavLink>
            <NavLink className={styles["link-item"]} to="/mink-ui-reset">
              mink-ui-reset
            </NavLink>
            <NavLink className={styles["link-item"]} to="/antd-reset">
              antd-reset
            </NavLink>
            <NavLink className={styles["link-item"]} to="/mink-ui-preserve">
              mink-ui-preserve
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
