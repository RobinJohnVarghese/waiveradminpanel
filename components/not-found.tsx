"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";

import { cn } from "@/lib/utils";
import { Button } from "@headlessui/react";
import NotFoundIcon from "@/components/svg/not-found";

export default function NotFound({
    custom
}: {
    custom?: {
        title?: string;
        description?: string;
        buttonTitle?: string;
        pageRedirection?: any;
        customPadding?: string;
        imageUrl?: string;
        customFunction?: () => void;
        disablePAgeRedirection?: boolean;
    }
}) {
    const defaultCustom = {
        title: "We couldn't find any page!",
        description: ' Please check the spelling or try searching something else',
        buttonTitle: 'Go to Back',
        pageRedirection: false,
        customPadding: '',
        imageUrl: '',
        customFunction: null,
        disablePAgeRedirection: true,
    };
    const { back, push } = useRouter();
    const mergedCustom = { ...defaultCustom, ...custom };

    const handleOnClick = () => {
        if (mergedCustom.customFunction) {
            mergedCustom.customFunction();
        }
        if (mergedCustom.disablePAgeRedirection) {
            if (mergedCustom?.pageRedirection) {
                push(mergedCustom?.pageRedirection);
            } else {
                back();
            }
        }
    };

    return (
        <section className={cn(custom?.customPadding ?? "px-3 h-auto mx-auto mt-5 lg:px-15 xl:px-28 2xl:px-28")}>
            <div className="mx-auto p-6">
                <div className="bg-white rounded-lg shadow-lg p-6 max-w-xl mx-auto text-center">
                    <div className="mb-4">
                        {mergedCustom?.imageUrl ? (
                            <div className="flex justify-center items-center">
                                <Image
                                    src={mergedCustom?.imageUrl}
                                    className="max-h-[100px] max-w-[100px] lg:max-w-[130px]  lg:max-h-[130px] w-ful rounded-lg "
                                    alt="..."
                                    width={400}
                                    height={400}
                                    quality={100}
                                    priority
                                />
                            </div>
                        ) : (
                            <NotFoundIcon />
                        )}
                    </div>
                    <h1 className="text-3xl font-bold mb-2">{mergedCustom.title}</h1>
                    <p className="text-gray-600 mb-4">
                        {mergedCustom.description}
                    </p>
                    <Button
                        className="w-full py-3 bg-gradient-to-r from-[#D22342] to-[#FC5976] text-white !rounded-lg font-bold hover:opacity-90 transition-opacity"
                        onClick={handleOnClick}
                    >
                        {mergedCustom.buttonTitle}
                    </Button>
                </div>
            </div>
        </section>
    );
}
