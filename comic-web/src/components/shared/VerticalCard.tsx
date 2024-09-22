"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { cn } from "~/lib/utils";
import { RenderIf } from "./RenderIf";
import { Eye, Heart, MessageSquareMore } from "lucide-react";
import { Skeleton } from "../ui/skeleton";

interface VerticalCardProps {
  imgSrc: string;
  chapter: string;
  title: string;
  linkHref: string;
}

const VerticalCard: React.FC<VerticalCardProps> = ({ imgSrc, chapter, title, linkHref }) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  return (
    <div className="group flex flex-col">
      <Link
        href={linkHref}
        className="image-cover shadow-card relative mb-2 aspect-comic w-full rounded-lg bg-gray-200"
      >
        <span className="absolute left-2 top-2 h-fit w-fit cursor-default rounded bg-[#00000099] px-2 py-1 text-xs font-semibold text-text-foreground shadow">
          Chapter {chapter}
        </span>
        <RenderIf condition={isLoading}>
          <Skeleton className="size-full" />
        </RenderIf>
        <Image
          src={imgSrc}
          alt={title}
          width={193}
          height={276}
          loading="lazy"
          className={cn(isLoading || (isError && "invisible"))}
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setIsError(true);
            setIsLoading(false);
          }}
        />
        <div className="fy-center absolute inset-x-2 bottom-2 h-fit cursor-default justify-around rounded bg-[#00000099] px-2 py-1 text-xs font-semibold text-text-foreground shadow">
          <span className="f-center gap-1">
            <Eye size={14} /> 0
          </span>
          <span className="f-center gap-1">
            <Heart size={14} /> 0
          </span>
          <span className="f-center gap-1">
            <MessageSquareMore size={14} /> 0
          </span>
        </div>
      </Link>
      <Link href={linkHref}>
        <h6
          title={title}
          className="transition-smooth line-clamp-2 text-sm font-semibold group-hover:text-primary"
        >
          {title}
        </h6>
      </Link>
    </div>
  );
};

export default VerticalCard;
