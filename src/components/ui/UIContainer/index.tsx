import { useState } from "react";
import HeaderComponent from "../HeaderComponent";
import SidebarComponent from "../SidebarComponent/SidebarComponent";
import { IUIContainerProps } from "./interface";

const UIContainer: React.FC<React.PropsWithChildren<IUIContainerProps>> = (
  props
) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="bg-gradient-to-r ">
      <HeaderComponent />
      <SidebarComponent setCollapsed={setCollapsed} collapsed={collapsed} />

      <div className={`${collapsed ? "pl-10 " : "lg:pl-64"}`}>
        <main className="py-5 mt-16 ">
          <div className="px-2 sm:px-2 lg:px-3 relative ">
            {props?.children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default UIContainer;
