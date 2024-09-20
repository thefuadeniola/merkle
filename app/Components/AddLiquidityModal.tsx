import React from "react";
import ReactDOM from "react-dom";
import { useEffect } from "react";
import {
    Card,
    CardDescription,
    CardContent,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"
  

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  address: string | null
};

import InitializeLiquidityForm from "./InitializeLiquidityForm";

const Modal = ({ isOpen, setIsOpen, address }: ModalProps) => {
  // Close modal when the escape key is pressed

  return(
    <div className={`${isOpen ? 'flex' : 'hidden'} h-screen items-center justify-center bg-black opacity-70 fixed top-0 left-0 right-0 z-10`}>
        <Card className="w-[500px] bg-white opacity-100">
            <CardHeader className="flex flex-row items-start">
            <div className="grid gap-0.5">
                <CardTitle className="group flex items-center gap-2 text-lg">
                Create Liquidity pool
                </CardTitle>
                <CardDescription>To initialize your liquidity pool, stake it against eth.</CardDescription>
            </div>
            <div className="ml-auto text-red-800 underline cursor-pointer" onClick={()=>setIsOpen(false)}>Close</div>
            </CardHeader>
            <CardContent className=" text-sm">
                <InitializeLiquidityForm address={address} />
            </CardContent>
        </Card>
    </div>
  );
};

export default Modal;
