"use client";

import { useState } from "react";
import Link from "next/link";
import SidebarItems from "./sidebar-items";
import * as Dialog from "@radix-ui/react-dialog";
import { MenuIcon, X } from "lucide-react";

const Sidebar = ({ session }: any) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
        <Dialog.Trigger asChild>
          <button className="md:hidden fixed top-2 left-4 p-2 bg-background border border-border rounded-md">
            <MenuIcon className="h-6 w-6" />
          </button>
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed left-0 top-0 h-full w-[280px] bg-background p-6 shadow-lg focus:outline-none">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Admin Panel</h2>
              <Dialog.Close asChild>
                <button className="p-2 rounded-full hover:bg-gray-100">
                  <X className="h-6 w-6" />
                </button>
              </Dialog.Close>
            </div>
            <div className="space-y-4 overflow-y-auto h-full scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <SidebarItems setIsOpen={setIsOpen} session={session} />
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <aside className="h-screen w-52 lg:w-64 bg-background hidden md:block p-4 pt-8 border-r border-border shadow-inner overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
        <div className="flex flex-col justify-between item-start gap-4 pb-20 space-y-4">
          <SidebarItems setIsOpen={setIsOpen} session={session} />
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
