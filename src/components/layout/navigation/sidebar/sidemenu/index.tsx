"use client";
import React from "react";
import DropDownMenu from "@/components/common/DropDownMenu";
import { Menu } from "@/types/Menu";
import LinkButton from "@/components/common/LinkButton";
import clsx from "clsx";
import { usePathname } from "next/navigation";

interface MenuProps {
  menus: Menu[];
}

const SideMenu: React.FC<MenuProps> = ({ menus }): React.ReactNode => {
  const [activeDropDown, setActiveDropDown] = React.useState<string>("");
  const pathName = usePathname();

  const renderMenu = () => {
    return menus.map((menu) => {
      if (menu.url !== null) {
        return (
          <li
            key={menu.id}
            className={clsx(
              "border-2 border-white hover:border-primary-600 rounded"
            )}
          >
            <div>
              <LinkButton url={menu.url} name={menu.name}>
                <span
                  className={clsx("", {
                    "text-primary": pathName.startsWith(menu.url),
                  })}
                >
                  {menu.name}
                </span>
              </LinkButton>
            </div>
          </li>
        );
      }

      if (menu.subMenu !== null) {
        return (
          <li key={menu.id} className="">
            <DropDownMenu
              name={menu.name}
              activeDropDown={activeDropDown}
              activeDropDownHandler={(value: string) =>
                setActiveDropDown(value)
              }
            >
              <SideMenu menus={menu.subMenu} />
            </DropDownMenu>
          </li>
        );
      }
    });
  };

  return <ul className="font-medium m-2">{renderMenu()}</ul>;
};

export default SideMenu;
